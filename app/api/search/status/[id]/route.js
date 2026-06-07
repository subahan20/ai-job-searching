import { NextResponse } from 'next/server';
import { Queue } from 'bullmq';
import { redisConnection } from '@/app/lib/redis';

const jobSearchQueue = new Queue('job-search', {
  connection: redisConnection,
});

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ success: false, error: 'Job ID parameter is required.' }, { status: 400 });
  }

  try {
    const job = await jobSearchQueue.getJob(id);

    if (!job) {
      // If the job is missing, it might have been cleaned up or expired, but let's check
      return NextResponse.json({
        success: false,
        error: 'Job not found or already expired.',
      }, { status: 404 });
    }

    const state = await job.getState();

    if (state === 'completed') {
      return NextResponse.json({
        success: true,
        status: 'completed',
        jobs: job.returnvalue || [],
      });
    }

    if (state === 'failed') {
      return NextResponse.json({
        success: true,
        status: 'failed',
        error: job.failedReason || 'Evaluation failed on background worker.',
      });
    }

    // Returns 'active', 'waiting', 'delayed', etc.
    return NextResponse.json({
      success: true,
      status: state,
    });
  } catch (err) {
    console.error(`[API Status GET] Error fetching job status for ID ${id}:`, err);
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve job status from queue.',
    }, { status: 500 });
  }
}
