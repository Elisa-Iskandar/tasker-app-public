import { User } from "../../repository/user/types"

export interface LoginResponse extends Omit<User, "password"> {}
export interface LoginPayload {
  email: string
  password: string
}
