import { z } from "zod"
import { db } from "@/lib/db"

// Validación del cuerpo de la solicitud
const routeContextSchema = z.object({
  id: z.number(), // ID de la consulta
  observaciones: z.string().optional(), // Campo opcional que se puede actualizar
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)

    // Buscar la consulta por su ID
    const consulta = await db.historial.findFirst({
      where: { id: body.id },
    })

    if (!consulta) {
      return new Response(
        JSON.stringify({ message: "CONSULTA_NOT_FOUND", update: false }),
        { status: 404 }
      )
    }

    const dataToUpdate: Partial<typeof body> = {}

    if (body.observaciones) dataToUpdate.observaciones = body.observaciones

    if (Object.keys(dataToUpdate).length === 0) {
      return new Response(
        JSON.stringify({ message: "NO_FIELDS_TO_UPDATE", update: false }),
        { status: 400 }
      )
    }

    // Realizar la actualización en la base de datos
    const updated = await db.historial.update({
      where: { id: body.id },
      data: dataToUpdate,
    })

    return new Response(JSON.stringify({ consulta: updated, update: true }), {
      status: 200,
    })
  } catch (error: any) {
    console.error("Error updating historial:", error)
    return new Response(
      JSON.stringify({
        message: "INTERNAL_SERVER_ERROR",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
