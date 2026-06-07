import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import { calculateJobMatches, performJobSearchAndScrape } from './helpers';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const roleParam = searchParams.get('role');
  const skillsParam = searchParams.get('skills');
  const experienceParam = searchParams.get('experience');

  // CASE 1: If no search parameters are supplied (or are empty), fetch the most recent cached jobs from Supabase
  if (!roleParam && !skillsParam && !experienceParam) {
    try {
      const { data: cachedJobs, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('[Supabase] Failed to fetch cached jobs:', error);
        return NextResponse.json({ success: false, message: 'Failed to retrieve jobs from cache' });
      }

      const rawJobs = (cachedJobs || []).map(row => ({
        id: row.id,
        title: row.title,
        company: row.company,
        logoUrl: row.logo_url || undefined,
        logoColor: row.logo_color || 'bg-blue-600 text-white',
        source: row.source,
        experienceLevel: row.experience_level || 'Mid',
        minExperienceYears: row.min_experience_years || 0,
        skillsRequired: row.skills_required || [],
        salary: row.salary || 'Not Disclosed',
        location: row.location || 'Remote',
        description: row.description || '',
        postedTime: row.posted_time || 'Active',
        url: row.url || ''
      }));

      const jobs = calculateJobMatches(rawJobs, '', [], 0);
      return NextResponse.json({ success: true, jobs });
    } catch (cacheErr) {
      console.error('[Supabase] Cache retrieval error:', cacheErr);
      return NextResponse.json({ success: false, message: 'Cache retrieval error' });
    }
  }

  // CASE 2: Active search parameters supplied -> Execute search and matching synchronously (1 API hit)
  const role = roleParam || 'React Developer';
  const skillsString = skillsParam || '';
  const experienceYears = parseInt(experienceParam || '0', 10);

  try {
    console.log(`[API GET] Executing synchronous scrape & match for: "${role}"`);
    const matchedJobs = await performJobSearchAndScrape({
      role,
      skills: skillsString,
      experience: experienceYears,
    });

    return NextResponse.json({
      success: true,
      jobs: matchedJobs || [],
    });
  } catch (err) {
    console.error('[API GET] Synchronous search execution failed:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to complete search query.' },
      { status: 500 }
    );
  }
}
