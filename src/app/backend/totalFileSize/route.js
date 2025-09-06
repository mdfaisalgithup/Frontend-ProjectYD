let TotalSize = 0;

export const TotalFileSizeS = async (SizeSF) => {
    TotalSize = SizeSF;  // number হিসেবে রাখো
   

      if(TotalSize) {
        const res = await fetch('http://localhost:3000/total-size', {
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

// export async function GET() {  
//    console.log(TotalSize)

//     return new Response(
//       JSON.stringify({ TotalSize: TotalSize }),  // এখানে প্রয়োজন হলে দুই দশমিক নিয়ে পাঠাও
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Cache-Control": "no-cache",
//         },
//       }
//     );
// }
