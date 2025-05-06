import { z } from "zod"
import { db } from "@/lib/db"

const symptomSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  gravedad: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = symptomSchema.parse(json)
    const newSymptom = await db.sintoma.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        gravedad: body.gravedad,
      },
    })

    return new Response(
      JSON.stringify({ sintoma: newSymptom, success: true }),
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creando síntoma:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
