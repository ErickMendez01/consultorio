import { z } from "zod"
import { db } from "@/lib/db"

// Validación de entrada para editar un paciente
const pacientSchema = z.object({
  id: z.number(),
  nombre: z.string().optional(),
  apellido: z.string().optional(),
  genero: z.string().optional(),
  fechaNacimiento: z.coerce.date().optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = pacientSchema.parse(json)

    // Verificar si el paciente existe
    const existingPacient = await db.paciente.findUnique({
      where: { id: body.id },
    })

    if (!existingPacient) {
      return new Response(
        JSON.stringify({ message: "PACIENT_NOT_FOUND", update: false }),
        { status: 404 }
      )
    }

    // Construir objeto de campos a actualizar
    const dataToUpdate: Partial<typeof body> = {}
    if (body.nombre !== undefined) dataToUpdate.nombre = body.nombre
    if (body.apellido !== undefined) dataToUpdate.apellido = body.apellido
    if (body.genero !== undefined) dataToUpdate.genero = body.genero
    if (body.fechaNacimiento !== undefined)
      dataToUpdate.fechaNacimiento = body.fechaNacimiento
    if (body.direccion !== undefined) dataToUpdate.direccion = body.direccion
    if (body.telefono !== undefined) dataToUpdate.telefono = body.telefono

    if (Object.keys(dataToUpdate).length === 0) {
      return new Response(
        JSON.stringify({ message: "NO_FIELDS_TO_UPDATE", update: false }),
        { status: 400 }
      )
    }

    // Actualizar paciente
    const updatedPacient = await db.paciente.update({
      where: { id: body.id },
      data: dataToUpdate,
    })

    return new Response(JSON.stringify({ pacient: updatedPacient, update: true }), {
      status: 200,
    })
  } catch (error: any) {
    console.error("Error updating pacient:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
