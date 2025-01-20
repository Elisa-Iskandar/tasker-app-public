import TaskerClient from "../../client/tasker-api"
import {
  CreateUserPayload,
  AssignUserPayload,
  ChangePasswordPayload,
} from "./types"

class UserServiceDef {
  private client: TaskerClient
  constructor(client: TaskerClient) {
    this.client = client
  }
  async getUserById(userId: string) {
    return this.client.getUserById(userId)
  }

  async createUser(payload: CreateUserPayload) {
    try {
      const res = await this.client.createUser(payload)
      const { success } = res
      if (!res || !success) {
        throw new Error("Failed to create user")
      }
      return res
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  //come back to this
  async deleteUser(userId: string) {
    return this.client.deleteUser(userId)
  }

  async changePassword(payload: ChangePasswordPayload) {
    return this.client.changePassword(payload)
  }

  async assignRole(payload: AssignUserPayload) {
    return this.client.assignRole(payload)
  }
}

const UserService = new UserServiceDef(new TaskerClient())
export default UserService
