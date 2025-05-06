import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Sintoma} from "@prisma/client"
import { Icons } from "@/components/icons"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"

type CompleteSymptom = Sintoma

export function SymptomsInformationDialog({
  isOpen,
  setIsOpen,
  symptom,
}: {
  symptom: CompleteSymptom
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Datos de sintoma</DialogTitle>
          <DialogDescription>
            Visualiza la información sobre la sintoma.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[90vh] gap-4 overflow-auto py-4">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="grid gap-6">
                  {symptom && (
                    <>
                      <div>
                          <UserInformationSection title="Información de sintoma">
                            <UserInformationItems
                              icon={<Icons.fileArchive className="size-4" />}
                              label="Nombre"
                              value={symptom.nombre}
                            />
                            <UserInformationItems
                              icon={<Icons.fileHeart className="size-4" />}
                              label="Gravedad"
                              value={symptom.gravedad}
                            />
                             <UserInformationItems
                              icon={<Icons.text className="size-4" />}
                              label="Descripción"
                              value={symptom.descripcion}
                            />
                          </UserInformationSection>
                        </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
