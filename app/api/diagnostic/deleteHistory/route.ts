import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  historyid: z.union([z.string(), z.number()]), 
  resultid: z.union([z.string(), z.number()]), 
})


export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const historialid = Number(body.historyid)
    const resultadoId = Number(body.resultid)
       const history = await db.historial.deleteMany({
          where: {id: historialid },
        })
        const result = await db.resultado.deleteMany({
          where: {id: resultadoId },
        })

    return new Response(
      JSON.stringify({ delete: true }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting history:", error)
    return new Response(
      JSON.stringify({ message: "INTERNAL_ERROR", error: error.message }),
      { status: 500 }
    )
  }
}