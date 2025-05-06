import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeleteTestInformation from "@/components/commons/diagnostico/pruebas/DeleteTestInformation"
import { Prueba } from "@prisma/client"

type CompleteTest = Prueba
export function DeleteTestDialog({
  isOpen,
  setIsOpen,
  test,
}: {
  isOpen: boolean
  test: CompleteTest
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-4 sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Prueba</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar la siguiente prueba?, La
            información se eliminara definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="overyflow-auto grid max-h-[70vh] gap-4 py-4">
            <div className="flex justify-end space-x-2">
              <DeleteTestInformation
                test={test.id}
                setIsOpen={setIsOpen} 
              />
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
