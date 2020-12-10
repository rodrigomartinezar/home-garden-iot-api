const AWS = require("aws-sdk");

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
const timestamp = "2020-12-08T19:37:12Z";

const params = {
  TableName: "estacion_monitoreo",
  KeyConditionExpression: "#sid = :ss",
  ExpressionAttributeNames: {
    "#sid": "sensor_id",
  },
  ExpressionAttributeValues: {
    ":ss": sensor_id,
  },
};

docClient.query(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
