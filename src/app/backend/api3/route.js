import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';

import { TotalFileSizeS } from '../totalFileSize/route';
import { updateDownloaded } from '../progress/route';




export async function POST(request) {
  
  try {
    const { formataData } = await request.json();

    const videoFormatsT = formataData[0]; // object with url property
    const audioFormatsT = formataData[1]; // object with url property
    const videoPageUrl = formataData[2]; // youtube video page url string

  const sizeVS = parseFloat(videoFormatsT.size) + parseFloat(audioFormatsT.size);

  TotalFileSizeS(sizeVS)


      

  const videoTemp = path.join(os.tmpdir(), 'video_temp.mp4');
  const audioTemp = path.join(os.tmpdir(), 'audio_temp.mp3');
  const outputFile = path.join(os.tmpdir(), 'merged_output.mp4');


  // info...
  const info = await ytdl.getInfo(videoPageUrl);




  // video filter ....
 const videoFormats = info?.formats.filter(
      (f) =>
        (f.itag === videoFormatsT.itag && f.qualityLabel === videoFormatsT.qualityLabel) ||
        f.url === videoFormatsT.url
    );



if (videoFormats.length === 0) {
      throw new Error('No suitable video format found');
    }
    const videoFormat = videoFormats[0]; 




    // audio format filter

    const audioFormats = info?.formats.filter(
      (audioforOk) =>   (audioforOk.itag === audioFormatsT.itag && audioforOk.audioQuality === audioFormatsT.audioQuality) ||
        audioforOk.url === audioFormatsT.url
    );
  

    if (audioFormats.length === 0) {
      throw new Error('No suitable audio format found');
    }

   

    // high hd audio filter - bitrate বেশি এমন অডিও বেছে নেওয়া
    const audioFormat = audioFormats?.reduce((prev, curr) =>
      (curr.bitrate || 0) > (prev.bitrate || 0) ? curr : prev
    );





    

const videoStream = ytdl.downloadFromInfo(info, { format: videoFormat });
const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });




    // video download
const videoWriteStream = fs.createWriteStream(videoTemp);

let videoDownloaded = 0;
videoStream.on('data', (chunk) => {
 videoDownloaded += chunk.length;

  const downloadedMBVideo = (videoDownloaded / (1024 * 1024)).toFixed(2); // MB এ কনভার্ট
updateDownloaded(downloadedMBVideo, null)



});


videoStream.pipe(videoWriteStream);






    // audio download
const audioWriteStream = fs.createWriteStream(audioTemp);


let AudioDownloaded = 0;
audioStream.on('data', (chunk) => {
  AudioDownloaded += chunk.length;
  const downloadedMBAudios = (AudioDownloaded / (1024 * 1024)).toFixed(2); // MB এ কনভার্ট

updateDownloaded(null, downloadedMBAudios)

});

audioStream.pipe(audioWriteStream);




    // ডাউনলোড শেষ হওয়া পর্যন্ত অপেক্ষা
 await Promise.all([
  new Promise((res) => videoWriteStream.on('finish', () => {
updateDownloaded()

    console.log('Video write finished');
    res();
  })),
  new Promise((res) => audioWriteStream.on('finish', () => {
updateDownloaded()

    console.log('Audio write finished');
    res();
  })),
]);

    // ffmpeg দিয়ে মের্জ করা
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoTemp)
        .input(audioTemp)
        .outputOptions(['-c:v copy', '-c:a aac'])
        .save(outputFile)
        .on('end', () => {

 const stats = fs.statSync(outputFile);// ফাইল ইনফো
 const DataByte = stats.size;
      console.log(`✅ Merge complete!`);
      const mergeFileDone = "Download Done!"
      const mergeTotalS = `Video Size: ${(DataByte / (1024 * 1024)).toFixed(2)} MB`
      console.log(mergeTotalS  +  mergeFileDone);
 
      resolve();
 updateDownloaded()

        })
        .on('error', reject);
    });

    // টেম্প ফাইল ডিলিট
    fs.unlinkSync(videoTemp);
    fs.unlinkSync(audioTemp);

    // মের্জ করা ভিডিও রিড করে রেসপন্সে পাঠানো
    const fileBuffer = fs.readFileSync(outputFile);

    // আউটপুট ফাইল ডিলিট (অপশনাল)
    fs.unlinkSync(outputFile);

     
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="merged_video.mp4"',
         'Content-Length': fileBuffer.byteLength || fileBuffer.length,  
      },
    });

    

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}




