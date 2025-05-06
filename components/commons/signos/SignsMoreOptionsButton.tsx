import { ReactNode, useState } from "react"
import { Archive, Pin, UserPen, View } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditSignInformationDialog } from "./EditSignInformationDialog"
import { DeleteSignDialog } from "@/components/commons/signos/DeleteSignDialog"
import { SignsInformationDialog } from "./SignsInformationDialog"
import { AssignDiseas } from "./AssignDiseas"

const SignsMoreOptionsButton = ({
  children,
  sign,
}: {
  sign,
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  return (
    <div>
      <EditSignInformationDialog
        id={sign.id}
        sign={sign}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeleteSignDialog
        sign={sign}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <SignsInformationDialog
        sign={sign}
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
      />

      <AssignDiseas
       id={sign.id}
       isOpen={isAssignOpen}
       setIsOpen={setIsAssignOpen}
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
            <DropdownMenuItem
              onClick={() => {
                setIsAssignOpen(true)
              }}
            >
              <Pin className="mr-2 size-4" />
              <span className="flex-1">Asignar</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SignsMoreOptionsButton
