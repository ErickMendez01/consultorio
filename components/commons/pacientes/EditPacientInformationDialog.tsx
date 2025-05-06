import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PacientInformationContent from "@/components/commons/pacientes/PacientInformationContent"
import { Paciente } from "@prisma/client"

type CompletePacient = Paciente
export function EditPacientInformationDialog({
  isOpen,
  setIsOpen,
  id,
  pacient,
}: {
  isOpen: boolean
  id: number
  pacient: CompletePacient
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar Paciente</DialogTitle>
          <DialogDescription>
            Agrega la nueva información del paciente para los campos que desea
            actualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <PacientInformationContent pacient={pacient} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
