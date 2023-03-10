import { APIGatewayProxyResult, APIGatewayEvent, S3Event } from "aws-lambda";
import { jsonResponse } from "./json-response";

export const handlerTryCatch = (
  handler: (
    event: APIGatewayEvent | S3Event | void,
  ) => Promise<APIGatewayProxyResult>,
) => {
  return async (
    event: APIGatewayEvent | S3Event | void,
  ): Promise<APIGatewayProxyResult> => {
    console.info(`>>> Incoming event:`, JSON.stringify(event || ""));

    try {
      return await handler(event);
    } catch (error) {
      const message =
        error.message || error.validationMessage || "Internal server error";
      console.error(`>>> ${message}`);
      return jsonResponse({ message }, error.statusCode || 500);
    }
  };
};
