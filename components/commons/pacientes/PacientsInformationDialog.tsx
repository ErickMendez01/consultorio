import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Paciente } from "@prisma/client"
import { Icons } from "@/components/icons"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"

type CompletePacient = Paciente

export function PacientsInformationDialog({
  isOpen,
  setIsOpen,
  pacient,
}: {
  pacient: CompletePacient
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Datos de Paciente</DialogTitle>
          <DialogDescription>
            Visualiza la información sobre el paciente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[90vh] gap-4 overflow-auto py-4">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="grid gap-6">
                  {pacient && (
                    <>
                      <div>
                          <UserInformationSection title="Información de enfermedad">
                            <UserInformationItems
                              icon={<Icons.user className="size-4" />}
                              label="Nombre"
                              value={`${pacient.nombre} ${pacient.apellido}`}
                            />
                            <UserInformationItems
                              icon={<Icons.users className="size-4" />}
                              label="Genero"
                              value={pacient.genero}
                            />
                             <UserInformationItems
                              icon={<Icons.calendar className="size-4" />}
                              label="Fecha de nacimiento"
                              value={new Date(pacient.fechaNacimiento).toLocaleDateString("es-ES")}
                            />
                            <UserInformationItems
                              icon={<Icons.mapPin className="size-4" />}
                              label="Dirección"
                              value={pacient.direccion}
                            />
                            <UserInformationItems
                              icon={<Icons.phone className="size-4" />}
                              label="Telefono"
                              value={pacient.telefono}
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
