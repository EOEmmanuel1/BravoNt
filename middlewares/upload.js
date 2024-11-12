// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Set the destination for uploaded files
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // Naming convention
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png/; // Accept JPEG, JPG, and PNG files
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimeType = fileTypes.test(file.mimetype);
//         if (extname && mimeType) {
//             cb(null, true);
//         } else {
//             cb(new Error("Only images (jpeg, jpg, png) are allowed"));
//         }
//     }
// });

// module.exports = upload;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pictures/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
