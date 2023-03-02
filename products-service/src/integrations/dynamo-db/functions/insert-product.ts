import { FullProduct } from "../models/FullProduct";
import { dynamoDbClient, dynamoDbConfigs } from "../connection";

const { productsTableName, stocksTableName } = dynamoDbConfigs;

/**
 * Inserts a new item into the "products" table
 *
 * @param { FullProduct } product
 * @returns { void }
 */
export const insertProduct = async (product: FullProduct): Promise<void> => {
  await dynamoDbClient
    .transactWrite({
      TransactItems: [
        {
          Put: {
            Item: {
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price || 0,
            },
            TableName: productsTableName,
          },
        },
        {
          Put: {
            Item: {
              product_id: product.id,
              count: product.count || 0,
            },
            TableName: stocksTableName,
          },
        },
      ],
    })
    .promise();

  console.log(
    `>>> New item with "${product.id}" product ID was successfully inserted to the DB`,
  );
};
