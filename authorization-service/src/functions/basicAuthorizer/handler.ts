import { APIGatewayRequestAuthorizerEvent } from "aws-lambda";
import { withTryCatch } from "../../middlewares/with-try-catch";
import { jsonResponse } from "../../utils/helpers/json-response";

const GITHUB_ACCOUNT_NAME = process.env.GITHUB_ACCOUNT_NAME;
const PASSWORD_STRING = process.env.PASSWORD_STRING;

const basicToken = Buffer.from(
  `${GITHUB_ACCOUNT_NAME}:${PASSWORD_STRING}`,
).toString("base64");

export const main = withTryCatch(
  async (event: APIGatewayRequestAuthorizerEvent) => {
    const authorizationHeader = event.headers.Authorization;

    if (!authorizationHeader?.startsWith("Basic ")) {
      throw {
        statusCode: 401,
        message: "Authorization header is wrong or not provided",
      };
    }

    if (basicToken !== authorizationHeader.split("Basic ")?.[1]) {
      throw {
        statusCode: 403,
        message: "Wrong credentials",
      };
    }

    return jsonResponse({
      isAuthorized: true,
    });
  },
);
