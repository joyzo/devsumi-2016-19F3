// libraries
var noble = require('noble'); // BLE central module
var awsIot = require('aws-iot-device-sdk'); // AWS IoT SDK
var moment = require('moment'); // Date library

// constant parameters
const DEVICE_NAME = 'dev1';
const TOPIC = "devsumi/ginga"; // MQTT TOPIC
const MY_ADDRESS = "f3:2f:85:98:69:ce"; // MAC Address of BLE peripheral, "GINGA"
const REGION = 'ap-northeast-1';

// device config.
var device = awsIot.device({
  keyPath: './cert/private.pem',
  certPath: './cert/certificate.pem',
  caPath: './cert/rootCA.pem',
  clientId: DEVICE_NAME,
  region: REGION
});

// publish data to AWS IoT
function publish_data(sensorType, value) {
  var message = {
    "device": DEVICE_NAME,
    "sensor": sensorType,
    "time": moment().format(),
    "value": value
  };
  message = JSON.stringify(message);
  console.log("# Publish: " + message);
  device.publish(TOPIC, message); // publish
}

// parse & publish temperature data
function publish_temp(data) {
  var v1 = parseInt(data[0]); // parse temperature data
  var v2 = parseInt(data[1]) / 100;
  publish_data('temp', v1 + v2); // publish temperature data
}

// parse & publish humidity data
function publish_humidity(data) {
  var v1 = parseInt(data[2]); // parse humidity data
  var v2 = parseInt(data[3]) / 100;
  publish_data('humidity', v1 + v2); // publish humidity data
}

// parse & publish temperature/humidity data
function publish_ginga(data) {
  // parse humidity data
  var t1 = parseInt(data[0]);
  var t2 = parseInt(data[1]) / 100;
  var temp_value = t1 + t2; // temperature value
  // parse humidity data
  var h1 = parseInt(data[2]);
  var h2 = parseInt(data[3]) / 100;
  var humidity_value = h1 + h2; // humidity value
  // create & publish message
  var message = {
    "device": DEVICE_NAME,
    "sensor": 'ginga',
    "time": moment().format(),
    "temp": temp_value,
    "humidity": humidity_value
  };
  message = JSON.stringify(message);
  console.log("# Publish: " + message);
  device.publish(TOPIC, message); // publish
}

// event for BLE peripheral "stateChange"
noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

// event for BLE peripheral "discover"
noble.on('discover', function(peripheral) {
  noble.stopScanning();

  if (MY_ADDRESS == peripheral.address) {
    var serviceUUID = peripheral.advertisement.serviceUuids[0];
    console.log('# Service UUID: ' + serviceUUID);
    peripheral.connect(function(error) {
      if (error) console.log('# Connect error: ' + error);
      console.log('# Connected to ' + peripheral.uuid);
      peripheral.discoverServices([serviceUUID],
        function(error, services) {
          if (error) console.log('## discoverServices error: ' + error);
          console.log('## services.length: ' + services.length);
          var service = services[0];
          service.discoverCharacteristics(null, function(error, characteristics) {
            if (error) console.log('## discoverCharacteristics error: ' + error);
            console.log('## characteristics.length: ' + characteristics.length);
            characteristics[0].notify(true, function(error) {
              if (error) console.log('## notify error: ' + error);
              setInterval(function() {
                characteristics[0].read(function(error, data) {
                  if (data) {
                    // publish_humidity(data); // publish humidity
                    // publish_temp(data); // publish temperature
                    publish_ginga(data); // publish GINGA data
                  }
                });
              }, 10 * 1000); // per 10sec
            });
          });
        }
      );
    });
  } else {
    console.log("# No my device is discovered");
  }
});

// event for device "connect"
device
  .on('connect', function() {
    console.log('# Connected to Message Broker.');
  });
