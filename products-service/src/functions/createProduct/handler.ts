import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import {
  RequestData,
  RequestDataSchema,
} from "@functions/createProduct/schema";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { validateEvent } from "@libs/validate-event";
import { jsonResponse } from "@libs/json-response";
import { insertProduct } from "../../integrations/dynamo-db";
import { FullProduct } from "../../integrations/dynamo-db/models/FullProduct";

export const main = handlerTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const requestData: RequestData = await validateEvent({
      event,
      schema: RequestDataSchema,
      field: "body",
    });

    const newFullProduct: FullProduct = {
      id: uuidv4(),
      title: requestData.title,
      description: requestData.description,
      price: requestData.price || 0,
      count: requestData.count || 0,
    };

    await insertProduct(newFullProduct);

    return jsonResponse(newFullProduct, 201);
  },
);
