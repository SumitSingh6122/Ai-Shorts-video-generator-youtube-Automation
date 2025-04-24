import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

// Simple job store (replace with DB in production)
const jobs = new Map<string, {
  status: 'processing' | 'completed' | 'failed',
  url?: string,
  error?: string
}>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.audioURL || !body.captions?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize GitHub client
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

    // Trigger workflow
    const { data } = await octokit.rest.actions.createWorkflowDispatch({
      owner: process.env.GITHUB_REPO_OWNER!,
      repo: process.env.GITHUB_REPO_NAME!,
      workflow_id: 'render.yml',
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
  const { pathname } = new URL(request.url);
  const jobId = pathname.split('/').pop();

  if (!jobId || !jobs.has(jobId)) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(jobs.get(jobId));
}

// Webhook handler for GitHub Actions
export async function PUT(request: Request) {
  const { jobId, status, url, error } = await request.json();
  
  if (jobs.has(jobId)) {
    jobs.set(jobId, {
      status: status === 'success' ? 'completed' : 'failed',
      url,
      error
    });
  }
  
  return NextResponse.json({ success: true });
}