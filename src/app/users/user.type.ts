import { BaseModel } from "../core/models/base.model";

export type User = BaseModel & {
  username: string
  email: string
}