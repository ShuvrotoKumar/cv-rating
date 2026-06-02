const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/authValidation');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(registerSchema), registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;
