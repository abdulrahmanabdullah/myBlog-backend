const mongo = require('mongoose');
const timestamp = require('mongoose-timestamp');

const BlogSchema = mongo.Schema({
  title: { type: String, required: true },
  description: { type: String },
  estimate_reading: { type: Number, default: 0, required: true },
  author: { type: String },
  content: { type: String, required: true, trim: true },
  image_cover: { type: String },
});

BlogSchema.plugin(timestamp);

const Blog = mongo.model('Blog', BlogSchema);

module.exports = Blog;
