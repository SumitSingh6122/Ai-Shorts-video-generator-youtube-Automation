import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

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

    // Trigger GitHub Action
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

    await octokit.rest.actions.createWorkflowDispatch({
      owner: process.env.GITHUB_REPO_OWNER!,
      repo: process.env.GITHUB_REPO_NAME!,
      workflow_id: 'render.yml',
      ref: 'main',
      inputs: {
        audioURL: body.audioURL,
        videoId:body.videoId,
        captionJson: JSON.stringify(body.captions),
        imageJson: JSON.stringify(body.images || []),
        CaptionStyle: JSON.stringify(body.captionStyle || {})
      }
    });

    return NextResponse.json({
      message: 'GitHub Actions workflow triggered successfully',
    });

  } catch (error) {
    console.error('GitHub trigger failed:', error);
    return NextResponse.json(
      { error: 'Failed to trigger GitHub workflow' },
      { status: 500 }
    );
  }
}
