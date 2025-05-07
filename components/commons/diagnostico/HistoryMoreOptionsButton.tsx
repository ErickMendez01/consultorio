import { ReactNode, useState } from "react"
import { Archive, UserPen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeleteHistoryDialog } from "./DeleteHistoryDialog"
import { EditHistoryInformationDialog } from "./EditHistoryInformationDialog"


const HistoryMoreOptionsButton = ({
  children,
  history,
  resultId,
}: {
  history,
  resultId: number,
  children: ReactNode
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  
  

  return (
    <div>
      <EditHistoryInformationDialog
        id={history.id}
        history={history}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />

      <DeleteHistoryDialog
        historyId={history.id}
        resultId={resultId}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
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

export default HistoryMoreOptionsButton
