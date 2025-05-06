
import DiseasesDisplayContent from "@/components/commons/enfermedades/DiseasesDisplayContent"
import NewDiseasButton from "@/components/commons/enfermedades/NewDiseasButton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"


export const metadata = {
  title: "Enfermedades",
  description: "Administra las enfermedades registradas",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Enfermedades" text="Listado de enfermedades">
       <NewDiseasButton />
      </DashboardHeader>

      <div>
        <DiseasesDisplayContent />
      </div>
    </DashboardShell>
  )
}
