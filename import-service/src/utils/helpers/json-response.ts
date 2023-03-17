import { APIGatewayProxyResult } from "aws-lambda";

export const jsonResponse = (
  body: any,
  statusCode = 200,
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
