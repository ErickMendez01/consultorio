import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import SymptomsDisplayContent  from "@/components/commons/sintomas/SymptomsDisplayContent"
import  NewSymptomButton  from "@/components/commons/sintomas/NewSymptomButton"

export const metadata = {
  title: "Sintomas",
  description: "Administra los sintomas registrados",
}

export default async function DashboardPage() {

  return (
    <DashboardShell>
      <DashboardHeader heading="Sintomas" text="Listado de sintomas">
       <NewSymptomButton />
      </DashboardHeader>

      <div>
        <SymptomsDisplayContent />
      </div>
    </DashboardShell>
  )
}
