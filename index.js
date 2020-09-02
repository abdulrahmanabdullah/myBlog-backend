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

const Blog = require('./models/Blog');

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

/*
app.post('/addpost', async (req, res) => {
  // TODO: fetch title and save it in db .

  console.log(typeof req.body.content);
  // temp test object
  // tPost.body = req.body.content;

  const result = await reformatPost(req.body);
  console.log(result);
  // const processor = unified()
  // تحويل المارك دوان الى لغة مارك دوان متسلسلة
  // .use(markdown)
  // Transform markdown syntax tree to html
  // .use(remark2rehype)
  // Traverse html tree to inject code highlight to content
  // .use(highlight)
  // Transform html tree to string then save it or send it to client
  // .use(html);
  // Until now this working perfect when send it direct to client .
  // .process(req.body.content, (err, output) => {
  //   if (err) {
  //     console.error(err);
  //   }
  //   const replaceBreakLine = output.contents.replace(/(\r\n|\n\r)/gm, '');
  //   tPost.body = replaceBreakLine;
  //   console.log(replaceBreakLine);
  // });
  // TODO: save content in db as a string
  // let p = await (await processor.process(tPost.body)).toString();
  // console.log(' p = > ', p); // what data look like when send it to our DB .
  res.status(200);
});
*/
// Listening
app.listen(PORT, console.log('Server running on ', PORT));
