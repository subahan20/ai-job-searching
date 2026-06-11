import { ProfileField } from './ProfileField';

export default function ProfileDetailsTab({ fields, onFieldChange }) {
  const { first_name, last_name, email, phone, location, portfolio_url } = fields;

  return (
    <>
      <h2 className="text-[18px] font-bold text-zinc-900 mb-6">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <ProfileField
          label="First Name"
          value={first_name}
          onChange={(value) => onFieldChange('first_name', value)}
          placeholder="e.g. Alex"
        />
        <ProfileField
          label="Last Name"
          value={last_name}
          onChange={(value) => onFieldChange('last_name', value)}
          placeholder="e.g. Rivera"
        />
      </div>
      <ProfileField
        label="Email Address"
        type="email"
        value={email}
        onChange={(value) => onFieldChange('email', value)}
        placeholder="e.g. alex@example.com"
        readOnly
      />
      <ProfileField
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(value) => onFieldChange('phone', value)}
        placeholder="e.g. +1 234 567 8900"
      />
      <ProfileField
        label="Location"
        value={location}
        onChange={(value) => onFieldChange('location', value)}
        placeholder="e.g. San Francisco, CA"
      />
      <ProfileField
        label="Portfolio URL"
        type="url"
        value={portfolio_url}
        onChange={(value) => onFieldChange('portfolio_url', value)}
        placeholder="https://..."
      />
    </>
  );
}
