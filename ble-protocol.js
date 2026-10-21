/* VerteX BLE protocol v1. Every packet is 20 bytes (default ATT payload). */
(function(root) {
  const service = '91bad492-b950-4226-aa2b-4ede9fa42f59';
  const telemetry = 'cba1d466-344c-4be3-ab3f-189f80dd7518';
  const control = 'cba1d467-344c-4be3-ab3f-189f80dd7518';
  const ops = { GET: 0, SETTINGS: 1, START: 2, STOP: 3, CAL: 4 };
  function settingsValid(c) {
    return Array.isArray(c.thresholds) && c.thresholds.length === 3 && c.thresholds.every(n=>Number.isFinite(n)&&n>=3&&n<=45) &&
      Number.isInteger(c.delayMs)&&c.delayMs>=0&&c.delayMs<=30000 &&
      Number.isInteger(c.onMs)&&c.onMs>=100&&c.onMs<=1000 &&
      Number.isInteger(c.offMs)&&c.offMs>=500&&c.offMs<=10000 && typeof c.feedback==='boolean';
  }
  function writeSettings(v,c){ c.thresholds.forEach((n,i)=>v.setUint16(6+i*2,Math.round(n*10),true));v.setUint16(12,c.delayMs,true);v.setUint16(14,c.onMs,true);v.setUint16(16,c.offMs,true);v.setUint8(18,c.feedback?1:0); }
  function command(op,seq,c){
    if(!Object.values(ops).includes(op))throw Error('Unknown command');
    const v=new DataView(new ArrayBuffer(20));v.setUint8(0,1);v.setUint8(1,op);v.setUint16(2,seq,true);
    if(op===ops.SETTINGS){if(!settingsValid(c))throw Error('Проверьте диапазоны настроек.');writeSettings(v,c);}
    return new Uint8Array(v.buffer);
  }
  function decode(v){
    if(v.byteLength!==20||v.getUint8(0)!==1)throw Error('Неподдерживаемый BLE-пакет. Нужна прошивка VerteX BLE v1.');
    const type=v.getUint8(1),seq=v.getUint16(2,true);
    if(type===1){const angles=[6,8,10].map(o=>v.getUint16(o,true)/10);if(angles.some(a=>a>180))throw Error('Неверные углы');const flags=v.getUint8(4);return {type,seq,monitoring:!!(flags&1),calibrated:!!(flags&2),fault:!!(flags&4),calibrating:!!(flags&8),testing:!!(flags&16),validMask:v.getUint8(13)&7,upper:angles[0],middle:angles[1],lower:angles[2],deviationMask:v.getUint8(5)&7,motorMask:v.getUint8(12)&7,tickMs:v.getUint32(14,true)};}
    if(type===2){const c={thresholds:[6,8,10].map(o=>v.getUint16(o,true)/10),delayMs:v.getUint16(12,true),onMs:v.getUint16(14,true),offMs:v.getUint16(16,true),feedback:!!v.getUint8(18)};if(!settingsValid(c))throw Error('Устройство вернуло неверные настройки');return {type,seq,status:v.getUint8(4),settings:c};}
    throw Error('Неизвестный тип BLE-пакета');
  }
  const api={service,telemetry,control,ops,command,decode,settingsValid};
  if(typeof module!=='undefined')module.exports=api;else root.VertexBLE=api;
})(typeof window!=='undefined'?window:globalThis);
