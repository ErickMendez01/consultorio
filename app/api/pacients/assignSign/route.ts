import { z } from "zod"
import { db } from "@/lib/db"

// Validación del cuerpo de la solicitud
const bodySchema = z.object({
  pacientId: z.number(),              // ID del signo que será asignado
  signIds: z.array(z.number()).min(1),  // Una o más enfermedades
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { pacientId, signIds } = bodySchema.parse(json)

    // Verifica que el signo exista
    const pacientExists = await db.paciente.findUnique({
      where: { id: pacientId },
    })

    if (!pacientExists) {
      return new Response(
        JSON.stringify({ message: "PACIENT_NOT_FOUND" }),
        { status: 404 }
      )
    }

    // Prepara los registros a insertar
    const records = signIds.map((signId) => ({
      pacienteId: pacientId,
      signoId: signId,
    }))

    // Inserta en la tabla pivote, evitando duplicados
    await db.signoPaciente.createMany({
      data: records,
      skipDuplicates: true,
    })

    return new Response(
      JSON.stringify({ message: "ASSIGNED_SUCCESSFULLY" }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error assigning sign to pacient:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
