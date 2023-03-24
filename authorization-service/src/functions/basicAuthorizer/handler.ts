import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { generatePolicy } from "../../utils/helpers/generate-policy";

const GITHUB_ACCOUNT_NAME = process.env.GITHUB_ACCOUNT_NAME;
const PASSWORD_STRING = process.env.PASSWORD_STRING;

const basicToken = Buffer.from(
  `${GITHUB_ACCOUNT_NAME}:${PASSWORD_STRING}`,
).toString("base64");

export const main = async (event: APIGatewayTokenAuthorizerEvent) => {
  const authorizationHeader = event.authorizationToken;

  if (!authorizationHeader?.startsWith("Basic ")) {
    return "Unauthorized";
  }

  if (basicToken !== authorizationHeader.split("Basic ")?.[1]) {
    return generatePolicy({
      principalId: basicToken,
      resource: event.methodArn,
      effect: "Deny",
    });
  }

  return generatePolicy({
    principalId: basicToken,
    resource: event.methodArn,
    effect: "Allow",
  });
};
