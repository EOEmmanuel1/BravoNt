const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', [
    check('firstName', 'First name is required').notEmpty(),
    check('surname', 'Surname is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], register);

router.post('/login', login);

module.exports = router;