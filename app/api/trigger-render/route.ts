import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { videoId, compositionId, durationInFrames, fps } = await req.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    // GitHub repository information
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const workflowId = "render-video.yml";
    const token = process.env.GITHUB_TOKEN;

    if (!owner || !repo || !token) {
      return NextResponse.json(
        { error: "GitHub configuration is missing" },
        { status: 500 }
      );
    }

    // Trigger the GitHub Actions workflow
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ref: "main", // or your default branch
          inputs: {
            video_id: videoId,
            composition_id: compositionId || "MyVideo",
            duration_in_frames: durationInFrames || "60",
            fps: fps || "30",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API error:", errorData);
      return NextResponse.json(
        { error: "Failed to trigger workflow", details: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Video rendering workflow triggered successfully",
    });
  } catch (error) {
    console.error("Error triggering workflow:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
} 