"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { NewDiseasRegister } from "./NewDiseasRegister"

const NewDiseasButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <NewDiseasRegister isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Registrar Enfermedad
      </Button>
    </>
  )
}

export default NewDiseasButton
