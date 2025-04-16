/**
 * Utility functions for interacting with GitHub Actions workflows
 */

/**
 * Trigger a video rendering workflow
 * @param videoId The ID of the video to render
 * @param compositionId The Remotion composition ID
 * @param durationInFrames The duration of the video in frames
 * @param fps The frames per second
 * @returns The response from the API
 */
export async function triggerVideoRender(
  videoId: string,
  compositionId?: string,
  durationInFrames?: number,
  fps?: number
) {
  try {
    const response = await fetch("/api/trigger-render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId,
        compositionId,
        durationInFrames,
        fps,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to trigger video rendering");
    }

    return await response.json();
  } catch (error) {
    console.error("Error triggering video render:", error);
    throw error;
  }
}

/**
 * Check the status of a video rendering workflow
 * @param runId The GitHub Actions workflow run ID
 * @returns The status of the workflow run
 */
export async function checkRenderStatus(runId: string) {
  try {
    const response = await fetch(`/api/check-render-status?runId=${runId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to check render status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking render status:", error);
    throw error;
  }
}

/**
 * Poll the status of a video rendering workflow until it completes
 * @param runId The GitHub Actions workflow run ID
 * @param interval The polling interval in milliseconds
 * @param maxAttempts The maximum number of polling attempts
 * @returns The final status of the workflow run
 */
export async function pollRenderStatus(
  runId: string,
  interval = 10000,
  maxAttempts = 60
) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const status = await checkRenderStatus(runId);
    
    if (status.conclusion) {
      return status;
    }
    
    // Wait for the specified interval before polling again
    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error("Timeout waiting for render to complete");
} 