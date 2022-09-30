const express = require('express');

const app = express();

app.use((req, res, next) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const userName = body.split('=')[1];

    if (userName) {
      req.body = { name: userName };
    }
    next();
  });
});

app.use((req, res, next) => {
  if (req.body) {
    return res.send(req.body.name);
  }

  res.send(`
    <form method="POST">
      <input type="text" name="username">
      <button type="submit"> Create </button>
    </form>
  `);
});

app.listen(3000);
