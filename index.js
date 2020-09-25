const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// const dotenv = require('dotenv');
const router = require('./route');
const { handlerError } = require('./helper/error');

// dotenv.config();
// PORT
const PORT = 1234;

const mongoose = require('mongoose');

// Connect to mongodb atlas
mongoose.connect(
  'mongodb+srv://abdulrahman:Freedom&&30@blog-cluster.hp51i.gcp.mongodb.net/blogs?retryWrites=true&w=majority',
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
