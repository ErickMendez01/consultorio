import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import TestInformationContent from "@/components/commons/diagnostico/pruebas/TestInformationContent"
import { Prueba } from "@prisma/client"

type CompleteTest = Prueba
export function EditTestInformationDialog({
  isOpen,
  setIsOpen,
  id,
  test,
}: {
  isOpen: boolean
  id: number
  test: CompleteTest
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar Prueba</DialogTitle>
          <DialogDescription>
            Agrega la nueva información de la prueba para los campos que desea
            actualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <TestInformationContent test={test} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
