'use client';
import { useState } from 'react';

export default function VideoGenerator() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startRender = async () => {
    setStatus('loading');
    setError(null);
    setVideoUrl(null);

    try {
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to start render');
      }

      const { jobId } = await response.json();
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
        throw new Error(`Status check failed: ${response.status}`);
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
      console.log(err);
      setError('Failed to check status');
    }
  };

  return (
    <div>
      <button 
        onClick={startRender}
        disabled={status === 'loading'}
        style={{ padding: '10px 20px', background: '#0070f3', color: 'white' }}
      >
        {status === 'loading' ? 'Generating...' : 'Generate Video'}
      </button>

      {videoUrl && (
        <div style={{ marginTop: 20 }}>
          <video 
            src={videoUrl} 
            controls 
            style={{ width: '100%', maxWidth: 720 }}
          />
          <p style={{ marginTop: 10 }}>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0070f3' }}
            >
              Open video in new tab
            </a>
          </p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>
          Error: {error}
        </div>
      )}
    </div>
  );
}