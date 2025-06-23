import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow-lg w-full h-full">
      {children}
    </div>
  )
}
