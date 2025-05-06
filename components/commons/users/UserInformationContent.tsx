import { SyntheticEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"

type Userobject = User

export default function UserInformationContent({
  user,
  id,
}: {
  user: Userobject
  id: number
}) {
  const [password, setPassword] = useState("")
  const [name, setName] = useState(user.nombre)
  const [firstLastName, setFirstLastName] = useState(user.apellido)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    setLoading(true)
    if (error) setError(null)

    // Solo incluimos campos que pueden cambiar (sin codigo)
    const updatedFields: Partial<{
      name: string
      firstLastName: string
      password: string
      id: number
    }> = {
      id,
    }

    const updateIfChanged = (
      fieldName: string,
      value: string,
      userValue: string | undefined
    ) => {
      if (value && value !== userValue) {
        updatedFields[fieldName] = value
      }
    }

    updateIfChanged("name", name, user.nombre)
    updateIfChanged("firstLastName", firstLastName, user.apellido)

    if (password) {
      updatedFields.password = password
    }

    // Si no hubo ningún cambio
    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/users/editAdminUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error actualizando datos de usuario",
          description: "El código de usuario ya está en uso",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Usuario actualizado exitósamente",
        description: "Ahora puedes acceder con los nuevos datos",
      })

      setPassword("")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full">
      <form className="grid max-w-full gap-8" onSubmit={handleSubmit}>
        <div className="flex max-h-[80%] flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Usuario</CardTitle>
              <CardDescription>
                Por favor proporcione los datos que desea actualizar.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código de Acceso</Label>
                  <Input
                    id="code"
                    value={user.codigo}
                    readOnly
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    placeholder="Ingrese la contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre(s)</Label>
                  <Input
                    id="name"
                    placeholder="Ingresa tu Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstLastName">Apellido Paterno</Label>
                  <Input
                    id="firstLastName"
                    placeholder="Ingresa tu Apellido Paterno"
                    value={firstLastName}
                    onChange={(e) => setFirstLastName(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  )
}
