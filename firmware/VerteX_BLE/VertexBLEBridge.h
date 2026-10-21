#pragma once
// Transport module for the accompanying VerteX_BLE.ino, Arduino-ESP32 3.x.
// Call begin() after sensor/motor setup, poll() from loop().
// All application callbacks run in loop(), never in the BLE task.
#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>

namespace VertexLink {
struct Settings { float threshold[3]={5,5,5}; uint16_t delayMs=700,onMs=500,offMs=1500; bool feedback=true; };
struct Telemetry { float angle[3]={0,0,0}; bool monitoring=false,calibrated=false,calibrating=false,testing=false,fault=true; uint8_t deviations=0,motors=0,validMask=0; };
// op: 0 GET, 1 SETTINGS, 2 START, 3 STOP, 4 CAL.
// Return 0 only once operation is applied. Return 1 if rejected.
// For SETTINGS: validate and apply ALL fields atomically, stop pending pulses.
// For CAL: ACK means accepted; calibrating/calibrated flags report progress.
// START must reject missing calibration or unhealthy sensors.
// STOP must synchronously turn all motors off.
using Handler = uint8_t (*)(uint8_t op, const Settings &requested);
using GetSettings = Settings (*)();
using GetTelemetry = Telemetry (*)();
using OnDisconnect = void (*)(); // Stop monitoring and all motor outputs.
struct Packet { uint8_t data[20]; };
static QueueHandle_t queue=nullptr;
static BLECharacteristic *tx=nullptr,*ctrl=nullptr;
static Handler handler=nullptr;
static GetSettings settingsFn=nullptr;
static GetTelemetry telemetryFn=nullptr;
static OnDisconnect disconnectFn=nullptr;
static volatile bool connected=false,disconnectPending=false;
static uint16_t telemetrySeq=0;
static uint32_t lastTelemetry=0;
static uint16_t get16(const uint8_t *p){return uint16_t(p[0])|(uint16_t(p[1])<<8);}
static void put16(uint8_t *p,uint16_t v){p[0]=v&255;p[1]=v>>8;}
static void put32(uint8_t *p,uint32_t v){for(int i=0;i<4;i++)p[i]=(v>>(8*i))&255;}
static bool valid(const Settings &s){
  for(float n:s.threshold)if(!isfinite(n)||n<3||n>45)return false;
  return s.delayMs<=30000&&s.onMs>=100&&s.onMs<=1000&&s.offMs>=500&&s.offMs<=10000;
}
static Settings decodeSettings(const Packet &p){Settings s;for(int i=0;i<3;i++)s.threshold[i]=get16(p.data+6+i*2)/10.f;s.delayMs=get16(p.data+12);s.onMs=get16(p.data+14);s.offMs=get16(p.data+16);s.feedback=p.data[18]!=0;return s;}
static void reply(uint16_t seq,uint8_t status){
  Settings s=settingsFn();uint8_t b[20]={1,2};put16(b+2,seq);b[4]=status;
  for(int i=0;i<3;i++)put16(b+6+i*2,lroundf(s.threshold[i]*10));
  put16(b+12,s.delayMs);put16(b+14,s.onMs);put16(b+16,s.offMs);b[18]=s.feedback;
  ctrl->setValue(b,sizeof(b));if(connected)ctrl->notify();
}
class ServerCallbacks:public BLEServerCallbacks{
  void onConnect(BLEServer*) override{connected=true;}
  void onDisconnect(BLEServer*) override{connected=false;disconnectPending=true;}
};
class ControlCallbacks:public BLECharacteristicCallbacks{
  void onWrite(BLECharacteristic *c) override{
    auto value=c->getValue();if(value.length()!=20)return;
    Packet p;memcpy(p.data,value.c_str(),20);
    // Queue overflow produces client timeout, never a false success.
    if(queue)xQueueSend(queue,&p,0);
  }
};
static bool begin(Handler h,GetSettings s,GetTelemetry t,OnDisconnect d){
  if(!h||!s||!t||!d||!valid(s()))return false;
  handler=h;settingsFn=s;telemetryFn=t;disconnectFn=d;
  queue=xQueueCreate(4,sizeof(Packet));if(!queue)return false;
  BLEDevice::init("VerteX-001");
  BLEServer *server=BLEDevice::createServer();server->setCallbacks(new ServerCallbacks());
  BLEService *service=server->createService("91bad492-b950-4226-aa2b-4ede9fa42f59");
  tx=service->createCharacteristic("cba1d466-344c-4be3-ab3f-189f80dd7518",BLECharacteristic::PROPERTY_READ|BLECharacteristic::PROPERTY_NOTIFY);
  ctrl=service->createCharacteristic("cba1d467-344c-4be3-ab3f-189f80dd7518",BLECharacteristic::PROPERTY_READ|BLECharacteristic::PROPERTY_WRITE|BLECharacteristic::PROPERTY_NOTIFY);
  tx->addDescriptor(new BLE2902());ctrl->addDescriptor(new BLE2902());ctrl->setCallbacks(new ControlCallbacks());
  service->start();auto adv=BLEDevice::getAdvertising();adv->addServiceUUID(service->getUUID());adv->setScanResponse(true);adv->start();return true;
}
static void poll(){
  if(!queue)return;
  if(disconnectPending){disconnectPending=false;disconnectFn();xQueueReset(queue);BLEDevice::startAdvertising();}
  Packet p;
  if(connected&&xQueueReceive(queue,&p,0)==pdTRUE){
    uint8_t op=p.data[1];Settings requested=decodeSettings(p);uint8_t status=1;
    if(p.data[0]==1&&op<=4&&(op!=1||(valid(requested)&&p.data[18]<=1)))status=op==0?0:handler(op,requested);
    reply(get16(p.data+2),status);
  }
  const uint32_t now=millis();if(!connected||now-lastTelemetry<200)return;lastTelemetry=now;
  Telemetry t=telemetryFn();uint8_t b[20]={1,1};put16(b+2,++telemetrySeq);
  b[4]=(t.monitoring?1:0)|(t.calibrated?2:0)|(t.fault?4:0)|(t.calibrating?8:0)|(t.testing?16:0);b[5]=t.deviations&7;
  for(int i=0;i<3;i++){if(!isfinite(t.angle[i])||t.angle[i]<0||t.angle[i]>180){b[4]|=4;put16(b+6+i*2,0);}else put16(b+6+i*2,lroundf(t.angle[i]*10));}
  b[12]=t.motors&7;b[13]=t.validMask&7;put32(b+14,now);tx->setValue(b,sizeof(b));tx->notify();
}
} // namespace VertexLink
