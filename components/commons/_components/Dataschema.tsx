import React from "react"

export function UserInformationSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <hr className="grow border-gray-400" />
        <span className="font-bold">{title}</span>
        <hr className="grow border-gray-400" />
      </div>
      <div className="grid grid-cols-2 gap-4 p-2">{children}</div>
    </div>
  )
}
