import * as AWS from "aws-sdk";
import * as serverlessConfigs from "../../../serverless";

const { AWS_REGION, PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME } = (
  serverlessConfigs as any
).provider.environment;

export const dynamoDbConfigs = {
  region: process.env.AWS_REGION || AWS_REGION || "en-central-1",
  productsTableName:
    process.env.PRODUCTS_TABLE_NAME || PRODUCTS_TABLE_NAME || "products",
  stocksTableName:
    process.env.STOCKS_TABLE_NAME || STOCKS_TABLE_NAME || "stocks",
};

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: "default",
});

AWS.config.update({
  region: dynamoDbConfigs.region,
});

export const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
