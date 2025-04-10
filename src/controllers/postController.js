const Post = require('../models/postModel');

// CRUD Operations

// 1. create a post
exports.createPost = async (req, res) => {
  try {
    // req.body is the body of the request
    // req.body.text is the text of the post
    const { text } = req.body;

    // check if text is provided
    if (!text) {
      return res.status(400).json({ message: "Text is required", success: false });
    }
    // check if text is empty
    if (text.trim() === "") {
      return res.status(400).json({ message: "Text cannot be empty", success: false });
    }
    // check if text is too long
    if (text.length > 500) {
      return res.status(400).json({ message: "Text is too long", success: false });
    }
    // check if user is logged in
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not logged in", success: false });
    }
    const newPost = await Post.create({
      text,
      user: req.user.id, //from auth middleware
    });

    res.status(201).json({ message: "New post created", success: true, newPost });
  } catch (err) {
    console.error("Error creating post", err.message);
    res.status(500).json({ message: "Internal Server Error", successs: false });
  }
};

// 2. Get all posts
exports.getPosts = async (req, res) => {
  try {
    // get all posts from the database
    const posts = await Post.find().populate('user', 'username email').sort({ createdAt: -1 });
    // check if posts exist
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found", success: false });
    }
    // check if posts exist

    res.status(200).json({ message: "Ok", success: true, posts });
  } catch (err) {
    console.error("Error fetching posts", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

// 3. Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    
    const { id } = req.params;
    const post = await Post.findById(id).populate('user', 'username email');
    // check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    res.status(200).json({ message: "Ok", success: true, post });
  } catch (err) {
    console.error("Error fetching post", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

// 4. Update a post (only by owner)
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    // check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    // check if user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    } 
    // update post
    post.text = req.body.text || post.text;
    const updatedPost = await post.save();

    res.status(200).json({ message: "Post edited successfully", success: true, updatedPost });
  } catch (err) {
    console.error("Error editing post", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

// 5. Delete a post (only by owner)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    // check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }
    
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully", success: true })
  } catch (err) {
    console.error("Error deleting this post", err.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
