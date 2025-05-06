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

export function NewDiseasRegister({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [name, setName] = useState("")
  const [cause, setCause] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setName("")
    setCause("")
    setDescription("")
    setError(null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!name || !cause || !description) {
      setError("Por favor, llene todos los campos requeridos.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/diseases/createDiseas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          cause,
          description,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        toast({
          title: "Error creando enfermedad",
          description: data.message || "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Enfermedad registrada exitosamente",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar nueva enfermedad</DialogTitle>
          <DialogDescription>
            Registra una nueva enfermedad en el sistema.
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
              <Label htmlFor="cause" className="text-right">
                Causa
              </Label>
              <Input
                id="cause"
                className="col-span-3"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
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
