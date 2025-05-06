import * as z from "zod"

export const userAuthSchema = z.object({
  code: z.string().nonempty({ message: "Código de empleado es requerido" }),
  password: z.string().nonempty({ message: "Contraseña es requerida" }),
})
