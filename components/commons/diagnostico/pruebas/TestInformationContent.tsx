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
import { Prueba } from "@prisma/client"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type CompleteTest = Prueba
type UpdateableField =
  | "nombre"
  | "descripcion"
  | "metodo"
  | "unidadMedida"
  | "rangoNormal"

export default function TestInformationContent({
  test,
  id,
}: {
  test: CompleteTest
  id: number
}) {
  const [name, setName] = useState(test.nombre)
  const [description, setDescription] = useState(test.descripcion || "")
  const [method, setMethod] = useState<"laboratorio" | "postmortem">(test.metodo as "laboratorio" | "postmortem")
  const [unit, setUnit] = useState(test.unidadMedida || "")
  const [range, setRange] = useState(test.rangoNormal || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>("")

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    setLoading(true)
    if (error) setError(null)

    const updatedFields: { id: number } & Partial<
      Record<UpdateableField, string>
    > = { id }

    const updateIfChanged = (
      fieldName: UpdateableField,
      value: string,
      originalValue: string | undefined
    ) => {
      if (value && value !== originalValue) {
        updatedFields[fieldName] = value
      }
    }

    updateIfChanged("nombre", name, test.nombre)
    updateIfChanged("descripcion", description, test.descripcion)
    updateIfChanged("metodo", method, test.metodo)
    updateIfChanged("unidadMedida", unit, test.unidadMedida ?? undefined)
    updateIfChanged("rangoNormal", range, test.rangoNormal ?? undefined)

    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/tests/editTest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error actualizando datos de la prueba",
          description: "Intenta más tarde",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Prueba actualizada exitosamente",
        description: "Los datos fueron guardados correctamente",
      })

      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full">
      <form className="grid max-w-full gap-8" onSubmit={handleSubmit}>
        <div className="flex max-h-[80%] flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Datos de la prueba</CardTitle>
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
                  <Label htmlFor="method">Método</Label>
                  <Select
                    value={method}
                    onValueChange={(value: "laboratorio" | "postmortem") => setMethod(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar metodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laboratorio">Laboratorio</SelectItem>
                      <SelectItem value="postmortem">Postmortem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidad de medida</Label>
                  <Input
                    id="unit"
                    placeholder="Ingresa la unidad"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="range">Rango normal</Label>
                  <Input
                    id="range"
                    placeholder="Ingresa el rango"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
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
