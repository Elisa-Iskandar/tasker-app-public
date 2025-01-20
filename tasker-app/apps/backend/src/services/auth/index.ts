import { PrismaClient, User } from "@prisma/client"
import UserRepository, { UserRepositoryDef } from "../../repository/user"
import * as bcrypt from "bcrypt"
import { omit } from "lodash"
import { StatusCodes } from "http-status-codes"
import { LoginResponse, LoginPayload } from "./types"

class AuthServicesDef {
  private userRepo: UserRepositoryDef
  constructor(userRepo: UserRepositoryDef) {
    this.userRepo = userRepo
  }

  async login({
    email,
    password,
  }: LoginPayload): Promise<LoginResponse | null> {
    const user = await this.userRepo.getUserByEmail(email)
    if (!user) throw new Error("USER_NOT_FOUND")
    const isPasswordValid = password === user.password
    // const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error("INVALID_CREDENTIALS")
    }
    return omit(user, "password")
  }

  async getUserbyId(id: string) {
    const user = await this.userRepo.getUser({ id })
    if (!user) {
      throw new Error("USER_NOT_FOUND")
    }
    return user
  }

  async register({ email, password }: { email: string; password: string }) {
    try {
      const prisma = new PrismaClient()
      await prisma.$connect()
      const newUser = await prisma.user.create({ data: { email, password } })
      // const newUser = await this.userRepo.createUser({
      //   email,
      //   password,
      // })

      if (!newUser) {
        throw new Error("User not created")
      }

      return newUser
    } catch (error) {
      console.log(error)
      return null
    }
    // Do something
  }

  async logout() {
    // Do something
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userRepo.getUserByEmail(email)

      if (!user) {
        throw new Error("User not found")
      }

      // Send email with reset password link

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

const AuthServices = new AuthServicesDef(UserRepository)
export default AuthServices
