import * as AWS from "aws-sdk";
import * as serverlessConfigs from "../../../serverless";

const { environment, region } = (serverlessConfigs as any).provider;
const { PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME } = environment;

export const dynamoDbConfigs = {
  region: process.env.AWS_REGION || region || "en-central-1",
  productsTableName:
    process.env.PRODUCTS_TABLE_NAME || PRODUCTS_TABLE_NAME || "products",
  stocksTableName:
    process.env.STOCKS_TABLE_NAME || STOCKS_TABLE_NAME || "stocks",
};

AWS.config.update({
  region: dynamoDbConfigs.region,
});

export const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
