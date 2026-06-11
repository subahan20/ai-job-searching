const inputClassName =
  'w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-[13px] text-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500';

export function ProfileField({ label, type = 'text', value, onChange, placeholder, readOnly = false }) {
  return (
    <div className="mb-6">
      <label className="text-[11px] text-zinc-500 font-medium mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`${inputClassName} ${readOnly ? 'bg-zinc-50 text-zinc-500 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

export { inputClassName };
