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
import { Signo } from "@prisma/client"
import SignsMoreOptionsButton from "./SignsMoreOptionsButton"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

type CompleteSign = Signo

export default function SignsDisplayContent() {
  const [filterName, setFilterName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [signs, setSigns] = useState<CompleteSign[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSigns = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/signs?name=${filterName}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch signs")
        }
        const data = await response.json()
        setSigns(data.signs as CompleteSign[])
        setTotal(data.total)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSigns()
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
                   <TableHead>Tipo</TableHead>
                    <TableHead>Rango Normal</TableHead>
                    <TableHead>Unidad de Medida</TableHead>
                   <TableHead>Opciones</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {signs.map((sign) => (
                   <TableRow key={sign.id}>
                     <TableCell>
                       {sign.nombre}
                     </TableCell>
                     <TableCell>{sign.tipo}</TableCell>
                     <TableCell>{sign.rangoNormal}</TableCell>
                     <TableCell>{sign.unidadMedida}</TableCell>
                     <TableCell>
                       <SignsMoreOptionsButton sign={sign}>
                         <Button variant="outline" size="sm">
                           <MoreHorizontal />
                         </Button>
                       </SignsMoreOptionsButton>
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