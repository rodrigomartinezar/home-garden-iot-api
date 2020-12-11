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

AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

let fetchSensorData = (sensor_id) => {
  const table = "estacion_monitoreo";

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
        //console.log(JSON.stringify(data, null, 2));
        fetchedDataContent = data["Items"];
        //console.log("Inside", fetchedData);
        resolve(fetchedDataContent);
      }
    });
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/city-data", (req, res) => {
  const sensor_id = req.header("Sensor-Id");
  const sensorData = fetchSensorData(sensor_id)
    .then((fetchedDataContent) => res.send(fetchedDataContent))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
