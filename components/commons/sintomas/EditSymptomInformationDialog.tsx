import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SymptomInformationContent from "@/components/commons/sintomas/SymptomInformationContent"
import { Sintoma } from "@prisma/client"

type CompleteSymptom = Sintoma
export function EditSymptomInformationDialog({
  isOpen,
  setIsOpen,
  id,
  symptom,
}: {
  isOpen: boolean
  id: number
  symptom: CompleteSymptom
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar sintoma</DialogTitle>
          <DialogDescription>
            Agrega la nueva información del sintoma para los campos que desea
            actualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <SymptomInformationContent symptom={symptom} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
