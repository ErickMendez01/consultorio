"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { NewSignRegister } from "./NewSignRegister"

const NewSignButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <NewSignRegister isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Registrar Signo
      </Button>
    </>
  )
}

export default NewSignButton
