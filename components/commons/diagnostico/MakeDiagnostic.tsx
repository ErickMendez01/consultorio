"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Paciente, Signo, Sintoma, Prueba } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type CompletePacient = Paciente & {
  signos: {
    signo: Signo
  }[]
  sintomas: {
    sintoma: Sintoma
  }[]
}

type CompleteTest = Prueba

export default function MakeDiagnostic() {
  const [PacientscurrentPage, setPacientsCurrentPage] = useState(1)
  const [TestscurrentPage, setTestsCurrentPage] = useState(1)
  const [TestsitemsPerPage, setTestsItemsPerPage] = useState(10)
  const [PacientsitemsPerPage, setPacientsItemsPerPage] = useState(10)
  const [pacients, setPacients] = useState<CompletePacient[]>([])
  const [tests, setTests] = useState<CompleteTest[]>([])
  const [pacient, setPacient] = useState<CompletePacient[]>([])
  const [test, setTest] = useState<CompleteTest[]>([])
  const [result, setResult] = useState("")
  const [totalPacients, setTotalPacients] = useState(0)
  const [totalTests, setTotalTests] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPacients = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/pacients?page=${PacientscurrentPage}&itemsPerPage=${PacientsitemsPerPage}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch pacients")
        }
        const data = await response.json()
        setPacients(data.pacients as CompletePacient[])
        setTotalPacients(data.total)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPacients()
  }, [PacientscurrentPage, PacientsitemsPerPage])

  useEffect(() => {
      const fetchTests = async () => {
        setLoading(true)
        try {
          const response = await fetch(
            `/api/tests?page=${TestscurrentPage}&itemsPerPage=${TestsitemsPerPage}`
          )
          if (!response.ok) {
            throw new Error("Failed to fetch tests")
          }
          const data = await response.json()
          setTests(data.tests as CompleteTest[])
          setTotalTests(data.total)
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
      fetchTests()
    }, [TestscurrentPage, TestsitemsPerPage])

  const totalPagesPacients = Math.ceil(totalPacients / PacientsitemsPerPage)
  const handlePacientsPageChange = (page: number) => {
    setPacientsCurrentPage(page)
  }

  const totalPagesTests = Math.ceil(totalTests / TestsitemsPerPage)
  const handleTestsPageChange = (page: number) => {
    setTestsCurrentPage(page)
  }


  const handleDiagnostic = async () => {
    const res = await fetch("http://localhost:5000/api/inferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paciente:  pacient,
        prueba: test,
      }),
    })

    const data = await res.json()
    setResult(data.enfermedad)
  }

  return (
    <div className="container mx-auto w-full pb-8 pt-2">
      <Card>
        <CardHeader>
          <CardTitle>Seleccione Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <Select onValueChange={setPacient}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un paciente" />
          </SelectTrigger>
          <SelectContent>
            {pacients.map((pacient: any) => (
              <SelectItem key={pacient.id} value={pacient.id.toString()}>
                {pacient.nombre} {pacient.apellido}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {signos.length > 0 && (
        <div>
          <p className="font-medium">Signos:</p>
          <ul className="ml-4 list-disc">
            {signos.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {sintomas.length > 0 && (
        <div>
          <p className="font-medium">Síntomas:</p>
          <ul className="ml-4 list-disc">
            {sintomas.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label>Prueba a aplicar:</label>
        <Select onValueChange={setTest}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una prueba" />
          </SelectTrigger>
          <SelectContent>
            {tests.map((test: any) => (
              <SelectItem key={test.id} value={test.nombre}>
                {test.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleDiagnostico} disabled={!pacient || !test}>
        Generar diagnóstico
      </Button>

      {result && (
        <div className="mt-4 rounded border p-4">
          <p className="font-bold text-lg">Diagnóstico:</p>
          <p className="text-primary">{result}</p>
        </div>
      )}
    </div>
  )
          </div>
        </CardContent>
        </CardContent>
      </Card>
      <div className="mt-6 overflow-x-auto"></div>
    </div>
  )
 <Card/>
}
