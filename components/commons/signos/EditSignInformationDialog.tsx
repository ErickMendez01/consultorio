import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SignInformationContent from "@/components/commons/signos/SignInformationContent"
import { Signo } from "@prisma/client"

type CompleteSign = Signo
export function EditSignInformationDialog({
  isOpen,
  setIsOpen,
  id,
  sign,
}: {
  isOpen: boolean
  id: number
  sign: CompleteSign
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Actualizar signo</DialogTitle>
          <DialogDescription>
            Agrega la nueva información del signo para los campos que desea
            actualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-4 overflow-auto py-4">
          <SignInformationContent sign={sign} id={id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
