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
import { Signo } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type UpdatedSignFields = {
  id: number
  nombre?: string
  descripcion?: string
  tipo?: string
  unidadMedida?: string | null
  rangoNormal?: string | null
}

export default function SignInformationContent({
  sign,
  id,
}: {
  sign: Signo
  id: number
}) {
  const [nombre, setNombre] = useState(sign.nombre)
  const [descripcion, setDescripcion] = useState(sign.descripcion)
  const [tipo, setTipo] = useState(sign.tipo)
  const [unidadMedida, setUnidadMedida] = useState(sign.unidadMedida ?? "")
  const [rangoNormal, setRangoNormal] = useState(sign.rangoNormal ?? "")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    setLoading(true)
    if (error) setError(null)

    const updatedFields: Partial<UpdatedSignFields> = { id }

    const updateIfChanged = (
      fieldName: keyof UpdatedSignFields,
      value: string,
      original: string | null
    ) => {
      if (value && value !== original) {
        updatedFields[fieldName] = value as UpdatedSignFields[typeof fieldName]
      }
    }

    updateIfChanged("nombre", nombre, sign.nombre)
    updateIfChanged("descripcion", descripcion, sign.descripcion)
    updateIfChanged("tipo", tipo, sign.tipo)
    updateIfChanged("unidadMedida", unidadMedida, sign.unidadMedida)
    updateIfChanged("rangoNormal", rangoNormal, sign.rangoNormal)

    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/signs/editSign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error al actualizar signo",
          description: "Intenta nuevamente más tarde.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Signo actualizado exitosamente",
        description: "Cambios guardados correctamente.",
      })
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full">
      <form className="grid max-w-full gap-8" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Editar Signo</CardTitle>
            <CardDescription>
              Modifica los campos que necesites y guarda los cambios.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={tipo} onValueChange={(value) => setTipo(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fisico">Fisico</SelectItem>
                    <SelectItem value="vital">Vital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unidadMedida">Unidad de Medida</Label>
                <Input
                  id="unidadMedida"
                  value={unidadMedida}
                  onChange={(e) => setUnidadMedida(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rangoNormal">Rango Normal</Label>
              <Input
                id="rangoNormal"
                value={rangoNormal}
                onChange={(e) => setRangoNormal(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  )
}
