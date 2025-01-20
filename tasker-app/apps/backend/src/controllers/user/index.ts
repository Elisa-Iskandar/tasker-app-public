import express, { Request, Response } from "express"
import UserService from "../../services/user"
import { StatusCodes } from "http-status-codes"
import {
  GetUserResponse,
  User,
  ErrorResponse,
  DeleteUserResponse,
  AssignRoleResponse,
  ChangePasswordResponse,
  CreateUserResponse,
} from "./types"

const userRouter = express.Router()

userRouter.get("/:user_id", async (req: Request, res: Response) => {
  const id = req.params.user_id
  try {
    const user = await UserService.getUserId(id)
    if (!user) {
      throw new Error("User not found")
    }

    const response: GetUserResponse = {
      success: true,
      data: { user: user },
    }

    res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const errResponse: ErrorResponse = {
      success: false,
      message: "User not found",
    }
    res.status(StatusCodes.NOT_FOUND).json(errResponse)
  }
})

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    console.log(email, password)
    const createdUser = await UserService.createUser({ email, password })
    if (!createdUser) {
      throw new Error("User not created")
    }
    const response: CreateUserResponse = {
      success: true,
      data: { user: createdUser },
    }

    res.header("Content-Type", "application/json")

    res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const errResponse: ErrorResponse = {
      success: false,
      message: "Internal Server Error. Could not create user.",
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errResponse)
  }
})

userRouter.delete("/:user_id", async (req: Request, res: Response) => {
  const id = req.params.user_id
  try {
    const user = await UserService.getUserId(id)

    if (!user) throw new Error("USER_NOT_FOUND")

    const deletedUser = await UserService.deleteUser(id)

    if (!deletedUser) throw new Error("USER_NOT_DELETED")

    const response: DeleteUserResponse = {
      success: true,
    }
    res.status(StatusCodes.ACCEPTED).json(response)
  } catch (error: any) {
    switch (error.message) {
      case "USER_NOT_FOUND":
        const resNotFound: ErrorResponse = {
          success: false,
          message: "User does not exist.",
        }
        res.status(StatusCodes.NOT_FOUND).json(resNotFound)
        break
      case "USER_NOT_DELETED":
        const errResponse: ErrorResponse = {
          success: false,
          message: "Internal Server Error. Could not delete user.",
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errResponse)
        break
    }
  }
})

userRouter.patch("/", async (req: Request, res: Response) => {
  const { id, oldPassword, newPassword } = req.body
  try {
    const isPasswordValid = await UserService.validatePassword({
      id,
      password: oldPassword,
    })
    if (!isPasswordValid) throw new Error("INVALID_PASSWORD")

    const updatedUser = await UserService.changePassword({
      id,
      password: newPassword,
    })

    if (!updatedUser) throw new Error("USER_NOT_UPDATED")

    const response: ChangePasswordResponse = {
      success: true,
      data: { user: updatedUser },
    }
    res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    switch (error.message) {
      case "USER_NOT_FOUND":
        const resNotFound: ErrorResponse = {
          success: false,
          message: "User not found",
        }
        res.status(StatusCodes.NOT_FOUND).json(resNotFound)
        break
      case "USER_NOT_UPDATED":
        const errResponse: ErrorResponse = {
          success: false,
          message: "Internal Server Error. Could not change password.",
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errResponse)
        break
    }
  }
})

userRouter.patch("/", async (req: Request, res: Response) => {
  const id = req.params.user_id
  const { role } = req.body
  try {
    const user = await UserService.getUserId(id)

    if (!user) throw new Error("USER_NOT_FOUND")

    const updatedUser = await UserService.assignRole({ id, role })

    if (!updatedUser) throw new Error("USER_NOT_UPDATED")

    const response: AssignRoleResponse = {
      success: true,
      data: { user: updatedUser },
    }

    res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    switch (error.message) {
      case "USER_NOT_FOUND":
        const resNotFound: ErrorResponse = {
          success: false,
          message: "User not found",
        }
        res.status(StatusCodes.NOT_FOUND).json(resNotFound)
        break
      case "USER_NOT_UPDATED":
        const errResponse: ErrorResponse = {
          success: false,
          message: "Internal Server Error. Could assign new role.",
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errResponse)
        break
    }
  }
})

export default userRouter
