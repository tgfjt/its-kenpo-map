const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.port || 8888;

const server = http.createServer();

server.on('request', (req, res) => {
  const route = url.parse(req.url).pathname

  switch (route) {
    case '/':
      fs.createReadStream('./public/index.html', 'utf-8').pipe(res);
      return;
    case '/js/bundle.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      fs.createReadStream('./public/js/bundle.js', 'utf-8').pipe(res);
      return;
    case '/data/list.json':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      fs.createReadStream('./public/data/list.json', 'utf-8').pipe(res);
      return;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write('Not Found');
      break;
  }
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
