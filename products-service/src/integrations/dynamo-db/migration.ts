import { cleanAllData } from "./functions/clean-all-data";
import { insertProduct } from "./functions/insert-product";
import { baseProducts } from "./seeds/base-products";

(async () => {
  await cleanAllData();

  for (const product of baseProducts) {
    await insertProduct(product);
  }

  console.info(
    ">>> All items were removed from the DB and inserted from scratch",
  );
})();
