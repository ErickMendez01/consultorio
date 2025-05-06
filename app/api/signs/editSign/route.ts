import { z } from "zod"
import { db } from "@/lib/db"

// Validación de entrada para editar un signo vital
const routeContextSchema = z.object({
  id: z.number(),
  nombre: z.string().optional(),
  descripcion: z.string().optional(),
  tipo: z.string().optional(),
  unidadMedida: z.string().nullable().optional(),
  rangoNormal: z.string().nullable().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)

    // Verificar si existe el signo
    const signo = await db.signo.findFirst({
      where: { id: body.id },
    })

    if (!signo) {
      return new Response(
        JSON.stringify({ message: "SIGN_NOT_FOUND", update: false }),
        { status: 404 }
      )
    }

    // Construir objeto de campos actualizables (excluyendo `id`)
    const dataToUpdate: Partial<typeof body> = {}
    if (body.nombre) dataToUpdate.nombre = body.nombre
    if (body.descripcion) dataToUpdate.descripcion = body.descripcion
    if (body.tipo) dataToUpdate.tipo = body.tipo
    if (body.unidadMedida !== undefined)
      dataToUpdate.unidadMedida = body.unidadMedida
    if (body.rangoNormal !== undefined)
      dataToUpdate.rangoNormal = body.rangoNormal

    // Validar si hay campos a actualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return new Response(
        JSON.stringify({ message: "NO_FIELDS_TO_UPDATE", update: false }),
        { status: 400 }
      )
    }

    // Realizar la actualización
    const updated = await db.signo.update({
      where: { id: body.id },
      data: dataToUpdate,
    })

    return new Response(JSON.stringify({ sign: updated, update: true }), {
      status: 200,
    })
  } catch (error: any) {
    console.error("Error updating sign:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
