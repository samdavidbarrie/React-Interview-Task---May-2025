import type { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className={`w-full max-w-2xl bg-gray-800 rounded-lg p-4 shadow mb-4`}>
      {children}
    </div>
  )
}

export function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={`min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 font-sans leading-[1.5] font-normal`}
    >
      {children}
    </div>
  )
}
