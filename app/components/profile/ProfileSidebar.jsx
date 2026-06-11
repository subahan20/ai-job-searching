export default function ProfileSidebar({ displayName, fields }) {
  const { preferred_role = '', work_experience = '', core_skills = [] } = fields ?? {};
  const roleLabel = preferred_role || 'Add your preferred role';
  const experienceLabel = work_experience ? `${work_experience} Exp` : 'Experience not set';
  const skillsLabel = core_skills.length > 0 ? core_skills.slice(0, 2).join(' • ') : 'Add core skills';

  return (
    <div className="w-full lg:w-[300px] flex flex-col gap-4">
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[16px]">💡</span>
          <h3 className="text-[13px] font-bold text-zinc-800">Profile Tip</h3>
        </div>
        <p className="text-[12px] text-zinc-600 leading-relaxed">
          Candidates who list at least 5 core skills and update their GitHub link are{' '}
          <span className="text-[#16a34a] font-bold">3.2x more likely</span> to get short-listed by AI Job Agents.
        </p>
      </div>

      <div className="bg-[#f8f9fa] rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="bg-[#f1f3f5] px-5 py-3 border-b border-zinc-200">
          <h3 className="text-[12px] font-bold text-zinc-800">Public Profile Preview</h3>
        </div>
        <div className="p-5 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#16a34a]/10 mb-3 flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-[#16a34a] text-xl font-bold">
              {displayName?.charAt(0)?.toUpperCase() ?? '?'}
            </span>
          </div>
          <h4 className="text-[14px] font-bold text-zinc-900 leading-tight text-center">{displayName}</h4>
          <p className="text-[11px] text-zinc-500 mb-3 text-center">
            {experienceLabel} • {skillsLabel}
          </p>
          <p className="text-[11px] text-zinc-600 mb-4 text-center">{roleLabel}</p>
          <span className="inline-flex px-2 py-0.5 rounded bg-green-100 text-[#16a34a] text-[9px] font-black tracking-wider uppercase mb-5">
            {core_skills.length >= 5 ? 'Top Candidate' : 'Building Profile'}
          </span>
        </div>
      </div>
    </div>
  );
}
