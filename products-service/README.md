## Service content

Endpoints:

- GET - https://ym2rzsu3va.execute-api.eu-central-1.amazonaws.com/dev/products
- GET - https://ym2rzsu3va.execute-api.eu-central-1.amazonaws.com/dev/products/{productId}

## Test service locally

You can utilize 2 scripts from `package.json`:

- `npm run invoke:getProductsList`
- `npm run invoke:getProductsById`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.
