import { z } from "zod"
import { db } from "@/lib/db"

const signSchema = z.object({
  nombre: z.string(),
  tipo: z.string(),
  descripcion: z.string().optional(),
  unidadMedida: z.string().nullable().optional(),
  rangoNormal: z.string().nullable().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = signSchema.parse(json)

    const newSign = await db.signo.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion || "",
        tipo: body.tipo,
        unidadMedida: body.unidadMedida,
        rangoNormal: body.rangoNormal,
      },
    })

    return new Response(JSON.stringify({ signo: newSign, success: true }), {
      status: 201,
    })
  } catch (error: any) {
    console.error("Error creating sign:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
