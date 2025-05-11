import type { User } from "./types";

const API_BASE = "http://localhost:5000/users";

// Get all users
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

// Get user by ID
export async function getUserById(id: string): Promise<User> {
  if (id === "new") {
    throw new Error("Invalid user ID");
  }

  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }

  return response.json();
}

// Create a new user
export async function createUser(userData: Omit<User, "id">): Promise<User> {
  const response = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create user");
  }

  return response.json();
}

// Update an existing user
export async function updateUser(id: string, userData: User): Promise<User> {
  if (!id) throw new Error("Missing user ID");

  try {
    console.log(id, userData);
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to update user (status: ${response.status})`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Error in updateUser():", err);
    throw err;
  }
}

// Delete a user
export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete user");
  }
}
