import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import JSZip from 'jszip';
import { JobStore } from '@/lib/jobstore';

// Force Node runtime so JSZip and Buffer APIs are available
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await dynamic route params before using
    const { id: jobId } = await context.params;
    if (!jobId) {
      return NextResponse.json({ error: 'Missing job ID' }, { status: 400 });
    }

    // Retrieve current job state
    const job = JobStore.get(jobId);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // If still processing, poll GitHub for completion
    if (job.status === 'processing') {
      const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
      const runId = Number(jobId.split('-')[0]);

      // Fetch workflow run
      const { data: run } = await octokit.rest.actions.getWorkflowRun({
        owner: process.env.GITHUB_REPO_OWNER!,
        repo: process.env.GITHUB_REPO_NAME!,
        run_id: runId,
      });

      if (run.status === 'completed') {
        if (run.conclusion === 'success') {
          // List artifacts and find our "cloudinary-url" file
          const { data: artifacts } = await octokit.rest.actions.listWorkflowRunArtifacts({
            owner: process.env.GITHUB_REPO_OWNER!,
            repo: process.env.GITHUB_REPO_NAME!,
            run_id: runId,
          });
          const artifact = artifacts.artifacts.find(a => a.name === 'cloudinary-url');

          if (artifact) {
            // Download and unzip the artifact
            const resp = await fetch(artifact.archive_download_url, {
              headers: { Authorization: `token ${process.env.GITHUB_PAT}` },
            });
            const buffer = await resp.arrayBuffer();
            const zip = await JSZip.loadAsync(buffer);
            const [file] = Object.values(zip.files);
            const url = await file.async('text');

            // Update job store
            JobStore.update(jobId, { status: 'completed', url });
          } else {
            JobStore.update(jobId, {
              status: 'failed',
              error: 'No cloudinary-url artifact found',
            });
          }
        } else {
          JobStore.update(jobId, { status: 'failed', error: 'Workflow failed' });
        }
      }
    }

    // Return the latest job state
    return NextResponse.json(JobStore.get(jobId));
  } catch (err: any) {
    console.error('Job GET error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
