import { z } from "zod"
import { db } from "@/lib/db"

// Definir la estructura esperada para la solicitud
const routeContextSchema = z.object({
  id: z.number(),         // El id es obligatorio para identificar el registro
  nombre: z.string().optional(),  // Los campos de actualización son opcionales
  causa: z.string().optional(),
  descripcion: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    // Parsear el cuerpo de la solicitud y validarlo
    const json = await req.json()
    const body = routeContextSchema.parse(json)

    // Buscar el registro de la enfermedad con el id proporcionado
    const enfermedad = await db.enfermedad.findFirst({
      where: { id: body.id },
    })

    // Si la enfermedad no existe, devolver un error
    if (!enfermedad) {
      return new Response(
        JSON.stringify({ message: "DISEAS_NOT_FOUND", update: false }),
        { status: 404 }
      )
    }

    // Crear un objeto para los datos que se actualizarán
    const dataToUpdate: Partial<typeof body> = {}

    // Solo agregar los campos que se proporcionen en la solicitud (no incluir el id)
    if (body.nombre) dataToUpdate.nombre = body.nombre
    if (body.causa) dataToUpdate.causa = body.causa
    if (body.descripcion) dataToUpdate.descripcion = body.descripcion

    // Si no hay campos para actualizar, devolver un error
    if (Object.keys(dataToUpdate).length === 0) {
      return new Response(
        JSON.stringify({ message: "NO_FIELDS_TO_UPDATE", update: false }),
        { status: 400 }
      )
    }

    // Actualizar los campos del registro en la base de datos
    const updated = await db.enfermedad.update({
      where: { id: body.id },       // Buscar por el id
      data: dataToUpdate,           // Actualizar solo los campos seleccionados
    })

    // Responder con el registro actualizado
    return new Response(JSON.stringify({ diseas: updated, update: true }), {
      status: 200,
    })
  } catch (error: any) {
    // Manejo de errores
    console.error("Error updating enfermedad:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
