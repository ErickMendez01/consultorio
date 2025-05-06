import { z } from "zod"
import { db } from "@/lib/db"

// Validación de entrada para editar una prueba
const routeContextSchema = z.object({
  id: z.number(),
  nombre: z.string().optional(),
  descripcion: z.string().optional(),
  metodo: z.enum(["laboratorio", "postmortem"]).optional(),
  unidadMedida: z.string().optional(),
  rangoNormal: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)

    // Verificar si existe la prueba
    const prueba = await db.prueba.findFirst({
      where: { id: body.id },
    })

    if (!prueba) {
      return new Response(
        JSON.stringify({ message: "TEST_NOT_FOUND", update: false }),
        { status: 404 }
      )
    }

    // Construir objeto de campos actualizables (excluyendo `id`)
    const dataToUpdate: Partial<typeof body> = {}
    if (body.nombre) dataToUpdate.nombre = body.nombre
    if (body.descripcion) dataToUpdate.descripcion = body.descripcion
    if (body.metodo) dataToUpdate.metodo = body.metodo
    if (body.unidadMedida) dataToUpdate.unidadMedida = body.unidadMedida
    if (body.rangoNormal) dataToUpdate.rangoNormal = body.rangoNormal

    // Validar si hay campos a actualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return new Response(
        JSON.stringify({ message: "NO_FIELDS_TO_UPDATE", update: false }),
        { status: 400 }
      )
    }

    // Realizar la actualización
    const updated = await db.prueba.update({
      where: { id: body.id },
      data: dataToUpdate,
    })

    return new Response(JSON.stringify({ test: updated, update: true }), {
      status: 200,
    })
  } catch (error: any) {
    console.error("Error updating test:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
