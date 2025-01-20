export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export enum ROLE {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
}

export interface User {
  id: number
  email: string
  role: ROLE
  name: string | null
  createdAt: string
  updatedAt: string
  teamId: string | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  success: true
  message?: string
  data?: {
    token: string
    user: User
  }
}

type UserResponse = {
  success: boolean
  data: User
}

export interface GetUserResponse extends UserResponse {}
export interface CreateUserResponse extends UserResponse {}
export interface AssignRoleResponse extends UserResponse {}
export interface ChangePasswordResponse extends UserResponse {}

export interface DeleteUserResponse {
  success: boolean
}

export interface CreateUserPayLoad {
  email: string
  password: string
}

export type ChangePasswordPayload = {
  id: string
  oldPassword: string
  newPassword: string
}

export type AssignRolePayload = {
  id: string
  role: ROLE
}
