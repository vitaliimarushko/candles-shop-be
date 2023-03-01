import * as AWS from "aws-sdk";

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: "default",
});

export const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
