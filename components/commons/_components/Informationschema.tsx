import React from "react"

export function UserInformationItems({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-bold">{label}</span>
      </div>
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  )
}
