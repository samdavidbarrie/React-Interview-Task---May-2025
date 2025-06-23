import type { ReactNode } from 'react'
import { CARD } from '../classNames'

export function Card({ children }: { children: ReactNode }) {
  return <div className={CARD}>{children}</div>
}
