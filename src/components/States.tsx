export function LoadingState() {
  return (
    <div className="flex items-center justify-center h-screen">Loading...</div>
  )
}

export function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center h-screen text-red-500">
      {error}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-screen">
      No data available
    </div>
  )
}
