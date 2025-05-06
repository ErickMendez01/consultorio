import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { User } from "@prisma/client"
import { CardSkeleton } from "@/components/card-skeleton"
import UsersMoreOptionsButton from "../UsersMoreOptionsButton"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
type CompleteUser = User

const UserDisplayItemsContentWrapper = ({
  users,
  error,
  loading,
}: {
  users: CompleteUser[]
  error?: string | null
  loading: boolean
}) => {
  if (loading) {
    return <CardSkeleton />
  }
  if (error) {
    return <p className="text-red-500">{error}</p>
  }
  if (!users.length) {
    return <p className="text-red-500">No se encontraron usuarios.</p>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Código empleado</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.nombre} {user.apellido}
            </TableCell>
            <TableCell>{user.codigo}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <UsersMoreOptionsButton user={user} userId={user.id}>
                <Button variant="outline" size="sm">
                  <MoreHorizontal />
                </Button>
              </UsersMoreOptionsButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { UserDisplayItemsContentWrapper }
