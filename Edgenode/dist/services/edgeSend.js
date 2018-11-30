// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
const Mqtt = require("azure-iot-device-mqtt");
const Device = require("azure-iot-device");
const Config = require("../../config/env");
// The device connection string to authenticate the device with your IoT hub.
class edgeSend {
    send(dataObject) {
        // Create a message and send it to the IoT hub every second
        var client = Device.Client.fromConnectionString(Config.env.connectionString, Mqtt.Mqtt);
        // Simulate telemetry.
        let message = new Device.Message(JSON.stringify(dataObject));
        // Add a custom application property to the message.
        // An IoT hub can filter on these properties without access to the message body.
        message.properties.add('temperatureAlert', (dataObject.temp > 30) ? 'true' : 'false');
        console.log('Sending message: ' + message.getData());
        // Send the message.
        client.sendEvent(message, function (err) {
            if (err) {
                console.error('send error: ' + err.toString());
            }
            else {
                console.log('message sent');
            }
        });
    }
}
exports.default = edgeSend;
//# sourceMappingURL=edgeSend.js.map