export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-6"></div>
        <p className="text-white text-2xl font-serif">
          Dissolving your sheet...
        </p>
      </div>
    </div>
  );
}
