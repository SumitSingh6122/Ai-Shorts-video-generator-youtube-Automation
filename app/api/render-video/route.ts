import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

type JobStatus = {
  status: 'processing' | 'completed' | 'failed';
  url?: string;
  error?: string;
};

const jobs = new Map<string, JobStatus>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.audioURL || !body.captions?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

    // Trigger workflow
    const { data } = await octokit.rest.actions.createWorkflowDispatch({
      owner: process.env.GITHUB_REPO_OWNER!,
      repo: process.env.GITHUB_REPO_NAME!,
      workflow_id: 'render-video.yml',
      ref: 'main',
      inputs: {
        audioURL: body.audioURL,
        captionJson: JSON.stringify(body.captions),
        imageJson: JSON.stringify(body.images || []),
        CaptionStyle: JSON.stringify(body.captionStyle || {})
      }
    });

    // Store initial job state
    jobs.set(data.id, { status: 'processing' });

    return NextResponse.json({
      jobId: data.id,
      checkUrl: `/api/job/${data.id}`
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to start render job' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const jobId = url.pathname.split('/').pop();

  if (!jobId || !jobs.has(jobId)) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  // Update status from GitHub
  if (jobs.get(jobId)?.status === 'processing') {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
      const { data: run } = await octokit.rest.actions.getWorkflowRun({
        owner: process.env.GITHUB_REPO_OWNER!,
        repo: process.env.GITHUB_REPO_NAME!,
        run_id: Number(jobId)
      });

      if (run.conclusion === 'success') {
        const { data: artifacts } = await octokit.rest.actions.listWorkflowRunArtifacts({
          owner: process.env.GITHUB_REPO_OWNER!,
          repo: process.env.GITHUB_REPO_NAME!,
          run_id: Number(jobId)
        });
        
        const output = artifacts.artifacts.find(a => a.name === 'cloudinary-url');
        if (output) {
          jobs.set(jobId, { status: 'completed', url: output.archive_download_url });
        }
      } else if (run.conclusion === 'failure') {
        jobs.set(jobId, { status: 'failed', error: 'Workflow failed' });
      }
    } catch (error) {
      console.error('Status check failed:', error);
    }
  }

  return NextResponse.json(jobs.get(jobId));
}

export const dynamic = 'force-dynamic';