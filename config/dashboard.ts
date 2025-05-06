import { DashboardConfig } from "types"

export function dashboardConfig({ user }: { user: any }): DashboardConfig {
  return {
    mainNav: [],
    sidebarNav: [
      ...(user.role === "admin"
        ? [
            {
              title: "Usuarios",
              href: "/usuarios",
              icon: "user" as const,
            },
            {
              title: "Enfermedades",
              href: "/enfermedades",
              icon: "biohazard" as const,
            },
            {
              title: "Signos",
              href: "/signos",
              icon: "stethoscope" as const,
            },
            {
              title: "Sintomas",
              href: "/sintomas",
              icon: "thermometer" as const,
            },
          ]
        : user.role === "medico"
        ? [
            {
              title: "Pacientes",
              href: "/pacientes",
              icon: "user" as const,
            },
            {
              title: "Enfermedades",
              href: "/enfermedades",
              icon: "biohazard" as const,
            },
            {
              title: "Signos",
              href: "/signos",
              icon: "stethoscope" as const,
            },
            {
              title: "Sintomas",
              href: "/sintomas",
              icon: "thermometer" as const,
            },
            {
              title: "Historial",
              href: "/historial",
              icon: "fileArchive" as const,
            },
            {
              title: "Diagnostico",
              href: "/diagnostico",
              icon: "search" as const,
            },
          ]
        : []),
    ],
  }
}
