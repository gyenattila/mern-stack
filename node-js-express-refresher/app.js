const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use((req, res, next) => {
//   let body = '';

//   req.on('data', chunk => {
//     body += chunk;
//   });

//   req.on('end', () => {
//     const userName = body.split('=')[1];

//     if (userName) {
//       req.body = { name: userName };
//     }
//     next();
//   });
// });

/**
 * Use bodyParser to parse the incoming data.
 */
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', (req, res, next) => {
  res.send(req.body.username);
});

app.get('/', (req, res, next) => {
  res.send(`
    <form action="/user" method="POST">
      <input type="text" name="username">
      <button type="submit"> Create </button>
    </form>
  `);
});

app.listen(3000);
