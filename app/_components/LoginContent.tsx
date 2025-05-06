import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserAuthForm } from "@/components/user-auth-form"

const LoginContent = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-muted flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Inicio de Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center text-sm">
              Introduce tu código de empleado y contraseña para
              acceder a la plataforma. Al final
              oprime el botón &quot;Ingresar.&quot;
            </p>
            <UserAuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginContent

