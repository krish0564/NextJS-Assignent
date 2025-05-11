import type { User } from "./types"

// Get all users
export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users")

  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }

  return response.json()
}

// Get user by ID
export async function getUserById(id: string): Promise<User> {
  // Return early if the ID is "new"
  if (id === "new") {
    throw new Error("Invalid user ID")
  }

  const response = await fetch(`/api/users/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`)
  }

  return response.json()
}

// Create a new user
export async function createUser(userData: Omit<User, "id">): Promise<User> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to create user")
  }

  return response.json()
}

// Update an existing user
export async function updateUser(id: string, userData: User): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to update user")
  }

  return response.json()
}

// Delete a user
export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to delete user")
  }
}
