// app/sitemap.js

export default function sitemap() {
  const baseUrl = "https://ytds-downloader.vercel.app";

  const staticPages = [
    { url: "", changefreq: "weekly", priority: 1 },
    { url: "about", changefreq: "monthly", priority: 0.8 },
    { url: "contact", changefreq: "monthly", priority: 0.8 },
  ];

  return staticPages.map(page => ({
    url: `${baseUrl}/${page.url}`,
    lastModified: new Date(),
    changefreq: page.changefreq,
    priority: page.priority,
  }));
}

