import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  id: z.union([z.string(), z.number()]), 
})


export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const pacienteId = Number(body.id)
    
        const pacientToDelete = await db.paciente.findUnique({
          where: { id: pacienteId },
        })
    
        if (!pacientToDelete) {
          return new Response(
            JSON.stringify({ message: "PACIENT_NOT_FOUND", delete: false }),
            { status: 404 }
          )
        }
    
        // Eliminar relaciones con enfermedades
        await db.sintomaPaciente.deleteMany({
          where: { pacienteId },
        })
    
        // Eliminar relaciones con pacientes
        await db.signoPaciente.deleteMany({
          where: { pacienteId },
        })

    const deletedPacient = await db.paciente.delete({
      where: { id: pacienteId },
    })

    return new Response(
      JSON.stringify({ pacient: deletedPacient, delete: true }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting pacient:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
