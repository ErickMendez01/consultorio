import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import UserDisplayContent from "@/components/commons/users/UserDisplayContent"
import NewUserButton from "@/components/commons/users/NewUserButton"

export const metadata = {
  title: "Usuarios",
  description: "Administra la información de tus usuarios",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Usuarios" text="Listado de usuarios">
        <NewUserButton />
      </DashboardHeader>

      <div>
        <UserDisplayContent />
      </div>
    </DashboardShell>
  )
}
