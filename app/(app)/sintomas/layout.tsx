import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"
import { notFound } from "next/navigation"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()

  console.log(user?.role)

  if (!user) {
    return notFound()
  }
  
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="bg-background sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig({user}).mainNav} />

          <UserAccountNav
            user={{
              name: user?.name ?? "",
              image: user?.image ?? "",
              email: user?.email ?? "",
              role: user?.role ?? ""
            }}
          />
        </div>
      </header>

      <div className="grid w-full flex-1 gap-12 md:container md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig({user}).sidebarNav} />
        </aside>

        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>

      <SiteFooter className="border-t" />
    </div>
  )
}
