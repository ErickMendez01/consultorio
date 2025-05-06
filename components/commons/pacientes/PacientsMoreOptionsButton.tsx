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
import { EditPacientInformationDialog } from "./EditPacientInformationDialog"
import { DeletePacientDialog } from "./DeletePacientDialog"
import { PacientsInformationDialog } from "./PacientsInformationDialog"
import { AssignSigns} from "./AssignSigns"
import { AssignSymptoms} from "./AssignSymptoms"

const PacientsMoreOptionsButton = ({
  children,
  pacient,
}: {
  pacient
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isSignsOpen, setIsSignsOpen] = useState(false)
  const [isSymptomsOpen, setIsSymptomsOpen] = useState(false)

  return (
    <div>
      <EditPacientInformationDialog
        id={pacient.id}
        pacient={pacient}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeletePacientDialog
        pacient={pacient}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <PacientsInformationDialog
        pacient={pacient}
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
      />
      <AssignSigns
        id={pacient.id}
        isOpen={isSignsOpen}
        setIsOpen={setIsSignsOpen}
      />
      <AssignSymptoms
        id={pacient.id}
        isOpen={isSymptomsOpen}
        setIsOpen={setIsSymptomsOpen}
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
                setIsSignsOpen(true)
              }}
            >
              <Pin className="mr-2 size-4" />
              <span className="flex-1">Signos</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsSymptomsOpen(true)
              }}
            >
              <Pin className="mr-2 size-4" />
              <span className="flex-1">Sintomas</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PacientsMoreOptionsButton
