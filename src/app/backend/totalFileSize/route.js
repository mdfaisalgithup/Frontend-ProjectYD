let TotalSize = 0;

export const TotalFileSizeS = async (SizeSF) => {
    TotalSize = SizeSF;  // number 
   

      if(TotalSize) {
        const res = await fetch('https://backend-project-yd.vercel.app/total-size', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ TotalSize: TotalSize }),
    });

  }
  else {
    return false;
  }
}

