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

export function NewUser({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [firstLastName, setFirstLastName] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    if (!code || !password || !name || !role) {
      setError("Por favor, llene todos los campos requeridos.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/users/createAdminUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          password,
          name,
          firstLastName,
          role,
        }),
      })

      if (!response.ok) {
        toast({
          title: "Error creando usuario",
          description: "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      const data = await response.json()

      if (data.status === 402) {
        toast({
          title: "Código ya registrado",
          description: "Este código ya se encuentra registrado en el sistema",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Usuario creado exitosamente",
        description: "Ahora puedes acceder con los datos proporcionados",
      })

      // Reset form fields
      setCode("")
      setPassword("")
      setName("")
      setFirstLastName("")
      setRole("")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo usuario</DialogTitle>
          <DialogDescription>
            Crea un usuario para acceder al sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Código de empleado
              </Label>
              <Input
                id="code"
                className="col-span-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
              <Label htmlFor="firstLastName" className="text-right">
                Apellido paterno
              </Label>
              <Input
                id="firstLastName"
                className="col-span-3"
                value={firstLastName}
                onChange={(e) => setFirstLastName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rol
              </Label>
              <div className="col-span-3">
                <Select value={role} onValueChange={(value) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="medico">Medico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
