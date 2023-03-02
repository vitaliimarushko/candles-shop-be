import { Product } from "../models/Product";
import { dynamoDbClient } from "../connection";

/**
 * Retrieves all the existing products from "products" table
 *
 * @returns { Promise<Product[]> }
 */
export const getAllItems = async (tableName: string): Promise<Product[]> => {
  const results = await dynamoDbClient.scan({ TableName: tableName }).promise();

  console.info(
    `>>> Retrieved ${results.Items.length} items from "${tableName}" table`,
  );

  return results?.Items || [];
};
