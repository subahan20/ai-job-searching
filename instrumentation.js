export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Dynamically import the worker to start processing jobs on server boot
    await import('./app/lib/worker.js');
  }
}
