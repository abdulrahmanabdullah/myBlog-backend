const Blog = require('../models/Blog');
const { reformatPost, estimatedReading } = require('../helper/convertData');
const { ErrorHandler } = require('../helper/error');

// get all blogs
exports.index = async (req, res, next) => {
  console.log(' im called');
  try {
    const blogs = await Blog.find({}); // get All blogs
    if (!blogs) {
      throw new ErrorHandler(404, 'Database is empty ');
    }
    res.status(200).json(blogs);
    next();
  } catch (error) {
    next(error);
  }
};

// get blog by id
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      throw new ErrorHandler(404, 'Blog not found');
    }
    res.status(201).json(blog);
    next();
  } catch (error) {
    next(error);
  }
};

// post blog
exports.postBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new ErrorHandler(
        402,
        'something missing, please make sure you enter title and body'
      );
    }
    const bodyContent = await reformatPost(content);
    const estimate_reading = estimatedReading(bodyContent.length);
    console.log(estimate_reading);
    const blog = new Blog({ title, content: bodyContent, estimate_reading });
    await blog.save();
    res.status(201).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
};

// update
exports.updateBlog = async (req, res, next) => {
  // check header content that = application/json
  if (!req.is('application/json')) {
    throw new ErrorHandler(400, 'Bad request');
  }
  try {
    const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body);
    await blog.save();
    res.setStatus = 200;
    res.json({ message: 'success', blog: blog });
  } catch (error) {
    next(error);
  }
};

// delete
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id });
    if (!blog) {
      throw new ErrorHandler(404, 'Blog not found');
    }
    res.setStatus = 204;
    res.json({ message: 'success', blog });
    next();
  } catch (error) {
    next(err);
  }
};

// delete all blogs
exports.deleteAllBlogs = async (req, res, next) => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      throw new ErrorHandler(404, 'Database is empty');
    } else {
      await Blog.deleteMany({});
      res.setStatus = 200;
      res.json({ message: 'success' });
      next();
    }
  } catch (error) {
    next(error);
  }
};
