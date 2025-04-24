import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { JobStore } from '@/lib/jobstore';

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

    // Generate unique job ID
    const jobId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    
    // Store job before triggering workflow
    JobStore.create(jobId);
    console.log('Created job:', jobId);

    // Trigger GitHub Action
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
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
      checkUrl: `/api/job/${encodeURIComponent(jobId)}`
    });

  } catch (error) {
    console.error('Render failed:', error);
    return NextResponse.json(
      { error: 'Failed to start render job' },
      { status: 500 }
    );
  }
}