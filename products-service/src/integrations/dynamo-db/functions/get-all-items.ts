import { dynamoDbClient } from "../connection";

/**
 * Retrieves all the existing products from "products" table
 *
 * @returns { Promise<T[]> }
 */
export const getAllItems = async <T>(tableName: string): Promise<T[]> => {
  const results = await dynamoDbClient.scan({ TableName: tableName }).promise();

  console.info(
    `>>> Retrieved ${results.Items.length} items from "${tableName}" table`,
  );

  return (results?.Items as any) || [];
};
