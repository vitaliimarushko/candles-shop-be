import { Product } from "../models/Product";
import { dynamoDbClient, dynamoDbConfigs } from "../connection";

const { productsTableName, stocksTableName } = dynamoDbConfigs;

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
    console.warn(
      `>>> Some item doesn't exist in either "${productsTableName}" or "${stocksTableName}" table`,
    );
    return null;
  }

  console.info(`>>> Successfully retrieved item by "${id}" product ID`);

  return {
    ...productsResult?.Items?.[0],
    ...stocksResult?.Item,
  };
};
