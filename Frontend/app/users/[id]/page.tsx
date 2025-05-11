"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getUserById, deleteUser } from "@/lib/api"
import type { User } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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
        console.error("Error fetching user:", error)
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

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(params.id)
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
        router.push("/")
      } catch (error) {
        console.error("Error deleting user:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete user",
          variant: "destructive",
        })
      }
    }
  }

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
        <h1 className="text-3xl font-bold">User Details</h1>
        <div className="flex gap-2">
          <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            Back to List
          </Link>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{user.user}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p>{user.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mobile</p>
            <p>{user.mobile}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interests</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.interest.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link
            href={`/users/${params.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Edit
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
