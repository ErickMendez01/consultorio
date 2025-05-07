import { z } from "zod"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

const pacientSchema = z.object({
  pacienteId: z.number().min(1),
  pruebaId: z.number().min(1),
  valor: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = pacientSchema.parse(json)

    // Verificar si el usuario está autenticado
    const user = await getCurrentUser()
    if (!user) {
      return new Response(
        JSON.stringify({ message: "UNAUTHORIZED" }),
        { status: 401 }
      )
    }

    // Crear diagnóstico
    const NewDiagnostic = await db.diagnostico.create({
      data: {
        pacienteId: body.pacienteId,
      },
    })

    // Crear resultado
    const NewResult = await db.resultado.create({
      data: {
        pacienteId: body.pacienteId,
        pruebaId: body.pruebaId,
        valor: body.valor,
      },
    })

    // Crear historial
    const NewHistory = await db.historial.create({
      data: {
        pacienteId: body.pacienteId,
        userId: Number(user.id),
      },
    })

    return new Response(
      JSON.stringify({
        diagnostic: { id: NewDiagnostic.id },  // Solo el id del diagnóstico
        result: { id: NewResult.id },          // Solo el id del resultado
        history: { id: NewHistory.id },        // Solo el id del historial
        success: true,
      }),
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creando historial:", error)
    return new Response(
      JSON.stringify({
        message: "INTERNAL_ERROR",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
