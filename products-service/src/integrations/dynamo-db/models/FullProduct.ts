import * as Yup from "yup";
import { ProductSchema } from "./Product";

export const FullProductSchema = ProductSchema.shape({
  count: Yup.number().positive().required().defined().default(0),
});

export type FullProduct = Yup.InferType<typeof FullProductSchema>;
