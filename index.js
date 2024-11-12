require(`dotenv`).config();
const express = require(`express`);
const connectDB = require(`./config/db`);
const errorHandler = require(`./middlewares/errorHandler`);
const upload = require('./middlewares/upload')
const cookieParser = require(`cookie-parser`);
const { updateProfile, viewFriendList, addFriend, viewProfile } = require('./routes/profileRoute')

const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('welcome to BravoNet SYSTEMS');
})
// Static folder for profile picture uploads
app.use('/uploads/profile_pictures', express.static(path.join(__dirname, 'uploads/profile_pictures')));
app.use(`/api/auth`, require(`./routes/authRoutes`));
// app.use(`/api/admin`, require(`./routes/adminRoutes`));
app.use(`/api/profile`, require(`./routes/profileRoute`));
// app.use(`/api/notifications`, require(`./routes/notificationRoutes`));
app.use(`/api/posts`, require(`./routes/postRoute`));
// app.use(`/api/messages`, require(`./routes/messageRoutes`));
// app.use(`/api/search`, require(`./routes/searchRoutes`));

// Error Handler
app.use(errorHandler);
// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



