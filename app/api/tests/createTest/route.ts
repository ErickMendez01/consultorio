import { z } from "zod"
import { db } from "@/lib/db"

// Define or import MetodoPrueba
type MetodoPrueba = "laboratorio" | "postmortem" ; 

const testSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  metodo: z.string(),
  unidadMedida: z.string().optional(),
  rangoNormal: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = testSchema.parse(json)

    const newTest = await db.prueba.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        metodo: body.metodo as MetodoPrueba,
        unidadMedida: body.unidadMedida || null,
        rangoNormal: body.rangoNormal || null,
      },
    })

    return new Response(
      JSON.stringify({ prueba: newTest, success: true }),
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creando prueba:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
