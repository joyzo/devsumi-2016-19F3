// Libraries
var https = require('https'); // HTTPS request

// constant parameters
const KINTONE_HOST = 'kintone-iot.cybozu.com';
const APP_ID = 3;
const API_TOKEN = 'Tm8C8ziqgf7fUx2XdvAAIu1PJINczwPHVntFj9ON';

// get options to access to kintone REST API
var getOptions = function(path, method) {
  return {
    hostname: KINTONE_HOST,
    port: 443,
    path: path,
    method: method,
    secureProtocol: 'SSLv3_method',
    headers: {
      'X-Cybozu-API-Token': API_TOKEN
    }
  };
};

// regist record to kintone
var postRecord = function(event, callback) {
  console.log('start postRecord');
  // set request body
  var params = {
    "app": APP_ID,
    "record": {
      "time": {
        "value": event.time || event.timestamp || ""
      },
      "device": {
        "value": event.device || "devsumi_device"
      },
      "temp": {
        "value": event.temp || ""
      },
      "humidity": {
        "value": event.humidity || ""
      }
    }
  };
  var json = JSON.stringify(params);
  // set request headers
  var options = getOptions('/k/v1/record.json', 'POST');
  options.headers['Content-Type'] = 'application/json';

  // access to kintone REST API
  var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('BODY: ' + chunk);
      if (res.statusCode === 200) {
        callback(null, JSON.parse(chunk));
      }
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    callback(e.message);
  });

  req.write(json);
  req.end();
};

exports.handler = function(event, context) {
  console.log('Lambda event: ' + JSON.stringify(event));
  postRecord(event, function(err, records) {
    if (err) {
      context.fail(err);
    } else {
      context.succeed(records);
    }
  });
  return;
};
