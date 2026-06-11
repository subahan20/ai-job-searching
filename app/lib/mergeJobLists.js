export const mergeJobLists = (primaryJobs = [], secondaryJobs = []) => {
  const seen = new Set();
  const merged = [];

  for (const job of [...primaryJobs, ...secondaryJobs]) {
    const key = job.url || job.id;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(job);
  }

  return merged;
};
