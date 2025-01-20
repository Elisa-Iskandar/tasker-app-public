import axios from "axios"
import {
  Method,
  LoginResponse,
  LoginPayload,
  CreateUserPayLoad,
  GetUserResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  CreateUserResponse,
  AssignRolePayload,
  AssignRoleResponse,
  DeleteUserResponse,
} from "./types"

class TaskerClient {
  // Auth Endpoints
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await this.makeRequest("auth/login", "POST", payload)
    const { data } = response
    return data
  }

  // Users Endpoints
  async getUserById(id: string): Promise<GetUserResponse> {
    const response = await this.makeRequest(`/users/${id}`, "GET")
    const { data } = response
    return data
  }

  async createUser(user: CreateUserPayLoad): Promise<CreateUserResponse> {
    console.log("client", user)
    const response = await this.makeRequest("/users", "POST", user)
    const { data } = response
    return data
  }

  async deleteUser(id: string): Promise<DeleteUserResponse> {
    const response = await this.makeRequest(`/users/${id}`, "DELETE")
    const { data } = response
    return data
  }

  async changePassword(
    payload: ChangePasswordPayload,
  ): Promise<ChangePasswordResponse> {
    const response = await this.makeRequest(`/users`, "PATCH", payload)
    const { data } = response
    return data
  }

  async assignRole(payload: AssignRolePayload): Promise<AssignRoleResponse> {
    const response = await this.makeRequest(`/users`, "PATCH", payload)
    const { data } = response
    return data
  }

  // Tasks Endpoints

  // Teams Endpoints

  // Files Endpoints

  private async makeRequest(path: string, method: Method, body?: any) {
    const fetch = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return fetch(path, {
      method,
      data: body,
    })
  }
}

export default TaskerClient
