"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { User } from "@/lib/types"
import { createUser, updateUser } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

// Define the form schema with validation
const formSchema = z.object({
  user: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  age: z.coerce.number().int().positive({
    message: "Age must be a positive integer.",
  }),
  mobile: z.coerce.number().int().positive({
    message: "Mobile number must be a positive integer.",
  }),
  interest: z.string().transform((val) =>
    val
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  ),
})

type FormValues = z.infer<typeof formSchema>

interface UserFormProps {
  initialData?: User
  userId?: string
}

export function UserForm({ initialData, userId }: UserFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form with default values or existing user data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          user: initialData.user,
          email: initialData.email,
          age: initialData.age,
          mobile: initialData.mobile,
          interest: initialData.interest.join(", "),
        }
      : {
          user: "",
          email: "",
          age: undefined,
          mobile: undefined,
          interest: "",
        },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      if (userId) {
        // Update existing user
        await updateUser(userId, {
          ...values,
          id: userId,
        })
        toast({
          title: "Success",
          description: "User updated successfully",
        })
      } else {
        // Create new user
        await createUser(values)
        toast({
          title: "Success",
          description: "User created successfully",
        })
      }
      router.push("/")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>This is the display name for the user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter interests (comma separated)" {...field} />
                  </FormControl>
                  <FormDescription>Enter interests separated by commas (e.g., Comics, Sports, Music)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : userId ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
