import type { FC } from 'react'

export const LoadingState: FC = () => (
  <div className="flex items-center justify-center h-screen">Loading...</div>
)

export const ErrorState: FC<{ error: string }> = ({ error }) => (
  <div className="flex items-center justify-center h-screen text-red-500">
    {error}
  </div>
)

export const EmptyState: FC = () => (
  <div className="flex items-center justify-center h-screen">
    No data available
  </div>
)
