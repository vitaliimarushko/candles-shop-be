import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { dynamoDbClient, dynamoDbConfigs } from "../connection";
import { getAllItems } from "./get-all-items";

const { productsTableName, stocksTableName } = dynamoDbConfigs;

interface PrepareTransactionItemParamsInterface {
  item: any;
  tableName: string;
  partitionKey: string;
  sortKey?: string;
}

/**
 * Prepares transaction statement for delete operation
 *
 * @param { PrepareTransactionItemParamsInterface } params
 * @returns { DocumentClient.TransactWriteItem }
 */
const prepareTransactionItem = (
  params: PrepareTransactionItemParamsInterface,
): DocumentClient.TransactWriteItem => {
  const { item, tableName, partitionKey, sortKey } = params;
  const statement: DocumentClient.TransactWriteItem = {
    Delete: {
      TableName: tableName,
      Key: {
        [partitionKey]: item[partitionKey],
      },
    },
  };

  if (sortKey) {
    statement.Delete.Key[sortKey] = item[sortKey];
  }

  return statement;
};

/**
 * Removes all items from products and stocks tables
 *
 * @returns { void }
 */
export const cleanAllData = async (): Promise<void> => {
  const [productsItems, stocksItems] = await Promise.all([
    getAllItems(productsTableName),
    getAllItems(stocksTableName),
  ]);

  const transactionItems = [
    ...productsItems.map((item: any) =>
      prepareTransactionItem({
        item,
        tableName: productsTableName,
        partitionKey: "id",
        sortKey: "title",
      }),
    ),
    ...stocksItems.map((item: any) =>
      prepareTransactionItem({
        item,
        tableName: stocksTableName,
        partitionKey: "product_id",
      }),
    ),
  ];

  if (!transactionItems.length) {
    console.info(
      `>>> There is nothing to delete from "${productsTableName}" and "${stocksTableName}" tables`,
    );
    return;
  }

  await dynamoDbClient
    .transactWrite({
      TransactItems: transactionItems,
    })
    .promise();

  console.info(
    `>>> All items were successfully removed from "${productsTableName}" and "${stocksTableName}" tables`,
  );
};
