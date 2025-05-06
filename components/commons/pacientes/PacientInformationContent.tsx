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
import { Paciente } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CompletePacient = Paciente

export default function PacientInformationContent({
  pacient,
  id,
}: {
  pacient: CompletePacient
  id: number
}) {
  const [nombre, setNombre] = useState(pacient.nombre)
  const [apellido, setApellido] = useState(pacient.apellido)
  const [genero, setGenero] = useState(pacient.genero)
  const [fechaNacimiento, setFechaNacimiento] = useState(
    new Date(pacient.fechaNacimiento).toISOString().split("T")[0]
  )
  const [direccion, setDireccion] = useState(pacient.direccion || "")
  const [telefono, setTelefono] = useState(pacient.telefono || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    setLoading(true)
    if (error) setError(null)

    const updatedFields: Partial<Paciente> = {
      id: pacient.id,
    }

    const updateIfChanged = (
      key: keyof Paciente,
      value: any,
      original: any
    ) => {
      if (value !== original) {
        updatedFields[key] = value
      }
    }

    updateIfChanged("nombre", nombre, pacient.nombre)
    updateIfChanged("apellido", apellido, pacient.apellido)
    updateIfChanged("genero", genero, pacient.genero)
    updateIfChanged(
      "fechaNacimiento",
      new Date(fechaNacimiento),
      pacient.fechaNacimiento
    )
    updateIfChanged("direccion", direccion, pacient.direccion)
    updateIfChanged("telefono", telefono, pacient.telefono)

    if (Object.keys(updatedFields).length === 1) {
      setError("No hay cambios para actualizar.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/pacients/editPacient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })

      if (!response.ok) {
        toast({
          title: "Error al actualizar paciente",
          description: "Inténtalo de nuevo más tarde.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      toast({
        title: "Paciente actualizado correctamente",
        description: "Los datos han sido guardados.",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full">
      <form className="grid max-w-full gap-8" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Datos del Paciente</CardTitle>
            <CardDescription>
              Actualiza los campos necesarios y guarda los cambios.
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
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genero">Género</Label>
                <Select
                  value={genero}
                  onValueChange={(value) => setGenero(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar genero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
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
