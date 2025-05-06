import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Prueba } from "@prisma/client"
import { Icons } from "@/components/icons"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"

type CompleteTest = Prueba

export function TestsInformationDialog({
  isOpen,
  setIsOpen,
  test,
}: {
  test: CompleteTest
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Datos de Prueba</DialogTitle>
          <DialogDescription>
            Visualiza la información sobre la prueba.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[90vh] gap-4 overflow-auto py-4">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="grid gap-6">
                  {test && (
                    <>
                      <div>
                          <UserInformationSection title="Información de prueba">
                            <UserInformationItems
                              icon={<Icons.fileArchive className="size-4" />}
                              label="Nombre"
                              value={test.nombre}
                            />
                            <UserInformationItems
                              icon={<Icons.fileSliders className="size-4" />}
                              label="Metodo"
                              value={test.metodo}
                            />
                            <UserInformationItems
                              icon={<Icons.fileSliders className="size-4" />}
                              label="Unidad medida"
                              value={test.unidadMedida}
                            />
                            <UserInformationItems
                              icon={<Icons.fileSliders className="size-4" />}
                              label="Rango normal"
                              value={test.rangoNormal}
                            />
                             <UserInformationItems
                              icon={<Icons.text className="size-4" />}
                              label="Descripción"
                              value={test.descripcion}
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
