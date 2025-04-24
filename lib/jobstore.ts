// lib/jobStore.ts
interface JobStatus {
  status: 'processing' | 'completed' | 'failed';
  url?: string;
  error?: string;
}

// Persistent store for development
const globalWithStore = global as typeof globalThis & {
  __jobStore?: Map<string, JobStatus>;
};

const jobStore = globalWithStore.__jobStore || new Map<string, JobStatus>();
globalWithStore.__jobStore = jobStore;

export const JobStore = {
  create: (jobId: string) => {
    jobStore.set(jobId, { status: 'processing' });
  },
  
  update: (jobId: string, update: Partial<JobStatus>) => {
    const existing = jobStore.get(jobId);
    if (existing) {
      jobStore.set(jobId, { ...existing, ...update });
    }
  },

  get: (jobId: string) => {
    return jobStore.get(jobId);
  },

  exists: (jobId: string) => {
    return jobStore.has(jobId);
  }
};