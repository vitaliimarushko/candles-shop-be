import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { jsonResponse } from "./json-response";

export const handlerTryCatch = (
  handler: (event: APIGatewayEvent) => Promise<APIGatewayProxyResult>,
) => {
  return async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event);
    } catch (error) {
      return jsonResponse(
        {
          message:
            error.message || error.validationMessage || "Internal server error",
        },
        error.statusCode || 500,
      );
    }
  };
};
