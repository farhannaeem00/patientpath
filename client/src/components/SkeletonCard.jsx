export default function SkeletonCard() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5
                    animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full shrink-0" />
          <div>
            <div className="h-4 bg-gray-800 rounded w-32 mb-2" />
            <div className="h-3 bg-gray-800 rounded w-24" />
          </div>
        </div>
        <div className="h-6 bg-gray-800 rounded-full w-20 shrink-0" />
      </div>
    </div>
  );
}