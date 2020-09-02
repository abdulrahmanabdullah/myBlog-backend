const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
//Root path
router.get('/', (req, res) => {
  res.json({ message: 'success', path: '/' });
});

// Get blogs
router.get('/blogs', blogController.index);

// Get blog by id
router.get('/blogs/:id', blogController.getBlogById);

// Post blog
router.post('/addpost', blogController.postBlog);

// update blog
router.put('/blogs/:id', blogController.updateBlog);
// delete blog
router.delete('/blogs/:id', blogController.deleteBlog);

// delete all
router.delete('/blogs', blogController.deleteAllBlogs);

module.exports = router;
