"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function AssignDiseas({
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
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [diseases, setDiseases] = useState<{ id: number; nombre: string }[]>([])
  const [selectedDiseases, setSelectedDiseases] = useState<number[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchDiseases = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/diseases?page=${currentPage}&itemsPerPage=${itemsPerPage}`
        )
        if (!response.ok) throw new Error("Error al cargar enfermedades")

        const data = await response.json()
        setDiseases(data.diseases)
        setTotalPages(Math.ceil(data.total / itemsPerPage)) // 🔧 Corregido aquí
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) fetchDiseases()
  }, [isOpen, currentPage, itemsPerPage])

  const toggleDiseaseSelection = (diseaseId: number) => {
    setSelectedDiseases((prev) =>
      prev.includes(diseaseId)
        ? prev.filter((id) => id !== diseaseId)
        : [...prev, diseaseId]
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/signs/assignDiseas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signId: id,
          diseaseIds: selectedDiseases,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error al asignar enfermedades",
          description: data.message || "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Enfermedades asignadas",
        description: "Se asignaron correctamente al signo.",
      })

      setIsOpen(false)
      setSelectedDiseases([])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Asignar a enfermedad</DialogTitle>
          <DialogDescription>
            Selecciona una o varias enfermedades para asignar al signo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {loading ? (
            <p className="text-sm text-gray-500">Cargando enfermedades...</p>
          ) : diseases.length === 0 ? (
            <p className="text-sm text-gray-500">
              No hay enfermedades disponibles.
            </p>
          ) : (
            <div className="grid max-h-60 gap-4 overflow-y-auto py-2 pr-2">
              {diseases.map((disease) => (
                <div key={disease.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`disease-${disease.id}`}
                    checked={selectedDiseases.includes(disease.id)}
                    onCheckedChange={() => toggleDiseaseSelection(disease.id)}
                  />
                  <Label htmlFor={`disease-${disease.id}`}>
                    {disease.nombre}
                  </Label>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading || selectedDiseases.length === 0}
            >
              {loading ? "Asignando..." : "Asignar"}
            </Button>
          </DialogFooter>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}

