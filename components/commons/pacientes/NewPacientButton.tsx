"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { NewPacientRegister } from "./NewPacientRegister"

const NewPacientButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <NewPacientRegister isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Registrar Paciente
      </Button>
    </>
  )
}

export default NewPacientButton
