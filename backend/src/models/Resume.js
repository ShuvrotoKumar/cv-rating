const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for guest uploads
  },
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  overallScore: Number,
  atsScore: Number,
  skillsScore: Number,
  grammarScore: Number,
  formattingScore: Number,
  strengths: [String],
  weaknesses: [String],
  suggestions: [
    {
      category: String,
      description: String,
      impact: String,
    }
  ],
  skillsList: [
    {
      name: String,
      match: Boolean,
      level: String,
    }
  ],
  keywordsFound: [String],
  keywordsMissing: [String],
  recommendedRoles: [
    {
      role: String,
      salary: String,
      matchPercentage: Number,
      reasons: [String],
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
