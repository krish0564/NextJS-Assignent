import Link from "next/link"
import { UserList } from "@/components/user-list"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Management System</h1>
        <Link href="/users/new" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          Add New User
        </Link>
      </div>
      <UserList />
    </main>
  )
}
