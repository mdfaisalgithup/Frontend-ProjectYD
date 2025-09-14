import Head from 'next/head';
import './globals.css';



export const metadata = {
  title: "Youtube Trusted Downloader - [Official Website] (Ytds.com)",
  description: "Youtube Trusted Downloader - Ytds.com",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      
      
    }
  }
};









export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <Head>
        <link rel="icon" href="https://i.ibb.co.com/3yqSGGK7/ytd.jpg" sizes="any" />
      <meta name="google-site-verification" content="O6j5me_hO-sbgizHeDrAUNy52rvJ72nRkJew0w_VFyc" />
   
     </Head>
  
      <body>
        {children}
      </body>
    </html>
  );
}
