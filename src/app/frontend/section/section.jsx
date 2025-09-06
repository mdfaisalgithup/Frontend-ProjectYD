"use client"
import { useState } from 'react';

export default function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) {
      alert('Please enter a YouTube video URL');
      return;
    }

    setLoading(true);

    try {
      // API থেকে ফাইল ফেচ করা
      const response = await fetch(`backend/api2?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + (errorData.error || 'Failed to download'));
        setLoading(false);
        return;
      }

      // ফাইলের বাইনরি ডাটা পড়া
      const blob = await response.blob();

      // ব্রাউজারে ডাউনলোড শুরু করার জন্য লিঙ্ক তৈরি
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'merged_video.mp4';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert('Something went wrong!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>YouTube Video Merge Downloader</h2>
      
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Merged Video'}
      </button>
    </div>
  );
}
