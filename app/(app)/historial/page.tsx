import PacientHistory from "@/components/commons/diagnostico/PacientHistory"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"


export const metadata = {
  title: "Historial",
  description: "Administra el historial del paciente seleccionado",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Historial" text="Administra el historial del paciente seleccionado">
       {/* <NewDocumentButton />*/}
      </DashboardHeader>

      <div>
        <PacientHistory/> 
      </div>
    </DashboardShell>
  )
}
