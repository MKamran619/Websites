// Minimal static server replicating Netlify's own static-hosting resolution
// order, used ONLY to verify the build output's real HTTP behavior locally
// (not part of the app or the deploy pipeline):
//   1. exact file match (e.g. /assets/og-image.jpg)
//   2. "pretty URL" directory match (/about -> /about/index.html)
//   3. otherwise: serve 404.html with a real 404 status
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const ROOT = path.join(__dirname, "..", "dist", "websites", "browser");
const PORT = 8080;

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent(url.parse(req.url).pathname);
    const candidates = [
      path.join(ROOT, pathname),
      path.join(ROOT, pathname, "index.html"),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        const ext = path.extname(candidate);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        fs.createReadStream(candidate).pipe(res);
        return;
      }
    }

    const notFoundFile = path.join(ROOT, "404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.createReadStream(notFoundFile).pipe(res);
  })
  .listen(PORT, () => console.log(`netlify-like-server listening on http://localhost:${PORT}`));
