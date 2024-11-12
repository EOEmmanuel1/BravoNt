const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    location: { type: String },
    phoneNumber: { type: String }, // Added phone number field
    dateOfBirth: { type: Date },
    friends: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    profilePicture: { type: String }, // Path to profile picture
    privacySettings: { type: String, enum: ['public', 'private'], default: 'public' }
});

module.exports = mongoose.model('User', userSchema)