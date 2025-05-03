import cloudinary from '@/lib/cloundary';
import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.audioURL || !body.captions?.length || !body.images?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload only captions JSON to Cloudinary
    const captionBuffer = Buffer.from(JSON.stringify(body.captions));
    const captionUrl = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: `captions/caption_${body.videoId}`,
          format: 'json',
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(captionBuffer);
    });

    // Trigger GitHub Action with caption URL, image JSON string, and other data
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

    await octokit.rest.actions.createWorkflowDispatch({
      owner: process.env.GITHUB_REPO_OWNER!,
      repo: process.env.GITHUB_REPO_NAME!,
      workflow_id: 'render.yml',
      ref: 'main',
      inputs: {
        audioURL: body.audioURL,
        videoId: body.videoId,
        captionJsonUrl: captionUrl,
        imageJson: JSON.stringify(body.images), // safe to pass directly
        caption_Style: body.caption_Style,
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
