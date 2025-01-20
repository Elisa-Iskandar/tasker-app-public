// This is the entry point of the backend application.
// It starts an express server and listens on the port defined in the environment variable PORT.
import express from "express"
import dotenv from "dotenv"
import httpContext from "express-http-context"
import cors from "cors"
import bodyParser from "body-parser"
import authRouter from "./controllers/auth"
import userRouter from "./controllers/user"

// Load environment variables from .env file
dotenv.config()
// Create an express application
const app = express()
// Define the port on which the server will listen
const port = process.env.PORT || 8080

// Middleware to parse incoming requests with JSON payloads
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(httpContext.middleware)

// Define a route handler for the root path ("/")

// app.use("/auth", authRouter)
app.use("/users", userRouter)

// Start the server and listen on the defined port
app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  .on("error", (err) => {
    throw new Error(err.message)
  })
