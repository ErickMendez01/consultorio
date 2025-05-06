import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import UserInformationContent from "@/components/commons/users/UserInformationContent"
import { User } from "@prisma/client"

type Userobject = User 
export function EditUserInformationDialog({
  isOpen,
  setIsOpen,
  id,
  user,
}: {
  isOpen: boolean
  id: number
  user: Userobject
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar usuario</DialogTitle>
          <DialogDescription>
            Agrega la nueva información del usuario para los campos que desea
            actualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <UserInformationContent user={user} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
