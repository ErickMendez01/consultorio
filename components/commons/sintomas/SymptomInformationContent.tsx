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
import { Sintoma } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CompleteSymptom = Sintoma

export default function SymptomInformationContent({
  symptom,
  id,
}: {
  symptom: CompleteSymptom
  id: number
}) {
  const [nombre, setNombre] = useState(symptom.nombre)
  const [descripcion, setDescripcion] = useState(symptom.descripcion)
  const [gravedad, setGravedad] = useState(symptom.gravedad)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    setLoading(true)
    if (error) {
      setError(null)
    }

    const updatedFields: Partial<{
      nombre: string
      descripcion: string
      gravedad: string
      id: number
    }> = {
      id,
    }

    const updateIfChanged = (
      fieldName: string,
      value: string,
      symptomValue: string | undefined
    ) => {
      if (value && value !== symptomValue) updatedFields[fieldName] = value
    }

    updateIfChanged("nombre", nombre, symptom.nombre)
    updateIfChanged("descripcion", descripcion, symptom.descripcion)
    updateIfChanged("gravedad", gravedad, symptom.gravedad)

    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/symptoms/editSymptom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error actualizando síntoma",
          description: "Hubo un error al actualizar el síntoma.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Síntoma actualizado exitosamente",
        description: "El síntoma se ha actualizado correctamente.",
      })

      setNombre(nombre)
      setDescripcion(descripcion)
      setGravedad(gravedad)
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
              <CardTitle>Datos del Síntoma</CardTitle>
              <CardDescription>
                Por favor proporcione los datos que desea actualizar.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Síntoma</Label>
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
                  <Label htmlFor="gravedad">Gravedad</Label>
                  <Select
                    value={gravedad}
                    onValueChange={(value) => setGravedad(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar gravedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leve">Leve</SelectItem>
                      <SelectItem value="moderado">Moderado</SelectItem>
                      <SelectItem value="grave">Grave</SelectItem>
                    </SelectContent>
                  </Select>
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
