import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { JobStore } from '@/lib/jobstore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
    
    // Generate unique job ID
    const jobId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
    
    // Store initial job state
    JobStore.create(jobId);

    // Trigger workflow
    await octokit.rest.actions.createWorkflowDispatch({
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

    return NextResponse.json({
      jobId,
      checkUrl: `/api/job/${jobId}`
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to start render job' },
      { status: 500 }
    );
  }
}