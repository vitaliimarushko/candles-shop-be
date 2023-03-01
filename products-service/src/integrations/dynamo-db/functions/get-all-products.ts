import { Product } from "../../../models/Product";
import { dynamoDbClient } from "../connection";

const productsTableName = process.env.PRODUCTS_TABLE_NAME || "products";

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
