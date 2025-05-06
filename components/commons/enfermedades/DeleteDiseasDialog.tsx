import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeleteDiseasInformation from "@/components/commons/enfermedades/DeleteDiseasInformation"
import { Enfermedad } from "@prisma/client"

type CompleteDiseas = Enfermedad
export function DeleteDiseasDialog({
  isOpen,
  setIsOpen,
  diseas,
}: {
  isOpen: boolean
  diseas: CompleteDiseas
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-4 sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar enfermedad</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar el siguiente registro?, La
            información se eliminara definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="overyflow-auto grid max-h-[70vh] gap-4 py-4">
            <div className="flex justify-end space-x-2">
              <DeleteDiseasInformation
                diseas={diseas.id}
                setIsOpen={setIsOpen} // Pasamos la función setIsOpen aquí
              />
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
