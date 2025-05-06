"use client"

import * as React from "react"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"

// Suspense import
import { Suspense } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

function UserAuthFormContent({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const cbUrl = searchParams?.get("from") || "/usuarios"
    const signInResult = await signIn("credentials", {
      code: data.code,
      password: data.password,
      redirect: false,
      callbackUrl: cbUrl,
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Credenciales inválidas.",
        description: "Verifique sus credenciales e inténtelo de nuevo.",
        variant: "destructive",
      })
    }

    toast({
      title: "Inicio de sesión exitoso",
      description: "Has iniciado sesión con éxito.",
    })

    const response = await fetch("/api/auth/session")
    const session = await response.json()
    const userRole = session?.user?.role

    if (userRole === "medico") {
      router.push("/pacientes")
    } else if (userRole === "admin") {
      router.push("/usuarios")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="code">Código</Label>
            <Input
              id="code"
              placeholder="1234567890"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("code")}
            />

            {errors?.code && (
              <p className="px-1 text-xs text-red-600">{errors.code.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">Contraseña</Label>

            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />

            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants({ variant: "default" }))} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Ingresar
          </button>
        </div>
      </form>
    </div>
  )
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserAuthFormContent className={className} {...props} />
    </Suspense>
  )
}