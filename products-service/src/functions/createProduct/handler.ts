import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import {
  RequestBody,
  RequestBodySchema,
} from "@functions/createProduct/schema";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { validateBody } from "@libs/validate-body";
import { jsonResponse } from "@libs/json-response";
import { insertProduct } from "../../integrations/dynamo-db";
import { FullProduct } from "../../integrations/dynamo-db/models/FullProduct";

export const main = handlerTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const requestBody: RequestBody = await validateBody({
      event,
      schema: RequestBodySchema,
    });

    const newFullProduct: FullProduct = {
      id: uuidv4(),
      title: requestBody.title,
      description: requestBody.description,
      price: requestBody.price || 0,
      count: requestBody.count || 0,
    };

    await insertProduct(newFullProduct);

    return jsonResponse(newFullProduct, 201);
  },
);
