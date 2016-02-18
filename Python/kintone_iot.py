import httplib, urllib2, json

kintoneDomain = "kintone-iot.cybozu.com"
appId = "3"
apiToken = "Tm8C8ziqgf7fUx2XdvAAIu1PJINczwPHVntFj9ON"

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    record = {"temp":{"value":event['temp']}, "humidity":{"value":event['humidity']}, "time_stamp":{"value":event['time']}}
    request = {"app":appId,"record":record}
    requestJson = json.dumps(request)
    headers = {"X-Cybozu-API-Token": apiToken, "Content-Type" : "application/json"}
    connect = httplib.HTTPSConnection(kintoneDomain + ":443")
    connect.request("POST", "/k/v1/record.json", requestJson, headers)
    response = connect.getresponse()
    print(response.read())
    return event
