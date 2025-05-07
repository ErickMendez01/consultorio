"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import TestsDisplayContent from "./pruebas/TestsDisplayContent"
import MakeDiagnostic from "./MakeDiagnostic"

export default function TeachersDisplayContent() {
  const [currentTab, setCurrentTab] = useState("Diagnostico")
  const tabs = ["Diagnostico", "Pruebas"]

  const renderTabContent = () => {
    switch (currentTab) {
      case "Diagnostico":
        return <MakeDiagnostic/>
      case "Pruebas":
        return <TestsDisplayContent />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto w-full pb-8 pt-2">
      <div className="grid max-h-[70vh] gap-4 overflow-auto pb-4">
        <div className="flex w-full flex-col items-center">
          <div className="mb-4 flex w-full space-x-2">
            {tabs.map((tab, index) => (
              <Button
                key={`${tab}-${index}`}
                variant={tab !== currentTab ? "outline" : "default"}
                onClick={() => setCurrentTab(tab)}
                type="button"
              >
                {tab}
              </Button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
