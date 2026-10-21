"use strict";

/* VerteX frontend. BLE v1: see ble-protocol.js and firmware/INTEGRATION.md. */

const BLE_SERVICE_UUID =
  "91bad492-b950-4226-aa2b-4ede9fa42f59";

const BLE_DATA_CHARACTERISTIC_UUID =
  "cba1d466-344c-4be3-ab3f-189f80dd7518";


const translations = {
  ru: {
    "meta.title": "VerteX — умный мониторинг осанки",

    "meta.description":
      "VerteX — исследовательский прототип носимой системы мониторинга осанки с тремя IMU-датчиками и обратной связью в реальном времени.",

    "common.skip": "Перейти к содержанию",

    "nav.problem": "Проблема",
    "nav.technology": "Технология",
    "nav.research": "Исследование",
    "nav.product": "Продукт",
    "nav.business": "Модель",
    "nav.dashboard": "Дашборд",

    "hero.eyebrow":
      "Исследовательский прототип · VerteX 2026",

    "hero.title":
      "Понимайте осанку.<br><span>Меняйте привычки.</span>",

    "hero.lead":
      "VerteX измеряет положение трёх отделов спины, фиксирует эпизоды отклонений и помогает пользователю вовремя вернуться к откалиброванной позе.",

    "hero.dashboard": "Открыть дашборд",
    "hero.research": "Посмотреть исследование",
    "hero.factSensors": "IMU-датчика",
    "hero.factThreshold": "порог эксперимента",
    "hero.factDuration": "подтверждение отклонения",
    "hero.prototype": "Рабочий прототип",
    "hero.liveAngle": "Угол сейчас",
    "hero.liveState": "Состояние",
    "hero.normal": "Норма",

    "trust.hardwareTitle": "Собранное устройство",
    "trust.hardwareText": "ESP32 и три MPU6050",

    "trust.methodTitle": "Проверяемая методика",
    "trust.methodText": "Три этапа по 15 минут",

    "trust.honestTitle": "Честный статус",
    "trust.honestText": "Не является медицинским изделием",

    "problem.kicker": "Проблема",

    "problem.title":
      "Отклонение начинается незаметно",

    "problem.lead":
      "Во время учёбы человек может постепенно менять положение тела и не замечать этого. Разовый осмотр не показывает, что происходило в течение всего дня.",

    "problem.card1Title":
      "Нет непрерывной картины",

    "problem.card1Text":
      "Периодические наблюдения не показывают частоту, продолжительность и время эпизодов.",

    "problem.card2Title":
      "Обратная связь запаздывает",

    "problem.card2Text":
      "Пользователь замечает неправильное положение уже после того, как долго в нём находился.",

    "problem.card3Title":
      "Прогресс трудно измерить",

    "problem.card3Text":
      "Без количественных данных невозможно объективно сравнивать дни и оценивать изменения привычки.",

    "technology.kicker": "Технология",

    "technology.title":
      "Три точки измерения. Одна понятная картина.",

    "technology.lead":
      "Датчики сравнивают текущее положение с персональной калибровкой. Если отклонение превышает установленный порог дольше одной секунды, система регистрирует событие и включает обратную связь.",

    "technology.spec1":
      "Верхний, средний и нижний отделы",

    "technology.spec2":
      "Последовательное переключение I²C-каналов",

    "technology.spec3":
      "Обработка данных и беспроводная связь",

    "technology.spec4":
      "Обратная связь в текущем эксперименте",

    "technology.signalTitle": "Поток данных",
    "technology.flow1Title": "Положение тела",
    "technology.flow1Text": "Три точки спины",
    "technology.flow2Text": "Углы и ускорение",
    "technology.flow3Text": "Фильтрация и сравнение",
    "technology.flow4Title": "Событие и сигнал",
    "technology.flow4Text": "Запись времени и длительности",

    "research.kicker": "Исследование",

    "research.title":
      "Проверяем не обещание, а гипотезу",

    "research.hypothesis":
      "Персонализированная обратная связь снижает частоту и продолжительность отклонений от оптимального положения тела.",

    "research.protocol":
      "Экспериментальный протокол",

    "research.status":
      "Пилотное исследование",

    "research.before":
      "До обратной связи",

    "research.beforeText":
      "LED скрыт, регистрируется исходное поведение.",

    "research.during":
      "С обратной связью",

    "research.duringText":
      "LED виден и включается при подтверждённом отклонении.",

    "research.after":
      "После обратной связи",

    "research.afterText":
      "LED снова скрыт, оценивается сохранение привычки.",

    "research.metric1": "Порог",
    "research.metric2": "Длительность",
    "research.metric3": "Участники пилота",
    "research.metric4": "Метрики",
    "research.metric4Value": "Частота + время",

    "research.resultKicker": "Результаты",

    "research.resultTitle":
      "Место для подтверждённых данных",

    "research.notSimulated":
      "Без вымышленных цифр",

    "research.resultText":
      "Перед публикацией внесите сюда окончательные средние значения из протокола. Дашборд ниже использует только демонстрационные данные.",

    "research.limitKicker":
      "Ограничения",

    "research.limitTitle":
      "Что важно сообщить честно",

    "research.limit1":
      "Небольшая пилотная выборка",

    "research.limit2":
      "Короткие контролируемые сессии",

    "research.limit3":
      "Индивидуальная калибровка перед тестом",

    "research.limit4":
      "Прототип не ставит диагноз и не заменяет врача",

    "product.photo":
      "Фотография рабочего прототипа",

    "product.kicker": "Продукт",

    "product.title":
      "Сейчас — исследовательский прототип. Далее — удобное носимое устройство.",

    "product.lead":
      "Текущая версия подтверждает работу датчиков, алгоритма отклонений и световой обратной связи. Следующая итерация сосредоточена на компактности, автономности и удобстве.",

    "product.item1":
      "Персональная калибровка нейтральной позы",

    "product.item2":
      "Одновременный анализ трёх участков спины",

    "product.item3":
      "Журнал каждого эпизода с точным временем",

    "product.item4":
      "Подготовка к передаче данных по BLE",

    "product.now": "Сейчас",
    "product.next": "Следом",
    "product.later": "Позже",

    "business.kicker":
      "Предлагаемая модель",

    "business.title":
      "От устройства — к системе наблюдения",

    "business.lead":
      "Модель предназначена для проверки в будущих пилотах и не выдаётся за уже действующий клинический сервис.",

    "business.card1Title":
      "Устройства для организаций",

    "business.card1Text":
      "Клиники и школы получают устройства с инструкцией, калибровкой и обслуживанием.",

    "business.card2Title":
      "Аналитическая панель",

    "business.card2Text":
      "Доступ к динамике, эпизодам отклонений и выгрузке отчётов по сеансам.",

    "business.card3Title":
      "Контролируемый пилот",

    "business.card3Text":
      "Ограниченное тестирование с согласиями, протоколом безопасности и измеримыми критериями.",

    "cta.kicker": "Проект VerteX",

    "cta.title":
      "Посмотрите, как данные превращаются в понятный отчёт",

    "cta.button":
      "Открыть интерактивное демо",

    "dashboard.back":
      "Вернуться на сайт",

    "dashboard.demo":
      "Демонстрационные данные",

    "dashboard.kicker":
      "VerteX Control",

    "dashboard.title":
      "Мониторинг осанки",

    "dashboard.subtitle":
      "Локальное интерактивное демо. Оно не подключено к медицинской системе.",

    "dashboard.localTime":
      "Локальное время",

    "dashboard.device":
      "Устройство",

    "dashboard.offline":
      "Не подключено",

    "dashboard.connected":
      "BLE подключён",

    "dashboard.demoConnected":
      "Демо готово",

    "dashboard.connect":
      "Подключить BLE",

    "dashboard.connecting":
      "Подключение…",

    "dashboard.calibrate":
      "Калибровать",

    "dashboard.start":
      "Запустить демо",

    "dashboard.stop":
      "Остановить",

    "dashboard.live":
      "Положение в реальном времени",

    "dashboard.ready":
      "Готово к запуску",

    "dashboard.running":
      "Сеанс выполняется",

    "dashboard.paused":
      "Сеанс остановлен",

    "dashboard.good":
      "Хорошая осанка",

    "dashboard.warning":
      "Обнаружено отклонение",

    "dashboard.goodHint":
      "Все три зоны находятся в пределах порога.",

    "dashboard.warningHint":
      "Одна из зон превысила выбранный порог.",

    "dashboard.upper": "Верхний",
    "dashboard.middle": "Средний",
    "dashboard.lower": "Нижний",

    "dashboard.chartTitle":
      "Отклонения за сеанс",

    "dashboard.chartText":
      "Максимальный угол по времени",

    "dashboard.events":
      "событий",

    "dashboard.chartEmpty":
      "Запустите демо, чтобы увидеть поток данных",

    "dashboard.angle":
      "Максимальный угол",

    "dashboard.thresholdLegend":
      "Порог {value}°",

    "dashboard.session":
      "Текущий сеанс",

    "dashboard.totalDeviation":
      "Время отклонений",

    "dashboard.maxAngle":
      "Макс. угол",

    "dashboard.avgReaction":
      "Средняя реакция",

    "dashboard.adherence":
      "Соблюдение",

    "dashboard.threshold":
      "Порог отклонения",

    "dashboard.insight":
      "Умная рекомендация",

    "dashboard.ruleBased":
      "На основе правил",

    "dashboard.insightDefault":
      "Начните демонстрационный сеанс. Рекомендация будет обновляться по измеренным показателям.",

    "dashboard.insightGood":
      "Положение стабильно. Сохраняйте текущую посадку и делайте короткий перерыв после продолжительной работы.",

    "dashboard.insightMixed":
      "Появляются отдельные отклонения. Проверьте высоту экрана и опору поясницы, затем повторите калибровку.",

    "dashboard.insightFrequent":
      "Отклонения повторяются часто. Сделайте паузу, измените посадку и при необходимости обсудите данные со специалистом.",

    "dashboard.insightNote":
      "Это не медицинское заключение.",

    "dashboard.log":
      "Журнал отклонений",

    "dashboard.logText":
      "Время, зона, угол и продолжительность",

    "dashboard.export":
      "Экспорт CSV",

    "dashboard.time": "Время",
    "dashboard.zone": "Зона",
    "dashboard.peak": "Пиковый угол",
    "dashboard.duration": "Длительность",
    "dashboard.result": "Результат",
    "dashboard.corrected": "Исправлено",
    "dashboard.noEvents": "Событий пока нет",

    "footer.note":
      "Исследовательский прототип для мониторинга привычек осанки. Не предназначен для диагностики или лечения.",

    "toast.calibrated":
      "Нейтральное положение откалибровано.",

    "toast.demoStarted":
      "Демонстрационный поток запущен.",

    "toast.demoStopped":
      "Демонстрационный поток остановлен.",

    "toast.noBluetooth":
      "Web Bluetooth недоступен в этом браузере.",

    "toast.bleConnected":
      "Устройство VerteX подключено по BLE.",

    "toast.bleCancelled":
      "Подключение отменено или устройство не найдено.",

    "toast.noEvents":
      "Сначала запишите хотя бы одно отклонение.",

    "toast.exported":
      "CSV-файл подготовлен.",

    "zone.upper": "Верхний отдел",
    "zone.middle": "Средний отдел",
    "zone.lower": "Нижний отдел"
  },
    en: {
    "meta.title": "VerteX — smart posture monitoring",
    "meta.description": "VerteX is a research prototype for wearable posture monitoring with three IMU sensors and real-time feedback.",
    "common.skip": "Skip to content",

    "nav.problem": "Problem",
    "nav.technology": "Technology",
    "nav.research": "Research",
    "nav.product": "Product",
    "nav.business": "Model",
    "nav.dashboard": "Dashboard",

    "hero.eyebrow": "Research prototype · VerteX 2026",
    "hero.title": "Understand posture.<br><span>Change habits.</span>",
    "hero.lead": "VerteX measures three areas of the back, records deviation episodes and helps the user return to a calibrated posture in time.",
    "hero.dashboard": "Open dashboard",
    "hero.research": "View the research",
    "hero.factSensors": "IMU sensors",
    "hero.factThreshold": "research threshold",
    "hero.factDuration": "deviation confirmation",
    "hero.prototype": "Working prototype",
    "hero.liveAngle": "Current angle",
    "hero.liveState": "Status",
    "hero.normal": "Normal",

    "trust.hardwareTitle": "Assembled device",
    "trust.hardwareText": "ESP32 and three MPU6050s",
    "trust.methodTitle": "Testable method",
    "trust.methodText": "Three 15-minute stages",
    "trust.honestTitle": "Transparent status",
    "trust.honestText": "Not a medical device",

    "problem.kicker": "Problem",
    "problem.title": "Deviation begins unnoticed",
    "problem.lead": "During study, a person can gradually change their body position without noticing. A single examination cannot show what happened throughout the day.",
    "problem.card1Title": "No continuous picture",
    "problem.card1Text": "Periodic observations do not show the frequency, duration or timing of episodes.",
    "problem.card2Title": "Feedback arrives late",
    "problem.card2Text": "The user notices an unsuitable position only after remaining in it for a long time.",
    "problem.card3Title": "Progress is hard to measure",
    "problem.card3Text": "Without quantitative data, days and changes in habits cannot be compared objectively.",

    "technology.kicker": "Technology",
    "technology.title": "Three measurement points. One clear picture.",
    "technology.lead": "Sensors compare the current position with a personal calibration. If deviation exceeds the selected threshold for more than one second, the system records an event and activates feedback.",
    "technology.spec1": "Upper, middle and lower areas",
    "technology.spec2": "Sequential I²C channel switching",
    "technology.spec3": "Data processing and wireless communication",
    "technology.spec4": "Feedback used in the current experiment",
    "technology.signalTitle": "Data flow",
    "technology.flow1Title": "Body position",
    "technology.flow1Text": "Three points on the back",
    "technology.flow2Text": "Angles and acceleration",
    "technology.flow3Text": "Filtering and comparison",
    "technology.flow4Title": "Event and signal",
    "technology.flow4Text": "Time and duration logging",

    "research.kicker": "Research",
    "research.title": "Testing a hypothesis, not a promise",
    "research.hypothesis": "Personalized feedback reduces the frequency and duration of deviations from an optimal body position.",
    "research.protocol": "Experimental protocol",
    "research.status": "Pilot study",
    "research.before": "Before feedback",
    "research.beforeText": "The LED is hidden and baseline behaviour is recorded.",
    "research.during": "With feedback",
    "research.duringText": "The LED is visible and activates after a confirmed deviation.",
    "research.after": "After feedback",
    "research.afterText": "The LED is hidden again to evaluate retention of the habit.",
    "research.metric1": "Threshold",
    "research.metric2": "Duration",
    "research.metric3": "Pilot participants",
    "research.metric4": "Metrics",
    "research.metric4Value": "Frequency + time",
    "research.resultKicker": "Results",
    "research.resultTitle": "Space for verified data",
    "research.notSimulated": "No invented figures",
    "research.resultText": "Add the final verified averages from the protocol before publication. The dashboard below uses demonstration data only.",
    "research.limitKicker": "Limitations",
    "research.limitTitle": "What should be stated clearly",
    "research.limit1": "Small pilot sample",
    "research.limit2": "Short controlled sessions",
    "research.limit3": "Individual calibration before testing",
    "research.limit4": "The prototype does not diagnose or replace a clinician",

    "product.photo": "Photograph of the working prototype",
    "product.kicker": "Product",
    "product.title": "A research prototype today. A comfortable wearable next.",
    "product.lead": "The current version validates the sensors, deviation algorithm and LED feedback. The next iteration focuses on compactness, battery life and comfort.",
    "product.item1": "Personal calibration of a neutral position",
    "product.item2": "Simultaneous analysis of three back areas",
    "product.item3": "A precise timestamped log for every episode",
    "product.item4": "Prepared for BLE data transmission",
    "product.now": "Now",
    "product.next": "Next",
    "product.later": "Later",

    "business.kicker": "Proposed model",
    "business.title": "From a device to a monitoring system",
    "business.lead": "This model is intended for validation in future pilots and is not presented as an active clinical service.",
    "business.card1Title": "Devices for organizations",
    "business.card1Text": "Clinics and schools receive devices with instructions, calibration and support.",
    "business.card2Title": "Analytics dashboard",
    "business.card2Text": "Access to trends, deviation episodes and session report exports.",
    "business.card3Title": "Controlled pilot",
    "business.card3Text": "Limited testing with consent, a safety protocol and measurable success criteria.",

    "cta.kicker": "VerteX project",
    "cta.title": "See how sensor data becomes a clear report",
    "cta.button": "Open interactive demo",

    "dashboard.back": "Back to website",
    "dashboard.demo": "Demonstration data",
    "dashboard.kicker": "VerteX Control",
    "dashboard.title": "Posture monitoring",
    "dashboard.subtitle": "Local interactive demo. It is not connected to a medical system.",
    "dashboard.localTime": "Local time",
    "dashboard.device": "Device",
    "dashboard.offline": "Not connected",
    "dashboard.connected": "BLE connected",
    "dashboard.demoConnected": "Demo ready",
    "dashboard.connect": "Connect BLE",
    "dashboard.connecting": "Connecting…",
    "dashboard.calibrate": "Calibrate",
    "dashboard.start": "Start demo",
    "dashboard.stop": "Stop",
    "dashboard.live": "Live posture",
    "dashboard.ready": "Ready to start",
    "dashboard.running": "Session in progress",
    "dashboard.paused": "Session stopped",
    "dashboard.good": "Good posture",
    "dashboard.warning": "Deviation detected",
    "dashboard.goodHint": "All three areas are within the threshold.",
    "dashboard.warningHint": "One of the areas exceeded the selected threshold.",
    "dashboard.upper": "Upper",
    "dashboard.middle": "Middle",
    "dashboard.lower": "Lower",
    "dashboard.chartTitle": "Session deviations",
    "dashboard.chartText": "Maximum angle over time",
    "dashboard.events": "events",
    "dashboard.chartEmpty": "Start the demo to see the data stream",
    "dashboard.angle": "Maximum angle",
    "dashboard.thresholdLegend": "Threshold {value}°",
    "dashboard.session": "Current session",
    "dashboard.totalDeviation": "Deviation time",
    "dashboard.maxAngle": "Maximum angle",
    "dashboard.avgReaction": "Average reaction",
    "dashboard.adherence": "Adherence",
    "dashboard.threshold": "Deviation threshold",
    "dashboard.insight": "Smart recommendation",
    "dashboard.ruleBased": "Rule-based",
    "dashboard.insightDefault": "Start a demonstration session. The recommendation will update using the measured indicators.",
    "dashboard.insightGood": "Posture is stable. Maintain the current position and take a short break after prolonged work.",
    "dashboard.insightMixed": "Occasional deviations are appearing. Check screen height and lumbar support, then recalibrate.",
    "dashboard.insightFrequent": "Deviations are repeating frequently. Take a break, adjust your position and discuss the data with a specialist if needed.",
    "dashboard.insightNote": "This is not medical advice.",
    "dashboard.log": "Deviation log",
    "dashboard.logText": "Time, area, angle and duration",
    "dashboard.export": "Export CSV",
    "dashboard.time": "Time",
    "dashboard.zone": "Area",
    "dashboard.peak": "Peak angle",
    "dashboard.duration": "Duration",
    "dashboard.result": "Result",
    "dashboard.corrected": "Corrected",
    "dashboard.noEvents": "No events yet",

    "footer.note": "Research prototype for monitoring posture habits. Not intended for diagnosis or treatment.",

    "toast.calibrated": "Neutral position calibrated.",
    "toast.demoStarted": "Demonstration stream started.",
    "toast.demoStopped": "Demonstration stream stopped.",
    "toast.noBluetooth": "Web Bluetooth is not available in this browser.",
    "toast.bleConnected": "VerteX device connected over BLE.",
    "toast.bleCancelled": "Connection cancelled or device not found.",
    "toast.noEvents": "Record at least one deviation first.",
    "toast.exported": "CSV file prepared.",

    "zone.upper": "Upper back",
    "zone.middle": "Middle back",
    "zone.lower": "Lower back"
  },

  kk: {
    "meta.title": "VerteX — дене қалпын ақылды бақылау",
    "meta.description": "VerteX — үш IMU датчигі және нақты уақыттағы кері байланысы бар дене қалпын бақылауға арналған зерттеу прототипі.",
    "common.skip": "Негізгі мазмұнға өту",

    "nav.problem": "Мәселе",
    "nav.technology": "Технология",
    "nav.research": "Зерттеу",
    "nav.product": "Өнім",
    "nav.business": "Модель",
    "nav.dashboard": "Бақылау панелі",

    "hero.eyebrow": "Зерттеу прототипі · VerteX 2026",
    "hero.title": "Дене қалпын түсініңіз.<br><span>Әдетті өзгертіңіз.</span>",
    "hero.lead": "VerteX арқаның үш аймағының қалпын өлшейді, ауытқу эпизодтарын тіркейді және пайдаланушыға калибрленген қалыпқа уақытында оралуға көмектеседі.",
    "hero.dashboard": "Бақылау панелін ашу",
    "hero.research": "Зерттеуді көру",
    "hero.factSensors": "IMU датчигі",
    "hero.factThreshold": "зерттеу шегі",
    "hero.factDuration": "ауытқуды растау",
    "hero.prototype": "Жұмыс істейтін прототип",
    "hero.liveAngle": "Қазіргі бұрыш",
    "hero.liveState": "Күйі",
    "hero.normal": "Қалыпты",

    "trust.hardwareTitle": "Жиналған құрылғы",
    "trust.hardwareText": "ESP32 және үш MPU6050",
    "trust.methodTitle": "Тексерілетін әдіс",
    "trust.methodText": "15 минуттан үш кезең",
    "trust.honestTitle": "Ашық мәртебе",
    "trust.honestText": "Медициналық құрылғы емес",

    "problem.kicker": "Мәселе",
    "problem.title": "Ауытқу байқалмай басталады",
    "problem.lead": "Оқу кезінде адам дене қалпын біртіндеп өзгертіп, оны байқамауы мүмкін. Бір реттік тексеру күні бойы не болғанын көрсетпейді.",
    "problem.card1Title": "Үздіксіз көрініс жоқ",
    "problem.card1Text": "Мерзімді бақылау эпизодтардың жиілігін, ұзақтығын және уақытын көрсетпейді.",
    "problem.card2Title": "Кері байланыс кешігеді",
    "problem.card2Text": "Пайдаланушы қолайсыз қалыпта ұзақ отырғаннан кейін ғана оны байқайды.",
    "problem.card3Title": "Прогресті өлшеу қиын",
    "problem.card3Text": "Сандық деректерсіз күндерді және әдет өзгерісін объективті салыстыру мүмкін емес.",

    "technology.kicker": "Технология",
    "technology.title": "Үш өлшеу нүктесі. Бір түсінікті көрініс.",
    "technology.lead": "Датчиктер ағымдағы қалыпты жеке калибрлеумен салыстырады. Ауытқу таңдалған шектен бір секундтан ұзақ асса, жүйе оқиғаны тіркеп, кері байланысты іске қосады.",
    "technology.spec1": "Жоғарғы, ортаңғы және төменгі аймақтар",
    "technology.spec2": "I²C арналарын кезекпен ауыстыру",
    "technology.spec3": "Деректерді өңдеу және сымсыз байланыс",
    "technology.spec4": "Қазіргі тәжірибедегі кері байланыс",
    "technology.signalTitle": "Деректер ағыны",
    "technology.flow1Title": "Дене қалпы",
    "technology.flow1Text": "Арқаның үш нүктесі",
    "technology.flow2Text": "Бұрыштар мен үдеу",
    "technology.flow3Text": "Сүзу және салыстыру",
    "technology.flow4Title": "Оқиға және белгі",
    "technology.flow4Text": "Уақыт пен ұзақтықты тіркеу",

    "research.kicker": "Зерттеу",
    "research.title": "Уәдені емес, гипотезаны тексереміз",
    "research.hypothesis": "Жекелендірілген кері байланыс оңтайлы дене қалпынан ауытқудың жиілігі мен ұзақтығын азайтады.",
    "research.protocol": "Эксперименттік хаттама",
    "research.status": "Пилоттық зерттеу",
    "research.before": "Кері байланысқа дейін",
    "research.beforeText": "LED жасырын, бастапқы әрекет тіркеледі.",
    "research.during": "Кері байланыспен",
    "research.duringText": "LED көрінеді және расталған ауытқу кезінде жанады.",
    "research.after": "Кері байланыстан кейін",
    "research.afterText": "Әдеттің сақталуын бағалау үшін LED қайта жасырылды.",
    "research.metric1": "Шек",
    "research.metric2": "Ұзақтығы",
    "research.metric3": "Пилот қатысушылары",
    "research.metric4": "Көрсеткіштер",
    "research.metric4Value": "Жиілік + уақыт",
    "research.resultKicker": "Нәтижелер",
    "research.resultTitle": "Расталған деректерге арналған орын",
    "research.notSimulated": "Ойдан шығарылған сандарсыз",
    "research.resultText": "Жарияламас бұрын хаттамадағы тексерілген орташа мәндерді осында енгізіңіз. Төмендегі панель тек демонстрациялық деректерді пайдаланады.",
    "research.limitKicker": "Шектеулер",
    "research.limitTitle": "Нені ашық көрсету маңызды",
    "research.limit1": "Пилоттық іріктеме шағын",
    "research.limit2": "Қысқа бақыланатын сессиялар",
    "research.limit3": "Тест алдында жеке калибрлеу",
    "research.limit4": "Прототип диагноз қоймайды және дәрігерді алмастырмайды",

    "product.photo": "Жұмыс істейтін прототиптің фотосы",
    "product.kicker": "Өнім",
    "product.title": "Қазір — зерттеу прототипі. Келесі қадам — ыңғайлы тағылатын құрылғы.",
    "product.lead": "Қазіргі нұсқа датчиктерді, ауытқу алгоритмін және жарық кері байланысын тексереді. Келесі итерация ықшамдылыққа, автономдылыққа және жайлылыққа бағытталған.",
    "product.item1": "Бейтарап қалыпты жеке калибрлеу",
    "product.item2": "Арқаның үш аймағын қатар талдау",
    "product.item3": "Әр эпизодты нақты уақытымен тіркеу",
    "product.item4": "BLE арқылы дерек беруге дайындау",
    "product.now": "Қазір",
    "product.next": "Келесі",
    "product.later": "Кейін",

    "business.kicker": "Ұсынылатын модель",
    "business.title": "Құрылғыдан бақылау жүйесіне дейін",
    "business.lead": "Бұл модель болашақ пилоттарда тексеруге арналған және жұмыс істеп тұрған клиникалық сервис ретінде ұсынылмайды.",
    "business.card1Title": "Ұйымдарға арналған құрылғылар",
    "business.card1Text": "Клиникалар мен мектептер құрылғыларды нұсқаулықпен, калибрлеумен және қызмет көрсетумен алады.",
    "business.card2Title": "Аналитикалық панель",
    "business.card2Text": "Динамикаға, ауытқу эпизодтарына және сессия есептерін жүктеуге қолжетімділік.",
    "business.card3Title": "Бақыланатын пилот",
    "business.card3Text": "Келісіммен, қауіпсіздік хаттамасымен және өлшенетін критерийлермен шектеулі тестілеу.",

    "cta.kicker": "VerteX жобасы",
    "cta.title": "Деректердің түсінікті есепке қалай айналатынын көріңіз",
    "cta.button": "Интерактивті демоны ашу",

    "dashboard.back": "Сайтқа оралу",
    "dashboard.demo": "Демонстрациялық деректер",
    "dashboard.kicker": "VerteX Control",
    "dashboard.title": "Дене қалпын бақылау",
    "dashboard.subtitle": "Жергілікті интерактивті демо. Медициналық жүйеге қосылмаған.",
    "dashboard.localTime": "Жергілікті уақыт",
    "dashboard.device": "Құрылғы",
    "dashboard.offline": "Қосылмаған",
    "dashboard.connected": "BLE қосылды",
    "dashboard.demoConnected": "Демо дайын",
    "dashboard.connect": "BLE қосу",
    "dashboard.connecting": "Қосылуда…",
    "dashboard.calibrate": "Калибрлеу",
    "dashboard.start": "Демоны бастау",
    "dashboard.stop": "Тоқтату",
    "dashboard.live": "Нақты уақыттағы қалып",
    "dashboard.ready": "Іске қосуға дайын",
    "dashboard.running": "Сессия орындалуда",
    "dashboard.paused": "Сессия тоқтатылды",
    "dashboard.good": "Қалып жақсы",
    "dashboard.warning": "Ауытқу анықталды",
    "dashboard.goodHint": "Үш аймақ та шек ішінде.",
    "dashboard.warningHint": "Аймақтардың бірі таңдалған шектен асты.",
    "dashboard.upper": "Жоғарғы",
    "dashboard.middle": "Ортаңғы",
    "dashboard.lower": "Төменгі",
    "dashboard.chartTitle": "Сессиядағы ауытқулар",
    "dashboard.chartText": "Уақыт бойынша ең үлкен бұрыш",
    "dashboard.events": "оқиға",
    "dashboard.chartEmpty": "Деректер ағынын көру үшін демоны бастаңыз",
    "dashboard.angle": "Ең үлкен бұрыш",
    "dashboard.thresholdLegend": "Шек {value}°",
    "dashboard.session": "Ағымдағы сессия",
    "dashboard.totalDeviation": "Ауытқу уақыты",
    "dashboard.maxAngle": "Ең үлкен бұрыш",
    "dashboard.avgReaction": "Орташа реакция",
    "dashboard.adherence": "Сәйкестік",
    "dashboard.threshold": "Ауытқу шегі",
    "dashboard.insight": "Ақылды ұсыныс",
    "dashboard.ruleBased": "Ережелер негізінде",
    "dashboard.insightDefault": "Демонстрациялық сессияны бастаңыз. Ұсыныс өлшенген көрсеткіштер бойынша жаңартылады.",
    "dashboard.insightGood": "Қалып тұрақты. Қазіргі отырысты сақтап, ұзақ жұмыстан кейін қысқа үзіліс жасаңыз.",
    "dashboard.insightMixed": "Жекелеген ауытқулар байқалады. Экран биіктігі мен бел тірегін тексеріп, қайта калибрлеңіз.",
    "dashboard.insightFrequent": "Ауытқулар жиі қайталануда. Үзіліс жасап, отырысты өзгертіңіз және қажет болса деректерді маманмен талқылаңыз.",
    "dashboard.insightNote": "Бұл медициналық қорытынды емес.",
    "dashboard.log": "Ауытқулар журналы",
    "dashboard.logText": "Уақыты, аймағы, бұрышы және ұзақтығы",
    "dashboard.export": "CSV жүктеу",
    "dashboard.time": "Уақыт",
    "dashboard.zone": "Аймақ",
    "dashboard.peak": "Ең үлкен бұрыш",
    "dashboard.duration": "Ұзақтығы",
    "dashboard.result": "Нәтиже",
    "dashboard.corrected": "Түзетілді",
    "dashboard.noEvents": "Әзірге оқиға жоқ",

    "footer.note": "Дене қалпы әдеттерін бақылауға арналған зерттеу прототипі. Диагноз қоюға немесе емдеуге арналмаған.",

    "toast.calibrated": "Бейтарап қалып калибрленді.",
    "toast.demoStarted": "Демонстрациялық ағын іске қосылды.",
    "toast.demoStopped": "Демонстрациялық ағын тоқтатылды.",
    "toast.noBluetooth": "Бұл браузерде Web Bluetooth қолжетімсіз.",
    "toast.bleConnected": "VerteX құрылғысы BLE арқылы қосылды.",
    "toast.bleCancelled": "Қосылу тоқтатылды немесе құрылғы табылмады.",
    "toast.noEvents": "Алдымен кемінде бір ауытқуды тіркеңіз.",
    "toast.exported": "CSV файлы дайындалды.",

    "zone.upper": "Жоғарғы аймақ",
    "zone.middle": "Ортаңғы аймақ",
    "zone.lower": "Төменгі аймақ"
  }
};
const state = {
  language: "ru",
  monitoring: false,
  connected: false,
  demoReady: false,

  sessionSeconds: 0,
  deviationSeconds: 0,
  threshold: 10,

  angles: {
    upper: 4.1,
    middle: 6.3,
    lower: 3.8
  },

  points: [],
  events: [],
  maxAngle: 0,
  deviationActive: null,

  burst: null,
  tick: 0,
  timer: null,

  source: "demo", sessionId: 0,
  bleControl: null, commandSeq: 0, pendingCommand: null, lastDeviceTick: null, lastSeq: null, lastReceivedAt: 0, lastValid: false, bleWatchdog: null, deviceSettings: null,
  bleDevice: null,
  bleCharacteristic: null
};


const elements = {
  header: document.querySelector("#siteHeader"),
  landing: document.querySelector("#landingView"),
  dashboard: document.querySelector("#dashboardView"),
  footer: document.querySelector("#siteFooter"),

  nav: document.querySelector("#primaryNav"),
  navToggle: document.querySelector("#navToggle"),

  dashboardTitle: document.querySelector("#dashboardTitle"),
  dashboardClock: document.querySelector("#dashboardClock"),

  deviceSelect: document.querySelector("#deviceSelect"),
  connectionState: document.querySelector("#connectionState"),
  connectButton: document.querySelector("#connectButton"),
  calibrateButton: document.querySelector("#calibrateButton"),
  monitorButton: document.querySelector("#monitorButton"),

  sessionStatus: document.querySelector("#sessionStatus"),

  scoreRing: document.querySelector("#scoreRing"),
  postureScore: document.querySelector("#postureScore"),
  postureState: document.querySelector("#postureState"),
  postureHint: document.querySelector("#postureHint"),

  upperAngle: document.querySelector("#upperAngle"),
  middleAngle: document.querySelector("#middleAngle"),
  lowerAngle: document.querySelector("#lowerAngle"),

  upperBar: document.querySelector("#upperBar"),
  middleBar: document.querySelector("#middleBar"),
  lowerBar: document.querySelector("#lowerBar"),

  eventCount: document.querySelector("#eventCount"),

  canvas: document.querySelector("#sessionChart"),
  chartEmpty: document.querySelector("#chartEmpty"),
  thresholdLegend: document.querySelector("#thresholdLegend"),

  sessionTimer: document.querySelector("#sessionTimer"),
  deviationTime: document.querySelector("#deviationTime"),
  maxAngle: document.querySelector("#maxAngle"),
  reactionTime: document.querySelector("#reactionTime"),
  adherence: document.querySelector("#adherence"),

  thresholdRange: document.querySelector("#thresholdRange"),
  thresholdOutput: document.querySelector("#thresholdOutput"),

  insightText: document.querySelector("#insightText"),
  eventTableBody: document.querySelector("#eventTableBody"),
  exportButton: document.querySelector("#exportButton"),

  heroAngle: document.querySelector("#heroAngle")
};


/* =========================================================
   ПЕРЕВОДЫ
========================================================= */

function t(key, replacements = {}) {
  let value =
    translations[state.language]?.[key] ??
    translations.ru[key] ??
    key;

  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replace(
      `{${name}}`,
      String(replacement)
    );
  });

  return value;
}


function setLanguage(language) {
  if (!translations[language]) return;

  state.language = language;
  document.documentElement.lang = language;

  document.title = t("meta.title");

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      t("meta.description")
    );

  document
    .querySelectorAll("[data-i18n]")
    .forEach((node) => {
      const key = node.dataset.i18n;

      if (translations[language][key]) {
        node.textContent =
          translations[language][key];
      }
    });

  document
    .querySelectorAll("[data-i18n-html]")
    .forEach((node) => {
      const key = node.dataset.i18nHtml;

      if (translations[language][key]) {
        node.innerHTML =
          translations[language][key];
      }
    });

  document
    .querySelectorAll(".lang-btn")
    .forEach((button) => {
      const active =
        button.dataset.lang === language;

      button.classList.toggle(
        "active",
        active
      );

      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

  try {
    localStorage.setItem(
      "vertex-language",
      language
    );
  } catch (error) {
    console.info(
      "Язык не удалось сохранить:",
      error
    );
  }

  refreshDynamicText();
  renderEventTable();
  drawChart();
}


function refreshDynamicText() {
  const liveLabel = state.source === "ble" ? (state.connected ? "Данные устройства · BLE" : "Сеанс устройства · отключено") : "Демонстрационные данные";
  document.getElementById("liveSource").textContent = liveLabel;
  const badge = document.querySelector("#sourceBadge [data-i18n]");
  if(badge){badge.removeAttribute("data-i18n");badge.textContent=liveLabel;}else {const label=document.querySelector("#sourceBadge span");if(label)label.textContent=liveLabel;}
  elements.monitorButton.textContent =
    state.monitoring
      ? t("dashboard.stop")
      : (state.source === "ble" ? "Запустить устройство" : t("dashboard.start"));

  elements.sessionStatus.textContent =
    state.monitoring
      ? t("dashboard.running")
      : state.sessionSeconds > 0
        ? t("dashboard.paused")
        : t("dashboard.ready");

  const connectionText =
    elements.connectionState.querySelector("span");

  if (state.connected) {
    connectionText.textContent =
      t("dashboard.connected");
  } else if (state.demoReady) {
    connectionText.textContent =
      t("dashboard.demoConnected");
  } else {
    connectionText.textContent =
      t("dashboard.offline");
  }

  elements.connectButton.textContent =
    t("dashboard.connect");

  elements.thresholdLegend.textContent =
    t("dashboard.thresholdLegend", {
      value: state.threshold
    });

  updateInsight();
}


/* =========================================================
   НАВИГАЦИЯ
========================================================= */

function route() {
  const showDashboard =
    window.location.hash === "#dashboard";

  elements.landing.hidden = showDashboard;
  elements.dashboard.hidden = !showDashboard;
  elements.footer.hidden = showDashboard;

  document.body.classList.toggle(
    "dashboard-open",
    showDashboard
  );

  document
    .querySelectorAll(".primary-nav a")
    .forEach((link) => {
      const active =
        showDashboard &&
        link.getAttribute("href") === "#dashboard";

      link.classList.toggle(
        "active",
        active
      );
    });

  closeNavigation();

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  if (showDashboard) {
    window.setTimeout(drawChart, 80);
  }
}


function closeNavigation() {
  elements.nav.classList.remove("open");

  elements.navToggle.setAttribute(
    "aria-expanded",
    "false"
  );
}


function setupNavigation() {
  elements.navToggle.addEventListener(
    "click",
    () => {
      const open =
        elements.nav.classList.toggle("open");

      elements.navToggle.setAttribute(
        "aria-expanded",
        String(open)
      );
    }
  );

  elements.nav.addEventListener(
    "click",
    (event) => {
      if (event.target.closest("a")) {
        closeNavigation();
      }
    }
  );

  window.addEventListener(
    "hashchange",
    route
  );

  window.addEventListener(
    "scroll",
    () => {
      elements.header.classList.toggle(
        "scrolled",
        window.scrollY > 15
      );
    },
    {
      passive: true
    }
  );
}


/* =========================================================
   АНИМАЦИИ
========================================================= */

function setupRevealAnimations() {
  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (
    !("IntersectionObserver" in window) ||
    reducedMotion
  ) {
    document
      .querySelectorAll(".reveal")
      .forEach((node) => {
        node.classList.add("visible");
      });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px"
      }
    );

  document
    .querySelectorAll(".reveal")
    .forEach((node) => {
      observer.observe(node);
    });
}


/* =========================================================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================================================= */

function formatDuration(totalSeconds) {
  const minutes = Math
    .floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");

  const seconds = Math
    .floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}


function updateClock() {
  elements.dashboardClock.textContent =
    new Intl.DateTimeFormat(
      state.language,
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }
    ).format(new Date());
}


function clamp(
  value,
  minimum,
  maximum
) {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}


function randomBetween(
  minimum,
  maximum
) {
  return (
    minimum +
    Math.random() *
    (maximum - minimum)
  );
}


/* =========================================================
   СИМУЛЯЦИЯ ДАТЧИКОВ
========================================================= */

function generateDemoAngles() {
  state.tick += 1;

  /*
    Иногда создаём искусственное отклонение.
    Оно длится от 3 до 8 секунд.
  */

  if (
    !state.burst &&
    state.tick > 4 &&
    Math.random() < 0.13
  ) {
    state.burst = {
      zone: [
        "upper",
        "middle",
        "lower"
      ][Math.floor(Math.random() * 3)],

      remaining: Math.floor(
        randomBetween(3, 8)
      ),

      peak: randomBetween(
        state.threshold + 2.5,
        Math.min(
          24,
          state.threshold + 10
        )
      )
    };
  }

  const next = {
    upper: clamp(
      state.angles.upper +
        randomBetween(-1.8, 1.6),
      1.2,
      8.8
    ),

    middle: clamp(
      state.angles.middle +
        randomBetween(-1.7, 1.7),
      1.5,
      9.2
    ),

    lower: clamp(
      state.angles.lower +
        randomBetween(-1.5, 1.5),
      1.1,
      8.5
    )
  };

  if (state.burst) {
    next[state.burst.zone] = clamp(
      state.burst.peak +
        randomBetween(-1.5, 1.4),

      state.threshold + 1.2,
      25
    );

    state.burst.remaining -= 1;

    if (state.burst.remaining <= 0) {
      state.burst = null;
    }
  }

  return next;
}


/* =========================================================
   ОБРАБОТКА ПОКАЗАНИЙ
========================================================= */

function processReading(
  reading,
  source = "demo",
  elapsedSeconds = 1
) {
  const clean = {
    upper: clamp(
      Number(reading.upper) || 0,
      0,
      90
    ),

    middle: clamp(
      Number(reading.middle) || 0,
      0,
      90
    ),

    lower: clamp(
      Number(reading.lower) || 0,
      0,
      90
    )
  };

  state.angles = clean;

  const zoneEntries = source === "ble" && reading.deviationMask
    ? Object.entries(clean).filter((_,i)=>reading.deviationMask & (1<<i))
    : Object.entries(clean);

  const [peakZone, peakAngle] =
    zoneEntries.reduce(
      (largest, item) =>
        item[1] > largest[1]
          ? item
          : largest
    );

  state.maxAngle = Math.max(state.maxAngle, ...Object.values(clean));

  state.points.push({
    second: state.sessionSeconds,
    angle: peakAngle
  });

  if (state.points.length > 120) {
    state.points.shift();
  }

  const deviating = source === "ble" ? Boolean(reading.deviationMask) : peakAngle > state.threshold;

  if (deviating) {
    state.deviationSeconds += elapsedSeconds;

    if (!state.deviationActive) {
      state.deviationActive = {
        startedAt: new Date(),
        startSecond:
          state.sessionSeconds,
        zone: peakZone,
        peak: peakAngle,
        source
      };
    } else if (
      peakAngle >
      state.deviationActive.peak
    ) {
      state.deviationActive.peak =
        peakAngle;

      state.deviationActive.zone =
        peakZone;
    }
  } else if (state.deviationActive) {
    finalizeDeviation();
  }

  updateDashboard(deviating);
  drawChart();
}


/* =========================================================
   ЗАВЕРШЕНИЕ ОТКЛОНЕНИЯ
========================================================= */

function finalizeDeviation(endReason = "corrected") {
  if (!state.deviationActive) {
    return;
  }

  const duration = Math.max(
    1,
    state.sessionSeconds -
      state.deviationActive.startSecond
  );

  if (duration >= 1) {
    state.events.unshift({
      time:
        state.deviationActive.startedAt,

      zone:
        state.deviationActive.zone,

      peak:
        state.deviationActive.peak,

      duration: Math.round(duration * 10) / 10,
      endReason,

      source:
        state.deviationActive.source
    });
    state.events = state.events.slice(0, 1000);
  }

  state.deviationActive = null;

  renderEventTable();
}


/* =========================================================
   ОБНОВЛЕНИЕ ДАШБОРДА
========================================================= */

function updateDashboard(
  deviating = false
) {
  const {
    upper,
    middle,
    lower
  } = state.angles;

  const peak = Math.max(
    upper,
    middle,
    lower
  );

  const score = clamp(
    Math.round(
      100 -
      peak * 2.6 -
      state.events.length * 1.2
    ),
    0,
    100
  );

  const adherence =
    state.sessionSeconds > 0
      ? clamp(
          Math.round(
            100 -
            (
              state.deviationSeconds /
              state.sessionSeconds
            ) * 100
          ),
          0,
          100
        )
      : 100;

  elements.upperAngle.textContent =
    `${upper.toFixed(1)}°`;

  elements.middleAngle.textContent =
    `${middle.toFixed(1)}°`;

  elements.lowerAngle.textContent =
    `${lower.toFixed(1)}°`;

  updateSensorBar(
    elements.upperBar,
    upper
  );

  updateSensorBar(
    elements.middleBar,
    middle
  );

  updateSensorBar(
    elements.lowerBar,
    lower
  );

  elements.postureScore.textContent =
    String(score);

  elements.scoreRing.style.setProperty(
    "--score",
    score
  );

  elements.postureState.textContent =
    t(
      deviating
        ? "dashboard.warning"
        : "dashboard.good"
    );

  elements.postureHint.textContent =
    t(
      deviating
        ? "dashboard.warningHint"
        : "dashboard.goodHint"
    );

  elements.postureState.classList.toggle(
    "good",
    !deviating
  );

  elements.postureState.classList.toggle(
    "warning",
    deviating
  );

  elements.eventCount.textContent =
    String(
      state.events.length +
      (state.deviationActive ? 1 : 0)
    );

  elements.sessionTimer.textContent =
    formatDuration(
      state.sessionSeconds
    );

  elements.deviationTime.textContent =
    formatDuration(
      state.deviationSeconds
    );

  elements.maxAngle.textContent =
    `${state.maxAngle.toFixed(1)}°`;

  elements.adherence.textContent =
    `${adherence}%`;

  const durations =
    state.events.map(
      (event) => event.duration
    );

  if (durations.length > 0) {
    const totalDuration =
      durations.reduce(
        (sum, duration) =>
          sum + duration,
        0
      );

    elements.reactionTime.textContent =
      `${
        (
          totalDuration /
          durations.length
        ).toFixed(1)
      } s`;
  } else {
    elements.reactionTime.textContent =
      "—";
  }

  updateInsight();
}


function updateSensorBar(
  element,
  angle
) {
  const width = clamp(
    (angle / 25) * 100,
    2,
    100
  );

  element.style.width =
    `${width}%`;

  element.classList.toggle(
    "warning",
    angle > state.threshold
  );
}


/* =========================================================
   РЕКОМЕНДАЦИИ
========================================================= */

function updateInsight() {
  let key =
    "dashboard.insightDefault";

  if (
    state.sessionSeconds > 0 &&
    state.events.length < 2
  ) {
    key =
      "dashboard.insightGood";
  }

  if (state.events.length >= 2) {
    key =
      "dashboard.insightMixed";
  }

  if (
    state.events.length >= 5 ||
    state.deviationSeconds > 25
  ) {
    key =
      "dashboard.insightFrequent";
  }

  elements.insightText.textContent =
    t(key);
}


/* =========================================================
   ТАБЛИЦА ОТКЛОНЕНИЙ
========================================================= */

function renderEventTable() {
  if (!state.events.length) {
    elements.eventTableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="5">
          ${escapeHtml(
            t("dashboard.noEvents")
          )}
        </td>
      </tr>
    `;

    elements.exportButton.disabled =
      true;

    return;
  }

  elements.exportButton.disabled =
    false;

  elements.eventTableBody.innerHTML =
    state.events
      .slice(0, 12)
      .map((event) => {
        const time =
          new Intl.DateTimeFormat(
            state.language,
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            }
          ).format(event.time);

        return `
          <tr>
            <td>
              ${escapeHtml(time)}
            </td>

            <td>
              ${escapeHtml(
                t(`zone.${event.zone}`)
              )}
            </td>

            <td>
              ${event.peak.toFixed(1)}°
            </td>

            <td>
              ${event.duration} s
            </td>

            <td>
              <span class="event-status">
                ${escapeHtml(
                  (event.endReason === "interrupted" ? "Сеанс прерван" : t("dashboard.corrected"))
                )}
              </span>
            </td>
          </tr>
        `;
      })
      .join("");
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   ЗАПУСК ДЕМОНСТРАЦИИ
========================================================= */

function simulationTick() {
  state.sessionSeconds += 1;

  processReading(
    generateDemoAngles(),
    "demo"
  );
}


function toggleMonitoring() {
  if(state.source === "ble") {
    if(!state.connected){showToast("Подключите устройство или выберите Demo simulator.",true);return;}
    deviceAction(state.monitoring?VertexBLE.ops.STOP:VertexBLE.ops.START);return;
  }
  state.monitoring =
    !state.monitoring;

  elements.monitorButton.classList.toggle(
    "running",
    state.monitoring
  );

  if (state.monitoring) {
    state.demoReady = true;

    elements.connectionState.classList.add(
      "connected"
    );

    elements.chartEmpty.classList.add(
      "hidden"
    );

    state.timer =
      window.setInterval(
        simulationTick,
        1000
      );

    showToast(
      t("toast.demoStarted")
    );
  } else {
    window.clearInterval(
      state.timer
    );

    state.timer = null;

    finalizeDeviation();

    showToast(
      t("toast.demoStopped")
    );
  }

  refreshDynamicText();
}


/* =========================================================
   КАЛИБРОВКА
========================================================= */

function calibrate() {
  if(state.source === "ble") {deviceAction(VertexBLE.ops.CAL);return;}
  state.angles = {
    upper: 0,
    middle: 0,
    lower: 0
  };

  state.burst = null;

  updateDashboard(false);

  showToast(
    t("toast.calibrated")
  );
}


/* =========================================================
   BLUETOOTH LOW ENERGY
========================================================= */

async function connectBluetooth() {
  if (!navigator.bluetooth || !window.isSecureContext) {
    showToast('Для BLE откройте HTTPS-сайт в Chrome на Windows или Android. На iPhone прямое подключение недоступно.', true);return;
  }
  if(state.connected)return;
  elements.connectButton.disabled=true;
  let device;
  try {
    device=await navigator.bluetooth.requestDevice({filters:[{namePrefix:'VerteX'}],optionalServices:[VertexBLE.service]});
    const server=await device.gatt.connect();
    const service=await server.getPrimaryService(VertexBLE.service);
    const data=await service.getCharacteristic(VertexBLE.telemetry);
    const control=await service.getCharacteristic(VertexBLE.control);
    // Stop simulation before accepting any real telemetry.
    window.clearInterval(state.timer);state.timer=null;resetVertexSession('ble');
    state.bleDevice=device;state.bleCharacteristic=data;state.bleControl=control;state.connected=true;state.demoReady=false;
    device.addEventListener('gattserverdisconnected',handleBluetoothDisconnect);
    data.addEventListener('characteristicvaluechanged',handleBluetoothReading);
    control.addEventListener('characteristicvaluechanged',handleBluetoothReading);
    await data.startNotifications();await control.startNotifications();
    await sendDeviceCommand(VertexBLE.ops.GET);
    state.lastReceivedAt=Date.now();
    setDeviceControls(true);
    elements.connectionState.classList.add('connected');
    document.getElementById('deviceStatus').textContent='VerteX подключён. Настройки прочитаны. Перед стартом выполните калибровку в нейтральной позе.';
    state.bleWatchdog=window.setInterval(()=>{
      if(state.connected&&state.lastReceivedAt&&Date.now()-state.lastReceivedAt>3500){
        document.getElementById('deviceStatus').textContent='Поток данных прервался. Проверьте питание и соединение.';
        state.bleDevice?.gatt.disconnect();
      }
    },1000);
  }catch(error){device?.gatt?.disconnect();handleBluetoothDisconnect();showToast(`Не удалось подключить VerteX: ${error.message}`,true);}
  finally{elements.connectButton.disabled=false;refreshDynamicText();}
}

function resetVertexSession(source){
  state.sessionId++;state.source=source;state.monitoring=false;state.sessionSeconds=0;state.deviationSeconds=0;state.maxAngle=0;state.events=[];state.points=[];state.deviationActive=null;state.lastDeviceTick=null;state.lastReceivedAt=0;state.lastSeq=null;state.lastValid=false;
  state.angles={upper:0,middle:0,lower:0};renderEventTable();updateDashboard(false);drawChart();
  document.getElementById('aiResult').textContent='Новый сеанс. Здесь появится его анализ.';
  document.getElementById('aiResult').classList.remove('has-report');
}
function setDeviceControls(enabled){
  document.getElementById('deviceSettingsFields').disabled=!enabled;
  for(const id of ['disconnectDevice','readSettings','deviceStop'])document.getElementById(id).disabled=!enabled;
  elements.thresholdRange.disabled=enabled;
  elements.deviceSelect.disabled=enabled;
}
function fillDeviceSettings(c){
  state.deviceSettings=c;
  ['thresholdUpper','thresholdMiddle','thresholdLower'].forEach((id,i)=>document.getElementById(id).value=c.thresholds[i]);
  document.getElementById('deviceDelay').value=c.delayMs;document.getElementById('vibrationOn').value=c.onMs;document.getElementById('vibrationOff').value=c.offMs;document.getElementById('deviceFeedback').checked=c.feedback;
  state.threshold=Math.min(...c.thresholds);
  elements.thresholdOutput.textContent=c.thresholds.map(n=>`${n}°`).join(' / ');
  document.getElementById('confirmedSettings').textContent=`Подтверждено ESP32: пороги ${c.thresholds.join(' / ')}°; задержка ${c.delayMs} мс; вибрация ${c.onMs} мс, пауза ${c.offMs} мс; напоминания ${c.feedback?'включены':'выключены'}. Линия на графике — минимальный из трёх порогов.`;
  refreshDynamicText();drawChart();
}
function sendDeviceCommand(op,settings){
  if(!state.connected||!state.bleControl)return Promise.reject(Error('Устройство не подключено.'));
  if(state.pendingCommand)return Promise.reject(Error('Дождитесь подтверждения предыдущей команды.'));
  const seq=state.commandSeq=(state.commandSeq+1)&65535;
  let bytes;try{bytes=VertexBLE.command(op,seq,settings);}catch(e){return Promise.reject(e);}
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{state.pendingCommand=null;reject(Error('ESP32 не подтвердил команду. Прочитайте настройки заново.'));},6000);
    state.pendingCommand={seq,resolve,reject,timer};
    state.bleControl.writeValueWithResponse(bytes).catch(error=>{
      if(state.pendingCommand?.seq===seq){clearTimeout(timer);state.pendingCommand=null;reject(error);}
    });
  });
}
async function deviceAction(op,settings){
  try{await sendDeviceCommand(op,settings);document.getElementById('deviceStatus').textContent=op===VertexBLE.ops.CAL?'Калибровка запущена: 5 секунд на подготовку, затем около 3 секунд неподвижно.':'Команда выполнена и подтверждена устройством.';}
  catch(e){document.getElementById('deviceStatus').textContent=e.message;showToast(e.message,true);}
}
function handleBluetoothReading(event){
  try{
    const r=VertexBLE.decode(event.target.value);
    if(r.type===2){
      const p=state.pendingCommand;if(!p||p.seq!==r.seq)return;
      clearTimeout(p.timer);state.pendingCommand=null;
      if(r.status!==0){p.reject(Error('Устройство отклонило команду: проверьте калибровку, датчики и диапазоны.'));return;}
      fillDeviceSettings(r.settings);p.resolve(r);return;
    }
    if(!state.connected)return;
    if(state.lastSeq!==null){const diff=(r.seq-state.lastSeq+65536)%65536;if(diff===0||diff>32768)return;}
    state.lastSeq=r.seq;state.lastReceivedAt=Date.now();
    const delta=state.lastDeviceTick===null?0:((r.tickMs-state.lastDeviceTick)>>>0)/1000;
    state.lastDeviceTick=r.tickMs;
    const elapsed=delta<=2?delta:0; // gaps are not silently counted as good posture
    if(delta>2&&state.deviationActive)finalizeDeviation('interrupted');
    const wasMonitoring=state.monitoring;const measurementValid=r.calibrated&&r.validMask===7&&!r.fault&&!r.calibrating&&!r.testing;
    const countedElapsed=measurementValid&&state.lastValid?elapsed:0;
    state.lastValid=measurementValid;state.monitoring=r.monitoring&&!r.fault;
    if(!state.monitoring&&state.deviationActive)finalizeDeviation('interrupted');
    if(state.monitoring&&wasMonitoring)state.sessionSeconds+=countedElapsed;
    elements.monitorButton.classList.toggle('running',state.monitoring);
    if(state.monitoring)elements.chartEmpty.classList.add('hidden');
    if(r.fault){document.getElementById('deviceStatus').textContent='Ошибка датчиков. Измерения не учитываются. Проверьте разъёмы.';}
    else if(r.calibrating){document.getElementById('deviceStatus').textContent='Калибровка: примите нейтральную позу и оставайтесь неподвижно. После подготовки — около 3 секунд измерений.';}
    else if(r.testing){document.getElementById('deviceStatus').textContent='Тест моторов запущен через Serial. Измерения не учитываются.';}
    else if(state.monitoring&&!measurementValid){if(state.deviationActive)finalizeDeviation('interrupted');document.getElementById('deviceStatus').textContent='Движение: часть измерений недостоверна. Этот интервал не учитывается.';}
    else if(state.monitoring){processReading(r,'ble',wasMonitoring?countedElapsed:0);document.getElementById('deviceStatus').textContent=`Поток данных активен · вибромодули: ${['верхний','средний','нижний'].filter((_,i)=>r.motorMask&(1<<i)).join(', ')||'выключены'}`;}
    else {state.angles={upper:r.upper,middle:r.middle,lower:r.lower};updateDashboard(false);document.getElementById('deviceStatus').textContent=r.calibrated?'Устройство остановлено. Можно запустить мониторинг.':'Нужна калибровка в нейтральной позе.';}
    refreshDynamicText();
  }catch(e){document.getElementById('deviceStatus').textContent=e.message;}
}
function handleBluetoothDisconnect(){
  if(state.deviationActive)finalizeDeviation('interrupted');
  if(state.pendingCommand){clearTimeout(state.pendingCommand.timer);state.pendingCommand.reject(Error('Bluetooth отключён до подтверждения команды.'));state.pendingCommand=null;}
  window.clearInterval(state.bleWatchdog);state.bleWatchdog=null;
  state.bleCharacteristic?.removeEventListener('characteristicvaluechanged',handleBluetoothReading);
  state.bleControl?.removeEventListener('characteristicvaluechanged',handleBluetoothReading);
  state.bleDevice?.removeEventListener('gattserverdisconnected',handleBluetoothDisconnect);
  state.connected=false;state.monitoring=false;state.bleDevice=null;state.bleCharacteristic=null;state.bleControl=null;
  elements.connectionState.classList.remove('connected');setDeviceControls(false);
  document.getElementById('deviceStatus').textContent='Bluetooth отключён. Для продолжения подключите устройство заново.';
  refreshDynamicText();
}

function drawChart() {
  const canvas =
    elements.canvas;

  if (
    !canvas ||
    elements.dashboard.hidden
  ) {
    return;
  }

  const rect =
    canvas.getBoundingClientRect();

  if (
    !rect.width ||
    !rect.height
  ) {
    return;
  }

  const ratio =
    window.devicePixelRatio || 1;

  canvas.width =
    Math.round(
      rect.width * ratio
    );

  canvas.height =
    Math.round(
      rect.height * ratio
    );

  const context =
    canvas.getContext("2d");

  context.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

  context.clearRect(
    0,
    0,
    rect.width,
    rect.height
  );

  const padding = {
    top: 18,
    right: 12,
    bottom: 26,
    left: 34
  };

  const width =
    rect.width -
    padding.left -
    padding.right;

  const height =
    rect.height -
    padding.top -
    padding.bottom;

  const maximumY = 25;

  context.font =
    "10px Inter, sans-serif";

  context.textAlign = "right";
  context.textBaseline = "middle";

  for (
    let value = 0;
    value <= maximumY;
    value += 5
  ) {
    const y =
      padding.top +
      height -
      (
        value /
        maximumY
      ) *
      height;

    context.strokeStyle =
      "#edf1f6";

    context.lineWidth = 1;

    context.beginPath();

    context.moveTo(
      padding.left,
      y
    );

    context.lineTo(
      padding.left + width,
      y
    );

    context.stroke();

    context.fillStyle =
      "#8a98ad";

    context.fillText(
      String(value),
      padding.left - 8,
      y
    );
  }

  const thresholdY =
    padding.top +
    height -
    (
      state.threshold /
      maximumY
    ) *
    height;

  context.save();

  context.setLineDash([6, 5]);

  context.strokeStyle =
    "#f59e0b";

  context.lineWidth = 1.5;

  context.beginPath();

  context.moveTo(
    padding.left,
    thresholdY
  );

  context.lineTo(
    padding.left + width,
    thresholdY
  );

  context.stroke();

  context.restore();

  if (state.points.length < 2) {
    return;
  }

  const points =
    state.points;

  const xStep =
    width /
    Math.max(
      points.length - 1,
      1
    );

  const coordinates =
    points.map(
      (point, index) => ({
        x:
          padding.left +
          index * xStep,

        y:
          padding.top +
          height -
          (
            clamp(
              point.angle,
              0,
              maximumY
            ) /
            maximumY
          ) *
          height
      })
    );

  const gradient =
    context.createLinearGradient(
      0,
      padding.top,
      0,
      padding.top + height
    );

  gradient.addColorStop(
    0,
    "rgba(20,184,166,.26)"
  );

  gradient.addColorStop(
    1,
    "rgba(20,184,166,0)"
  );

  context.beginPath();

  context.moveTo(
    coordinates[0].x,
    padding.top + height
  );

  coordinates.forEach(
    (point) => {
      context.lineTo(
        point.x,
        point.y
      );
    }
  );

  const lastPoint =
    coordinates[
      coordinates.length - 1
    ];

  context.lineTo(
    lastPoint.x,
    padding.top + height
  );

  context.closePath();

  context.fillStyle =
    gradient;

  context.fill();

  context.beginPath();

  coordinates.forEach(
    (point, index) => {
      if (index === 0) {
        context.moveTo(
          point.x,
          point.y
        );
      } else {
        context.lineTo(
          point.x,
          point.y
        );
      }
    }
  );

  context.strokeStyle =
    "#14b8a6";

  context.lineWidth = 2.2;
  context.lineJoin = "round";
  context.lineCap = "round";

  context.stroke();
}


/* =========================================================
   ЭКСПОРТ CSV
========================================================= */

function exportCsv() {
  if (!state.events.length) {
    showToast(
      t("toast.noEvents"),
      true
    );

    return;
  }

  const rows = [
    [
      "device_id",
      "timestamp",
      "zone",
      "peak_angle_deg",
      "duration_seconds",
      "source"
    ],

    ...state.events.map(
      (event) => [
        elements.deviceSelect.value,
        event.time.toISOString(),
        event.zone,
        event.peak.toFixed(2),
        event.duration,
        event.source
      ]
    )
  ];

  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const safeCell =
            String(cell)
              .replaceAll(
                '"',
                '""'
              );

          return `"${safeCell}"`;
        })
        .join(",")
    )
    .join("\n");

  const blob =
    new Blob(
      [
        "\uFEFF",
        csv
      ],
      {
        type:
          "text/csv;charset=utf-8"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `vertex-session-${
      new Date()
        .toISOString()
        .slice(0, 10)
    }.csv`;

  document.body.append(link);

  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  showToast(
    t("toast.exported")
  );
}


/* =========================================================
   УВЕДОМЛЕНИЯ
========================================================= */

function showToast(
  message,
  error = false
) {
  let region =
    document.querySelector(
      ".toast-region"
    );

  if (!region) {
    region =
      document.createElement("div");

    region.className =
      "toast-region";

    region.setAttribute(
      "role",
      "status"
    );

    region.setAttribute(
      "aria-live",
      "polite"
    );

    document.body.append(region);
  }

  const toast =
    document.createElement("div");

  toast.className =
    `toast${error ? " error" : ""}`;

  toast.textContent =
    message;

  region.append(toast);

  window.setTimeout(
    () => toast.remove(),
    3600
  );
}


/* =========================================================
   УПРАВЛЕНИЕ ДАШБОРДОМ
========================================================= */

function setupDashboard() {
  elements.monitorButton.addEventListener(
    "click",
    toggleMonitoring
  );

  elements.calibrateButton.addEventListener(
    "click",
    calibrate
  );

  elements.connectButton.addEventListener(
    "click",
    connectBluetooth
  );

  elements.exportButton.addEventListener(
    "click",
    exportCsv
  );

  elements.deviceSelect.addEventListener(
    "change",
    () => {
      window.clearInterval(state.timer);state.timer=null;
      resetVertexSession(elements.deviceSelect.value === "DEMO" ? "demo" : "ble");
      state.demoReady = elements.deviceSelect.value === "DEMO";

      elements.connectionState.classList.toggle(
        "connected",
        state.connected ||
        state.demoReady
      );

      refreshDynamicText();
    }
  );

  elements.thresholdRange.addEventListener(
    "input",
    () => {
      state.threshold =
        Number(
          elements.thresholdRange.value
        );

      elements.thresholdOutput.textContent =
        `${state.threshold}°`;

      refreshDynamicText();

      const currentMaximum =
        Math.max(
          ...Object.values(
            state.angles
          )
        );

      updateDashboard(
        currentMaximum >
        state.threshold
      );

      drawChart();
    }
  );

  window.addEventListener(
    "resize",
    drawChart,
    {
      passive: true
    }
  );
}


/* =========================================================
   ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА
========================================================= */

function setupLanguageSwitcher() {
  document
    .querySelectorAll(".lang-btn")
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          setLanguage(
            button.dataset.lang
          );
        }
      );
    });
}


/* =========================================================
   МЕТРИКА НА ГЛАВНОМ ЭКРАНЕ
========================================================= */

function animateHeroMetric() {
  let phase = 0;

  window.setInterval(
    () => {
      if (
        window.location.hash ===
        "#dashboard"
      ) {
        return;
      }

      phase += 0.35;

      const angle =
        7.6 +
        Math.sin(phase) * 1.1;

      elements.heroAngle.textContent =
        `${angle.toFixed(1)}°`;
    },
    1000
  );
}


/* =========================================================
   ЗАПУСК САЙТА
========================================================= */

function initialize() {
  let savedLanguage = "ru";

  try {
    savedLanguage =
      localStorage.getItem(
        "vertex-language"
      ) || "ru";
  } catch (error) {
    savedLanguage = "ru";
  }

  setupNavigation();
  setupLanguageSwitcher();
  setupRevealAnimations();
  setupDashboard();

  setLanguage(savedLanguage);

  updateClock();

  window.setInterval(
    updateClock,
    1000
  );

  animateHeroMetric();
  renderEventTable();
  updateDashboard(false);
  route();
}

// Wearable MVP copy; research protocol remains the historical LED experiment.
const mvpCopy = {"ru": {"hero.eyebrow": "Носимый MVP · VerteX 2026", "hero.prototype": "MVP в рашгарде", "product.title": "Три сенсорных модуля. Обратная связь там, где она нужна.", "product.lead": "Новая версия VerteX объединяет три IMU и шесть вибромоторов в рашгарде. Каждый модуль сравнивает положение со своей калибровкой и управляет своей парой вибромоторов.", "product.photo": "Модуль нового MVP · студийная обработка фото", "product.item2": "Независимая оценка трёх участков спины", "product.item4": "Управление через BLE после обновления прошивки", "technology.spec4": "Два вибромотора на каждый модуль нового MVP", "technology.lead": "Три датчика оценивают отклонение от собственной калибровки. Порог, задержка и ритм вибрации настраиваются для совместимой BLE-прошивки.", "dashboard.subtitle": "Подключите устройство или выберите демонстрацию. Источник данных всегда обозначен."}, "en": {"hero.eyebrow": "Wearable MVP · VerteX 2026", "hero.prototype": "Rashguard MVP", "product.title": "Three sensor modules. Feedback where it matters.", "product.lead": "The new VerteX rashguard combines three IMUs and six vibration motors. Each module compares its position with its own calibration and controls its own motor pair.", "product.photo": "New MVP module · studio-edited photograph", "product.item2": "Independent tracking of three back regions", "product.item4": "BLE controls after compatible firmware update", "technology.spec4": "Two vibration motors per module in the new MVP", "technology.lead": "Each sensor measures deviation from its own calibration. Compatible BLE firmware enables threshold, delay and vibration timing controls.", "dashboard.subtitle": "Connect your device or choose demo mode. The data source is always labeled."}, "kk": {"hero.eyebrow": "Киілетін MVP · VerteX 2026", "hero.prototype": "Рашгардтағы MVP", "product.title": "Үш сенсорлық модуль. Қажетті аймақтағы кері байланыс.", "product.lead": "Жаңа VerteX рашгардында үш IMU және алты діріл моторы бар. Әр модуль өз калибровкасымен салыстырып, өз мотор жұбын басқарады.", "product.photo": "Жаңа MVP модулі · студиялық өңделген фото", "product.item2": "Арқаның үш аймағын тәуелсіз бағалау", "product.item4": "Үйлесімді микробағдарламадан кейін BLE басқару", "technology.spec4": "Жаңа MVP модулінде екі діріл моторы", "technology.lead": "Әр сенсор өз калибровкасынан ауытқуды өлшейді. Үйлесімді BLE микробағдарламасында шек, кідіріс және діріл ырғағы реттеледі.", "dashboard.subtitle": "Құрылғыны қосыңыз немесе демоны таңдаңыз. Дерек көзі әрқашан көрсетіледі."}};
Object.entries(mvpCopy).forEach(([lang, values]) => Object.assign(translations[lang], values));

initialize();
/* =========================================================
   VERTeX AI
   ========================================================= */

const vertexAiButton = document.getElementById("aiAnalyzeBtn");
const vertexAiResult = document.getElementById("aiResult");
const vertexAiStatus = document.getElementById("aiStatus");

const vertexAiSchema = {
  type: "object",
  properties: {
    score: {
      type: "integer"
    },
    status: {
      type: "string"
    },
    summary: {
      type: "string"
    },
    observations: {
      type: "array",
      items: {
        type: "string"
      }
    },
    recommendations: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: [
    "score",
    "status",
    "summary",
    "observations",
    "recommendations"
  ]
};

function escapeVertexAiText(value) {
  return String(value).replace(/[&<>"']/g, (symbol) => {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return characters[symbol];
  });
}

function createVertexAiList(items) {
  return items
    .map((item) => {
      return `<li>${escapeVertexAiText(item)}</li>`;
    })
    .join("");
}

function renderVertexAiReport(report) {
  const score = Math.max(
    0,
    Math.min(100, Number(report.score) || 0)
  );

  vertexAiResult.classList.add("has-report");

  vertexAiResult.innerHTML = `
    <div class="ai-report">
      <div class="ai-score-card">
        <div
          class="ai-score-circle"
          style="--ai-score: ${score * 3.6}deg"
        >
          <div class="ai-score-inner">
            <strong>${score}</strong>
            <span>из 100</span>
          </div>
        </div>

        <span class="ai-score-status">
          ${escapeVertexAiText(report.status)}
        </span>
      </div>

      <div class="ai-report-content">
        <div class="ai-report-section">
          <h3>Итог сеанса</h3>
          <p>${escapeVertexAiText(report.summary)}</p>
        </div>

        <div class="ai-report-section">
          <h3>Наблюдения</h3>
          <ul>
            ${createVertexAiList(report.observations)}
          </ul>
        </div>

        <div class="ai-report-section">
          <h3>Рекомендации</h3>
          <ul class="ai-recommendations">
            ${createVertexAiList(report.recommendations)}
          </ul>
        </div>

        <p class="ai-disclaimer">
          Рекомендации носят информационный характер
          и не являются медицинским заключением.
        </p>
      </div>
    </div>
  `;
}

async function createVertexAiAnalysis() {
  if (!vertexAiButton || !vertexAiResult || !vertexAiStatus) {
    return;
  }

  vertexAiButton.disabled = true;
  vertexAiButton.textContent = "ИИ анализирует...";
  vertexAiStatus.textContent = "Анализ";

  vertexAiResult.classList.remove(
    "has-report",
    "is-error"
  );

  vertexAiResult.classList.add("is-loading");
  vertexAiResult.textContent =
    "Модель изучает показатели завершённого сеанса...";

  const sessionData = {
    source: state.source === "ble" ? "esp32_ble" : "demo_simulation",
    deviceSettings: state.deviceSettings,
    durationSeconds: state.sessionSeconds,
    currentAngles: { ...state.angles },
    maximumAngle: state.maxAngle,
    deviationCount: state.events.length,
    deviationSeconds: state.deviationSeconds,
    deviationThreshold: state.threshold
  };

  try {
    if (!vertexAccount.user) {
      document.getElementById("accountDialog").showModal();
      throw new Error("Войдите в аккаунт, чтобы создать ИИ-анализ.");
    }
    const analysisUser = vertexAccount.user;
    const analysisSession = state.sessionId;
    const key = document.getElementById("aiApiKey").value.trim();
    const model = document.getElementById("aiModel").value;
    if (!key || !model) throw new Error("Введите API-ключ и загрузите модели.");
    if (!state.sessionSeconds) throw new Error("Сначала запустите устройство или демо и накопите данные сеанса.");
    const data = await vertexGroq("/chat/completions", key, {
      model,
      max_tokens: 1200,
      temperature: 0.2,
      messages: [
        { role: "system", content: `Ты — аналитический модуль VerteX. В поле source указан источник: demo_simulation означает симуляцию, esp32_ble — измерения прототипа. Явно укажи источник в summary. Данные прототипа не являются клиническим измерением. Анализируй только переданные показатели. Не ставь диагнозов, не назначай лечение. Оценка score — условная оценка сеанса, не клиническая шкала. Пиши на русском. Верни только JSON по схеме: ${JSON.stringify(vertexAiSchema)}` },
        { role: "user", content: JSON.stringify(sessionData) }
      ]
    });
    if (state.sessionId !== analysisSession) throw new Error("Начался другой сеанс. Запустите анализ заново.");
    if (vertexAccount.user !== analysisUser) throw new Error("Аккаунт изменился. Запустите анализ заново.");
    let content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Модель не вернула текст отчёта. Попробуйте другую модель.");

    if (content.includes("</think>")) {
      content = content.split("</think>").pop();
    }

    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Модель не вернула готовый отчёт");
    }

    content = content.slice(jsonStart, jsonEnd + 1);

    const report = JSON.parse(content);

    if (!Number.isFinite(report.score) || typeof report.status !== "string" || typeof report.summary !== "string" ||
        !Array.isArray(report.observations) || !report.observations.every(x => typeof x === "string") ||
        !Array.isArray(report.recommendations) || !report.recommendations.every(x => typeof x === "string")) {
      throw new Error("Модель вернула неподходящий формат отчёта. Попробуйте другую модель.");
    }
    renderVertexAiReport(report);
    vertexAiStatus.textContent = "Готово";
  } catch (error) {


    vertexAiResult.classList.remove("has-report");
    vertexAiResult.classList.add("is-error");

    vertexAiResult.textContent =
      error.message || "Не удалось создать отчёт. Попробуйте ещё раз.";

    vertexAiStatus.textContent = "Нет связи";
  } finally {
    vertexAiResult.classList.remove("is-loading");
    vertexAiButton.disabled = false;
    vertexAiButton.textContent = "Создать ИИ-анализ";
  }
}

vertexAiButton?.addEventListener(
  "click",
  createVertexAiAnalysis
);
/* Email accounts and user-owned Groq keys */
const vertexAccount = { client: null, user: null, recovery: false };
const vx = id => document.getElementById(id);
let vertexModelLoad = 0;

async function vertexGroq(path, key, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60000);
  try {
    const response = await fetch(`https://api.groq.com/openai/v1${path}`, {
      method: body ? "POST" : "GET",
      headers: { Authorization: `Bearer ${key}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    const errors = { 401: "API-ключ Groq неверен или отозван.", 402: "Проверьте тариф и платёжные настройки Groq.", 403: "Доступ к модели запрещён.", 429: "Лимит запросов исчерпан. Попробуйте позже." };
    if (!response.ok || data.error) throw new Error(errors[response.status] || `Groq не выполнил запрос (${response.status}). Попробуйте другую модель или повторите позже.`);
    return data;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Время ожидания истекло. Попробуйте ещё раз.");
    if (error instanceof TypeError) throw new Error("Нет связи с Groq. Проверьте интернет.");
    throw error;
  } finally { clearTimeout(timer); }
}

function clearVertexKey() {
  vertexModelLoad++;
  vx("aiApiKey").value = "";
  vx("aiModel").replaceChildren(new Option("Сначала подключите ключ", ""));
  vx("aiModel").disabled = true;
  vx("aiConnectionStatus").textContent = "Ключ удалён из памяти страницы.";
}
vx("clearKeyButton").addEventListener("click", clearVertexKey);
vx("aiApiKey").addEventListener("input", () => {
  vertexModelLoad++;
  vx("aiModel").replaceChildren(new Option("Подключите ключ для выбора модели", ""));
  vx("aiModel").disabled = true;
});
vx("loadModelsButton").addEventListener("click", async () => {
  const key = vx("aiApiKey").value.trim();
  if (!key) { vx("aiConnectionStatus").textContent = "Сначала введите API-ключ Groq."; return; }
  const request = ++vertexModelLoad;
  vx("loadModelsButton").disabled = true;
  vx("aiConnectionStatus").textContent = "Проверка ключа и загрузка моделей…";
  try {
    const result = await vertexGroq("/models", key);
    if (request !== vertexModelLoad) return;
    const models = (result.data || []).filter(m => typeof m.id === "string" && m.active !== false && !/whisper|tts|playai|canopy|guard|safeguard/i.test(m.id));
    models.sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id));
    if (!models.length) throw new Error("Список текстовых моделей пуст.");
    vx("aiModel").replaceChildren(new Option("Выберите модель", ""), ...models.map(m => new Option(m.name || m.id, m.id)));
    vx("aiModel").disabled = false;
    vx("aiConnectionStatus").textContent = `Ключ проверен. Моделей: ${models.length}. Выберите модель; доступность зависит от тарифа и лимитов.`;
  } catch (error) {
    if (request === vertexModelLoad) vx("aiConnectionStatus").textContent = error.message;
  } finally { vx("loadModelsButton").disabled = false; }
});

function renderVertexAccount() {
  const signedIn = Boolean(vertexAccount.user);
  vx("accountButton").textContent = signedIn ? "Аккаунт" : "Войти";
  vx("accountForm").hidden = signedIn || vertexAccount.recovery;
  vx("signOutButton").hidden = !signedIn;
  vx("newPasswordForm").hidden = !vertexAccount.recovery;
  vx("accountState").textContent = vertexAccount.recovery ? "Задайте новый пароль." : signedIn ? `Вы вошли: ${vertexAccount.user.email}` : "Войдите или создайте аккаунт по электронной почте.";
}
vx("accountButton").addEventListener("click", () => vx("accountDialog").showModal());
vx("closeAccount").addEventListener("click", () => vx("accountDialog").close());

async function vertexAuthAction(action) {
  if (!vertexAccount.client) {
    vx("accountState").textContent = "Регистрация ещё не подключена. Владелец сайта должен заполнить config.js настройками Supabase.";
    return;
  }
  const buttons = [...vx("accountDialog").querySelectorAll("button:not(#closeAccount)")];
  buttons.forEach(b => b.disabled = true);
  vx("accountState").textContent = "Подождите…";
  try { await action(); }
  catch (error) { vx("accountState").textContent = `Не удалось выполнить действие: ${error.message || "проверьте соединение"}`; }
  finally { buttons.forEach(b => b.disabled = false); }
}
const vertexRedirect = () => new URL("/", location.origin).href;
vx("accountForm").addEventListener("submit", event => {
  event.preventDefault();
  vertexAuthAction(async () => {
    const { data, error } = await vertexAccount.client.auth.signInWithPassword({ email: vx("authEmail").value.trim(), password: vx("authPassword").value });
    if (error) throw error;
    vertexAccount.user = data.user;
    vx("authPassword").value = "";
    renderVertexAccount();
  });
});
vx("signUpButton").addEventListener("click", () => {
  if (!vx("accountForm").reportValidity()) return;
  vertexAuthAction(async () => {
    const { data, error } = await vertexAccount.client.auth.signUp({ email: vx("authEmail").value.trim(), password: vx("authPassword").value, options: { emailRedirectTo: vertexRedirect() } });
    if (error) throw error;
    vx("authPassword").value = "";
    vertexAccount.user = data.session?.user || null;
    renderVertexAccount();
    vx("accountState").textContent = data.session ? "Аккаунт создан, вы вошли." : "Проверьте почту для подтверждения регистрации. Если аккаунт уже существует, войдите или восстановите пароль.";
  });
});
vx("resetPasswordButton").addEventListener("click", () => {
  if (!vx("authEmail").reportValidity()) return;
  vertexAuthAction(async () => {
    const { error } = await vertexAccount.client.auth.resetPasswordForEmail(vx("authEmail").value.trim(), { redirectTo: vertexRedirect() });
    if (error) throw error;
    vx("accountState").textContent = "Если аккаунт существует, на почту придёт ссылка для смены пароля.";
  });
});
vx("newPasswordForm").addEventListener("submit", event => {
  event.preventDefault();
  vertexAuthAction(async () => {
    const { error } = await vertexAccount.client.auth.updateUser({ password: vx("newPassword").value });
    if (error) throw error;
    vx("newPassword").value = "";
    vertexAccount.recovery = false;
    renderVertexAccount();
    vx("accountState").textContent = "Пароль обновлён.";
  });
});
vx("signOutButton").addEventListener("click", () => vertexAuthAction(async () => {
  const { error } = await vertexAccount.client.auth.signOut();
  if (error) throw error;
  vertexAccount.user = null;
  vertexAccount.recovery = false;
  clearVertexKey();
  vertexAiResult.textContent = "Войдите для создания нового анализа.";
  renderVertexAccount();
}));

(function initializeVertexAccount() {
  const config = window.VERTEX_CONFIG || {};
  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    vx("accountState").textContent = "Для включения регистрации заполните Supabase URL и publishable key в config.js.";
    return;
  }
  if (!window.supabase?.createClient) {
    vx("accountState").textContent = "Не удалось загрузить модуль регистрации. Проверьте интернет и обновите страницу.";
    return;
  }
  try {
    vertexAccount.client = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey);
    vertexAccount.client.auth.onAuthStateChange((event, session) => {
      vertexAccount.user = session?.user || null;
      if (event === "PASSWORD_RECOVERY") {
        vertexAccount.recovery = true;
        if (!vx("accountDialog").open) vx("accountDialog").showModal();
      }
      if (event === "SIGNED_OUT") { vertexAccount.recovery = false; clearVertexKey(); }
      renderVertexAccount();
    });
    vertexAccount.client.auth.getSession().then(({ error }) => {
      if (error) vx("accountState").textContent = `Ошибка сессии: ${error.message}`;
    }).catch(() => { vx("accountState").textContent = "Не удалось восстановить сессию. Обновите страницу."; });
  } catch { vx("accountState").textContent = "Проверьте параметры Supabase в config.js."; }
})();

document.getElementById('disconnectDevice').addEventListener('click',()=>state.bleDevice?.gatt.disconnect());
document.getElementById('readSettings').addEventListener('click',()=>deviceAction(VertexBLE.ops.GET));
document.getElementById('deviceStop').addEventListener('click',()=>deviceAction(VertexBLE.ops.STOP));
document.getElementById('deviceSettings').addEventListener('submit',event=>{
 event.preventDefault();
 const n=id=>Number(document.getElementById(id).value);
 deviceAction(VertexBLE.ops.SETTINGS,{thresholds:['thresholdUpper','thresholdMiddle','thresholdLower'].map(n),delayMs:n('deviceDelay'),onMs:n('vibrationOn'),offMs:n('vibrationOff'),feedback:document.getElementById('deviceFeedback').checked});
});
