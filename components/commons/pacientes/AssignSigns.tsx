"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Sign = {
  id: number
  nombre: string
  assigned: boolean
}

export function AssignSigns({
  id,
  isOpen,
  setIsOpen,
}: {
  id: number
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signs, setSigns] = useState<Sign[]>([])
  const [selectedSigns, setSelectedSigns] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(1)

  const fetchSigns = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/pacients/signs?id=${id}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
      )
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Error al cargar signos")

      setSigns(data.signs)
      setTotalPages(data.totalPages || 1)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id, currentPage, itemsPerPage])

  useEffect(() => {
    if (isOpen) {
      setSelectedSigns([]) // Limpiar selección al abrir
      fetchSigns()
    }
  }, [isOpen, currentPage, fetchSigns])

  const toggleSignsSelection = (signId: number) => {
    setSelectedSigns((prev) =>
      prev.includes(signId) ? prev.filter((id) => id !== signId) : [...prev, signId]
    )
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/pacients/assignSign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacientId: id,
          signIds: selectedSigns,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error al asignar signos",
          description: data.message || "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Signos asignados",
        description: "Se asignaron correctamente al paciente.",
      })

      await fetchSigns() 
      setIsOpen(false)
      setSelectedSigns([])
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
          <DialogTitle>Asignar a Paciente</DialogTitle>
          <DialogDescription>
            Selecciona uno o varios signos para asignar al paciente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid max-h-60 gap-4 overflow-y-auto py-2 pr-2">
            {loading ? (
              <p className="text-sm text-gray-500">Cargando signos...</p>
            ) : signs.length === 0 ? (
              <p className="text-sm text-gray-500">No hay signos disponibles.</p>
            ) : (
              signs.map((sign) => (
                <div key={sign.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sign-${sign.id}`}
                    checked={selectedSigns.includes(sign.id)}
                    disabled={sign.assigned}
                    onCheckedChange={() => toggleSignsSelection(sign.id)}
                  />
                  <Label
                    htmlFor={`sign-${sign.id}`}
                    className={sign.assigned ? "text-gray-400 line-through" : ""}
                  >
                    {sign.nombre}
                  </Label>
                </div>
              ))
            )}
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages && handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading || selectedSigns.length === 0}>
              {loading ? "Asignando..." : "Asignar"}
            </Button>
          </DialogFooter>

          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
