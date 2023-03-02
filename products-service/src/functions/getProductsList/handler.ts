import { APIGatewayProxyResult } from "aws-lambda";
import { jsonResponse } from "@libs/json-response";
import { getAllItems } from "../../integrations/dynamo-db";
import { Product } from "../../integrations/dynamo-db/models/Product";
import { dynamoDbConfigs } from "../../integrations/dynamo-db";

const { productsTableName } = dynamoDbConfigs;

export const main = async (): Promise<APIGatewayProxyResult> => {
  const allProducts: Product[] = await getAllItems(productsTableName);

  return jsonResponse(allProducts);
};
