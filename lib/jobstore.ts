// lib/jobStore.ts
interface JobStatus {
    status: 'processing' | 'completed' | 'failed';
    url?: string;
    error?: string;
  }
  
  const jobs = new Map<string, JobStatus>();
  
  export const JobStore = {
    create: (jobId: string) => {
      jobs.set(jobId, { status: 'processing' });
    },
    
    update: (jobId: string, update: Partial<JobStatus>) => {
      const existing = jobs.get(jobId);
      if (existing) {
        jobs.set(jobId, { ...existing, ...update });
      }
    },
  
    get: (jobId: string) => {
      return jobs.get(jobId);
    }
  };