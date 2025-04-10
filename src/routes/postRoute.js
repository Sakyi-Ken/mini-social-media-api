const express = require('express')
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management endpoints
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: This is my first post!
 *     responses:
 *       201:
 *         description: New post created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 newPost:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad input
 *       401:
 *         description: Unauthorized
*/

// @routes     POST /api/posts/
// @desc       Create a new post
// @access     Private 
router.post('/', auth, postController.createPost);


/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       404:
 *         description: No posts found
*/

// @routes     GET /api/posts/
// @desc       Get all posts
// @access     Private
router.get('/', auth, postController.getPosts);


/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
*/

// @routes     GET /api/posts/:id
// @desc       Get a single post by ID
// @access     Private
router.get('/:id', auth, postController.getPostById);


/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID (owner only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post edited successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
*/

// @routes    PUT /api/posts/:id
// @desc      Update a post by ID
// @access    Private
router.put('/:id', auth, postController.updatePost);


/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID (owner only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
*/

// @routes    DELETE /api/posts/:id
// @desc      Delete a post by ID
// @access    Private
router.delete('/:id', auth, postController.deletePost);

module.exports = router;