import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { withTryCatch } from "../../middlewares/with-try-catch";
import { generatePolicy } from "../../utils/helpers/generate-policy";

const GITHUB_ACCOUNT_NAME = process.env.GITHUB_ACCOUNT_NAME;
const PASSWORD_STRING = process.env.PASSWORD_STRING;

const basicToken = Buffer.from(
  `${GITHUB_ACCOUNT_NAME}:${PASSWORD_STRING}`,
).toString("base64");

export const main = withTryCatch(
  async (event: APIGatewayTokenAuthorizerEvent) => {
    const authorizationHeader = event.authorizationToken;

    if (!authorizationHeader?.startsWith("Basic ")) {
      throw {
        statusCode: 401,
        message: "Unauthorized",
      };
    }

    if (basicToken !== authorizationHeader.split("Basic ")?.[1]) {
      throw {
        statusCode: 403,
        message: "Forbidden",
      };
    }

    return generatePolicy({
      principalId: basicToken,
      resource: event.methodArn,
      effect: "Allow",
    });
  },
);
