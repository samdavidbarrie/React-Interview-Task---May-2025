import type { ReactNode } from 'react'
import { CARD } from './classNames'

export function Card({ children }: { children: ReactNode }) {
  return <div className={CARD}>{children}</div>
}

export function Container({ children }: { children: ReactNode }) {
  // Responsive: remove border/maxWidth on mobile
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center p-0 sm:p-4 font-sans leading-[1.5] font-normal relative">
      <div className="w-full flex justify-center absolute top-2 sm:top-4 left-0 z-0 pointer-events-none">
        <img
          src="/ufo.svg"
          alt="UFO"
          className="ufo-svg-fab opacity-80 animate-bounce"
          style={{ marginLeft: '16px' }}
        />
      </div>
      <div
        className="w-full pt-8 sm:pt-8"
        style={{
          zIndex: 1,
          width: '100%',
          maxWidth: 640,
          margin: '48px auto 0 auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
