"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function NewPacientRegister({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [genero, setGenero] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!nombre || !apellido || !genero || !fechaNacimiento) {
      setError("Por favor, complete los campos requeridos.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/pacients/createPacient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          genero,
          fechaNacimiento,
          direccion,
          telefono,
        }),
      })

      if (!response.ok) {
        toast({
          title: "Error al crear paciente",
          description: "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Paciente registrado exitosamente",
        description: "El paciente ha sido añadido al sistema.",
      })

      setNombre("")
      setApellido("")
      setGenero("")
      setFechaNacimiento("")
      setDireccion("")
      setTelefono("")
      setIsOpen(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar nuevo paciente</DialogTitle>
          <DialogDescription>Ingresa los datos del paciente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre 
              </Label>
              <Input
                id="nombre"
                className="col-span-3"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellido" className="text-right">
                Apellido 
              </Label>
              <Input
                id="apellido"
                className="col-span-3"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genero" className="text-right">
                Género 
              </Label>
              <Select value={genero} onValueChange={(value) => setGenero(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar genero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fechaNacimiento" className="text-right">
                Fecha de nacimiento 
              </Label>
              <Input
                id="fechaNacimiento"
                type="date"
                className="col-span-3"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                className="col-span-3"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                className="col-span-3"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar paciente"}
            </Button>
          </DialogFooter>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
