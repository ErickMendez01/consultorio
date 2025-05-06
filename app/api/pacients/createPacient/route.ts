import { z } from "zod"
import { db } from "@/lib/db"

const pacientSchema = z.object({
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  genero: z.string().min(1),
  fechaNacimiento: z.string().min(1), 
  direccion: z.string().optional(),
  telefono: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = pacientSchema.parse(json)

    const newPacient = await db.paciente.create({
      data: {
        nombre: body.nombre,
        apellido: body.apellido,
        genero: body.genero,
        fechaNacimiento: new Date(body.fechaNacimiento),
        direccion: body.direccion || null,
        telefono: body.telefono || null,
      },
    })

    return new Response(
      JSON.stringify({ pacient: newPacient, success: true }),
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creando paciente:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}
