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
import { EditDiseasInformationDialog } from "./EditDiseasInformationDialog"
import { DeleteDiseasDialog } from "@/components/commons/enfermedades/DeleteDiseasDialog"
import { DiseasesInformationDialog } from "@/components/commons/enfermedades/DiseasesInformationDialog"

const DiseasesMoreOptionsButton = ({
  children,
  diseas,
}: {
  diseas,
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  return (
    <div>
      <EditDiseasInformationDialog
        id={diseas.id}
        diseas={diseas}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeleteDiseasDialog
        diseas={diseas}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <DiseasesInformationDialog
        diseas={diseas}
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

export default DiseasesMoreOptionsButton
