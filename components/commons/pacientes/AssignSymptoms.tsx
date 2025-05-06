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

type Symptom = {
  id: number
  nombre: string
  assigned: boolean
}

export function AssignSymptoms({
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
  const [itemsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([])

  const fetchSymptoms = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/pacients/symptoms?id=${id}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
      )
      if (!response.ok) throw new Error("Error al cargar síntomas")

      const data = await response.json()
      setSymptoms(data.symptoms)
      setTotalPages(data.totalPages || 1)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [id, currentPage, itemsPerPage])

  useEffect(() => {
    if (isOpen) {
      setSelectedSymptoms([])
      fetchSymptoms()
    }
  }, [isOpen, currentPage, fetchSymptoms])

  const toggleSymptomsSelection = (symptomId: number) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
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
      const response = await fetch("/api/pacients/assignSymptom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacientId: id,
          symptomIds: selectedSymptoms,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error al asignar síntomas",
          description: data.message || "Inténtalo más tarde",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Síntomas asignados",
        description: "Se asignaron correctamente al paciente.",
      })

      await fetchSymptoms()
      setIsOpen(false)
      setSelectedSymptoms([])
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
          <DialogTitle>Asignar a paciente</DialogTitle>
          <DialogDescription>
            Selecciona uno o varios síntomas para asignar al paciente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid max-h-60 gap-4 overflow-y-auto py-2 pr-2">
            {loading ? (
              <p className="text-sm text-gray-500">Cargando síntomas...</p>
            ) : symptoms.length === 0 ? (
              <p className="text-sm text-gray-500">No hay síntomas disponibles.</p>
            ) : (
              symptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`symptom-${symptom.id}`}
                    checked={selectedSymptoms.includes(symptom.id)}
                    disabled={symptom.assigned}
                    onCheckedChange={() => toggleSymptomsSelection(symptom.id)}
                  />
                  <Label
                    htmlFor={`symptom-${symptom.id}`}
                    className={symptom.assigned ? "text-gray-400 line-through" : ""}
                  >
                    {symptom.nombre}
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
            <Button
              type="submit"
              disabled={loading || selectedSymptoms.length === 0}
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
