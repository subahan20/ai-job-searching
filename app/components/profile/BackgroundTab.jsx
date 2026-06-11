import { NOTICE_PERIOD_OPTIONS, WORK_EXPERIENCE_OPTIONS } from '../../store/profileConstants';
import { inputClassName } from './ProfileField';
import SkillsInput from './SkillsInput';

export default function BackgroundTab({ fields, onFieldChange, onAddSkill, onRemoveSkill }) {
  const {
    preferred_role,
    core_skills,
    current_ctc,
    expected_ctc,
    work_experience,
    linkedin_url,
    github_url,
    leetcode_url,
    resume_source,
    resume_url,
    notice_period,
  } = fields;

  return (
    <>
      <h2 className="text-[18px] font-bold text-zinc-900 mb-6">Professional Summary</h2>

      <div className="mb-6">
        <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">Preferred Role</label>
        <input
          type="text"
          value={preferred_role ?? ''}
          onChange={(e) => onFieldChange('preferred_role', e.target.value)}
          placeholder="e.g. Frontend Developer"
          className={inputClassName}
        />
      </div>

      <SkillsInput skills={core_skills} onAdd={onAddSkill} onRemove={onRemoveSkill} />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">Current CTC (LPA)</label>
          <input
            type="text"
            value={current_ctc ?? ''}
            onChange={(e) => onFieldChange('current_ctc', e.target.value)}
            placeholder="e.g. 5.5"
            className={inputClassName}
          />
        </div>
        <div>
          <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">Expected CTC (LPA)</label>
          <input
            type="text"
            value={expected_ctc ?? ''}
            onChange={(e) => onFieldChange('expected_ctc', e.target.value)}
            placeholder="e.g. 12.0"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">Work Experience</label>
        <div className="relative">
          <select
            value={work_experience ?? ''}
            onChange={(e) => onFieldChange('work_experience', e.target.value)}
            className="w-full appearance-none border border-zinc-200 rounded-lg px-3 py-2.5 text-[13px] text-zinc-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          >
            <option value="">Select experience</option>
            {WORK_EXPERIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">Professional Profiles</label>
        <div className="flex flex-col gap-3">
          {[
            { field: 'linkedin_url', placeholder: 'LinkedIn URL' },
            { field: 'github_url', placeholder: 'GitHub URL' },
            { field: 'leetcode_url', placeholder: 'LeetCode URL' },
          ].map(({ field, placeholder }) => (
            <input
              key={field}
              type="text"
              value={fields[field] ?? ''}
              onChange={(e) => onFieldChange(field, e.target.value)}
              placeholder={placeholder}
              className={inputClassName}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] text-zinc-500 font-medium block">Resume Source</label>
          <div className="flex bg-zinc-100 rounded border border-zinc-200 p-0.5">
            {['Paste URL', 'Upload PDF'].map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => onFieldChange('resume_source', source)}
                className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${
                  resume_source === source
                    ? 'bg-white shadow-sm text-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          value={resume_url ?? ''}
          onChange={(e) => onFieldChange('resume_url', e.target.value)}
          placeholder={resume_source === 'Upload PDF' ? 'PDF upload coming soon — paste URL for now' : 'Resume URL'}
          className="w-full border border-green-200 border-dashed rounded-lg px-3 py-3 text-[13px] text-[#16a34a] font-medium bg-green-50/30 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
      </div>

      <div>
        <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">Notice Period</label>
        <div className="flex flex-wrap gap-2">
          {NOTICE_PERIOD_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onFieldChange('notice_period', option)}
              className={`px-4 py-2 rounded text-[12px] font-semibold transition-colors border ${
                notice_period === option
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
