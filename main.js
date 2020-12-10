const AWS = require("aws-sdk");
//const express = require("express");
//const { type } = require("os");
//const app = express();
//const port = 4000;

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

const table = "estacion_monitoreo";

const sensor_id = "1603975144740";

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

let fetchedData;

docClient.query(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    //console.log(JSON.stringify(data, null, 2));
    fetchedData = data["Items"];
    console.log(fetchedData);
  }
});

/* app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/Ovalle", (req, res) => {
  res.send("xd");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); */
