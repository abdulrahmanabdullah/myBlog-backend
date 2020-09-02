const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const posts = require('./data/post.json');
const app = express();
const router = require('./route');
const { handlerError } = require('./helper/error');
const reformatPost = require('./helper/convertData');
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');
const highlight = require('remark-highlight.js');
// PORT
const PORT = process.env.PORT || 1234;

const mongoose = require('mongoose');

// Connect to mongodb atlas
mongoose.connect(
  `mongodb+srv://abdulrahman:Freedom&&30@blog-cluster.hp51i.gcp.mongodb.net/blogs?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.log('connect to db ', err);
});

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Router
app.use('/', router);

// Handler error
app.use((err, req, res, next) => {
  handlerError(err, res);
});

// Listening
app.listen(PORT, console.log('Server running on ', PORT));
