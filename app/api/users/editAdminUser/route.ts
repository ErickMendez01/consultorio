import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  id: z.number(),
  password: z.string().optional(),
  name: z.string().optional(),
  firstLastName: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)

    const user = await db.user.findFirst({
      where: { id:body.id},
    })

    if (!user) {
      return new Response(
        JSON.stringify({ message: "USER_NOT_FOUND", update: false }),
        { status: 404 }
      )
    }

    const userUpdateData: Partial<typeof user> = {}

    if (body.password) userUpdateData.password = body.password
    if (body.name) userUpdateData.nombre = body.name
    if (body.firstLastName) userUpdateData.apellido = body.firstLastName

    if (Object.keys(userUpdateData).length === 0) {
      return new Response(
        JSON.stringify({ message: "NO_FIELDS_TO_UPDATE", update: false }),
        { status: 200 }
      )
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: userUpdateData,
    })

    return new Response(
      JSON.stringify({ user: updatedUser, update: true }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating user:", error)
    return new Response(
      JSON.stringify({
        message: "INTERNAL_SERVER_ERROR",
        error: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    )
  }
}
