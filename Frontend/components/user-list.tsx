"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getUsers } from "@/lib/api"
import type { User } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load users",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Interests</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No users found. Add a new user to get started.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.user}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.interest.map((item, index) => (
                      <Badge key={index} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/users/${user.id}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm"
                    >
                      View
                    </Link>
                    <Link
                      href={`/users/${user.id}/edit`}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
