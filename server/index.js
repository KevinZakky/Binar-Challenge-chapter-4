const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8000;

const serveStaticFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, "..", "public", req.url);

  if (req.method === "GET" && req.url === "/") {
    filePath = path.join(__dirname, "..", "public", "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.method === "GET" && req.url === "/cars") {
    filePath = path.join(__dirname, "..", "public", "cars.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || "application/octet-stream";

    if (fs.existsSync(filePath)) {
      serveStaticFile(res, filePath, contentType);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
});

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
};

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
