import type { FC } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export const ArrowKeyTip: FC = () => {
  const isMobile = useIsMobile()
  if (isMobile) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:block">
      <div className="bg-gray-900/90 text-gray-200 px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2 border border-blue-700">
        <span className="font-bold text-blue-300">Pssst…</span>
        <span>
          Try the <kbd className="px-1">←</kbd> <span className="mx-1">/</span>{' '}
          <kbd className="px-1">→</kbd> arrow keys!
        </span>
      </div>
    </div>
  )
}
