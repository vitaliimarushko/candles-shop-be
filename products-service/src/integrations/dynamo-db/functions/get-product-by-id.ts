import { Product } from "../../../models/Product";
import { dynamoDbClient } from "../connection";

const productsTableName = process.env.PRODUCTS_TABLE_NAME || "products";
const stocksTableName = process.env.STOCKS_TABLE_NAME || "stocks";

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
