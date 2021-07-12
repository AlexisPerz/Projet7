const express = require('express');
const path = require('path');
const user = require('./routes/users');
const post = require('./routes/posts');
const comment = require('./routes/comments');
const app = express();
const index = require('./models/index');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

index.load();
app.use(express.json());
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/comment', comment);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;