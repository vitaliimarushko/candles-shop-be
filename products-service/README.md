## Service content

### Endpoints

- GET - https://9hhpsvckda.execute-api.eu-central-1.amazonaws.com/dev/products
- GET - https://9hhpsvckda.execute-api.eu-central-1.amazonaws.com/dev/products/{productId}

## Using service locally

### Migrations

- create DynamoDB tables:
  ```
  npm run migrate:create
  ```
- put new items into all DynamoDB tables:
  ```
  npm run migrate:put
  ```

### Testing

For testing how function works you can execute these CLI commands:
- get all the products:
  ```
  sls invoke local -f getProductsList
  ```
- get one existing product:
  ```
  sls invoke local -f getProductsById --data '{"pathParameters": {"productId":"f2e8da78-fa9d-4981-acf5-d4dc0741d881"}}'
  ```
- get one non-existing product:
  ```
  sls invoke local -f getProductsById --data '{"pathParameters": {"productId":"251c4dc1-7a08-4c65-85a2-f3632362cdbf"}}'
  ```

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.
