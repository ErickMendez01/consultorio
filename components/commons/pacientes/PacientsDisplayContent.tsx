"use client"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Paciente, Signo, Sintoma } from "@prisma/client"
import PacientsMoreOptionsButton from "./PacientsMoreOptionsButton"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

type CompletePacient = Paciente & {
   signos: {
      signo: Signo
    }[]
    sintomas: {
      sintoma: Sintoma
    }[]
}

export default function PacientsDisplayContent() {
  const [filterName, setFilterName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [pacients, setPacients] = useState<CompletePacient[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPacients = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/pacients?name=${filterName}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch pacients")
        }
        const data = await response.json()
        setPacients(data.pacients as CompletePacient[])
        setTotal(data.total)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPacients()
  }, [filterName, currentPage, itemsPerPage])

  const totalPages = Math.ceil(total / itemsPerPage)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto w-full pb-8 pt-2">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div>
              <Label htmlFor="filterName">Nombre</Label>
              <Input
                id="filterName"
                placeholder="Buscar por nombre"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 overflow-x-auto">
         <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Nombre</TableHead>
                   <TableHead>Genero</TableHead>
                   <TableHead>Opciones</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {pacients.map((pacient) => (
                   <TableRow key={pacient.id}>
                     <TableCell>
                       {pacient.nombre} {pacient.apellido}
                     </TableCell>
                     <TableCell>{pacient.genero}</TableCell>
                     <TableCell>
                       <PacientsMoreOptionsButton pacient={pacient}>
                         <Button variant="outline" size="sm">
                           <MoreHorizontal />
                         </Button>
                       </PacientsMoreOptionsButton>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage <= 1) return
                  handlePageChange(currentPage - 1)
                }}
                className={currentPage <= 1 ? "disabled-class" : ""}
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
                onClick={() => {
                  if (currentPage === totalPages) return
                  handlePageChange(currentPage + 1)
                }}
                className={currentPage === totalPages ? "disabled-class" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}