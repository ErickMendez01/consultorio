import NewPacientButton from "@/components/commons/pacientes/NewPacientButton"
import PacientsDisplayContent from "@/components/commons/pacientes/PacientsDisplayContent"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"


export const metadata = {
  title: "Pacientes",
  description: "Administra los pacientes registrados",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Pacientes" text="Listado de pacientes">
       <NewPacientButton />
      </DashboardHeader>

      <div>
        <PacientsDisplayContent />
      </div>
    </DashboardShell>
  )
}
