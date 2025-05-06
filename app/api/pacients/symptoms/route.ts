import { NextRequest } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const id = parseInt(searchParams.get("id") || "")
  const page = parseInt(searchParams.get("page") || "1")
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage") || "10")

  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: "ID inválido" }), {
      status: 400,
    })
  }

  try {
    const paciente = await db.paciente.findUnique({
      where: { id },
      include: {
        sintomas: { select: { id: true } },
      },
    })

    if (!paciente) {
      return new Response(JSON.stringify({ message: "Paciente no encontrado" }), {
        status: 404,
      })
    }

    const assignedSymptomIds = paciente.sintomas.map((s) => s.id)

    const totalSymptoms = await db.sintoma.count()
    const totalPages = Math.ceil(totalSymptoms / itemsPerPage)

    const sintomasDisponibles = await db.sintoma.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: { id: "asc" },
    })

    const symptoms = sintomasDisponibles.map((symptom) => ({
      ...symptom,
      assigned: assignedSymptomIds.includes(symptom.id),
    }))

    return new Response(
      JSON.stringify({ symptoms, totalPages }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error al capturar asignados:", error)
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
      status: 500,
    })
  }
}
