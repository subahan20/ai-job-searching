import { Worker } from 'bullmq';
import { redisConnection } from './redis';
import { performJobSearchAndScrape } from '../api/search/helpers';

console.log('[BullMQ Worker] Initializing background processing worker...');

let worker;

try {
  worker = new Worker(
    'job-search',
    async (job) => {
      const { role, skills, experience } = job.data;
      console.log(`[BullMQ Worker] Started job ${job.id} searching "${role}"...`);

      // Run scrapers, AI-matching engine, cache inserts
      const matchedJobs = await performJobSearchAndScrape({
        role,
        skills,
        experience,
      });

      console.log(`[BullMQ Worker] Completed job ${job.id} successfully. Matched ${matchedJobs.length} jobs.`);
      
      // The return value is stored in Upstash Redis and retrieved by the polling status endpoint
      return matchedJobs;
    },
    {
      connection: redisConnection,
      concurrency: 1, // Restrict concurrency to avoid hitting Groq API / Apify rate limits
    }
  );

  worker.on('completed', (job) => {
    console.log(`[BullMQ Worker] Job ${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[BullMQ Worker] Job ${job?.id} failed with error:`, err);
  });
} catch (err) {
  console.error('[BullMQ Worker] Fatal error in worker initialization:', err);
}

export { worker };
