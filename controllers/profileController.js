// const User = require('../models/User');
// const path = require('path');

// // Update profile
// exports.updateProfile = async (req, res) => {
//     const { userId, bio, location, dateOfBirth, phoneNumber, privacy } = req.body;
//     try {
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ msg: 'User not found' });

//         user.bio = bio || user.bio;
//         user.location = location || user.location;
//         user.dateOfBirth = dateOfBirth || user.dateOfBirth;
//         user.phoneNumber = phoneNumber || user.phoneNumber;
//         user.privacy = privacy || user.privacy;

//         // Handle profile picture upload
//         if (req.file) {
//             user.profilePicture = req.file.path; // save the file path to user profile
//         }

//         await user.save();
//         res.json({ msg: 'Profile updated successfully', user });
//     } catch (error) {
//         res.status(500).json({ error: 'Error updating profile' });
//     }
// };

// // View friend list
// exports.viewFriendList = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const user = await User.findById(userId).populate('friends');
//         res.json(user.friends);
//     } catch (error) {
//         res.status(500).json({ error: 'Error retrieving friend list' });
//     }
// };



const User = require("../models/User");
const path = require('path');

// Update profile information
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { bio, location, dateOfBirth, privacy } = req.body;
        user.bio = bio || user.bio;
        user.location = location || user.location;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.privacy = privacy || user.privacy;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profilePicture = req.file.path;
        await user.save();
        res.json({ message: "Profile picture updated", profilePicture: req.file.path });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// View user profile based on privacy settings
exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("friends", "username");
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.privacy === "private" && user.id !== req.user.id) {
            return res.status(403).json({ message: "This profile is private" });
        }

        res.json({
            username: user.username,
            bio: user.bio,
            location: user.location,
            dateOfBirth: user.dateOfBirth,
            friends: user.friends,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Add friend
exports.addFriend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(req.params.friendId);

        if (!friend) return res.status(404).json({ message: "Friend not found" });

        user.friends.push(friend._id);
        await user.save();

        res.json({ message: "Friend added successfully", friends: user.friends });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
