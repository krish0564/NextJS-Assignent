"use client"

import { UserForm } from "@/components/user-form"
import Link from "next/link"

export default function NewUserPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New User</h1>
        <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          Back to List
        </Link>
      </div>
      <UserForm />
    </div>
  )
}
