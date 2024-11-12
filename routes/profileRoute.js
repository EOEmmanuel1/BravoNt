// const express = require('express');
// const { updateProfile, viewFriendList } = require('../controllers/profileController');
// const router = express.Router();
// const multer = require('multer');

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Folder to store uploaded profile pictures
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//     }
// });
// const upload = multer({ storage: storage });

// router.put('/update', upload.single('profilePicture'), updateProfile); // Add profile picture upload
// router.get('/friends/:userId', viewFriendList);

// module.exports = router;
const express = require("express");
const upload = require("../middlewares/upload");
const profileController = require("../controllers/profileController");

const router = express.Router();

router.put("/update-profile", profileController.updateProfile);
router.post("/upload-profile-picture", upload.single("profilePicture"), profileController.uploadProfilePicture);
router.get("/view-profile/:id", profileController.viewProfile);
router.post("/add-friend/:friendId", profileController.addFriend);

module.exports = router;