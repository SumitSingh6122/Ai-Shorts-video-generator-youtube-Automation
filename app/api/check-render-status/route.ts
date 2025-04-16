import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const runId = url.searchParams.get("runId");

    if (!runId) {
      return NextResponse.json(
        { error: "Run ID is required" },
        { status: 400 }
      );
    }

    // GitHub repository information
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const token = process.env.GITHUB_TOKEN;

    if (!owner || !repo || !token) {
      return NextResponse.json(
        { error: "GitHub configuration is missing" },
        { status: 500 }
      );
    }

    // Get the workflow run status
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get workflow status", details: errorData },
        { status: response.status }
      );
    }

    const runData = await response.json();
    
    return NextResponse.json({
      status: runData.status,
      conclusion: runData.conclusion,
      html_url: runData.html_url,
      created_at: runData.created_at,
      updated_at: runData.updated_at,
    });
  } catch (error) {
    console.error("Error checking workflow status:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
} 