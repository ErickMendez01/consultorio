import NewSignButton from "@/components/commons/signos/NewSignButton"
import SignsDisplayContent from "@/components/commons/signos/SignsDisplayContent"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"


export const metadata = {
  title: "Signos",
  description: "Administra los signos registrados",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Signos" text="Listado de signos">
       <NewSignButton />
      </DashboardHeader>

      <div>
        <SignsDisplayContent />
      </div>
    </DashboardShell>
  )
}
