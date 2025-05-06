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
import { Enfermedad } from "@prisma/client"

type CompleteDiseas = Enfermedad
type UpdateableField = "nombre" | "causa" | "descripcion"

export default function DiseasInformationContent({
  diseas,
  id,
}: {
  diseas: CompleteDiseas
  id: number
}) {
  const [name, setName] = useState(diseas.nombre)
  const [cause, setCause] = useState(diseas.causa || "")
  const [description, setDescription] = useState(diseas.descripcion || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>("")

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    setLoading(true)
    if (error) {
      setError(null)
    }

    const updatedFields: { id: number } & Partial<Record<UpdateableField, string>> = {
      id,
    }

    const updateIfChanged = (
      fieldName: UpdateableField,
      value: string,
      originalValue: string | undefined
    ) => {
      if (value && value !== originalValue) {
        updatedFields[fieldName] = value
      }
    }

    updateIfChanged("nombre", name, diseas.nombre)
    updateIfChanged("causa", cause, diseas.causa ?? undefined)
    updateIfChanged("descripcion", description, diseas.descripcion)

    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/diseases/editDiseas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error actualizando datos de enfermedad",
          description: "Intento más tarde",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Enfermedad actualizada exitósamente",
        description: "Los datos se actualizaron",
      })

      setName(name)
      setCause(cause)
      setDescription(description)
      setLoading(false)
    } catch (error: any) {
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
              <CardTitle>Datos de enfermedad</CardTitle>
              <CardDescription>
                Por favor proporcione los datos que desea actualizar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Ingresa el nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    placeholder="Ingresa la descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cause">Causa</Label>
                  <Input
                    id="cause"
                    placeholder="Ingresa la causa"
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
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
