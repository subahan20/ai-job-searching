export default function ProfileFooter({ activeTab, isSaving, onDiscard, onSave, onNext, onBack }) {
  const isFirstTab = activeTab === 'Profile Details';
  const isLastTab = activeTab === 'Background Details';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-8 py-4 flex justify-center items-center gap-4 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:pl-[240px]">
      
      {!isLastTab && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSaving || isFirstTab}
          className={`px-8 py-2.5 rounded-lg border border-zinc-300 text-[13px] font-bold transition-colors ${
            isSaving || isFirstTab
              ? 'text-zinc-400 bg-zinc-50 opacity-60 cursor-not-allowed'
              : 'text-zinc-700 hover:bg-zinc-50'
          }`}
        >
          Back
        </button>
      )}

      {isLastTab && (
        <button
          type="button"
          onClick={onDiscard}
          disabled={isSaving}
          className="px-8 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 text-[13px] font-bold hover:bg-zinc-50 transition-colors disabled:opacity-50"
        >
          Discard
        </button>
      )}

      {!isLastTab ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isSaving}
          className="px-8 py-2.5 rounded-lg bg-[#008738] text-white text-[13px] font-bold hover:bg-[#00702e] transition-colors shadow-sm disabled:opacity-50"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-8 py-2.5 rounded-lg bg-[#008738] text-white text-[13px] font-bold hover:bg-[#00702e] transition-colors shadow-sm disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
      )}

    </div>
  );
}
