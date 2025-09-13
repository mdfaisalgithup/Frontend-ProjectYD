

"use client"
import { useState } from 'react';
import Image from 'next/image';
import { io } from "socket.io-client";



  const socket = io("https://backend-projectyd-production.up.railway.app");

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadData, setDownloadData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalProgress, setTotalProgress] = useState(0);

  const [totalSizeF, setTotalSizeF] = useState(0);







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






socket.on("videokoto", (data) => {

  setTotalProgress(data.total)

});



const btn = async (formataData) => {
  alert("Download starting...");

  // progress totalSize reset
setTotalProgress(0)
  setTotalSizeF(0);

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
};





// console.log(totalSizeF + " " + progress) 

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
   <h2 className='font-semibold text-center'>Download List -</h2>
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
      {totalProgress} MB / {parseFloat(totalSizeF)} MB
    </p>
  </div>




                </div>
                : null
          }
        </div></div>
      </div>


      {/* section... start*/}
     <div>
      <h2 className='text-center my-2 font-semibold'>All Format Download</h2>
       <div className=' grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-x-2'>

       <div className='hover:bg-amber-200 p-8 duration-500 bg-amber-100 hover:shadow-2xl'>
         <h2 className='font-semibold my-2 text-center'>Best Audio HD Quality</h2>
        <p>Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, </p>
       </div>

       <div className='hover:bg-amber-200 p-8 duration-500 bg-amber-100  hover:hover:shadow-2xl hover:shadow-'>
         <h2 className='font-semibold my-2 text-center'>1080p Full HD</h2>
        <p>Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, </p>
       </div>

       <div className='hover:bg-amber-200 p-8 duration-500 bg-amber-100 hover:shadow-2xl'>
         <h2 className='font-semibold my-2 text-center'>4k HD Download</h2>
        <p>Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, </p>
       </div>


      </div>
     </div>
            {/* section...end */}

           {/* section... start*/}
     <div>
      <h2 className='text-center my-8 font-semibold'>All Device Supported</h2>
       <div className='  grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-x-4'>

       <div className='hover:bg-amber-200 p-8 duration-500 shadow-md hover:shadow-[0px] border-[1px] border-[#eee]'>
         <h2 className='font-semibold my-2 text-center'>Small Phone</h2>
        <p>Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, </p>
       </div>

       <div className='bg-amber-200 p-8 duration-500 shadow-md hover:shadow-[0px] border-[1px] border-[#eee]'>
         <h2 className='font-semibold my-2 text-center'>Smart-Phone</h2>
        <p>Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, </p>
       </div>

       <div className='hover:bg-amber-200 p-8 duration-500 shadow-md hover:shadow-[0px] border-[1px] border-[#eee]'>
         <h2 className='font-semibold my-2 text-center'>Laptop/PC</h2>
        <p>Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality,Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, Best Audio Quality, </p>
       </div>


      </div>
     </div>
            {/* section...end */}
    </div>
  );
}
