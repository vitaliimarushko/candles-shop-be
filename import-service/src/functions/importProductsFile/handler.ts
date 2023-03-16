import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { handlerTryCatch } from "@libs/handler-try-catch";
import { validateEvent } from "@libs/validate-event";
import { RequestBody, RequestDataSchema } from "./schema";
import { createSignedUrl } from "../../integrations/s3";
import { jsonResponse } from "@libs/json-response";

export const main = handlerTryCatch(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const requestBody: RequestBody = await validateEvent({
      event,
      schema: RequestDataSchema,
      field: "queryStringParameters",
    });

    const url = await createSignedUrl(requestBody.name);

    return jsonResponse({
      url,
    });
  },
);
