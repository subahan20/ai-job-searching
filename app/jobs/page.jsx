'use client';

import JobBrowsePage from '../components/browse/JobBrowsePage';

export default function AdminJobsPage() {
  return (
    <JobBrowsePage
      title="Admin Jobs"
      source="Admin Portal"
      subtitle={(count) => `Showing ${count} admin-posted opportunities.`}
    />
  );
}
