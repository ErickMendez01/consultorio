import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Signo } from "@prisma/client"
import { Icons } from "@/components/icons"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"

type CompleteSign = Signo

export function SignsInformationDialog({
  isOpen,
  setIsOpen,
  sign,
}: {
  sign: CompleteSign
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Datos de signo</DialogTitle>
          <DialogDescription>
            Visualiza la información sobre el signo. 
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[90vh] gap-4 overflow-auto py-4">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="grid gap-6">
                  {sign && (
                    <>
                      <div>
                          <UserInformationSection title="Información de enfermedad">
                            <UserInformationItems
                              icon={<Icons.fileArchive className="size-4" />}
                              label="Nombre"
                              value={sign.nombre}
                            />
                            <UserInformationItems
                              icon={<Icons.fileSliders className="size-4" />}
                              label="Tipo"
                              value={sign.tipo}
                            />
                             <UserInformationItems
                              icon={<Icons.fileChartColumn className="size-4" />}
                              label="Rango Normal"
                              value={sign.rangoNormal}
                            />
                            <UserInformationItems
                              icon={<Icons.fileChartColumn className="size-4" />}
                              label="Unidad Medida"
                              value={sign.unidadMedida}
                            />
                             <UserInformationItems
                              icon={<Icons.text className="size-4" />}
                              label="Descripción"
                              value={sign.descripcion}
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
