import { APIGatewayProxyResult } from "aws-lambda";
import { jsonResponse } from "@libs/json-response";
import { getAllProducts } from "../../integrations/dynamo-db";
import { Product } from "../../models/Product";

export const main = async (): Promise<APIGatewayProxyResult> => {
  const allProducts: Product[] = await getAllProducts();

  return jsonResponse(allProducts);
};
