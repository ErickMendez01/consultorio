import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeleteUserInformation from "@/components/commons/users/DeleteUserInformation"
import { User } from "@prisma/client"

type Userobject = User 
export function DeleteUserDialog({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean
  user: Userobject
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-4 sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar al siguiente usuario?, La
            información de la cuenta se eliminara definitivamente y el usuario
            perdera acceso a la plataforma.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="overyflow-auto grid max-h-[70vh] gap-4 py-4">
            <div className="flex justify-end space-x-2">
              <DeleteUserInformation code={user.codigo} />
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
