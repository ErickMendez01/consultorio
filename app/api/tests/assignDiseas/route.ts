import { z } from "zod"
import { db } from "@/lib/db"

// Validación del cuerpo de la solicitud
const bodySchema = z.object({
  testId: z.number(),              // ID del signo que será asignado
  diseaseIds: z.array(z.number()).min(1),  // Una o más enfermedades
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { testId, diseaseIds } = bodySchema.parse(json)

    // Verifica que el signo exista
    const testExists = await db.prueba.findUnique({
      where: { id: testId },
    })

    if (!testExists) {
      return new Response(
        JSON.stringify({ message: "TEST_NOT_FOUND" }),
        { status: 404 }
      )
    }

    // Prepara los registros a insertar
    const records = diseaseIds.map((diseaseId) => ({
      pruebaId: testId,
      enfermedadId: diseaseId,
    }))

    // Inserta en la tabla pivote, evitando duplicados
    await db.pruebaEnfermedad.createMany({
      data: records,
      skipDuplicates: true,
    })

    return new Response(
      JSON.stringify({ message: "ASSIGNED_SUCCESSFULLY" }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error assigning diseases to test:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_SERVER_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
