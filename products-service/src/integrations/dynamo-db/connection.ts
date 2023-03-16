import * as AWS from "aws-sdk";

export const dynamoDbConfigs = {
  region: process.env.AWS_REGION || "en-central-1",
  productsTableName: process.env.PRODUCTS_TABLE_NAME || "products",
  stocksTableName: process.env.STOCKS_TABLE_NAME || "stocks",
};

AWS.config.update({
  region: dynamoDbConfigs.region,
});

export const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
