const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');
const path = require('path');
const e = require('express');

const app = express();
app.use(express.static("build"))

app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
});
app.use(express.static(path.join(__dirname, 'build')));