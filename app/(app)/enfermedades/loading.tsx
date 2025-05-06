import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { CardSkeleton } from "@/components/card-skeleton"

export default function DashboardAdministratorLoading() {
  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Enfermedades"
        text="Listado de enfermedades"  
      />

      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}