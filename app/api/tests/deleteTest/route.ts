import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  id: z.union([z.string(), z.number()]), 
})


export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const pruebaId = Number(body.id)
    const testToDelete = await db.prueba.findUnique({
      where: { id: pruebaId },
    })

    if (!testToDelete) {
      return new Response(
        JSON.stringify({ message: "TEST_NOT_FOUND", delete: false }),
        { status: 404 }
      )
    }

    // Eliminar relaciones con enfermedades
    await db.pruebaEnfermedad.deleteMany({
      where: { pruebaId },
    })

    const deletedTest = await db.prueba.delete({
      where: { id: pruebaId },
    })

    return new Response(
      JSON.stringify({ test: deletedTest, delete: true }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting test:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
