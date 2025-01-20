import { ROLE } from "@/lib/client/tasker-api/types"

export interface CreateUserPayload {
  email: string
  password: string
}

export interface AssignUserPayload {
  id: string
  role: ROLE
}

export interface ChangePasswordPayload {
  id: string
  oldPassword: string
  newPassword: string
}
