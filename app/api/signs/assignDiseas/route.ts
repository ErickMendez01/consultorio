import { z } from "zod"
import { db } from "@/lib/db"

// Validación del cuerpo de la solicitud
const bodySchema = z.object({
  signId: z.number(),              // ID del signo que será asignado
  diseaseIds: z.array(z.number()).min(1),  // Una o más enfermedades
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { signId, diseaseIds } = bodySchema.parse(json)

    // Verifica que el signo exista
    const signoExists = await db.signo.findUnique({
      where: { id: signId },
    })

    if (!signoExists) {
      return new Response(
        JSON.stringify({ message: "SIGN_NOT_FOUND" }),
        { status: 404 }
      )
    }

    // Prepara los registros a insertar
    const records = diseaseIds.map((diseaseId) => ({
      signoId: signId,
      enfermedadId: diseaseId,
    }))

    // Inserta en la tabla pivote, evitando duplicados
    await db.signoEnfermedad.createMany({
      data: records,
      skipDuplicates: true,
    })

    return new Response(
      JSON.stringify({ message: "ASSIGNED_SUCCESSFULLY" }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error assigning diseases to sign:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
