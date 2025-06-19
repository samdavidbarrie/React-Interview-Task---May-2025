import { useIsMobile } from '../useIsMobile'

export function ArrowKeyTip() {
  const isMobile = useIsMobile()
  if (isMobile) return null
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center mt-2 mb-4 gap-1 sm:gap-2">
      <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-1 select-none">
        <span className="font-bold text-green-300">Pssst…</span>
        <span>Use arrow keys</span>
        <span role="img" aria-label="left arrow">
          ⬅️
        </span>
        <span role="img" aria-label="right arrow">
          ➡️
        </span>
        <span>to change week</span>
      </span>
    </div>
  )
}
