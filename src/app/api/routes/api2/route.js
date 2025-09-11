import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return new Response(JSON.stringify({ error: 'Invalid or missing URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }



const videoTemp = path.join(os.tmpdir(), 'video_temp.mp4');
const audioTemp = path.join(os.tmpdir(), 'audio_temp.mp3');
const outputFile = path.join(os.tmpdir(), 'merged_output.mp4');


  try {
    const info = await ytdl.getInfo(videoUrl);


    const videoFormats = info.formats.filter(
      (f) =>
        f.hasVideo &&
        !f.hasAudio &&
        f.container === 'mp4' &&
        f.qualityLabel === '720p' 
    );

    if (videoFormats.length === 0) {
      throw new Error('No suitable video format found');
    }
    const videoFormat = videoFormats[0]; 

    const audioFormats = info.formats.filter(
      (f) => f.hasAudio && !f.hasVideo && f.container === 'mp4'
    );
    if (audioFormats.length === 0) {
      throw new Error('No suitable audio format found');
    }

  
    const audioFormat = audioFormats.reduce((prev, curr) =>
      (curr.bitrate || 0) > (prev.bitrate || 0) ? curr : prev
    );

 
    const videoStream = ytdl.downloadFromInfo(info, { format: videoFormat });
    const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });


    const videoWriteStream = fs.createWriteStream(videoTemp);



   
    const audioWriteStream = fs.createWriteStream(audioTemp);
    audioStream.pipe(audioWriteStream);

    await Promise.all([
      new Promise((res) => videoWriteStream.on('finish', res)),
      new Promise((res) => audioWriteStream.on('finish', res)),
    ]);

    
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoTemp)
        .input(audioTemp)
        .outputOptions(['-c:v copy', '-c:a aac'])
        .save(outputFile)
        .on('end', resolve)
        .on('error', reject);
    });


    fs.unlinkSync(videoTemp);
    fs.unlinkSync(audioTemp);


    const fileBuffer = fs.readFileSync(outputFile);

   
    fs.unlinkSync(outputFile);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="merged_video.mp4"',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}