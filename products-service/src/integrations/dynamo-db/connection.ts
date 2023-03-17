import * as AWS from "aws-sdk";

const region = process.env.AWS_REGION;

export const dynamoDbConfigs = {
  region,
  productsTableName: process.env.PRODUCTS_TABLE_NAME,
  stocksTableName: process.env.STOCKS_TABLE_NAME,
};

AWS.config.update({
  region,
});

export const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
