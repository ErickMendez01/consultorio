import DiagnosticsDisplayContent from "@/components/commons/diagnostico/DiagnosticsDisplayContent"
import NewTestButton from "@/components/commons/diagnostico/pruebas/NewTestButton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"


export const metadata = {
  title: "Diagnostico",
  description: "Realiza el diagnosticos y registra pruebas",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Diagnostico" text=" Realiza el diagnosticos y registra pruebas">
       <NewTestButton />
      </DashboardHeader>

      <div>
        <DiagnosticsDisplayContent />
      </div>
    </DashboardShell>
  )
}
