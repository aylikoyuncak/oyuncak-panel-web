export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </div>
      </div>
    </div>
  );
}

