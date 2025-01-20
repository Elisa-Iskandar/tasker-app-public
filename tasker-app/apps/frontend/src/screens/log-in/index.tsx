import React from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import clsx from "clsx"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type FormValues = z.infer<typeof formSchema>

function LogInScreen() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 w-full max-w-md flex flex-col justify-start items-stretch gap-2"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-stretch justify-start gap-2">
                <FormLabel>
                  Email Address<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="email"
                    className={clsx(
                      form.formState.errors.email && "!border-red-500",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  className={clsx(
                    form.formState.errors.password && "!border-red-500",
                  )}
                />
              </FormControl>
              <FormDescription>Please enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2">
          <Button type="submit">
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LogInScreen
