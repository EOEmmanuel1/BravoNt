const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    media: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ userId: mongoose.Schema.Types.ObjectId, text: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);