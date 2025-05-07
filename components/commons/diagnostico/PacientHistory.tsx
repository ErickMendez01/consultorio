"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Paciente, Historial, Resultado } from "@prisma/client"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import HistoryMoreOptionsButton from "./HistoryMoreOptionsButton"
import { Button } from "@/components/ui/button"

type CompletePacient = Paciente & {
  consultas: Historial[]
  resultados: Resultado[]
}

export default function PacientHistory() {
  const [pacients, setPacients] = useState<CompletePacient[]>([])
  const [selectedPacientId, setSelectedPacientId] = useState<string>("")
  const [pacientInput, setPacientInput] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/diagnostic/getHistory?page=1&itemsPerPage=10"
        )
        if (!response.ok) {
          throw new Error("Error al obtener datos de pacientes")
        }
        const data = await response.json()
        setPacients(data.pacients || [])
      } catch (error: any) {
        setError(error.message || "Error al cargar datos")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const selectedPacient = pacients.find(
    (p) => p.id.toString() === selectedPacientId
  )

  const filteredPacients = pacients.filter((p) =>
    `${p.nombre} ${p.apellido}`
      .toLowerCase()
      .includes(pacientInput.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto w-full pb-8 pt-2">
      <Card>
        <CardHeader>
          <CardTitle>Diagnóstico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="mb-1 font-medium">Buscar Paciente:</p>
            <Input
              placeholder="Buscar paciente por nombre..."
              value={pacientInput}
              onChange={(e) => setPacientInput(e.target.value)}
            />
            <div className="mt-2 max-h-40 overflow-y-auto rounded border">
              {filteredPacients.length > 0 ? (
                filteredPacients.map((p) => (
                  <div
                    key={p.id}
                    className={`hover:bg-muted cursor-pointer p-2 ${
                      selectedPacientId === p.id.toString() ? "bg-muted" : ""
                    }`}
                    onClick={() => {
                      setSelectedPacientId(p.id.toString())
                      setPacientInput(`${p.nombre} ${p.apellido}`)
                    }}
                  >
                    {p.nombre} {p.apellido}
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-500">
                  No hay pacientes disponibles
                </p>
              )}
            </div>

            {selectedPacient && (
              <div className="mt-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha de diagnostico</TableHead>
                      <TableHead>Observaciones</TableHead>
                      <TableHead>Resultado</TableHead>
                      <TableHead>Opciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPacient.consultas.length > 0 &&
                    selectedPacient.resultados.length > 0 ? (
                      selectedPacient.consultas.map((consulta, idx) => (
                        <TableRow key={consulta.id}>
                          <TableCell>
                            {new Date(consulta.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{consulta.observaciones}</TableCell>
                          <TableCell>
                            {selectedPacient.resultados[idx]?.valor ||
                              "Sin resultado"}
                          </TableCell>
                          <TableCell>
                            <HistoryMoreOptionsButton history={consulta} resultId={selectedPacient.resultados[idx]?.id}>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal />
                              </Button>
                            </HistoryMoreOptionsButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="text-muted-foreground text-center"
                        >
                          No hay historial disponible
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
