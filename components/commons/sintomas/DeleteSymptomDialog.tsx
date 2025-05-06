import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeleteSymptomInformation from "@/components/commons/sintomas/DeleteSymptomInformation"
import { Sintoma } from "@prisma/client"

type CompleteSymptom = Sintoma
export function DeleteSymptomDialog({
  isOpen,
  setIsOpen,
  symptom,
}: {
  isOpen: boolean
  symptom: CompleteSymptom
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-4 sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar sintoma</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar el siguiente sintoma?, La
            información se eliminara definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="overyflow-auto grid max-h-[70vh] gap-4 py-4">
            <div className="flex justify-end space-x-2">
              <DeleteSymptomInformation symptom={symptom.id} />
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
