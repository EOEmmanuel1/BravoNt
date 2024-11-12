const Post = require('../models/Post');

// Create post
exports.createPost = async (req, res) => {
    const { userId, content, media } = req.body;
    try {
        const post = await Post.create({ userId, content, media });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};

// Get news feed
exports.getNewsFeed = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(50).populate('userId');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching news feed' });
    }
};
