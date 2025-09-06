




let videoDownloaded = 0;
let audioDownloaded = 0;

let totalAs = 0
// download helper function...
export async function updateDownloaded (video, audio) {
  if (video !== null && !isNaN(video)) {
    videoDownloaded = parseFloat(video);
  }
  if (audio !== null && !isNaN(audio)) {
    audioDownloaded = parseFloat(audio);
  } 
    const total = parseFloat(videoDownloaded + audioDownloaded).toFixed(2);
    totalAs = total;




    if(total) {
        const res = await fetch('https://backend-project-yd.vercel.app/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total: totalAs }),
    });

  const feedBack = await res.json();
  console.log(feedBack);
  }
  else {
    return false;
  }


}



