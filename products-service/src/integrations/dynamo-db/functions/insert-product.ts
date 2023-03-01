import { Product } from "../../../models/Product";
import { dynamoDbClient } from "../connection";

const productsTableName = process.env.PRODUCTS_TABLE_NAME || "products";
// const stocksTableName = process.env.STOCKS_TABLE_NAME || "stocks";

/**
 * Inserts a new item into the "products" table
 *
 * @param { Product } product
 */
export const insertProduct = async (product: Product) => {
  await dynamoDbClient.put({
    TableName: productsTableName,
    Item: product,
  });
};
