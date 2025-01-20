import AuthServices from "../../services/auth"
import UserService from "../../services/user"
import { Router } from "express"
import * as httpContext from "express-http-context"
import jwt from "../../utils/jwt"
import { StatusCodes } from "http-status-codes"
import { PrismaClient, User } from "@prisma/client"

const authRouter = Router()

type LoginSuccessResponse = {
  success: true
  data: {
    user: Omit<User, "password">
    token: string
  }
}

type LoginErrorResponse = {
  success: false
  message: string
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body

  const prisma = new PrismaClient()
  await prisma.$connect()
  const newUser = await prisma.user.create({ data: { email, password } })

  if (!newUser) {
    return res.status(400).json({ message: "User not created" })
  }

  return res.status(201).json(newUser)
})

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await AuthServices.login({ email, password })
    if (!user) throw new Error("INVALID_CREDENTIALS")
    const token = jwt.sign({ id: user.id, email: user.email })

    const responseData: LoginSuccessResponse = {
      success: true,
      data: { user, token },
    }

    return res.status(StatusCodes.OK).json(responseData)
  } catch (error: any) {
    res.header("Content-Type", "application/json")

    switch (error.message) {
      case "USER_NOT_FOUND":
        const resNotFound: LoginErrorResponse = {
          success: false,
          message: "User does not exist",
        }
        return res.status(StatusCodes.NOT_FOUND).json(resNotFound)
      case "INVALID_CREDENTIALS":
        const resInvalid: LoginErrorResponse = {
          success: false,
          message: "Invalid credentials",
        }
        return res.status(StatusCodes.UNAUTHORIZED).json(resInvalid)
      default:
        const resServerError: LoginErrorResponse = {
          success: false,
          message: "Internal server error",
        }
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(resServerError)
    }
  }
})

authRouter.get("/me", async (req, res) => {
  try {
    const user = httpContext.get("user")
    if (!user) {
      const user = await AuthServices.getUserbyId(req.cookies.user.id)
    }
    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

export default authRouter
