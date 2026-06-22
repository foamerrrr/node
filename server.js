require('dotenv').config()
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from server.js");
});

server.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:5000");
});
