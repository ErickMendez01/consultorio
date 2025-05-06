"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import  { NewTestRegister } from "@/components/commons/diagnostico/pruebas/NewTestRegister"
const NewTestButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <NewTestRegister isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Registrar Prueba
      </Button>
    </>
  )
}

export default NewTestButton
