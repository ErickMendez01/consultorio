import { ReactNode, useState } from "react"
import { Archive, UserPen, View } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditUserInformationDialog } from "./EditUserInformationDialog"
import { DeleteUserDialog } from "@/components/commons/users/DeleteUserDialog"
import { UserInformationDialog } from "@/components/commons/users/UserInformationDialog"

const UsersMoreOptionsButton = ({
  children,
  user,
  userId,
}: {
  user
  userId: number
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  return (
    <div>
      <EditUserInformationDialog
        id={userId}
        user={user}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeleteUserDialog
        user={user}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <UserInformationDialog
        user={user}
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {typeof children === "string" ? <span>{children}</span> : children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setIsEditOpen(true)
              }}
            >
              <UserPen className="mr-2 size-4" />
              <span className="flex-1">Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsViewOpen(true)
              }}
            >
              <View className="mr-2 size-4" />
              <span className="flex-1">Detalles</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteOpen(true)
              }}
            >
              <Archive className="mr-2 size-4" />
              <span className="flex-1">Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UsersMoreOptionsButton
