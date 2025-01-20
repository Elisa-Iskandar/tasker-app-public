import TaskerClient from "../../client/tasker-api"

class AuthServiceDef {
  private client: TaskerClient
  constructor(client: TaskerClient) {
    this.client = client
  }

  async login(email: string, password: string) {
    try {
      const res = await this.client.login({ email, password })
      const { success, message, data } = res
      if (success && data) {
        const { token, user } = data
        localStorage.setItem("token", token)
        return user
      }

      throw new Error(message)
    } catch (error: any) {
      console.error(error)
      return {
        error: error.message,
      }
    }
  }
}

const AuthService = new AuthServiceDef(new TaskerClient())
export default AuthService
