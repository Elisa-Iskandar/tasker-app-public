import React from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import clsx from "clsx"
import { Button } from "./ui/button"

// This is an example of a form that uses zod for validation

// Step 1: Define the schema
// The formSchema is always a zod object
const formSchema = z.object({
  // define the shape of the form with its fields
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

// Step 2: Define the type of the form values using z.infer for easy type reference
type FormValues = z.infer<typeof formSchema>

export default function ExampleForm() {
  // Step 3: Use the useForm hook to create a form
  const form = useForm<FormValues>({
    // use the zodResolver to validate the form
    resolver: zodResolver(formSchema),
    // set the default values of the form
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // define the submit handler
  const submitHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    // Step 4: Use the Form component to wrap the form
    <Form {...form}>
      {/* Step 5: Use the form control to render the form fields */}
      <form
        className="mt-8 w-full max-w-md flex flex-col justify-start items-stretch gap-2"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {/*  Step 6: Use the FormField component to render the form fields         */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            //  Step 7: Use the FormItem, FormLabel, FormControl, Input, FormDescription, FormMessage components to render the form fields
            <FormItem>
              <div className="flex flex-col items-stretch justify-start gap-2">
                <FormLabel>
                  Email Address<span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Please enter your new password.
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="email"
                    // Step 8: Use the clsx function to conditionally apply classes based on form state
                    // this example changes the border color to red if there is an error
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

        {/* // Step 9: Repeat Step 6-8 for the other form fields */}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm Password<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  className={clsx(
                    form.formState.errors.confirmPassword && "!border-red-500",
                  )}
                />
              </FormControl>
              <FormDescription>Please confirm your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Step 10: Use the Button component to render the submit button */}
        <div className="mt-2">
          <Button type="submit">
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
