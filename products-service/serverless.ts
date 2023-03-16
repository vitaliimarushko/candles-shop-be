import type { AWS } from "@serverless/typescript";
import getProductsList from "@functions/getProductsList";
import getProductsById from "@functions/getProductsById";
import createProduct from "@functions/createProduct";

module.exports = {
  service: "products-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-central-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE_NAME || "products",
      STOCKS_TABLE_NAME: process.env.STOCKS_TABLE_NAME || "stocks",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamoDb:*", "lambda:InvokeFunction"],
        Resource: [
          "arn:aws:lambda:eu-central-1:585535138615:function:products-service-dev-getProductsList",
          "arn:aws:lambda:eu-central-1:585535138615:function:products-service-dev-getProductsById",
          "arn:aws:lambda:eu-central-1:585535138615:function:products-service-dev-createProduct",
          "arn:aws:dynamodb:eu-central-1:585535138615:table/products",
          "arn:aws:dynamodb:eu-central-1:585535138615:table/stocks",
        ],
      },
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogStream",
          "logs:CreateLogGroup",
          "logs:TagResource",
          "logs:PutLogEvents",
        ],
        Resource: [
          "arn:aws:logs:eu-central-1:585535138615:log-group:/aws/lambda/products-service-dev*:*",
        ],
      },
    ],
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
} as AWS;
