import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { jsonResponse } from "./json-response";

export const handlerTryCatch = (
  handler: (event: APIGatewayEvent) => Promise<APIGatewayProxyResult>,
) => {
  return async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
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
