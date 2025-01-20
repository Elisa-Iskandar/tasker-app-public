import { User as PrismaUser, ROLE } from "@prisma/client"
import UserRepository, { UserRepositoryDef } from "../../repository/user"

type User = Omit<PrismaUser, "password">

class UserServiceDef {
  private userRepo: UserRepositoryDef
  constructor(userRepo: UserRepositoryDef) {
    this.userRepo = userRepo
  }

  async createUser({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<User | null> {
    try {
      const createdUser = await this.userRepo.createUser({
        email,
        password,
      })

      if (!createdUser) {
        throw new Error("User not created")
      }

      return createdUser
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async getUserId(id: string): Promise<User | null> {
    try {
      const user = await this.userRepo.getUser({
        id,
      })

      if (!user) {
        throw new Error("User not found")
      }
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async changePassword({ id, password }: { id: string; password: string }) {
    try {
      const updatedUser = await this.userRepo.updateUser({
        id,
        password,
      })

      if (!updatedUser) {
        throw new Error("User not updated")
      }

      return updatedUser
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async assignRole({ id, role }: { id: string; role: ROLE }) {
    try {
      const updatedUser = await this.userRepo.updateUser({
        id,
        role,
      })

      if (!updatedUser) {
        throw new Error("User not updated")
      }

      return updatedUser
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userRepo.deleteUser({ id })
      return true
    } catch (error) {
      return false
    }
  }

  async validatePassword({ id, password }: { id: string; password: string }) {
    try {
      const user = await this.userRepo.getUser({ id })
      if (!user) {
        throw new Error("User not found")
      }
      return user.password === password
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

const UserService = new UserServiceDef(UserRepository)
export { UserServiceDef }
export default UserService
