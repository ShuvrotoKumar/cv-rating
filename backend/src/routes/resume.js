const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadAndAnalyzeResume, getAnalysisLogs } = require('../controllers/resumeController');

// Multer memory configuration - restricts files up to 5MB
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// @route   POST api/resume/upload
// @desc    Upload a PDF/Word resume and perform AI matching analysis
// @access  Protected/Sandbox Fail-Safe
router.post('/upload', authMiddleware, upload.single('resume'), uploadAndAnalyzeResume);

// @route   GET api/resume/history
// @desc    Retrieve all past uploaded resume logs for authenticated user
// @access  Protected/Sandbox Fail-Safe
router.get('/history', authMiddleware, getAnalysisLogs);

module.exports = router;
