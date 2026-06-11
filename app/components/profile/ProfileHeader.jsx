export default function ProfileHeader({ completeness = 0 }) {
  return (
    <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-zinc-200">
      <div className="flex items-center gap-8 flex-1">
        <h1 className="text-[22px] font-bold text-[#16a34a]">My Profile</h1>

        <div className="flex-1 max-w-md ml-4 flex items-center gap-3">
          <span className="text-[11px] text-zinc-500 font-medium whitespace-nowrap">
            Profile Completeness
          </span>
          <div className="flex-1 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#22c55e] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <span className="text-[11px] text-[#16a34a] font-bold">{completeness}%</span>
        </div>
      </div>
    </div>
  );
}
