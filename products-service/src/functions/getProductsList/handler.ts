import { APIGatewayProxyResult } from "aws-lambda";
import { jsonResponse } from "@libs/json-response";
import { getAllItems } from "../../integrations/dynamo-db";
import { FullProduct } from "../../integrations/dynamo-db/models/FullProduct";
import { Product } from "../../integrations/dynamo-db/models/Product";
import { Stock } from "../../integrations/dynamo-db/models/Stock";
import { dynamoDbConfigs } from "../../integrations/dynamo-db";

const { productsTableName, stocksTableName } = dynamoDbConfigs;

export const main = async (): Promise<APIGatewayProxyResult> => {
  const [productArray, stocksArray] = await Promise.all([
    getAllItems<Product>(productsTableName),
    getAllItems<Stock>(stocksTableName),
  ]);

  const allProducts: FullProduct[] = [];

  for (const product of productArray) {
    allProducts.push({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      count:
        stocksArray.find((stock: Stock) => {
          return product.id === stock.product_id;
        })?.count || 0,
    });
  }

  return jsonResponse(allProducts);
};
