import { NextApiRequest } from "next"
import { z } from "zod"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  code: z.string(),
})
export async function DELETE(req: Request) {
  try {
    const json = await req.json()
    const body = routeContextSchema.parse(json)
    const deleteWithCode = await db.user.findFirst({
        where: {
        codigo: body.code,
      },
    })
    
    if(deleteWithCode?.codigo) {

        const deleteUser = await db.user.delete({
            where: { codigo : body.code},
        });

       
        return new Response(JSON.stringify({ user: deleteUser, delete: true }), {
            status: 200,
        })
        
    }else{
        return new Response(
            JSON.stringify({ message: "USER_DELETE_ERROR", delete: false }),
            {
                status: 200,
            }
        )
    }
} catch (error) {
    return new Response(JSON.stringify({ message: "INTERNAL_ERROR" }), {
      status: 500,
    })
  }
}