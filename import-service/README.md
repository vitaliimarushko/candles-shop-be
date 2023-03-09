## Service content

### Endpoints

-

## Using service locally

### Testing

For testing how function works you can execute these CLI commands:
- get all the products:
  ```
  sls invoke local -f getProductsList
  ```
- get one existing product:
  ```
  sls invoke local -f importProductsFile --data '{"queryStringParameters": {"name":"corners.csv"}}'
  ```
- get one non-existing product:
  ```
  sls invoke local -f getProductsById --data '{"pathParameters": {"productId":"251c4dc1-7a08-4c65-85a2-f3632362cdbf"}}'
  ```
