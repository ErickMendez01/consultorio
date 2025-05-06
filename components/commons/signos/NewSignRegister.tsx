"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export function NewSignRegister({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState("")
  const [unidadMedida, setUnidadMedida] = useState("")
  const [rangoNormal, setRangoNormal] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!nombre || !tipo) {
      setError("Por favor, completa al menos el nombre y tipo.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/signs/createSign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          tipo,
          unidadMedida,
          rangoNormal,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error al crear el signo",
          description: data.message || "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Signo vital creado",
        description: "El nuevo signo fue registrado correctamente.",
      })

      // Resetear campos
      setNombre("")
      setDescripcion("")
      setTipo("")
      setUnidadMedida("")
      setRangoNormal("")
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
          <DialogTitle>Registrar nuevo signo vital</DialogTitle>
          <DialogDescription>
            Completa los campos para agregar un nuevo signo al sistema.
          </DialogDescription>
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
              <Label htmlFor="tipo" className="text-right">
                Tipo
              </Label>
              <Select
                value={tipo}
                onValueChange={(value) => setTipo(value)}
                
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fisico">Fisico</SelectItem>
                  <SelectItem value="vital">Vital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">
                Descripción
              </Label>
              <Input
                id="descripcion"
                className="col-span-3"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unidadMedida" className="text-right">
                Unidad de medida
              </Label>
              <Input
                id="unidadMedida"
                className="col-span-3"
                value={unidadMedida}
                onChange={(e) => setUnidadMedida(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rangoNormal" className="text-right">
                Rango normal
              </Label>
              <Input
                id="rangoNormal"
                className="col-span-3"
                value={rangoNormal}
                onChange={(e) => setRangoNormal(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar signo"}
            </Button>
          </DialogFooter>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
