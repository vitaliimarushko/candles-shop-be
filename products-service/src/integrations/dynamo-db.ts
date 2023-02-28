import * as AWS from "aws-sdk";
import { Product } from "../models/Product";

const productsTableName = process.env.PRODUCTS_TABLE_NAME || "products";
const stocksTableName = process.env.STOCKS_TABLE_NAME || "stocks";

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: "default",
});

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

/**
 * Retrieves all the existing products from "products" table
 *
 * @returns { Promise<Product[]> }
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const results = await dynamoDbClient
    .scan({ TableName: productsTableName })
    .promise();

  return results?.Items || [];
};

/**
 * Retrieves a product by product ID value from "products" and "stocks" tables
 *
 * @param { string } id
 * @returns { Promise<Product | null> }
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const [productsResult, stocksResult] = await Promise.all([
    dynamoDbClient
      .query({
        TableName: productsTableName,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: { ":id": id },
      })
      .promise(),
    dynamoDbClient
      .get({
        TableName: stocksTableName,
        AttributesToGet: ["count"],
        Key: {
          product_id: id,
        },
      })
      .promise(),
  ]);

  if (!productsResult?.Items?.[0] || !stocksResult?.Item) {
    return null;
  }

  return {
    ...productsResult?.Items?.[0],
    ...stocksResult?.Item,
  };
};

/**
 * Inserts a new item into the "products" table
 *
 * @param { Product } product
 */
// export const insertProduct = async (product: Product) => {
//   await dynamoDbClient.put({
//     TableName: productsTableName,
//     Item: product,
//   });
// };
