import React, { useState } from "react"
import UserService from "@/lib/services/user"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  })

type FieldValues = z.infer<typeof registerSchema>

function RegisterScreen() {
  const [isDisabled, setIsDisabled] = useState<boolean>()
  const form = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const registerHandler: SubmitHandler<FieldValues> = (formData) => {
    const { confirmPassword, ...data } = formData

    setIsDisabled(true)
    UserService.createUser(data)
      .then((res) => {
        console.log(res)
      })
      .finally(() => {
        setIsDisabled(false)
      })
    return
  }

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full">
      <h1 className="text-5xl mt-[30px]">Register</h1>
      <div className="text-2xl flex flex-col justify-start mt-44 items-center flex-auto w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(registerHandler)}
            className="flex flex-col justify-start items-stretch gap-4 w-full max-w-96"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex flex-col justify-start items-stretch gap-0 w-full">
                      <FormLabel>Email Address</FormLabel>
                      <FormDescription>
                        Enter your email address.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex flex-col justify-start items-stretch gap-0 w-full">
                      <FormLabel>Password</FormLabel>
                      <FormDescription>Enter your password.</FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex flex-col justify-start items-stretch gap-0 w-full">
                      <FormLabel>Confirm password</FormLabel>
                      <FormDescription>Confirm your password.</FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )
              }}
            />
            <Button
              type="submit"
              disabled={isDisabled}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegisterScreen
