import Head from 'next/head';
import './globals.css';




// app/layout.js

export const metadata = {
  title: "Youtube Trusted Downloader - Ytds.com | Free Online Video Download",
  description: "Download Youtube videos quickly and safely with Ytds.com. Trusted Youtube downloader to save MP4, MP3, and other formats online for free.",
  keywords: [
    "Youtube Downloader",
    "Trusted Youtube Download",
    "Ytds.com",
    "Online Video Downloader",
    "Free Youtube Video Save",
    "Fast Youtube MP4 Download",
    "ytds-downloader.vercel.app",
    "ytds-downloader",
    "ytds downloader",
    "Youtube Video Downloader Online",
    "Download Youtube MP4 Free",
    "MP3 Youtube Downloader",
    "High Quality Youtube Download",
    "Youtube Video Save Online",
    "Youtube Video Converter",
    "Free Online Video Downloader",
    "Fast Youtube Video Save",
    "Trusted Video Downloader",
    "Ytds Official Site",
    "Youtube Downloader App",
  ],
  icons: {
    icon: "https://i.ibb.co.com/3yqSGGK7/ytd.jpg",
  },
  verification: {
    google: "O6j5me_hO-sbgizHeDrAUNy52rvJ72nRkJew0w_VFyc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Youtube Trusted Downloader - Ytds.com",
    description: "Download Youtube videos quickly and safely with Ytds.com. Trusted Youtube downloader to save MP4, MP3, and other formats online for free.",
    url: "https://ytds-downloader.vercel.app",
    siteName: "Ytds.com",
    images: [
      {
        url: "https://i.ibb.co.com/3yqSGGK7/ytd.jpg",
        width: 1200,
        height: 630,
        alt: "Youtube Trusted Downloader - Ytds.com",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youtube Trusted Downloader - Ytds.com",
    description: "Download Youtube videos quickly and safely with Ytds.com. Trusted Youtube downloader to save MP4, MP3, and other formats online for free.",
    images: ["https://i.ibb.co.com/3yqSGGK7/ytd.jpg"],
    site: "@YtdsOfficial", // Optional, replace with your Twitter handle
  },
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body>
        {children}
      </body>
    </html>
  );
}
