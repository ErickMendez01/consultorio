import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CardSkeleton } from "@/components/card-skeleton"

export default function DashboardAdministratorLoading() {
  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Pacientes" 
        text="Listado de pacientes" 
      />

      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}