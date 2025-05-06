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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function NewTestRegister({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [metodo, setMetodo] = useState("")
  const [unidadMedida, setUnidadMedida] = useState("")
  const [rangoNormal, setRangoNormal] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setName("")
    setDescription("")
    setMetodo("")
    setUnidadMedida("")
    setRangoNormal("")
    setError(null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!name || !description || !metodo) {
      setError("Por favor, llene los campos requeridos.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/tests/createTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          descripcion: description,
          metodo,
          unidadMedida,
          rangoNormal,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        toast({
          title: "Error creando prueba",
          description: data.message || "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Prueba registrada exitosamente",
        description: "Ahora puedes visualizar los datos proporcionados.",
      })

      resetForm()
      setIsOpen(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar nueva prueba</DialogTitle>
          <DialogDescription>
            Llena los campos para registrar una nueva prueba en el sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="metodo" className="text-right">
                Método
              </Label>
              <Select onValueChange={setMetodo} value={metodo}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona un método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laboratorio">Laboratorio</SelectItem>
                  <SelectItem value="postmortem">Postmortem</SelectItem>
                </SelectContent>
              </Select>
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
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
