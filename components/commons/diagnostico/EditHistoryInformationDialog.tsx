import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import HistoryInformationContent from "./HistoryInformationContent"


export function EditHistoryInformationDialog({
  isOpen,
  setIsOpen,
  id,
  history,
}: {
  isOpen: boolean
  id: number
  history,
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar Registro</DialogTitle>
          <DialogDescription>
            Agrega o modifica el comentario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <HistoryInformationContent history={history} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
