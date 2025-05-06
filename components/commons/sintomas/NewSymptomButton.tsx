"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { NewSymptomRegister } from "./NewSymptomRegister"

const NewSymptomButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <NewSymptomRegister isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Registrar Sintoma
      </Button>
    </>
  )
}

export default NewSymptomButton
