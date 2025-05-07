import { db } from "@/lib/db"
import { z } from "zod"
import { NextRequest } from "next/server"

const routeContextSchema = z.object({
  params: z.object({
    page: z.number().optional(),
    itemsPerPage: z.number().optional(),
  }),
})

export async function GET(
  req: NextRequest
  
) {
  try {
    const page = req.nextUrl.searchParams.get("page")
    const itemsPerPage = req.nextUrl.searchParams.get("itemsPerPage")
    
    
    
    const pacients = await db.paciente.findMany({
      include: {
        consultas: true,
        resultados: true,
      },
      skip: (Number(page) - 1) * Number(itemsPerPage),
      take: Number(itemsPerPage),
    })

    return new Response(JSON.stringify({ pacients, }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "INTERNAL_ERROR" }), {
      status: 500,
    })
  }
}