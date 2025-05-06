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
import { EditTestInformationDialog } from "@/components/commons/diagnostico/pruebas/EditTestInformationDialog"
import { DeleteTestDialog } from "@/components/commons/diagnostico/pruebas/DeleteTestDialog"
import { TestsInformationDialog } from "@/components/commons/diagnostico/pruebas/TestsInformationDialog"
import { AssignDiseas } from "./AssignDiseas"

const TestsMoreOptionsButton = ({
  children,
  test,
}: {
  test
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isAssignOpen, setIsAssignOpen] = useState(false)

  return (
    <div>
      <EditTestInformationDialog
        id={test.id}
        test={test}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeleteTestDialog
        test={test}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <TestsInformationDialog
        test={test}
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
      />

      <AssignDiseas
        id={test.id}
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

export default TestsMoreOptionsButton
