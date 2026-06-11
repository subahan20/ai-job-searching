'use client';

import Link from 'next/link';

const SECTIONS = [
  {
    title: 'Profile Details',
    fields: [
      { key: 'first_name', label: 'First Name' },
      { key: 'last_name', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'location', label: 'Location' },
      { key: 'portfolio_url', label: 'Portfolio URL', isLink: true },
    ],
  },
  {
    title: 'Education',
    fields: [
      { key: 'degree', label: 'Degree' },
      { key: 'university', label: 'University / College' },
      { key: 'graduation_year', label: 'Graduation Year' },
      { key: 'cgpa', label: 'CGPA / Percentage' },
    ],
  },
  {
    title: 'Background Details',
    fields: [
      { key: 'preferred_role', label: 'Preferred Role' },
      { key: 'work_experience', label: 'Work Experience' },
      { key: 'current_ctc', label: 'Current CTC (LPA)' },
      { key: 'expected_ctc', label: 'Expected CTC (LPA)' },
      { key: 'notice_period', label: 'Notice Period' },
      { key: 'linkedin_url', label: 'LinkedIn', isLink: true },
      { key: 'github_url', label: 'GitHub', isLink: true },
      { key: 'leetcode_url', label: 'LeetCode', isLink: true },
      { key: 'resume_source', label: 'Resume Source' },
      { key: 'resume_url', label: 'Resume URL', isLink: true },
    ],
  },
];

function FieldValue({ value, isLink = false }) {
  if (!value) {
    return <span className="text-zinc-400 italic">Not provided</span>;
  }

  if (isLink) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#008738] font-semibold hover:underline break-all"
      >
        {value}
      </a>
    );
  }

  return <span className="text-zinc-800 font-semibold">{value}</span>;
}

export default function ProfileViewModal({
  isOpen,
  onClose,
  profile = {},
  isLoading = false,
  displayName = 'User',
  initials = 'U',
}) {
  if (!isOpen) return null;

  const { core_skills = [] } = profile ?? {};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close profile modal"
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-zinc-100 bg-gradient-to-r from-[#008738]/5 to-transparent flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fabd2f] flex items-center justify-center text-zinc-900 font-extrabold text-sm uppercase shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-zinc-900 truncate">{displayName}</h2>
            <p className="text-[12px] text-zinc-500 font-medium">Your complete profile</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-zinc-500 text-sm font-semibold">
              Loading profile...
            </div>
          ) : (
            <>
              {SECTIONS.map((section) => (
                <section key={section.title}>
                  <h3 className="text-[12px] font-black text-[#008738] uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.fields.map(({ key, label, isLink }) => (
                      <div
                        key={key}
                        className="rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3"
                      >
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                          {label}
                        </p>
                        <FieldValue value={profile?.[key]} isLink={isLink} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h3 className="text-[12px] font-black text-[#008738] uppercase tracking-wider mb-3">
                  Core Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {core_skills?.length > 0 ? (
                    core_skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[12px] font-bold border border-green-100"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-400 italic text-sm">No skills added</span>
                  )}
                </div>
              </section>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-[12px] font-bold hover:bg-white transition-colors"
          >
            Close
          </button>
          <Link
            href="/profile"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#008738] text-white text-[12px] font-bold hover:bg-[#00702e] transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
