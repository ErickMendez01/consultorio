import { Metadata } from "next"
import LoginContent from "@/app/_components/LoginContent"

export const metadata: Metadata = {
  title: "Inicia sesion",
  description: "Inicia sesion",
}

export default function LoginPage() {
  return <LoginContent />
}
