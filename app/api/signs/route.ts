export const dynamic = "force-dynamic";

import { db } from "@/lib/db"
import { z } from "zod"
import { NextRequest } from "next/server"

const routeContextSchema = z.object({
  params: z.object({
    name: z.string().optional(),
    page: z.number().optional(),
    itemsPerPage: z.number().optional(),
  }),
})

export async function GET(
  req: NextRequest
  
) {
  try {
    const name = req.nextUrl.searchParams.get("name")
    const page = req.nextUrl.searchParams.get("page")
    const itemsPerPage = req.nextUrl.searchParams.get("itemsPerPage")
    
    const where =  {
      AND: [] as Array<any>,
    }
    
    if (name) {
      where.AND.push({
        nombre: name,
      })
    }
    const signs = await db.signo.findMany({
      where,
      skip: (Number(page) - 1) * Number(itemsPerPage),
      take: Number(itemsPerPage),
    })

    const total = await db.signo.count({ where })
    return new Response(JSON.stringify({ signs, total }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "INTERNAL_ERROR" }), {
      status: 500,
    })
  }
}