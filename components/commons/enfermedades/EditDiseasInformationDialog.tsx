import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import DiseasInformationContent from "@/components/commons/enfermedades/DiseasInformationContent"
import { Enfermedad } from "@prisma/client"

type CompleteDiseas = Enfermedad 
export function EditDiseasInformationDialog({
  isOpen,
  setIsOpen,
  id,
  diseas,
}: {
  isOpen: boolean
  id: number
  diseas: CompleteDiseas
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar Enfermedad</DialogTitle>
          <DialogDescription>
            Agrega la nueva información del registro para los campos que desea
            actualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <DiseasInformationContent diseas={diseas} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
