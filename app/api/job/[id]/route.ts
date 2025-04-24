import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import  JobStore  from '@/lib/cloundary';

// app/api/job/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = decodeURIComponent(params.id);
    const job = JobStore.get(jobId);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // If already completed, return immediately
    if (job.status !== 'processing') {
      return NextResponse.json(job);
    }

    // Check GitHub status
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
    const { data: runs } = await octokit.rest.actions.listWorkflowRuns({
      owner: process.env.GITHUB_REPO_OWNER!,
      repo: process.env.GITHUB_REPO_NAME!,
      workflow_id: 'render-video.yml',
      event: 'workflow_dispatch',
      per_page: 1
    });

    const run = runs.workflow_runs.find(r => 
      r.inputs?.jobId === jobId
    );

    if (run?.conclusion === 'success') {
      JobStore.update(jobId, {
        status: 'completed',
        url: run.outputs?.cloudinaryUrl
      });
    } else if (run?.conclusion === 'failure') {
      JobStore.update(jobId, {
        status: 'failed',
        error: 'Workflow failed'
      });
    }

    return NextResponse.json(JobStore.get(jobId));

  } catch (error) {
    console.error('Status check failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}