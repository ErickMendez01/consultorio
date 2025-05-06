import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function DeleteUserInformation({ code }: { code: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    if (error) {
      setError(null)
    }

    try {
      const response = await fetch("/api/users/deleteAdminUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      })

      if (!response.ok) {
        toast({
          title: "Error eliminando datos de usuario",
          description: "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Usuario eliminado exitosamente",
        description: "Datos eliminados permanentemente",
      })
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
        </div>{" "}
      </form>
    </div>
  )
}
