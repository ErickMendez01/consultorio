import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function DeleteDiseasInformation({
  diseas,
  setIsOpen, // Pasamos setIsOpen para poder cerrar el diálogo
}: {
  diseas: number
  setIsOpen: (newValue: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    if (error) {
      setError(null)
    }

    try {
      const response = await fetch("/api/diseases/deleteDiseas", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: diseas,
        }),
      })

      if (!response.ok) {
        toast({
          title: "Error eliminando enfermedad",
          description: "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Enfermedad eliminada exitosamente",
        description: "Datos eliminados permanentemente",
      })

      // Cerrar el diálogo después de la eliminación exitosa
      setIsOpen(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full">
      <form className="grid max-w-full gap-8" onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </form>
    </div>
  )
}
