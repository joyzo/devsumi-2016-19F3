// 条件付き書式
// 温度が30以上で赤
// 湿度が30未満でオレンジ
(function() {
  "use strict";

  kintone.events.on(['app.record.index.show'], function(event) {
    var elTemp = kintone.app.getFieldElements('temp');
    var elHumidity = kintone.app.getFieldElements('humidity');

    for (var i = 0; i < elTemp.length; i++) {
      var record = event.records[i];
      if (Number(record['temp'].value) >= 30) {
        $(elTemp[i]).css({
          backgroundColor: 'red'
        });
      }

      if (Number(record['humidity'].value) < 30) {
        $(elHumidity[i]).css({
          backgroundColor: 'orange'
        });
      }
    }
    return event;
  });
})();
