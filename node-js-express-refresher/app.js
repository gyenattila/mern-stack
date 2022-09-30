const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const userName = body.split('=')[1];
      res.setHeader('Content-Type', 'text/html');
      res.end(`Username: ${userName}`);
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <form method="POST">
        <input type="text" name="username">
        <button type="submit"> Create </button>
      </form>
    `);
  }
});

server.listen(3000);
