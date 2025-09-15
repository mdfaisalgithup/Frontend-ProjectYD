

"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { io } from "socket.io-client";



  const socket = io("https://backend-projectyd-production.up.railway.app");

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadData, setDownloadData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalProgress, setTotalProgress] = useState(0);

  const [totalSizeF, setTotalSizeF] = useState(0);



  const [videoProgress, setVideoProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");



  async function handleDownloadinfo() {
    if (!url ) {
      alert("not video url...");
      return;
    }

    setLoading(true);
    const res = await fetch('https://backend-projectyd-production.up.railway.app/api/folo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setDownloadData(data);
    setLoading(false);
  }




   // Video + audio download progress
 socket.on("videokoto", (data) => {
      setVideoProgress(data.video);
      setAudioProgress(data.audio);
      setTotalProgress(data.total)
    });


 

useEffect(() => {
 

     // Merge progress
    socket.on("mergeProgress", (data) => {
      setMergeProgress(data.percent);
    });
 

    // Merge finished or error
    socket.on("mergeStatus", (data) => {
      setStatusMessage(data.message);
    });

    // Cleanup on unmount
 
  }, [totalProgress]);



const btn = async (formataData) => {






//   // progress totalSize reset
  setTotalProgress(0)
  setTotalSizeF(0);
  setMergeProgress(0)
setStatusMessage("")
setAudioProgress(0)
setVideoProgress(0)
  // total size 
  const newTotalSize = parseFloat(formataData[0].size) + parseFloat(downloadData?.ausioSizesFor);
  setTotalSizeF(newTotalSize);



 

  const res = await fetch('https://backend-projectyd-production.up.railway.app/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formataData: formataData, socketId: socket.id }),

  }); 


  
   
 

  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `${downloadData?.title}_video.mp4`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl);

  
  


setTotalProgress(0)
  setTotalSizeF(0);
setMergeProgress(0)
setAudioProgress(0)
setVideoProgress(0)
   

};






  return (
    <div className='xl:mx-[220px] lg:mx-[150px] md:mx-[50px] sm:mx-[5px] mx-0  mt-[10px] mb-20 '>
      <div className='my-20 '>
      
          <div className='xl:flex lg:flex md:flex sm:flex w-full flex-wrap xl:justify-center lg:justify-center md:justify-center sm:justify-center items-center  justify-items-center  h-full'>
           <div>
             <input
              className='border-2 rounded-md px-3 py-2 border-orange-400 outline-0'
              type="text"
              placeholder="Wrtite Your Video URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
           </div>
          <div>
              <button
              className='px-4 ml-2 rounded-md py-2 font-semibold bg-orange-400 duration-300 cursor-pointer hover:bg-orange-600 text-white'
              onClick={handleDownloadinfo}
            >
              Submit
            </button>
          </div>

          </div>
     



<div className='mt-6'>
   <h2 className='font-semibold text-center my-2'>Download List -</h2>
        <div className='w-full flex justify-center items-center border-2 border-dotted border-blue-200 rounded-md py-2 px-4 shadow-md'>
       
         
         {
            loading ? <h2>loading..</h2>
              :
              downloadData?.length !== 0 ?
                <div className='py-2'>
                  {downloadData?.title && <h2 className='font-semibold py-3 pr-10'> Title: {downloadData?.title}...</h2>}
                 
                  <Image
                    src={`${downloadData?.vthumbnail}`}
                    width={400}
                    height={400}
                    alt="Video Thumbnail"
                  />

                 
                  <ul>
                    {downloadData?.formats?.map((format) => (
                      <li className='border-1 my-1 hover:bg-blue-100 border-[#0e0e0e2f] p-3' key={format.itag}>
                        <div>
                          <b>{format?.qualityLabel}</b> | {"PRO Version" + " "} | {" "} 
                         {(parseFloat(format.size
                        ) + parseFloat(downloadData?.ausioSizesFor)).toFixed(2) + " MB"}
                        </div>
                        <br />
                        <div><h2>Duration {parseFloat(format?.duration) > 60 ? parseFloat(format?.duration) / 60 : format?.duration} {parseFloat(format?.duration) > 60 ? "Hour" : "Minutes" }</h2></div>
                        <br />
                        <button onClick={() => btn([format, downloadData.audioFormat, downloadData.videoUrl])} disabled={loading}>
                          <div className='bg-red-500 cursor-pointer px-4 text-amber-50 rounded-md py-2 w-max hover:bg-red-600'>
                            Download
                          </div>
                        </button>
                        <br />
                      </li>
                    ))}
                  </ul>

                  {/* Progress Bar */}





<div className="mt-5">
    {/* Progress Bar */}
    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
      <div
        className="bg-green-500 h-4 transition-all duration-300"
        style={{
          width: `${ parseFloat(totalSizeF) == 0 ? 0 : Math.min((totalProgress / parseFloat(totalSizeF)) * 100, 100)}%`
        }}
      ></div>
    </div>

    {/* Percentage */}
    <p className="mt-2">
      {Math.min(totalSizeF === 0 ? 0 : (totalProgress / parseFloat(totalSizeF)) * 100, 100)}%
    </p>

    {/* MB Info */}
    <p className="text-sm text-gray-600">
      {parseFloat(totalProgress).toFixed(2)} MB / {parseFloat(totalSizeF).toFixed(2)} MB
    </p>
    <div>
   <div className='border-1 border-[#ddd] shadow-md my-2 p-2'>
        <h2 lassName='font-semibold'>Merge Progress:</h2>
      <p>{mergeProgress ? mergeProgress + "%" : <h2 className='text-red-500'>"Waiting..."</h2>}</p>
   </div>
   <div className='border-1 border-[#ddd] shadow-md my-2 p-2'>
       <h2 className='font-semibold'>Status:</h2>
      <div>{statusMessage.length > 0 ? <p className='text-green-500  font-medium'> {statusMessage }</p> : "No Merging" }</div>
   </div>
    </div>

    <div className='border-1 border-[#ddd] shadow-md my-2 p-2'>
         <h2 className='font-semibold'>Download Progress</h2>
      <p>Video: {videoProgress < 0 ? videoProgress : 0} MB</p>
      <p>Audio: {audioProgress < 0 ?  audioProgress : 0} MB</p>
    </div>
  </div>




                </div>
                : null
          }
        </div></div>
      </div>


      {/* section... start*/}
     <div>
      <h2 className='text-center mt-10 mb-4 font-semibold'>All Format Download</h2>
       <div className=' grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-x-2'>

       <div className='hover:bg-[#ededed83] rounded-md p-8 duration-500 border-1 border-[#ecebeb] hover:shadow shadow-md'>
         <h2 className='font-semibold my-2 text-center'>Best Audio HD Quality</h2>
        <p>Download YouTube videos in the best HD audio quality with our free YouTube Downloader. Convert your favorite songs, podcasts, and videos to high-quality MP3, WAV, or AAC formats instantly. Our fast, secure, and easy-to-use platform works on all devices, including Windows, Mac, Android, and iOS. Simply paste the YouTube link, choose the audio format, and get crystal-clear sound without losing quality. Enjoy offline listening anytime, anywhere. No registration, no limits, completely free, and optimized for smooth, high-quality audio downloads from YouTube.</p>
       </div>

       <div className='hover:bg-[#ededed83] p-8 rounded-md duration-500 border-1 border-[#ecebeb] hover:shadow shadow-md'>
         <h2 className='font-semibold my-2 text-center'>1080p Full HD</h2>
        <p>Download YouTube videos in stunning 1080p Full HD with our fast and free YouTube downloader. Save your favorite videos in high-quality MP4, MP3, or other formats with just one click. Our platform is user-friendly, works on all devices, and requires no registration. Enjoy offline access to music, movies, tutorials, and more without compromising video quality. With lightning-fast downloads and full compatibility across Windows, Mac, Android, and iOS, our 1080p YouTube downloader makes it easy to keep your favorite content anytime, anywhere. Safe, secure, and completely free.</p>
       </div>

       <div className='hover:bg-[#ededed83] p-8 rounded-md duration-500 border-1 border-[#ecebeb] hover:shadow shadow-md'>
         <h2 className='font-semibold my-2 text-center'>4k HD Download</h2>
        <p>Download YouTube videos in stunning 4K HD with our free YouTube Downloader. Convert and save videos in high-quality MP4, MP3, or other popular formats instantly. Our fast, safe, and user-friendly platform works on all devices, including Windows, Mac, Android, and iOS. No registration or software installation is required—just paste the video URL, select 4K HD quality, and download. Perfect for offline viewing of music, movies, tutorials, and more. Experience the ultimate 4K HD YouTube downloader for free, anytime, anywhere.</p>
       </div>


      </div>
     </div>
            {/* section...end */}

           {/* section... start*/}
     <div>
      <h2 className='text-center mt-15 mb-4 font-semibold'>All Device Supported</h2>
       <div className='  grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-x-4 '>

       <div className='hover:bg-[#fff9d8fe] rounded-md p-8 duration-500 shadow-md hover:shadow-[0px] border-[1px] border-[#eee]'>
         <h2 className='font-semibold my-2 text-center uppercase'>Small Phone Support</h2>
        <p>Download YouTube videos easily on your small phone with our All Format YouTube Downloader. Quickly save videos in MP4, MP3, AVI, and more, directly to your mobile device without any software. Our lightweight, mobile-friendly platform works on Android and iOS, letting you watch music, tutorials, movies, and favorite content offline anytime. No registration, no limits, and completely free to use. Enjoy fast, safe, and hassle-free downloads on your small phone. Perfect for users who want YouTube videos on the go, anytime, anywhere.</p>
       </div>

       <div className='hover:bg-[#fff9d8fe] rounded-md p-8 duration-500 shadow-md hover:shadow-[0px] border-[1px] border-[#eee]'>
         <h2 className='font-semibold my-2 text-center uppercase'>Andoid/Iphone All Support</h2>
        <p>Download YouTube videos directly to your smartphone with our All Format YouTube Downloader. Supporting MP4, MP3, AVI, and more, our platform makes it easy to save videos for offline viewing on Android and iOS devices. Simply paste the YouTube link, choose your preferred format and quality, and start downloading instantly. No app installation or registration required. Enjoy fast, safe, and high-quality downloads of music, tutorials, movies, and more, all optimized for mobile devices. Access your favorite content anytime, anywhere with ease.</p>
       </div>

       <div className='hover:bg-[#fff9d8fe] rounded-md p-8 duration-500 shadow-md hover:shadow-[0px] border-[1px] border-[#eee]'>
         <h2 className='font-semibold my-2 text-center uppercase'>Laptop/PC Support</h2>
        <p>Download YouTube videos on your Laptop or PC effortlessly with our All Format YouTube Downloader. Convert YouTube videos to MP4, MP3, AVI, and other popular formats quickly and safely. Our website is fully compatible with Windows, Mac, and Linux, allowing you to save high-quality videos, music, tutorials, and movies directly to your computer. No software installation or registration is required. Enjoy unlimited downloads, offline access, and fast performance. The best YouTube downloader for Laptop and PC users seeking free, secure, and reliable video conversion.</p>
       </div>


      </div>
     </div>
            {/* section...end */}
    </div>
  );
}
