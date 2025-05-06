import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  id: z.union([z.string(), z.number()]), // Permite tanto string como number
})

export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const enfermedadId = Number(body.id)

    const diseasToDelete = await db.enfermedad.findUnique({
      where: { id: enfermedadId },
    })

    if (!diseasToDelete) {
      return new Response(
        JSON.stringify({ message: "DISEAS_NOT_FOUND", delete: false }),
        { status: 404 }
      )
    }

    // Eliminar relaciones con enfermedades
    await db.sintomaEnfermedad.deleteMany({
      where: { enfermedadId },
    })

    // Eliminar relaciones con pacientes
    await db.signoEnfermedad.deleteMany({
      where: { enfermedadId },
    })

    await db.pruebaEnfermedad.deleteMany({
      where: { enfermedadId },
    })

    const deletedDiseas = await db.enfermedad.delete({
      where: { id: Number(body.id) },
    })

    return new Response(
      JSON.stringify({ diseas: deletedDiseas, delete: true }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting disease:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
