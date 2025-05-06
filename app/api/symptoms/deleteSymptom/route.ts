import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  id: z.union([z.string(), z.number()]), 
})


export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const sintomaId = Number(body.id)

    const symptomToDelete = await db.sintoma.findUnique({
          where: { id: sintomaId },
        })
    
        if (!symptomToDelete) {
          return new Response(
            JSON.stringify({ message: "SYMPTOM_NOT_FOUND", delete: false }),
            { status: 404 }
          )
        }
    
        // Eliminar relaciones con enfermedades
        await db.sintomaEnfermedad.deleteMany({
          where: { sintomaId },
        })
    
        // Eliminar relaciones con pacientes
        await db.sintomaPaciente.deleteMany({
          where: { sintomaId },
        })

    const deletedSymptom = await db.sintoma.delete({
      where: { id: sintomaId },
    })

    return new Response(
      JSON.stringify({ symptom: deletedSymptom, delete: true }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting symptom:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
