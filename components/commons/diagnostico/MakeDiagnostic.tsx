"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paciente, Signo, Sintoma, Prueba } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"

type CompletePacient = Paciente & {
  signos: { signo: Signo }[]
  sintomas: { sintoma: Sintoma }[]
}

type CompleteTest = Prueba

export default function MakeDiagnostic() {
  const [pacients, setPacients] = useState<CompletePacient[]>([])
  const [tests, setTests] = useState<CompleteTest[]>([])
  const [selectedPacientId, setSelectedPacientId] = useState<string>("")
  const [selectedTestId, setSelectedTestId] = useState<string>("")
  const [pacientInput, setPacientInput] = useState("")
  const [testInput, setTestInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientRes, testRes] = await Promise.all([
          fetch("/api/pacients?page=1&itemsPerPage=5"),
          fetch("/api/tests?page=1&itemsPerPage=5"),
        ])

        if (!pacientRes.ok || !testRes.ok) {
          throw new Error("Error al obtener datos de pacientes o pruebas")
        }

        const pacientsData = await pacientRes.json()
        const testsData = await testRes.json()

        setPacients(pacientsData.pacients || [])
        setTests(testsData.tests || [])
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
  const selectedTest = tests.find((t) => t.id.toString() === selectedTestId)

  const filteredPacients = pacients.filter((p) =>
    `${p.nombre} ${p.apellido}`
      .toLowerCase()
      .includes(pacientInput.toLowerCase())
  )
  const filteredTests = tests.filter((t) =>
    t.nombre.toLowerCase().includes(testInput.toLowerCase())
  )

  const handleDiagnostic = async () => {
    if (!selectedPacient || !selectedTest) {
      toast({
        title: "Error",
        description:
          "Debe seleccionar un paciente y una prueba antes de continuar",
        variant: "destructive",
      })
      return
    }

    const formattedPaciente = {
      id: selectedPacient.id,
      genero: selectedPacient.genero,
      signos: selectedPacient.signos.map((s) => ({
        id: s.signo.id,
        nombre: s.signo.nombre,
        tipo: s.signo.tipo,
        unidadMedida: s.signo.unidadMedida,
        rangoNormal: s.signo.rangoNormal,
      })),
      sintomas: selectedPacient.sintomas.map((s) => ({
        id: s.sintoma.id,
        nombre: s.sintoma.nombre,
        gravedad: s.sintoma.gravedad,
      })),
    }

    const formattedPrueba = {
      id: selectedTest.id,
      nombre: selectedTest.nombre,
      metodo: selectedTest.metodo,
      unidadMedida: selectedTest.unidadMedida,
      rangoNormal: selectedTest.rangoNormal,
    }

    try {
      const res = await fetch("http://localhost:5000/api/inferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paciente: formattedPaciente,
          prueba: formattedPrueba,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error("Error al generar diagnóstico")
      }

      setResult(data.enfermedad)
      saveDiagnosticData(selectedPacient.id, selectedTest.id, data.enfermedad)
      toast({
        title: `Diagnóstico generado`,
        description: `Se ha identificado esta posible enfermedad: "${data.enfermedad}". Puedes revisar el historial.`,
      })
    } catch (error: any) {
      toast({
        title: "Error al generar diagnóstico",
        description: error.message || "Intenta más tarde",
        variant: "destructive",
      })
    }
  }

  const saveDiagnosticData = async (
    pacienteId: number,
    pruebaId: number,
    valor: string,
  ) => {
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pacienteId,
          pruebaId,
          valor,
        }),
      })
  
      if (!res.ok) {
        throw new Error("Error al guardar los datos")
      }

  
      toast({
        title: "Datos guardados correctamente",
        description: `El diagnóstico, resultado y historial han sido registrados.`,
      })
    } catch (error) {
      console.error("Error al guardar los datos:", error)
      toast({
        title: "Error al guardar los datos",
        description: error.message || "Intenta más tarde",
        variant: "destructive",
      })
    }
  }
  

  const renderList = (title: string, items: { nombre: string }[]) => (
    <div>
      <p className="font-medium">{title}:</p>
      <ul className="ml-4 list-disc">
        {items.map((item, i) => (
          <li key={i}>{item.nombre}</li>
        ))}
      </ul>
    </div>
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
          </div>

          {selectedPacient && (
            <>
              {selectedPacient.signos.length > 0 &&
                renderList(
                  "Signos",
                  selectedPacient.signos.map((s) => s.signo)
                )}
              {selectedPacient.sintomas.length > 0 &&
                renderList(
                  "Síntomas",
                  selectedPacient.sintomas.map((s) => s.sintoma)
                )}
            </>
          )}

          <div>
            <p className="mb-1 font-medium">Buscar Prueba:</p>
            <Input
              placeholder="Buscar prueba por nombre..."
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
            />
            <div className="mt-2 max-h-40 overflow-y-auto rounded border">
              {filteredTests.length > 0 ? (
                filteredTests.map((t) => (
                  <div
                    key={t.id}
                    className={`hover:bg-muted cursor-pointer p-2 ${
                      selectedTestId === t.id.toString() ? "bg-muted" : ""
                    }`}
                    onClick={() => {
                      setSelectedTestId(t.id.toString())
                      setTestInput(t.nombre)
                    }}
                  >
                    {t.nombre}
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-500">No hay pruebas disponibles</p>
              )}
            </div>
          </div>

          {result && (
            <div className="mt-4 rounded border border-green-400 p-4">
              <p className="font-semibold text-green-600">
                Resultado del diagnóstico:
              </p>
              <p>{result}</p>
            </div>
          )}

          <Button
            onClick={handleDiagnostic}
            disabled={!selectedPacient || !selectedTest}
            aria-label="Generar diagnóstico"
          >
            Generar diagnóstico
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
