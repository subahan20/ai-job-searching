'use client';

import DashboardLayout from '../components/DashboardLayout';
import BackgroundTab from '../components/profile/BackgroundTab';
import EducationTab from '../components/profile/EducationTab';
import ProfileDetailsTab from '../components/profile/ProfileDetailsTab';
import ProfileFooter from '../components/profile/ProfileFooter';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileStatusBanner from '../components/profile/ProfileStatusBanner';
import ProfileTabNav from '../components/profile/ProfileTabNav';
import { useProfile } from '../hooks/useProfile';

const TAB_COMPONENTS = {
  'Profile Details': ProfileDetailsTab,
  Education: EducationTab,
  'Background Details': BackgroundTab,
};

export default function ProfilePage() {
  const {
    draftFields,
    savedFields,
    activeTab,
    completeness,
    displayName,
    isLoading,
    isSaving,
    error,
    saveSuccess,
    updateField,
    handleAddSkill,
    handleRemoveSkill,
    handleTabChange,
    handleNext,
    handleBack,
    handleSave,
    handleDiscard,
    dismissError,
    dismissSaveSuccess,
  } = useProfile();

  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-white relative">
        <ProfileHeader completeness={completeness} />
        <ProfileTabNav activeTab={activeTab} onTabChange={handleTabChange} />
        <ProfileStatusBanner
          error={error}
          saveSuccess={saveSuccess}
          onDismissError={dismissError}
          onDismissSuccess={dismissSaveSuccess}
        />

        <main className="flex-1 overflow-y-auto px-8 py-6 bg-zinc-50/30">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-zinc-500">Loading profile data...</div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-start gap-6 max-w-7xl mx-auto mb-20">
              <div className="flex-1 bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                {activeTab === 'Background Details' ? (
                  <BackgroundTab
                    fields={draftFields}
                    onFieldChange={updateField}
                    onAddSkill={handleAddSkill}
                    onRemoveSkill={handleRemoveSkill}
                      />
                    ) : (
                  <ActiveTabComponent fields={draftFields} onFieldChange={updateField} />
                )}
              </div>

              <ProfileSidebar displayName={displayName} fields={savedFields} />
            </div>
          )}
        </main>

        <ProfileFooter
          activeTab={activeTab}
          isSaving={isSaving}
          onDiscard={handleDiscard}
          onSave={handleSave}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </DashboardLayout>
  );
}
