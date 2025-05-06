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
import { EditSymptomInformationDialog } from "./EditSymptomInformationDialog"
import { DeleteSymptomDialog } from "./DeleteSymptomDialog"
import { SymptomsInformationDialog } from "./SymptomsInformationDialog"
import { AssignDiseas } from "./AssignDiseas"

const DiseasesMoreOptionsButton = ({
  children,
  symptom,
}: {
  symptom
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  return (
    <div>
      <EditSymptomInformationDialog
        id={symptom.id}
        symptom={symptom}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeleteSymptomDialog
        symptom={symptom}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <SymptomsInformationDialog
        symptom={symptom}
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
      />

      <AssignDiseas
        id={symptom.id}
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

export default DiseasesMoreOptionsButton
