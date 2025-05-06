import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Enfermedad } from "@prisma/client"
import { Icons } from "@/components/icons"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type CompleteDiseas = Enfermedad & {
  signos: { signo: { id: number; nombre: string } }[]
  sintomas: { sintoma: { id: number; nombre: string } }[]
  pruebas: { prueba: { id: number; nombre: string } }[]
}

const ITEMS_PER_PAGE = 4

export function DiseasesInformationDialog({
  isOpen,
  setIsOpen,
  diseas,
}: {
  diseas: CompleteDiseas
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  const [sintomaPage, setSintomaPage] = useState(1)
  const [signoPage, setSignoPage] = useState(1)
  const [pruebaPage, setPruebaPage] = useState(1)

  const paginatedSintomas = diseas.sintomas.slice(
    (sintomaPage - 1) * ITEMS_PER_PAGE,
    sintomaPage * ITEMS_PER_PAGE
  )

  const paginatedSignos = diseas.signos.slice(
    (signoPage - 1) * ITEMS_PER_PAGE,
    signoPage * ITEMS_PER_PAGE
  )

  const paginatedPruebas = diseas.pruebas.slice(
    (pruebaPage - 1) * ITEMS_PER_PAGE,
    pruebaPage * ITEMS_PER_PAGE
  )

  const totalSintomaPages = Math.ceil(diseas.sintomas.length / ITEMS_PER_PAGE)
  const totalSignoPages = Math.ceil(diseas.signos.length / ITEMS_PER_PAGE)
  const totalPruebaPages = Math.ceil(diseas.pruebas.length / ITEMS_PER_PAGE)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[90vh] overflow-auto p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Datos de enfermedad</DialogTitle>
          <DialogDescription>
            Visualiza la información sobre la enfermedad.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardContent className="grid gap-6 pt-4">
              <UserInformationSection title="Información de enfermedad">
                <UserInformationItems
                  icon={<Icons.fileArchive className="size-4" />}
                  label="Nombre"
                  value={diseas.nombre}
                />
                <UserInformationItems
                  icon={<Icons.fileSliders className="size-4" />}
                  label="Causa"
                  value={diseas.causa}
                />
                <UserInformationItems
                  icon={<Icons.text className="size-4" />}
                  label="Descripción"
                  value={diseas.descripcion}
                />
              </UserInformationSection>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Table className="max-h-40 overflow-y-auto border">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Síntomas</TableHead>
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
                      onClick={() => setSintomaPage((p) => Math.max(p - 1, 1))}
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
                        setSintomaPage((p) => Math.min(p + 1, totalSintomaPages))
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
                        <TableHead className="text-center">Signos</TableHead>
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
                      onClick={() => setSignoPage((p) => Math.max(p - 1, 1))}
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
                        setSignoPage((p) => Math.min(p + 1, totalSignoPages))
                      }
                      disabled={signoPage === totalSignoPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Table className="max-h-40 overflow-y-auto border">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Pruebas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPruebas.map((item) => (
                        <TableRow key={item.prueba.id}>
                          <TableCell className="text-center">
                            {item.prueba.nombre}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-2 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPruebaPage((p) => Math.max(p - 1, 1))}
                      disabled={pruebaPage === 1}
                    >
                      Anterior
                    </Button>
                    <span className="mt-1 text-sm">
                      Página {pruebaPage} de {totalPruebaPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPruebaPage((p) => Math.min(p + 1, totalPruebaPages))
                      }
                      disabled={pruebaPage === totalPruebaPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

