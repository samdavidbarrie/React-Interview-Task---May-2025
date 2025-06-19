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
      className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center p-4 font-sans leading-[1.5] font-normal relative`}
    >
      <div className="w-full flex justify-center absolute top-4 left-0 z-0 pointer-events-none">
        <img
          src="/ufo.svg"
          alt="UFO"
          className="ufo-svg-fab opacity-80 animate-bounce"
          style={{ marginLeft: '16px' }}
        />
      </div>
      <div
        style={{
          zIndex: 1,
          width: '100%',
          maxWidth: 640,
          margin: '64px auto 0 auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
