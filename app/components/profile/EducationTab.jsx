import { ProfileField } from './ProfileField';

export default function EducationTab({ fields, onFieldChange }) {
  const { degree, university, graduation_year, cgpa } = fields;

  return (
    <>
      <h2 className="text-[18px] font-bold text-zinc-900 mb-6">Educational Background</h2>
      <ProfileField
        label="Degree"
        value={degree}
        onChange={(value) => onFieldChange('degree', value)}
        placeholder="e.g. B.Tech in Computer Science"
      />
      <ProfileField
        label="University / College"
        value={university}
        onChange={(value) => onFieldChange('university', value)}
        placeholder="e.g. Stanford University"
      />
      <div className="grid grid-cols-2 gap-4">
        <ProfileField
          label="Graduation Year"
          value={graduation_year}
          onChange={(value) => onFieldChange('graduation_year', value)}
          placeholder="e.g. 2020"
        />
        <ProfileField
          label="CGPA / Percentage"
          value={cgpa}
          onChange={(value) => onFieldChange('cgpa', value)}
          placeholder="e.g. 3.8 or 85%"
        />
      </div>
    </>
  );
}
