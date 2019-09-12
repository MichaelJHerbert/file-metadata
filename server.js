'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res) {
  res.json({ greetings: 'Hello, API' });
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  const { originalname, mimetype, size } = req.file;
  res.json({ name: originalname, type: mimetype, size });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Node.js listening ...');
});
