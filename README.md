![handsonTitle](image/handson-banner.jpeg)

## Contents
* **デブサミ2016-19F3.zip**：「インシデント管理」アプリのテンプレート

* **./cert/**：root証明書取得用のcURLコマンドサンプル

* **./cert/howto_curl_rootCA.txt**：[Symantec](https://www.joyzo.co.jp/plugin/backlog/)から[root証明書](https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem)をダウンロードするcURLコマンドサンプル

* **./clientjs/**：kintone JavaScriptカスタマイズのファイル群

* **./clientjs/incident.js**：一覧画面で条件書式を設定するファイル（温度が30℃以上で赤、湿度30%未満でオレンジ）。

* **./ginga/**：Raspberry Pi（BLE Central）にセットするファイル群

* **./ginga/ginga_iot.js**：センサー（BLE Peripheral）の値を取得してAWS IoTにPublishするファイル

* **./ginga/node_modules/**：Node.jsのモジュール群

* **./ginga/node_modules/aws-iot-device-sdk/**：証明書を伴うAWS IoTへのアクセス等を行うモジュール

* **./ginga/node_modules/noble/**：BLE Centralの作成を行うモジュール

* **./ginga/node_modules/moment/**：日時操作を行うモジュール

* **./ginga/cert/**：証明書と鍵を入れるフォルダ

* **./json/**：JSON形式のサンプルファイル

* **./json/sample_event.json**：Lambdaのテスト用eventに使うJSONファイル

* **./nodejs/**：Node.jsによるLamda関数のサンプルのファイル群

* **./nodejs/kintone_iot.js**：AWS IoTから渡されたメッセージイベントを処理してkintone連携するサンプルファイル

* **./Python/**：PythonによるLamda関数のサンプルのファイル群

* **./Python/kintone_iot.py**：AWS IoTから渡されたメッセージイベントを処理してkintone連携するサンプルファイル

## Reference
* [kintoneで実践するIoTハンズオン
-90分で挑戦！kintone & AWS IoT連携-
 Developers Summit 2016 【19-F-3】サイボウズ特別トラック](http://www.slideshare.net/joyzojp/kintoneiot-90kintone-aws-iot)（slideshare）
* [Amazon Web Services](http://aws.amazon.com/jp/)
* [AWS利用無料枠](http://aws.amazon.com/jp/free/)（[FAQ](http://aws.amazon.com/jp/free/faqs/)）
* [AWS Lambda](https://aws.amazon.com/jp/lambda/)
* [AWS Lambdaドキュメント](https://aws.amazon.com/jp/documentation/lambda/)
* [Amazon IoT](https://aws.amazon.com/jp/iot/)
* [Amazon IoTドキュメント](https://aws.amazon.com/jp/documentation/iot/)
* [kintone](https://kintone.cybozu.com/jp/)
* [kintone API リファレンス](https://cybozudev.zendesk.com/hc/ja/categories/200147600)（cybozu.com developer network内）
* [kintone JavaScript APIサンプル](https://cybozudev.zendesk.com/hc/ja/sections/200263970)（cybozu.com developer network内）
* [kintone30日間無料お試し](https://kintone.cybozu.com/jp/trial/)
* [kintone無償開発者ライセンス](https://cybozudev.zendesk.com/hc/ja/articles/200720464)
