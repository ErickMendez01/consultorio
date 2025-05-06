import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  id: z.union([z.string(), z.number()]),
})

export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const signoId = Number(body.id)

    const signToDelete = await db.signo.findUnique({
      where: { id: signoId },
    })

    if (!signToDelete) {
      return new Response(
        JSON.stringify({ message: "SIGN_NOT_FOUND", delete: false }),
        { status: 404 }
      )
    }

    // Eliminar relaciones con enfermedades
    await db.signoEnfermedad.deleteMany({
      where: { signoId },
    })

    // Eliminar relaciones con pacientes
    await db.signoPaciente.deleteMany({
      where: { signoId },
    })

    const deletedSign = await db.signo.delete({
      where: { id: signoId },
    })

    return new Response(
      JSON.stringify({ sign: deletedSign, delete: true }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting sign:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
