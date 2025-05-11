import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// In-memory data store (will be replaced with MongoDB later)
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

// GET /api/users - Get all users
export async function GET() {
  return NextResponse.json(users)
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
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

    // Create new user
    const newUser = {
      ...validatedData,
      id: String(Date.now()), // Generate a unique ID
    }

    // Add to users array
    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
