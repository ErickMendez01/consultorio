import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
type UserRole = string
type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    role: UserRole
    codigo: string
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      role: UserRole
      codigo: string
    }
  }
}
