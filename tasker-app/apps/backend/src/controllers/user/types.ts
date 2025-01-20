import { User as PrismaUser } from "@prisma/client"

export interface User extends Omit<PrismaUser, "password"> {}

export interface ErrorResponse {
  success: false
  message: string
}

export type GetUserResponse = { success: true; data: { user: User } }
export type CreateUserResponse = { success: true; data: { user: User } }
export type ChangePasswordResponse = { success: true; data: { user: User } }
export type AssignRoleResponse = {
  success: true
  data: { user: User }
}
export type DeleteUserResponse = { success: true }
