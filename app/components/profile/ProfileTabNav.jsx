import { PROFILE_TABS } from '../../store/profileConstants';

export default function ProfileTabNav({ activeTab, onTabChange }) {
  return (
    <div className="px-8 border-b border-zinc-200">
      <div className="flex gap-8">
        {PROFILE_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`py-4 text-sm font-medium transition-colors border-b-2 relative -bottom-px ${
              activeTab === tab
                ? 'text-[#16a34a] border-[#16a34a]'
                : 'text-zinc-500 border-transparent hover:text-zinc-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
