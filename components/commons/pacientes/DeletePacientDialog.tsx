import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeletePacientInformation from "@/components/commons/pacientes/DeletePacientInformation"
import { Paciente } from "@prisma/client"

type CompletePacient = Paciente
export function DeletePacientDialog({
  isOpen,
  setIsOpen,
  pacient,
}: {
  isOpen: boolean
  pacient: CompletePacient
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-4 sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Paciente</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar el siguiente paciente?, La
            información se eliminara definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="overyflow-auto grid max-h-[70vh] gap-4 py-4">
            <div className="flex justify-end space-x-2">
              <DeletePacientInformation pacient={pacient.id} />
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
