import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Paciente, Signo, Sintoma } from "@prisma/client"
import { Icons } from "@/components/icons"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"
import { useState } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type CompletePacient = Paciente & {
  signos: {
    signo: Signo
  }[]
  sintomas: {
    sintoma: Sintoma
  }[]
}

const ITEMS_PER_PAGE = 4

export function PacientsInformationDialog({
  isOpen,
  setIsOpen,
  pacient,
}: {
  pacient: CompletePacient
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [sintomaPage, setSintomaPage] = useState(1)
  const [signoPage, setSignoPage] = useState(1)

  const paginatedSintomas = pacient.sintomas.slice(
    (sintomaPage - 1) * ITEMS_PER_PAGE,
    sintomaPage * ITEMS_PER_PAGE
  )

  const paginatedSignos = pacient.signos.slice(
    (signoPage - 1) * ITEMS_PER_PAGE,
    signoPage * ITEMS_PER_PAGE
  )

  const totalSintomaPages = Math.ceil(pacient.sintomas.length / ITEMS_PER_PAGE)
  const totalSignoPages = Math.ceil(pacient.signos.length / ITEMS_PER_PAGE)

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
                            value={new Date(
                              pacient.fechaNacimiento
                            ).toLocaleDateString("es-ES")}
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

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Table className="max-h-40 overflow-y-auto border">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-center">
                                    Síntomas
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {paginatedSintomas.map((item) => (
                                  <TableRow key={item.sintoma.id}>
                                    <TableCell className="text-center">
                                      {item.sintoma.nombre}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <div className="mt-2 flex justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSintomaPage((p) => Math.max(p - 1, 1))
                                }
                                disabled={sintomaPage === 1}
                              >
                                Anterior
                              </Button>
                              <span className="mt-1 text-sm">
                                Página {sintomaPage} de {totalSintomaPages}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSintomaPage((p) =>
                                    Math.min(p + 1, totalSintomaPages)
                                  )
                                }
                                disabled={sintomaPage === totalSintomaPages}
                              >
                                Siguiente
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Table className="max-h-40 overflow-y-auto border">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-center">
                                    Signos
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {paginatedSignos.map((item) => (
                                  <TableRow key={item.signo.id}>
                                    <TableCell className="text-center">
                                      {item.signo.nombre}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <div className="mt-2 flex justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSignoPage((p) => Math.max(p - 1, 1))
                                }
                                disabled={signoPage === 1}
                              >
                                Anterior
                              </Button>
                              <span className="mt-1 text-sm">
                                Página {signoPage} de {totalSignoPages}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSignoPage((p) =>
                                    Math.min(p + 1, totalSignoPages)
                                  )
                                }
                                disabled={signoPage === totalSignoPages}
                              >
                                Siguiente
                              </Button>
                            </div>
                          </div>
                        </div>
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
