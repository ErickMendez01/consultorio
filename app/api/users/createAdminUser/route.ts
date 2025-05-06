import { z } from "zod"
import { db } from "@/lib/db"

// Define or import the UserRole type
type UserRole = "admin" | "medico" // Replace with actual roles if different

const routeContextSchema = z.object({
  code: z.string(),
  password: z.string(),
  name: z.string(),
  firstLastName: z.string(),
  role: z.string(),
})
export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const createdWithCode = await db.user.findFirst({
      where: {
        codigo: body.code,
      },
    })
    if (createdWithCode?.codigo) {
      return new Response(
        JSON.stringify({ message: "CODE_EXISTS", created: false }),
        {
          status: 200,
        }
      )
    }

    const newUser = await db.user.create({
      data: {
        codigo: body.code,
        password: body.password,
        nombre: body.name,
        apellido: body.firstLastName,
        role: body.role as UserRole,
      },
    })
    return new Response(JSON.stringify({ user: newUser, created: true }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "INTERNAL_ERROR" }), {
      status: 500,
    })
  }
}
