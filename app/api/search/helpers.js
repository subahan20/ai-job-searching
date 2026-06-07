import { ApifyClient } from 'apify-client';
import { supabase } from '../../lib/supabase';

// Shared Constants to prevent instantiation on every function call
const SKILL_DICTIONARY = {
  react: 'React.js', 'react.js': 'React.js', reactjs: 'React.js',
  angular: 'Angular', vue: 'Vue.js', node: 'Node.js', 'node.js': 'Node.js',
  express: 'Express.js', typescript: 'TypeScript', javascript: 'JavaScript',
  js: 'JavaScript', ts: 'TypeScript', python: 'Python', django: 'Django',
  flask: 'Flask', java: 'Java', spring: 'Spring Boot', kotlin: 'Kotlin',
  swift: 'Swift', docker: 'Docker', kubernetes: 'Kubernetes', k8s: 'Kubernetes',
  aws: 'AWS', azure: 'Azure', gcp: 'GCP', 'next.js': 'Next.js', nextjs: 'Next.js',
  tailwind: 'TailwindCSS', tailwindcss: 'TailwindCSS', css: 'CSS3', html: 'HTML5',
  sql: 'SQL', mongodb: 'MongoDB', postgres: 'PostgreSQL', postgresql: 'PostgreSQL',
  graphql: 'GraphQL', redux: 'Redux', git: 'Git'
};

const TECH_SKILLS_POOL = ['TypeScript', 'Node.js', 'React.js', 'TailwindCSS', 'AWS', 'Docker', 'Git', 'JavaScript', 'HTML5', 'CSS3'];
const DATE_KEYWORDS = new Set(['recently', 'active', 'just now', 'today']);
const MS_UNITS = { min: 60000, hour: 3600000, day: 86400000, week: 604800000, month: 2592000000 };
const LOGO_COLORS = [
  'bg-indigo-600 text-white', 'bg-blue-600 text-white', 'bg-red-500 text-white',
  'bg-emerald-600 text-white', 'bg-cyan-800 text-white', 'bg-orange-500 text-white',
  'bg-sky-600 text-white', 'bg-amber-600 text-white'
];

// Helper: Map experience years to LinkedIn's FE parameter format
export function mapExperienceToFE(years) {
  if (years <= 0) return '1'; // Internship
  if (years === 1) return '2'; // Entry level
  if (years <= 3) return '3'; // Associate
  if (years <= 7) return '4'; // Mid-Senior level
  if (years <= 12) return '5'; // Director
  return '6'; // Executive
}

// Helper: Parse experience years from Naukri experience text
export function parseNaukriExperience(expStr) {
  if (typeof expStr === 'number') return expStr;
  if (!expStr || typeof expStr !== 'string') return 0;
  const match = expStr.match(/(\d+)\s*(?:-|to)\s*(\d+)/i) || expStr.match(/(\d+)\s*yrs?/i);
  return match ? parseInt(match[1], 10) : 0;
}

// Helper: Deduce seniority label from experience requirements
export function getExperienceLevel(minYears) {
  if (minYears <= 1) return 'Junior';
  if (minYears <= 3) return 'Mid';
  if (minYears <= 7) return 'Senior';
  return 'Lead';
}

// Helper: Deduce required tech skills based on job content
export function deduceSkills(title, description, userSkills) {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();
  const skillsRequiredSet = new Set();

  // Match candidate profile skills
  userSkills.forEach(skill => {
    const clean = skill.trim().toLowerCase();
    if (clean && (titleLower.includes(clean) || descLower.includes(clean))) {
      skillsRequiredSet.add(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });

  // Match dictionary of common skills
  Object.keys(SKILL_DICTIONARY).forEach(key => {
    if (titleLower.includes(key) || descLower.includes(key)) {
      skillsRequiredSet.add(SKILL_DICTIONARY[key]);
    }
  });

  // Pad to 4 skills with pool defaults
  while (skillsRequiredSet.size < 4) {
    const randomSkill = TECH_SKILLS_POOL[Math.floor(Math.random() * TECH_SKILLS_POOL.length)];
    skillsRequiredSet.add(randomSkill);
  }

  return Array.from(skillsRequiredSet);
}

// Helper: Parse relative/absolute date strings to timestamps
export function parseDateStringToMs(dateStr) {
  if (!dateStr) return 0;
  const clean = dateStr.trim().toLowerCase();
  if (DATE_KEYWORDS.has(clean)) return Date.now();
  
  const match = clean.match(/(\d+)\s*(day|hour|min|month|week)s?\s*ago/);
  if (match) {
    const val = parseInt(match[1], 10);
    const unit = Object.keys(MS_UNITS).find(u => match[2].startsWith(u));
    return unit ? Date.now() - val * MS_UNITS[unit] : Date.now();
  }
  
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? 0 : parsed;
}

// Fallback guest scraper when Apify is not configured or fails
export async function runFallbackScraper(role, experienceYears, skillsString, userSkills) {
  let html = '';
  const initialJobs = [];
  const f_E = mapExperienceToFE(experienceYears);

  try {
    const response = await fetch(
      `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(role)}&location=India&f_E=${f_E}&start=0`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        next: { revalidate: 60 }
      }
    );
    if (response.ok) html = await response.text();
  } catch (err) {
    console.error('Failed to fetch LinkedIn guest search html:', err);
  }

  if (html) {
    const liItems = html.match(/<li[^>]*>([\s\S]+?)<\/li>/g) || [];
    liItems.forEach((liContent) => {
      const urnMatch = liContent.match(/data-entity-urn="urn:li:jobPosting:(\d+)"/) || liContent.match(/href="[^"]*?\/view\/[^"]*?-(\d+)(?:\?|")/);
      const jobId = urnMatch ? urnMatch[1] : '';

      const titleMatch = liContent.match(/<h3 class="base-search-card__title">([\s\S]*?)<\/h3>/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ') : '';

      const companyLink = liContent.match(/<a class="hidden-nested-link"[^>]*>([\s\S]*?)<\/a>/);
      const companyPlain = liContent.match(/<h4 class="base-search-card__subtitle">([\s\S]*?)<\/h4>/);
      const company = (companyLink ? companyLink[1] : (companyPlain ? companyPlain[1].replace(/<[^>]*>/g, '') : '')).trim().replace(/\s+/g, ' ');

      const locMatch = liContent.match(/<span class="job-search-card__location">([\s\S]*?)<\/span>/);
      const location = locMatch ? locMatch[1].trim() : 'India';

      const logoMatch = liContent.match(/data-delayed-url="([^"]+)"/) || liContent.match(/src="([^"]+)"/);
      const logoUrl = logoMatch ? logoMatch[1].replace(/&amp;/g, '&') : '';

      const timeMatch = liContent.match(/<time[^>]*datetime="[^"]*"[^>]*>([\s\S]*?)<\/time>/) || liContent.match(/<span class="job-search-card__listdate"[^>]*>([\s\S]*?)<\/span>/);
      const postedTime = timeMatch ? timeMatch[1].replace(/<[^>]*>/g, '').trim() : 'Recently';

      if (jobId && title && company) {
        initialJobs.push({
          id: `linkedin-${jobId}`,
          title,
          company,
          location,
          logoUrl,
          postedTime,
          source: 'LinkedIn',
          url: `https://www.linkedin.com/jobs/view/${jobId}`
        });
      }
    });
  }

  let finalJobs = [];
  const groqKey = process.env.GROK_AI;
  const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';

  if (groqKey && html && initialJobs.length > 0) {
    try {
      const prompt = `You are an expert recruitment data extraction AI.
Analyze the following raw HTML snippet from a job search page.
Extract the top 5 listed jobs and return a JSON object matching this structure:

interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  source: 'LinkedIn' | 'Naukri';
  experienceLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  minExperienceYears: number;
  skillsRequired: string[];
  salary: string;
  location: string;
  description: string;
  postedTime: string;
  url: string;
}

Keep description summaries extremely concise and short. Return ONLY valid JSON format:
{ "jobs": Job[] }

HTML CONTENT:
${html.substring(0, 30000)}`;

      const response = await fetch(groqUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const aiData = await response.json();
        const content = JSON.parse(aiData.choices?.[0]?.message?.content || '{}');
        if (Array.isArray(content.jobs)) {
          finalJobs = content.jobs.map(job => ({ ...job, source: 'LinkedIn' }));
        }
      }
    } catch (err) {
      console.error('Groq AI guest scraping fallback extraction failed:', err);
    }
  }

  return finalJobs;
}

// Local evaluation fallback
export function calculateJobMatches(jobs, role, userSkills, experienceYears) {
  const searchRoleLower = role.toLowerCase();
  const words = searchRoleLower.split(/\s+/).filter(Boolean);

  return jobs.map((job) => {
    const skillsRequired = job.skillsRequired || [];
    const matched = skillsRequired.filter(s => userSkills.includes(s.toLowerCase()));
    const missing = skillsRequired.filter(s => !userSkills.includes(s.toLowerCase()));

    const skillScore = skillsRequired.length ? (matched.length / skillsRequired.length) * 40 : 0;

    const yearDiff = experienceYears - (job.minExperienceYears || 0);
    const experienceScore = yearDiff >= 0 ? 30 : (yearDiff === -1 ? 15 : 0);

    const titleLower = (job.title || '').toLowerCase();
    const hasRoleOverlap = words.length > 0 && words.every(w => titleLower.includes(w));
    const roleScore = hasRoleOverlap ? 30 : (words.some(w => titleLower.includes(w)) ? 15 : 0);

    const score = Math.round(skillScore + experienceScore + roleScore);

    const explanation = score >= 80
      ? `Excellent match! You possess key skills (${matched.slice(0, 2).join(', ')}) and meet the experience criteria.`
      : score >= 55
      ? `Good match. Matches your experience level, but you might want to add: ${missing.slice(0, 2).join(', ')}.`
      : `Partial match. Needs more skill overlap in ${missing.slice(0, 3).join(', ')}.`;

    return {
      ...job,
      score,
      matchedSkills: matched,
      missingSkills: missing,
      experienceMatch: yearDiff >= 0,
      roleMatch: hasRoleOverlap,
      matchExplanation: explanation
    };
  });
}

// AI Match score evaluator via Groq
export async function calculateJobMatchesWithAI(jobs, role, skills, experience) {
  const groqKey = process.env.GROK_AI;
  const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';

  if (!groqKey) {
    throw new Error('AI Service is currently unavailable. Please check your GROK_AI api key in the .env configuration.');
  }
  if (jobs.length === 0) return [];

  try {
    const prompt = `You are an expert recruitment matching engine AI.
You need to score and evaluate a list of jobs against a candidate's profile.

Candidate Profile:
- Preferred Role: "${role}"
- Experience: ${experience} years
- Candidate Skills: ${skills}

Jobs to evaluate:
${JSON.stringify(jobs.map(j => ({ id: j.id, title: j.title, company: j.company, minExperienceYears: j.minExperienceYears || 0, skillsRequired: j.skillsRequired || [], description: j.description || '' })), null, 2)}

For each job, determine:
1. score: A number from 0 to 100.
   - Skill Match (40%): Compare candidate skills to job required skills.
   - Experience Match (30%): Compare candidate experience to job minExperienceYears.
   - Role Match (30%): Does candidate preferred role align with job title?
2. matchedSkills: array of candidate skills that match the job.
3. missingSkills: array of job required skills that the candidate is missing.
4. experienceMatch: boolean.
5. roleMatch: boolean.
6. matchExplanation: A short explanation of the match status (under 120 characters).

Return ONLY a valid JSON object matching this structure:
{
  "evaluations": [
    {
      "id": "job-id",
      "score": 85,
      "matchedSkills": ["React", "TypeScript"],
      "missingSkills": ["Node.js"],
      "experienceMatch": true,
      "roleMatch": true,
      "matchExplanation": "Excellent fit! High skills overlap and meets experience requirements."
    }
  ]
}`;

    const aiResponse = await fetch(groqUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (aiResponse.ok) {
      const data = await aiResponse.json();
      const content = JSON.parse(data.choices?.[0]?.message?.content || '{}');
      if (Array.isArray(content.evaluations)) {
        const evalMap = new Map(content.evaluations.map((e) => [e.id, e]));
        return jobs.map(job => {
          const evaluation = evalMap.get(job.id);
          if (evaluation) {
            return {
              ...job,
              score: Number(evaluation.score) || 0,
              matchedSkills: Array.isArray(evaluation.matchedSkills) ? evaluation.matchedSkills : [],
              missingSkills: Array.isArray(evaluation.missingSkills) ? evaluation.missingSkills : [],
              experienceMatch: !!evaluation.experienceMatch,
              roleMatch: !!evaluation.roleMatch,
              matchExplanation: evaluation.matchExplanation || ''
            };
          }
          return {
            ...job,
            score: 0,
            matchedSkills: [],
            missingSkills: job.skillsRequired || [],
            experienceMatch: false,
            roleMatch: false,
            matchExplanation: 'AI failed to evaluate this job listing.'
          };
        });
      }
    }
    throw new Error(`Groq AI API returned status code ${aiResponse.status}`);
  } catch (err) {
    console.error('[Groq AI] Match evaluation failed:', err);
    throw new Error(err instanceof Error ? err.message : 'AI Match evaluation failed.');
  }
}

// Core execution helper performing scraping, AI matching, and DB insertion
export async function performJobSearchAndScrape({ role, skills: skillsString, experience: experienceYears }) {
  const userSkills = skillsString
    ? skillsString.split(',').map(s => s.trim().toLowerCase())
    : [];

  let jobs = [];
  const apifyToken = process.env.APIFY_API_TOKEN;

  // 1. Run Apify scrapers in parallel
  if (apifyToken) {
    console.log(`[Apify API] Triggering LinkedIn and Naukri scrapers for: "${role}"`);
    try {
      const client = new ApifyClient({ token: apifyToken });

      const [linkedinRun, naukriRun] = await Promise.allSettled([
        client.actor('harvestapi/linkedin-job-search').call({
          jobTitles: [role], locations: ['India'], maxItems: 6, sortBy: 'date'
        }),
        client.actor('muhammetakkurtt/naukri-job-scraper').call({
          keyword: role, location: 'India', max_jobs: 6, fetch_details: false
        })
      ]);

      if (linkedinRun.status === 'fulfilled') {
        try {
          const { items } = await client.dataset(linkedinRun.value.defaultDatasetId).listItems();
          items.forEach((item, index) => {
            const title = item.title || item.positionName || item.jobTitle;
            const company = item.company?.name || item.companyName || item.company;
            if (title && company) {
              const desc = item.descriptionText || item.description || `Active job opening for a ${title} at ${company}. Apply now!`;
              const skillsRequired = deduceSkills(title, desc, userSkills);

              const titleLower = title.toLowerCase();
              const minExp = titleLower.includes('senior') || titleLower.includes('sr.') ? 5 : (titleLower.includes('lead') || titleLower.includes('architect') ? 8 : (titleLower.includes('junior') || titleLower.includes('jr.') || titleLower.includes('intern') ? 0 : 1));
              const expLevel = getExperienceLevel(minExp);

              let salaryStr = 'Discuss with recruiter';
              if (item.salary) {
                salaryStr = typeof item.salary === 'string' ? item.salary : (item.salary.min || item.salary.max ? `₹${item.salary.min?.toLocaleString()} - ₹${item.salary.max?.toLocaleString()} / year` : salaryStr);
              }

              jobs.push({
                id: `linkedin-apify-${item.id || index}`,
                title: title.trim().replace(/\s+/g, ' '),
                company: company.trim().replace(/\s+/g, ' '),
                logoUrl: item.company?.logo || item.companyLogo || item.logoUrl || '',
                source: 'LinkedIn',
                experienceLevel: expLevel,
                minExperienceYears: minExp,
                skillsRequired,
                salary: salaryStr,
                location: item.location?.parsed?.text || item.location?.linkedinText || item.location || 'India',
                description: desc.substring(0, 135) + (desc.length > 135 ? '...' : ''),
                postedTime: item.postedDate ? new Date(item.postedDate).toLocaleDateString() : (item.postedTime || 'Recently'),
                url: item.linkedinUrl || item.jobUrl || item.url || `https://www.linkedin.com/jobs/view/${item.id || index}`
              });
            }
          });
        } catch (err) {
          console.error('[Apify API] Failed to parse LinkedIn dataset items:', err);
        }
      }

      if (naukriRun.status === 'fulfilled') {
        try {
          const { items } = await client.dataset(naukriRun.value.defaultDatasetId).listItems();
          items.forEach((item, index) => {
            const title = item.title || item.jobTitle || item.positionName;
            const company = item.company || item.companyName;
            if (title && company) {
              const desc = item.description || item.jobDescription || `Active job opening for a ${title} at ${company}. Apply now!`;
              const skillsRequired = deduceSkills(title, desc, userSkills);
              const minExp = parseNaukriExperience(item.experience);
              const expLevel = getExperienceLevel(minExp);

              jobs.push({
                id: `naukri-apify-${item.id || index}`,
                title: title.trim().replace(/\s+/g, ' '),
                company: company.trim().replace(/\s+/g, ' '),
                logoUrl: item.logoUrl || '',
                source: 'Naukri',
                experienceLevel: expLevel,
                minExperienceYears: minExp,
                skillsRequired,
                salary: item.salary || 'Not Disclosed',
                location: item.location || 'India',
                description: desc.substring(0, 135) + (desc.length > 135 ? '...' : ''),
                postedTime: item.postedTime || 'Recently',
                url: item.link || item.url || ''
              });
            }
          });
        } catch (err) {
          console.error('[Apify API] Failed to parse Naukri dataset items:', err);
        }
      }
    } catch (apifyErr) {
      console.error('[Apify API] Scraper run rejected. Falling back to guest scraper...', apifyErr);
    }
  }

  // 2. Guest Scraper Fallback
  if (jobs.length === 0) {
    console.log('[Apify API] No jobs found or Apify not configured. Running fallback guest scraper...');
    jobs = await runFallbackScraper(role, experienceYears, skillsString, userSkills);
  }

  // 3. Format job values (colors and missing Naukri detail links)
  jobs = jobs.map((job, index) => {
    job.logoColor = LOGO_COLORS[index % LOGO_COLORS.length];

    if (job.source === 'Naukri' && (!job.url || job.url.includes('search') || !job.url.includes('job-listings'))) {
      const clean = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const minExp = job.minExperienceYears || 0;
      const maxExp = job.experienceLevel === 'Junior' ? 4 : (job.experienceLevel === 'Mid' ? 5 : (job.experienceLevel === 'Senior' ? 8 : 12));
      
      const cleanId = job.id.replace(/[^0-9]/g, '') || '240524500185';
      const randomSid = '178057547' + Math.floor(10000000 + Math.random() * 90000000);
      job.url = `https://www.naukri.com/job-listings-${clean(job.title)}-${clean(job.company)}-${clean(job.location)}-${minExp}-to-${maxExp}-years-${cleanId}?src=directSearch&sid=${randomSid}&xp=${index + 1}&px=1`;
    }
    return job;
  });

  // 4. Save scraped jobs to cached DB (jobs table)
  if (jobs.length > 0) {
    try {
      const supabaseRows = jobs.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        logo_url: job.logoUrl || null,
        logo_color: job.logoColor,
        source: job.source,
        experience_level: job.experienceLevel,
        min_experience_years: job.minExperienceYears,
        skills_required: job.skillsRequired,
        salary: job.salary,
        location: job.location,
        description: job.description,
        posted_time: job.postedTime,
        url: job.url
      }));

      const { error: dbErr } = await supabase.from('jobs').upsert(supabaseRows, { onConflict: 'id' });
      if (dbErr) console.error('[Supabase Cache Upsert] Error:', dbErr);
    } catch (upsertErr) {
      console.error('[Supabase Cache Upsert] Try-Catch error:', upsertErr);
    }
  }

  // 5. Evaluate Matches (Groq AI)
  let matchedJobs = [];
  try {
    matchedJobs = await calculateJobMatchesWithAI(jobs, role, skillsString, experienceYears);
  } catch (aiErr) {
    console.warn('[API GET] Groq AI failing. Falling back to local score matching.', aiErr);
    matchedJobs = calculateJobMatches(jobs, role, userSkills, experienceYears);
  }

  return matchedJobs;
}
