"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getUserById } from "@/lib/api"
import type { User } from "@/lib/types"
import { UserForm } from "@/components/user-form"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function EditUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Skip fetching if the ID is "new"
        if (params.id === "new") {
          setLoading(false)
          return
        }

        setLoading(true)
        const userData = await getUserById(params.id)
        setUser(userData)
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load user details",
          variant: "destructive",
        })
        // Navigate back to the home page if user not found
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id, router])

  if (params.id === "new") {
    // Redirect to the new user page
    router.push("/users/new")
    return <div className="container mx-auto py-10 px-4">Redirecting...</div>
  }

  if (loading) {
    return <div className="container mx-auto py-10 px-4">Loading...</div>
  }

  if (!user) {
    return <div className="container mx-auto py-10 px-4">User not found</div>
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit User</h1>
        <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Back to List
        </Link>
      </div>
      <UserForm initialData={user} userId={params.id} />
    </div>
  )
}
