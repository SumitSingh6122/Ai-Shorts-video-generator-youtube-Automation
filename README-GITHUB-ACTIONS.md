# GitHub Actions for Remotion Video Rendering

This document provides instructions on how to set up and use the GitHub Actions workflow for rendering Remotion videos in your AI Shorts Generator application.

## Overview

The GitHub Actions workflow allows you to render Remotion videos on a server and upload them to Cloudinary. The workflow is triggered via an API endpoint in your application, and the rendered video URL is stored in your Convex database.

## Setup Instructions

### 1. GitHub Repository Configuration

1. Create a GitHub Personal Access Token with the following permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)

2. Add the following secrets to your GitHub repository:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `CONVEX_DEPLOYMENT_URL`: Your Convex deployment URL

### 2. Environment Variables

Add the following environment variables to your `.env` file:

```
# GitHub Actions Configuration
GITHUB_REPO_OWNER=your-github-username
GITHUB_REPO_NAME=ai-shorts-generator
GITHUB_TOKEN=your-github-personal-access-token

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_UPLOAD_PRESET=your-upload-preset
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Convex Configuration
CONVEX_DEPLOYMENT_URL=https://your-convex-deployment-url.convex.cloud
```

### 3. Remotion Configuration

Make sure your Remotion composition is properly set up in the `remotion` directory. The default composition ID is `MyVideo`, but you can specify a different one when triggering the workflow.

## Usage

### Triggering the Workflow

You can trigger the workflow using the `triggerVideoRender` utility function:

```typescript
import { triggerVideoRender } from "@/utils/githubActions";

// Trigger the workflow
const response = await triggerVideoRender(
  "video-123", // Video ID
  "MyVideo", // Composition ID (optional)
  60, // Duration in frames (optional)
  30 // FPS (optional)
);

console.log("Workflow triggered:", response);
```

### Checking the Workflow Status

You can check the status of the workflow using the `checkRenderStatus` utility function:

```typescript
import { checkRenderStatus } from "@/utils/githubActions";

// Check the status
const status = await checkRenderStatus("123456789");

console.log("Workflow status:", status);
```

### Polling the Workflow Status

You can poll the status of the workflow until it completes using the `pollRenderStatus` utility function:

```typescript
import { pollRenderStatus } from "@/utils/githubActions";

// Poll the status
const status = await pollRenderStatus("123456789");

console.log("Workflow completed:", status);
```

## Troubleshooting

### Common Issues

1. **Workflow fails to start**: Check that your GitHub token has the necessary permissions and that the repository secrets are correctly set.

2. **Video rendering fails**: Check that your Remotion composition is correctly set up and that the composition ID is correct.

3. **Upload to Cloudinary fails**: Check that your Cloudinary credentials are correct and that the upload preset is properly configured.

4. **Save to Convex fails**: Check that your Convex deployment URL is correct and that the `saveVideoDownloadUrl` mutation is properly defined.

### Logs

You can view the logs of the GitHub Actions workflow in the "Actions" tab of your GitHub repository. This can help you diagnose issues with the workflow.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Remotion Documentation](https://www.remotion.dev/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Convex Documentation](https://docs.convex.dev) 