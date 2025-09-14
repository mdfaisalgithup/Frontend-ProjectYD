// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: "https://ytds-downloader.vercel.app/",
      lastModified: new Date(),
      changefreq: "weekly",
      priority: 1,
    },
    {
      url: "https://ytds-downloader.vercel.app/about",
      lastModified: new Date(),
      changefreq: "monthly",
      priority: 0.8,
    },
  
  ];
}

