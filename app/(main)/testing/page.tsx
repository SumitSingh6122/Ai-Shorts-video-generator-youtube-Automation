'use client';
import { useState } from 'react';

export default function VideoGenerator() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startRender = async () => {
    setStatus('loading');
    setError(null);
    setVideoUrl(null);

    try {
      // Example test data
      const response = await fetch('/api/render-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioURL: "your-audio.mp3",
          captions: [{ start: 0, end: 2, word: "Test" }],
          images: [],
          captionStyle: {}
        })
      });

      if (!response.ok) throw new Error('Failed to start render');
      
      const { jobId, checkUrl } = await response.json();
      setJobId(jobId);
      pollStatus(jobId);

    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const pollStatus = async (jobId: string) => {
    try {
      const response = await fetch(`/api/job/${encodeURIComponent(jobId)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { status, url, error } = await response.json();
      
      if (status === 'completed') {
        setStatus('success');
        setVideoUrl(url);
      } else if (status === 'failed') {
        setStatus('error');
        setError(error || 'Rendering failed');
      } else {
        setTimeout(() => pollStatus(jobId), 5000);
      }
    } catch (err) {
      setStatus('error');
      setError('Failed to check status');
    }
  };

  return (
    <div>
      <button 
        onClick={startRender}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Generating...' : 'Generate Video'}
      </button>

      {videoUrl && (
        <div>
          <video src={videoUrl} controls style={{ width: '100%', marginTop: 20 }} />
          <p>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              Direct Video Link
            </a>
          </p>
        </div>
      )}

      {error && <div style={{ color: 'red', marginTop: 20 }}>Error: {error}</div>}
    </div>
  );
}