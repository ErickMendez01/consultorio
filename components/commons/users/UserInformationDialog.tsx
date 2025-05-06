import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { User} from "@prisma/client"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { UserInformationSection } from "@/components/commons/_components/Dataschema"
import { UserInformationItems } from "@/components/commons/_components/Informationschema"

type UserObject = User

export function UserInformationDialog({
  isOpen,
  setIsOpen,
  user,
}: {
  user: UserObject
  isOpen: boolean
  setIsOpen: (newValue: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Datos de usuario</DialogTitle>
          <DialogDescription>
            Visualiza la información disponible del siguiente usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[90vh] gap-4 overflow-auto py-4">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-8">
              <Card>
                <CardContent className="grid gap-6">
                  {user && (
                    <>
                      <div>
                          <UserInformationSection title="Información de cuenta">
                            <UserInformationItems
                              icon={<Icons.user className="size-4" />}
                              label="Nombre"
                              value={`${user.nombre} ${user.apellido}`}
                            />
                            <UserInformationItems
                              icon={<Icons.code className="size-4" />}
                              label="Código"
                              value={user.codigo}
                            />
                            <UserInformationItems
                              icon={<Icons.user className="size-4" />}
                              label="Rol"
                              value={
                                <Badge
                                  variant={
                                    user.role === "admin"
                                      ? "success"
                                      : user.role === "medico"
                                      ? "gray"
                                      : "destructive"
                                  }
                                >
                                  {user.role}
                                </Badge>
                              }
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
