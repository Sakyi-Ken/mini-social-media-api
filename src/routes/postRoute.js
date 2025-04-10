const express = require('express')
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require('../middlewares/authMiddleware');

// @routes     POST /api/posts/
// @desc       Create a new post
// @access     Private 
router.post('/', auth, postController.createPost);

// @routes     GET /api/posts/
// @desc       Get all posts
// @access     Private
router.get('/', auth, postController.getPosts);

// @routes     GET /api/posts/:id
// @desc       Get a single post by ID
// @access     Private
router.get('/:id', auth, postController.getPostById);

// @routes    PUT /api/posts/:id
// @desc      Update a post by ID
// @access    Private
router.put('/:id', auth, postController.updatePost);

// @routes    DELETE /api/posts/:id
// @desc      Delete a post by ID
// @access    Private
router.delete('/:id', auth, postController.deletePost);

module.exports = router;