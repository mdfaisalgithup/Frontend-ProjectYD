import { NextResponse } from 'next/server';
const ytdl = require('ytdl-core');

// force Node.js runtime (not Edge)
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid or missing YouTube URL' }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);

    function formatDuration(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    const videoDuration = formatDuration(parseInt(info.videoDetails.lengthSeconds));

    const hdMp4Formats = Array.from(
      new Map(
        info.formats
          .filter(format =>
            format.container === 'mp4' &&
            format.qualityLabel &&
            ( format.qualityLabel.includes('144') ||
              format.qualityLabel.includes('240') ||
              format.qualityLabel.includes('360') ||
              format.qualityLabel.includes('480') ||
              format.qualityLabel.includes('720') ||
              format.qualityLabel.includes('1080') ||
              format.qualityLabel.includes('1440') ||
              format.qualityLabel.includes('2160')
            ) &&
            format.hasVideo
          )
          .map(format => [
            format.itag,
            {
              itag: format.itag,
              qualityLabel: format.qualityLabel,
              quality: format.quality || 'Unknown',
              url: format.url,
              size: format.contentLength
                ? (parseInt(format.contentLength) / (1024 * 1024)).toFixed(2)
                : 'Unknown',
              duration: videoDuration,
            }
          ])
      ).values()
    );

    const thumbnail = info.videoDetails.thumbnails.slice(-1)[0].url;

    const audioFormats = Array.from(
      new Map(
        info.formats
          .filter(audioFor => audioFor.hasAudio && !audioFor.hasVideo && audioFor.container === 'mp4')
          .map(audioFor => [
            audioFor.itag,
            {
              itag: audioFor.itag,
              quality: audioFor.quality || 'Unknown',
              url: audioFor.url,
              bitrate: audioFor.bitrate,
              audioQuality: audioFor.audioQuality,
              size: audioFor.contentLength
                ? (parseInt(audioFor.contentLength) / (1024 * 1024)).toFixed(2)
                : 'Unknown',
              duration: audioFor.approxDurationMs
                ? (audioFor.approxDurationMs / 1000 / 60).toFixed(2)
                : 'Unknown',
            }
          ])
      ).values()
    );

    if (audioFormats.length === 0) {
      throw new Error('No suitable audio format found');
    }

    const audioFormat = audioFormats.reduce((prev, curr) =>
      (curr.bitrate || 0) > (prev.bitrate || 0) ? curr : prev
    );

    const ausioSizesFor = parseFloat(audioFormat?.size).toFixed(2);

    return NextResponse.json({
      title: info.videoDetails.title,
      formats: hdMp4Formats,
      audioFormat: audioFormat,
      videoUrl: url,
      vthumbnail: thumbnail,
      ausioSizesFor: ausioSizesFor
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({ msg: "Hello GET working!" });
}
