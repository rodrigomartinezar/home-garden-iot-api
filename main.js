const AWS = require("aws-sdk");
const express = require("express");
const app = express();
const port = 4000;

// Checks if credentials are configured
/* AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
}); */

// Global config
AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com",
});
const docClient = new AWS.DynamoDB.DocumentClient();

// Set table to your table name.
const table = "estacion_monitoreo";

let fetchDistinctSensorId = () => {
  const params = {
    ProjectionExpression: "sensor_id",
    TableName: table,
  };
  return new Promise((resolve, reject) => {
    let fetchedDataContent;
    docClient.scan(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        fetchedDataContent = data["Items"];
        const sensorIds = fetchedDataContent
          .map((value) => value.sensor_id)
          .filter((value, index, _arr) => _arr.indexOf(value) == index);
        resolve(sensorIds);
      }
    });
  });
};

let fetchSensorData = (sensor_id) => {
  const params = {
    TableName: table,
    KeyConditionExpression: "#sid = :ss",
    ExpressionAttributeNames: {
      "#sid": "sensor_id",
    },
    ExpressionAttributeValues: {
      ":ss": sensor_id,
    },
  };
  return new Promise((resolve, reject) => {
    let fetchedDataContent;
    docClient.query(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        fetchedDataContent = data["Items"];
        resolve(fetchedDataContent);
      }
    });
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sensors-ids", (req, res) => {
  const sensorsIds = fetchDistinctSensorId()
    .then((fetchedDataContent) => res.send(fetchedDataContent))
    .catch((err) => res.send(err));
});

app.get("/city-data", (req, res) => {
  const sensor_id = req.header("Sensor-Id");
  const sensorData = fetchSensorData(sensor_id)
    .then((fetchedDataContent) => res.send(fetchedDataContent))
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
