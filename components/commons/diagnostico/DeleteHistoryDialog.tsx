import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeleteHistoryInformation from "./DeleteHistoryInformation"

export function DeleteHistoryDialog({
  isOpen,
  setIsOpen,
  historyId,
  resultId,
}: {
  isOpen: boolean
  historyId: number
  resultId: number
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="p-4 sm:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Historial</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar dl siguiente registro?, La
            información se eliminara definitivamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="overyflow-auto grid max-h-[70vh] gap-4 py-4">
            <div className="flex justify-end space-x-2">
              <DeleteHistoryInformation
                historyId={historyId}
                resultId={resultId}
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
