

const express = require('express');
const { createPost, getNewsFeed } = require('../controllers/postController');
const router = express.Router();

router.post('/create', createPost);
router.get('/feed', getNewsFeed);

module.exports = router;