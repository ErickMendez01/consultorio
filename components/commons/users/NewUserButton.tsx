"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { NewUser } from "./NewUserRegister"

const NewUserButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <NewUser isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Registrar usuario
      </Button>
    </>
  )
}

export default NewUserButton
