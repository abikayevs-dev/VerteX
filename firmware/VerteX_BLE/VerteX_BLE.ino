#include <Arduino.h>
#include <Wire.h>
#include <math.h>
#include <stdlib.h>
#include "VertexBLEBridge.h"

// ============================================================
// VerteX — independent sensor feedback + Web Bluetooth BLE v1
//
// SDA = GPIO16
// SCL = GPIO21
//
// TCA channels:
//   0 = upper
//   1 = middle
//   2 = lower
//
// MOSFET outputs:
//   25 = upper motors
//   26 = middle motors
//   27 = lower motors
//
// Each sensor is compared ONLY with its own calibration vector.
//
// Default:
//   trigger angle = 5 degrees
//   release angle = 3 degrees
//   trigger delay = 700 ms
//   vibration = 500 ms ON / 1500 ms OFF
//
// Serial Monitor: 115200, Newline.
// ============================================================

class Vertex {
private:
  static constexpr uint8_t TCA = 0x70;
  static constexpr uint8_t MPU = 0x68;

  static constexpr uint32_t SAMPLE_MS = 50;
  static constexpr uint16_t CAL_SAMPLES = 60;

  uint32_t pulseOnMs = 500;
  uint32_t pulseOffMs = 1500;

  const uint8_t motorPins[3] = {25, 26, 27};

  float reference[3][3] = {};
  float filtered[3][3] = {};
  float current[3][3] = {};
  float angle[3] = {};

  float threshold[3] = {5, 5, 5};
  float release[3] = {3, 3, 3};

  bool filterReady[3] = {};
  bool pending[3] = {};
  bool active[3] = {};

  uint32_t pendingSince[3] = {};
  uint32_t pulseSince[3] = {};

  uint32_t events[3] = {};
  uint32_t activeMs[3] = {};

  double calSum[3][3] = {};
  double calSquared[3] = {};

  bool sensorsReady = false;
  bool calibrated = false;
  bool calibrating = false;
  bool collecting = false;
  bool monitoring = false;
  bool feedback = true;
  bool testing = false;
  bool fault = false;

  uint8_t motorMask = 0;
  uint16_t calCount = 0;

  uint32_t warningDelay = 700;
  uint32_t calStarted = 0;
  uint32_t calWait = 0;
  uint32_t testStarted = 0;
  uint32_t lastSample = 0;
  uint32_t lastPrint = 0;

  String input;
  bool discardInput = false;

  // ---------------- Motors ----------------

  void setMotors(uint8_t mask) {
    for (uint8_t i = 0; i < 3; i++) {
      digitalWrite(
        motorPins[i],
        (mask & (1U << i)) ? HIGH : LOW
      );
    }
    motorMask = mask;
  }

  void resetLogic() {
    for (uint8_t i = 0; i < 3; i++) {
      pending[i] = false;
      active[i] = false;
    }
  }

  void stop() {
    monitoring = false;
    calibrating = false;
    testing = false;
    resetLogic();
    setMotors(0);
  }

  void fail(const char *reason) {
    stop();
    fault = true;
    sensorsReady = false;
    calibrated = false;

    Serial.print("FAULT: ");
    Serial.println(reason);
    Serial.println("Check connection, then send REINIT.");
  }

  void serviceMotors() {
    uint32_t now = millis();

    if (fault) {
      setMotors(0);
      return;
    }

    if (testing) {
      uint32_t elapsed = now - testStarted;
      uint32_t zone = elapsed / 3000UL;

      if (zone >= 3) {
        testing = false;
        setMotors(0);
        Serial.println("MOTORTEST DONE. Send START or CAL.");
        return;
      }

      setMotors(
        elapsed % 3000UL < 2000UL ? (1U << zone) : 0
      );
      return;
    }

    if (!monitoring || !calibrated ||
        calibrating || !feedback) {
      setMotors(0);
      return;
    }

    uint8_t mask = 0;

    // Independent pulse timer for every zone.
    for (uint8_t i = 0; i < 3; i++) {
      if (!active[i]) continue;

      uint32_t phase =
        (now - pulseSince[i]) %
        (pulseOnMs + pulseOffMs);

      if (phase < pulseOnMs) {
        mask |= (1U << i);
      }
    }

    setMotors(mask);
  }

  // ---------------- I2C ----------------

  bool setChannels(uint8_t mask) {
    Wire.beginTransmission(TCA);
    Wire.write(mask);
    return Wire.endTransmission() == 0;
  }

  bool selectChannel(uint8_t channel) {
    if (!setChannels((uint8_t)(1U << channel))) {
      return false;
    }

    delay(5);
    return true;
  }

  bool writeReg(uint8_t reg, uint8_t value) {
    Wire.beginTransmission(MPU);
    Wire.write(reg);
    Wire.write(value);
    return Wire.endTransmission() == 0;
  }

  bool readBytes(uint8_t reg, uint8_t *data, uint8_t count) {
    Wire.beginTransmission(MPU);
    Wire.write(reg);

    if (Wire.endTransmission(false) != 0) return false;

    if (Wire.requestFrom(MPU, count) != count) {
      while (Wire.available()) Wire.read();
      return false;
    }

    for (uint8_t j = 0; j < count; j++) {
      data[j] = Wire.read();
    }

    return true;
  }

  bool configure(uint8_t reg, uint8_t value, uint8_t mask) {
    for (uint8_t attempt = 0; attempt < 3; attempt++) {
      bool written = writeReg(reg, value);
      delay(10);

      uint8_t actual = 0;
      bool readOK = readBytes(reg, &actual, 1);

      if (written && readOK &&
          (actual & mask) == (value & mask)) {
        return true;
      }
    }

    Serial.printf("CONFIG ERROR reg=0x%02X\n", reg);
    return false;
  }

  int16_t get16(const uint8_t *p) {
    return (int16_t)(((uint16_t)p[0] << 8) | p[1]);
  }

  float magnitude(const float *v) {
    return sqrtf(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
  }

  float angleBetween(const float *a, const float *b) {
    float denominator = magnitude(a) * magnitude(b);
    if (denominator < 0.000001f) return NAN;

    float dot = a[0]*b[0] + a[1]*b[1] + a[2]*b[2];

    return acosf(
      constrain(dot / denominator, -1.0f, 1.0f)
    ) * RAD_TO_DEG;
  }

  bool readAcceleration(uint8_t channel, float *v) {
    if (!selectChannel(channel)) {
      setMotors(0);
      Serial.printf("CH%u: SELECT ERROR\n", channel);
      return false;
    }

    uint8_t data[6];
    bool ok = readBytes(0x3B, data, 6);

    if (!ok) setMotors(0);

    bool disabled = setChannels(0);

    if (!ok || !disabled) {
      setMotors(0);
      Serial.printf("CH%u: READ/DISCONNECT ERROR\n", channel);
      return false;
    }

    for (uint8_t axis = 0; axis < 3; axis++) {
      v[axis] = get16(data + axis*2) / 16384.0f;
    }

    float length = magnitude(v);
    return isfinite(length) && length > 0.05f;
  }

  bool initializeSensors() {
    if (!setChannels(0)) {
      Serial.println("TCA9548A: NO RESPONSE");
      return false;
    }

    Serial.println("TCA9548A: READY");
    bool allOK = true;

    for (uint8_t i = 0; i < 3; i++) {
      if (!selectChannel(i)) {
        Serial.printf("CH%u: SELECT ERROR\n", i);
        return false;
      }

      uint8_t id = 0;
      bool ok = readBytes(0x75, &id, 1);

      if (ok) {
        Serial.printf("CH%u: WHO_AM_I=0x%02X\n", i, id);
        ok = id == 0x68 || id == 0x70 ||
             id == 0x71 || id == 0x72;
      } else {
        Serial.printf("CH%u: ID READ FAILED\n", i);
      }

      if (ok) ok = writeReg(0x6B, 0x01);
      delay(100);

      if (ok) ok = configure(0x6B, 0x01, 0x7F);
      if (ok) ok = configure(0x6C, 0x00, 0x3F);

      // Accelerometer +/-2 g.
      if (ok) ok = configure(0x1C, 0x00, 0xF8);

      if (!setChannels(0)) return false;

      Serial.printf("CH%u: %s\n", i, ok ? "READY" : "FAILED");
      if (!ok) allOK = false;
    }

    return allOK;
  }

  // ---------------- Calibration ----------------

  void clearStats() {
    for (uint8_t i = 0; i < 3; i++) {
      events[i] = 0;
      activeMs[i] = 0;
    }
  }

  void beginCalibration(uint32_t waitMs) {
    stop();

    if (!sensorsReady || fault) {
      Serial.println("CAL unavailable. Send REINIT.");
      return;
    }

    calibrated = false;
    calibrating = true;
    collecting = false;

    calCount = 0;
    calStarted = millis();
    calWait = waitMs;

    for (uint8_t i = 0; i < 3; i++) {
      filterReady[i] = false;
      calSquared[i] = 0;

      for (uint8_t axis = 0; axis < 3; axis++) {
        calSum[i][axis] = 0;
      }
    }

    Serial.printf(
      "CAL starts in %lu seconds. Take reference posture.\n",
      (unsigned long)(waitMs / 1000)
    );
  }

  void rejectCalibration(const char *reason) {
    stop();
    calibrated = false;

    Serial.print("CAL REJECTED: ");
    Serial.println(reason);
    Serial.println("Hold still and send CAL.");
  }

  void finishCalibration() {
    float means[3][3];

    // Validate every sensor before accepting calibration.
    for (uint8_t i = 0; i < 3; i++) {
      double meanSquared = 0;

      for (uint8_t axis = 0; axis < 3; axis++) {
        double mean = calSum[i][axis] / CAL_SAMPLES;
        means[i][axis] = (float)mean;
        meanSquared += mean * mean;
      }

      double variance =
        calSquared[i] / CAL_SAMPLES - meanSquared;

      float deviation = sqrtf((float)fmax(0.0, variance));
      float length = magnitude(means[i]);

      Serial.printf(
        "CAL CH%u: total=%.3f g variation=%.4f g\n",
        i, length, deviation
      );

      if (length < 0.85f || length > 1.15f ||
          deviation > 0.03f) {
        rejectCalibration("movement or invalid acceleration");
        return;
      }
    }

    for (uint8_t i = 0; i < 3; i++) {
      for (uint8_t axis = 0; axis < 3; axis++) {
        reference[i][axis] = means[i][axis];
        filtered[i][axis] = means[i][axis];
      }

      angle[i] = 0;
      filterReady[i] = true;
    }

    clearStats();
    resetLogic();

    calibrated = true;
    calibrating = false;
    monitoring = true;
    lastSample = millis();

    Serial.println("CAL OK. Independent monitoring started.");
  }

  void calibrationStep() {
    if (millis() - calStarted < calWait) return;

    if (!collecting) {
      collecting = true;
      Serial.println("CAL: HOLD STILL for about 3 seconds.");
    }

    for (uint8_t i = 0; i < 3; i++) {
      float length = magnitude(current[i]);

      if (length < 0.85f || length > 1.15f) {
        rejectCalibration("movement or invalid sensor scale");
        return;
      }
    }

    for (uint8_t i = 0; i < 3; i++) {
      for (uint8_t axis = 0; axis < 3; axis++) {
        double value = current[i][axis];
        calSum[i][axis] += value;
        calSquared[i] += value * value;
      }
    }

    if (++calCount >= CAL_SAMPLES) finishCalibration();
  }

  // ---------------- Independent detection ----------------

  void updateZone(uint8_t i, uint32_t now, uint32_t elapsed) {
    if (active[i]) {
      if (angle[i] <= release[i]) {
        active[i] = false;
        pending[i] = false;
        Serial.printf("ZONE %u: RETURNED\n", i+1);
      } else {
        activeMs[i] += elapsed;
      }
      return;
    }

    if (angle[i] <= threshold[i]) {
      pending[i] = false;
      return;
    }

    if (!pending[i]) {
      pending[i] = true;
      pendingSince[i] = now;
    }

    if (now - pendingSince[i] >= warningDelay) {
      pending[i] = false;
      active[i] = true;

      pulseSince[i] = now;
      events[i]++;

      Serial.printf(
        "EVENT zone=%u angle=%.1f\n", i+1, angle[i]
      );
    }
  }

  void sampleStep() {
    if (fault || !sensorsReady) return;

    uint32_t started = millis();
    uint32_t elapsed = started - lastSample;

    if (elapsed < SAMPLE_MS) return;
    lastSample = started;

    if (calibrated && elapsed > 250UL) {
      fail("sampling gap exceeded 250 ms");
      return;
    }

    for (uint8_t i = 0; i < 3; i++) {
      if (!readAcceleration(i, current[i])) {
        fail("sensor communication/data error");
        return;
      }
    }

    if (millis() - started > 200UL) {
      fail("I2C acquisition too slow");
      return;
    }

    if (calibrating) {
      calibrationStep();
      return;
    }

    if (!calibrated) return;

    uint32_t now = millis();

    // Faster smoothing than in the previous version.
    float alpha = 1.0f - expf(
      -(elapsed / 1000.0f) / 0.12f
    );

    for (uint8_t i = 0; i < 3; i++) {
      float length = magnitude(current[i]);

      // Reject strong acceleration for this zone only.
      // Do not interpret it as a valid posture measurement.
      if (length < 0.85f || length > 1.15f) {
        filterReady[i] = false;
        pending[i] = false;
        active[i] = false;
        continue;
      }

      for (uint8_t axis = 0; axis < 3; axis++) {
        if (!filterReady[i]) {
          filtered[i][axis] = current[i][axis];
        } else {
          filtered[i][axis] += alpha * (
            current[i][axis] - filtered[i][axis]
          );
        }
      }

      filterReady[i] = true;

      // Each sensor uses ONLY its own calibration vector.
      angle[i] = angleBetween(filtered[i], reference[i]);

      if (!isfinite(angle[i])) {
        fail("invalid angle calculation");
        return;
      }

      if (monitoring) updateZone(i, now, elapsed);
    }
  }

  // ---------------- Commands ----------------

  const char *status() {
    if (fault) return "FAULT";
    if (testing) return "MOTOR_TEST";
    if (calibrating) return "CALIBRATING";
    if (!calibrated) return "NEED_CAL";
    if (!monitoring) return "STOPPED";

    if (active[0] || active[1] || active[2]) {
      return feedback ? "FEEDBACK" : "DEVIATION";
    }

    if (pending[0] || pending[1] || pending[2]) {
      return "PENDING";
    }

    if (!filterReady[0] || !filterReady[1] || !filterReady[2]) {
      return "MOVEMENT";
    }

    return "OK";
  }

  void printStatus() {
    Serial.printf(
      "%s | U=%.1f M=%.1f L=%.1f deg"
      " | valid=%u%u%u | motors=%u%u%u | feedback=%u\n",
      status(),
      angle[0], angle[1], angle[2],
      (unsigned)(calibrated && filterReady[0]),
      (unsigned)(calibrated && filterReady[1]),
      (unsigned)(calibrated && filterReady[2]),
      (unsigned)((motorMask & 1) != 0),
      (unsigned)((motorMask & 2) != 0),
      (unsigned)((motorMask & 4) != 0),
      (unsigned)feedback
    );
  }

  void help() {
    Serial.println("CAL / C / START / STOP / REINIT");
    Serial.println("MOTORTEST / STATUS / STATS / RESETSTATS");
    Serial.println("FEEDBACK:ON / FEEDBACK:OFF");
    Serial.println("THRESHOLD:5 — all zones");
    Serial.println("UPPER:5 / MIDDLE:5 / LOWER:5");
    Serial.println("DELAY:700 / ON:500 / OFF:1500 / HELP");
  }

  void reinitialize(uint32_t waitMs) {
    stop();
    calibrated = false;
    fault = false;
    sensorsReady = false;

    sensorsReady = initializeSensors();
    lastSample = millis();

    if (!sensorsReady) {
      fail("initialization failed");
      return;
    }

    beginCalibration(waitMs);
  }

  void handleCommand(String command) {
    command.trim();
    command.toUpperCase();
    if (!command.length()) return;

    Serial.print("CMD: ");
    Serial.println(command);

    if (command == "STOP") {
      stop();
      return;
    }

    if (command == "REINIT") {
      reinitialize(5000);
      return;
    }

    if (command == "CAL" || command == "C" ||
        command == "CALIBRATE") {
      beginCalibration(5000);
      return;
    }

    if (command == "START") {
      if (fault || !sensorsReady || !calibrated ||
          calibrating) {
        Serial.println("Use CAL or REINIT first.");
        return;
      }

      testing = false;
      setMotors(0);
      resetLogic();
      monitoring = true;
      return;
    }

    if (command == "MOTORTEST") {
      if (fault) {
        Serial.println("Unavailable during FAULT.");
        return;
      }

      stop();
      testing = true;
      testStarted = millis();
      return;
    }

    if (command == "FEEDBACK:ON" ||
        command == "FEEDBACK:OFF") {
      feedback = command == "FEEDBACK:ON";
      testing = false;
      resetLogic();
      setMotors(0);
      return;
    }

    if (command == "STATUS") {
      printStatus();

      Serial.printf(
        "Threshold U/M/L=%.1f/%.1f/%.1f"
        " release=%.1f/%.1f/%.1f delay=%lu ms\n",
        threshold[0], threshold[1], threshold[2],
        release[0], release[1], release[2],
        (unsigned long)warningDelay
      );
      return;
    }

    if (command == "STATS") {
      for (uint8_t i = 0; i < 3; i++) {
        Serial.printf(
          "Zone %u: events=%lu confirmed deviation=%.1f s\n",
          i+1, (unsigned long)events[i],
          activeMs[i]/1000.0f
        );
      }
      return;
    }

    if (command == "RESETSTATS") {
      clearStats();
      resetLogic();
      setMotors(0);
      return;
    }

    if (command == "HELP") {
      help();
      return;
    }

    int separator = command.indexOf(':');

    if (separator > 0) {
      String key = command.substring(0, separator);
      String argument = command.substring(separator+1);

      char *end = nullptr;
      float value = strtof(argument.c_str(), &end);

      if (end == argument.c_str() ||
          *end != '\0' || !isfinite(value)) {
        Serial.println("Invalid number.");
        return;
      }

      bool accepted = false;

      bool angleSetting =
        key == "THRESHOLD" || key == "UPPER" ||
        key == "MIDDLE" || key == "LOWER";

      if (angleSetting && value >= 3 && value <= 45) {
        for (uint8_t i = 0; i < 3; i++) {
          if (key == "THRESHOLD" ||
              (key == "UPPER" && i == 0) ||
              (key == "MIDDLE" && i == 1) ||
              (key == "LOWER" && i == 2)) {
            threshold[i] = value;
            release[i] = fmaxf(1.0f, value - 2.0f);
          }
        }
        accepted = true;
      } else if (key == "DELAY" &&
                 value >= 0 && value <= 30000 &&
                 value == floorf(value)) {
        warningDelay = (uint32_t)value;
        accepted = true;
      }

      if ((key == "ON" && value >= 100 && value <= 1000) ||
          (key == "OFF" && value >= 500 && value <= 10000)) {
        if (value == floorf(value)) {
          if (key == "ON") pulseOnMs = (uint32_t)value;
          else pulseOffMs = (uint32_t)value;
          accepted = true;
        }
      }
      if (accepted) {
        testing = false;
        resetLogic();
        setMotors(0);
        Serial.println("Setting updated.");
      } else {
        Serial.println("Unknown setting or invalid range.");
      }

      return;
    }

    Serial.println("Unknown command. Send HELP.");
  }

  void pollSerial() {
    uint8_t budget = 64;

    while (budget-- && Serial.available()) {
      char c = Serial.read();

      if (c == '\r' || c == '\n') {
        if (!discardInput && input.length()) {
          handleCommand(input);
        }
        input = "";
        discardInput = false;
      } else if (!discardInput) {
        if (input.length() < 80) {
          input += c;
        } else {
          input = "";
          discardInput = true;
          Serial.println("Command too long.");
        }
      }
    }
  }

public:
  VertexLink::Settings bleSettings() {
    VertexLink::Settings s;
    for (uint8_t i=0;i<3;i++) s.threshold[i]=threshold[i];
    s.delayMs=(uint16_t)warningDelay;
    s.onMs=(uint16_t)pulseOnMs;
    s.offMs=(uint16_t)pulseOffMs;
    s.feedback=feedback;
    return s;
  }

  VertexLink::Telemetry bleTelemetry() {
    VertexLink::Telemetry t;
    t.monitoring=monitoring;
    t.calibrated=calibrated;
    t.calibrating=calibrating;
    t.testing=testing;
    t.fault=fault || !sensorsReady;
    t.motors=motorMask;
    for (uint8_t i=0;i<3;i++) {
      t.angle[i]=angle[i];
      if (active[i]) t.deviations |= (1U<<i);
      if (calibrated && filterReady[i]) t.validMask |= (1U<<i);
    }
    return t;
  }

  // Invoked by BLE poll() in the Arduino loop task, not a BLE callback.
  uint8_t bleCommand(uint8_t op, const VertexLink::Settings &s) {
    if (op==3) { stop(); return 0; }
    if (op==1) {
      if (!VertexLink::valid(s)) return 1;
      testing=false;
      resetLogic();
      setMotors(0);
      for (uint8_t i=0;i<3;i++) {
        threshold[i]=s.threshold[i];
        release[i]=fmaxf(1.0f, threshold[i]-2.0f);
      }
      warningDelay=s.delayMs;
      pulseOnMs=s.onMs;
      pulseOffMs=s.offMs;
      feedback=s.feedback;
      Serial.println("BLE: settings applied.");
      return 0;
    }
    if (op==2) {
      if (fault || !sensorsReady || !calibrated || calibrating) return 1;
      testing=false;
      setMotors(0);
      resetLogic();
      monitoring=true;
      return 0;
    }
    if (op==4) {
      if (fault || !sensorsReady || calibrating) return 1;
      beginCalibration(5000); // ACK means calibration STARTED, not completed.
      return 0;
    }
    return 1;
  }

  void bleDisconnected() {
    stop();
    Serial.println("BLE disconnected: monitoring and motors stopped.");
  }

  void begin() {
    for (uint8_t i = 0; i < 3; i++) {
      pinMode(motorPins[i], OUTPUT);
      digitalWrite(motorPins[i], LOW);
    }

    Serial.begin(115200);
    input.reserve(80);

    Wire.begin(16, 21, 25000);
    Wire.setTimeOut(50);

    delay(1000);

    Serial.println("\nVerteX — INDEPENDENT SENSOR MODE");
    Serial.println("SDA=16 SCL=21 | motors=25/26/27");
    Serial.println("Threshold=5 deg | release=3 deg | delay=700 ms");

    help();
    reinitialize(8000);
  }

  void tick() {
    serviceMotors();
    pollSerial();

    serviceMotors();
    sampleStep();
    serviceMotors();

    uint32_t now = millis();

    if (!fault && now - lastPrint >= 300UL) {
      lastPrint = now;
      printStatus();
    }

    delay(1);
  }
};

Vertex vertex;

// Plain function adapters keep the original Vertex implementation intact.
uint8_t applyBleCommand(uint8_t op, const VertexLink::Settings &settings) {
  return vertex.bleCommand(op, settings);
}
VertexLink::Settings readBleSettings() { return vertex.bleSettings(); }
VertexLink::Telemetry readBleTelemetry() { return vertex.bleTelemetry(); }
void onBleDisconnect() { vertex.bleDisconnected(); }

void setup() {
  vertex.begin();
  const bool bleOK=VertexLink::begin(applyBleCommand, readBleSettings,
                                   readBleTelemetry, onBleDisconnect);
  Serial.println(bleOK ? "BLE READY: VerteX-001" : "BLE INIT FAILED: Serial mode available");
}

void loop() {
  VertexLink::poll();
  vertex.tick();
}