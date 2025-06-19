import { Spinner } from './Spinner'

export function ChartSkeleton({
  error,
  loading,
  empty,
}: {
  error?: string
  loading?: boolean
  empty?: boolean
}) {
  return (
    <div className="w-full h-[300px] bg-gray-800 rounded-lg flex flex-col items-center justify-center animate-pulse mb-4 relative">
      <div className="w-3/4 h-2/3 bg-gray-700 rounded-md" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <Spinner />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {loading && (
          <span className="text-blue-200 text-base font-medium">
            Loading...
          </span>
        )}
        {error && (
          <span className="text-red-400 text-base font-medium">{error}</span>
        )}
        {empty && !loading && !error && (
          <span className="text-gray-400 text-base font-medium">
            No data available
          </span>
        )}
      </div>
    </div>
  )
}
