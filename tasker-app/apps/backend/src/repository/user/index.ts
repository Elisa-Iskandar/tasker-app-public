import { PrismaClient } from "@prisma/client"
import dbClient from "../../client/prisma-mongodb"
import { User, UpdateUserArgs } from "./types"

class UserRepositoryDef {
  private db: PrismaClient
  constructor(dbClient: PrismaClient) {
    this.db = dbClient
  }

  async createUser(newUser: {
    email: string
    password: string
  }): Promise<User | null> {
    try {
      const createdUser = await this.db.user.create({
        data: { email: newUser.email, password: newUser.password },
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

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
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

  async getUser({ id }: { id: string }): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
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

  async updateUser({
    id,
    ...restOfUser
  }: UpdateUserArgs): Promise<User | null> {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: restOfUser,
      })

      if (!user) {
        throw new Error("User not updated")
      }

      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async deleteUser({ id }: { id: string }): Promise<boolean> {
    try {
      this.db.user.delete({
        where: { id },
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

// export const UserRepository = new UserRepositoryDef(dbClient)
const UserRepository = new UserRepositoryDef(new PrismaClient())
export { UserRepositoryDef }
export default UserRepository
