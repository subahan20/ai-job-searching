'use client';

import { useState } from 'react';

export default function SkillsInput({ skills = [], onAdd, onRemove }) {
  const [draft, setDraft] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const commitSkill = () => {
    const skill = draft.trim();
    if (!skill) return;
    onAdd?.(skill);
    setDraft('');
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <label className="text-[11px] text-zinc-500 font-medium mb-2 block">Core Skills</label>
      <div className="flex flex-wrap gap-2 items-center">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[12px] font-medium border border-green-100"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove?.(skill)}
              className="text-green-500 hover:text-green-800 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}

        {isEditing ? (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), commitSkill())}
            onBlur={() => {
              if (draft.trim()) commitSkill();
              else setIsEditing(false);
            }}
            autoFocus
            placeholder="Type and press Enter"
            className="px-3 py-1 text-[12px] rounded-full border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-zinc-500 text-[12px] font-medium border border-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <span className="text-[14px] leading-none">+</span> Add Skill
          </button>
        )}
      </div>
    </div>
  );
}
