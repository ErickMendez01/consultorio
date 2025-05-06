export const dynamic = "force-dynamic";

import { db } from "@/lib/db"
import { z } from "zod"
import { NextRequest } from "next/server"

const routeContextSchema = z.object({
  params: z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    rol: z.string().optional(),
    page: z.number().optional(),
    itemsPerPage: z.number().optional(),
  }),
})

export async function GET(
  req: NextRequest
  
) {
  try {
    const name = req.nextUrl.searchParams.get("name")
    const code = req.nextUrl.searchParams.get("code")
    const rol = req.nextUrl.searchParams.get("rol")
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

    if (rol) {
      where.AND.push({
        role: rol,
      })
    }
    
    if (code) {
      where.AND.push({
        codigo: code,
      })
    }
    const users = await db.user.findMany({
      where,
      skip: (Number(page) - 1) * Number(itemsPerPage),
      take: Number(itemsPerPage),
    })

    const total = await db.user.count({ where })
    return new Response(JSON.stringify({ users, total }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "INTERNAL_ERROR" }), {
      status: 500,
    })
  }
}