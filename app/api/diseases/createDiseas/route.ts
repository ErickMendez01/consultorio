import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  name: z.string(),
  cause: z.string(),
  description: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)

    const newDiseas = await db.enfermedad.create({
      data: {
        nombre: body.name,
        causa: body.cause,
        descripcion: body.description,
      },
    })

    return new Response(
      JSON.stringify({ diseas: newDiseas, success: true }),
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating disease:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
