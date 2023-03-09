import { exec } from "child_process";
import { promisify } from "util";
import { resolve, join } from "path";
import { dynamoDbConfigs } from "../connection";

const { productsTableName, stocksTableName, region } = dynamoDbConfigs;
const execPromise = promisify(exec);
const pathTOSeeds = resolve(__dirname, "..", "seeds");
const productTableSchemaPath = join(pathTOSeeds, "products-table-schema.json");
const stocksTableSchemaPath = resolve(pathTOSeeds, "stocks-table-schema.json");

(async () => {
  // creating "products" table
  try {
    await execPromise(
      `aws dynamodb create-table --cli-input-json file://${productTableSchemaPath} --region ${region}`,
    );

    console.info(`>>> "${productsTableName}" table was successfully created`);
  } catch (error) {
    console.error(`>>> ${error.message}`);
  }

  // creating "stocks" table
  try {
    await execPromise(
      `aws dynamodb create-table --cli-input-json file://${stocksTableSchemaPath} --region ${region}`,
    );

    console.info(`>>> "${stocksTableName}" table was successfully created`);
  } catch (error) {
    console.error(`>>> ${error.message}`);
  }
})();
