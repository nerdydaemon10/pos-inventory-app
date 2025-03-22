import { BaseModel } from "../../core/models/base.model";

export type Product = BaseModel & {
  sku: string,
  code: string,
  name: string,
  brand: string,
  category: string
}