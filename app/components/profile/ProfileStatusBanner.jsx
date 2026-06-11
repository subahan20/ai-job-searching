export default function ProfileStatusBanner({ error, saveSuccess, onDismissError, onDismissSuccess }) {
  if (!error && !saveSuccess) return null;

  return (
    <div className="px-8 pt-4">
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          <span>{error}</span>
          <button type="button" onClick={onDismissError} className="font-semibold hover:underline">
            Dismiss
          </button>
        </div>
      )}
      {saveSuccess && (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
          <span>Profile saved successfully.</span>
          <button type="button" onClick={onDismissSuccess} className="font-semibold hover:underline">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
