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
import { Prueba } from "@prisma/client"
import TestsMoreOptionsButton from "./TestsMoreOptionsButton"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

type CompleteTest = Prueba

export default function TestsDisplayContent() {
  const [filterName, setFilterName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [tests, setTests] = useState<CompleteTest[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/tests?name=${filterName}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch tests")
        }
        const data = await response.json()
        setTests(data.tests as CompleteTest[])
        setTotal(data.total)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTests()
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
                   <TableHead>Causa</TableHead>
                   <TableHead>Opciones</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {tests.map((test) => (
                   <TableRow key={test.id}>
                     <TableCell>
                       {test.nombre}
                     </TableCell>
                     <TableCell>{test.metodo}</TableCell>
                     <TableCell>{test.unidadMedida}</TableCell>
                     <TableCell>{test.rangoNormal}</TableCell>
                     <TableCell>
                       <TestsMoreOptionsButton test={test}>
                         <Button variant="outline" size="sm">
                           <MoreHorizontal />
                         </Button>
                       </TestsMoreOptionsButton>
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