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

// Tipos para props
type UpdateableField = "observaciones"

type History = {
  id: number
  observaciones: string
}

export default function HistoryInformationContent({
  history,
  id,
}: {
  history: History
  id: number
}) {
  const [observaciones, setObservaciones] = useState(history.observaciones)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    updateIfChanged("observaciones", observaciones, history.observaciones)

    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/diagnostic/editHistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error actualizando el registro",
          description: "Intenta más tarde",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Registro actualizado exitosamente",
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
              <CardTitle>Datos del registro</CardTitle>
              <CardDescription>
                Por favor proporcione los datos que desea actualizar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Input
                    id="observaciones"
                    placeholder="Ingresa las observaciones"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
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
