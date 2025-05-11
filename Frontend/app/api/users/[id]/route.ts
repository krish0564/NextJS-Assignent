import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Reference to the in-memory data store from the main users route
// In a real app, this would be a database connection
const users = [
  {
    id: "1",
    user: "Harry Potter",
    interest: ["Magic", "Quidditch"],
    age: 22,
    mobile: 4234243224,
    email: "harry@hogwarts.com",
  },
  {
    id: "2",
    user: "Hermione Granger",
    interest: ["Books", "Magic", "S.P.E.W."],
    age: 22,
    mobile: 7896543210,
    email: "hermione@hogwarts.com",
  },
  {
    id: "3",
    user: "Ron Weasley",
    interest: ["Chess", "Food", "Quidditch"],
    age: 22,
    mobile: 1234567890,
    email: "ron@hogwarts.com",
  },
]

// Validation schema
const userSchema = z.object({
  user: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.number().int().positive("Age must be a positive integer"),
  mobile: z.number().int().positive("Mobile number must be a positive integer"),
  interest: z.array(z.string()),
})

// GET /api/users/[id] - Get a specific user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

// PUT /api/users/[id] - Update a user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Convert interest from string to array if it's a string
    if (typeof body.interest === "string") {
      body.interest = body.interest
        .split(",")
        .map((item: string) => item.trim())
        .filter(Boolean)
    }

    // Validate request body
    const validatedData = userSchema.parse(body)

    // Find user index
    const index = users.findIndex((u) => u.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user
    users[index] = {
      ...validatedData,
      id: params.id,
    }

    return NextResponse.json(users[index])
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const index = users.findIndex((u) => u.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Remove user from array
  users.splice(index, 1)

  return NextResponse.json({ success: true })
}
