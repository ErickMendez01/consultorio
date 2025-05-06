"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { UserDisplayItemsContentWrapper } from "./UserInformation/UserDisplayWrapper"
import { User } from "@prisma/client"

type CompleteUser = User

export default function UsersDisplayContent() {
  const [filterName, setFilterName] = useState("")
  const [filterCode, setFilterCode] = useState("")
  const [filterRol, setFilterRol] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [users, setUsers] = useState<CompleteUser[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/users?name=${filterName}&code=${filterCode}&rol=${filterRol}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data.users as CompleteUser[])
        setTotal(data.total)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [filterName, filterCode, filterRol, currentPage, itemsPerPage])

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="filterName">Nombre</Label>
              <Input
                id="filterName"
                placeholder="Buscar por nombre"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filterCode">Código</Label>
              <Input
                id="filterCode"
                placeholder="Código de empleado"
                value={filterCode}
                onChange={(e) => setFilterCode(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filterRol">Rol</Label>
              <Select
                value={filterRol}
                onValueChange={(value) => setFilterRol(value)}
              >
                <SelectTrigger id="filterRol">
                  <SelectValue placeholder="Seleccionar Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="medico">Medico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 overflow-x-auto">
          <UserDisplayItemsContentWrapper
            users={users}
            error={error}
            loading={loading}
          />
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