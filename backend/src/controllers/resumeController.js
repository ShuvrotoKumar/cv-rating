const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { OpenAI } = require('openai');
const Resume = require('../models/Resume');

// Initialize OpenAI client only if key is configured
let openai = null;
if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_key')) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Simulated local storage fallback
const localResumesDb = [];

// Clean up text content
const cleanExtractedText = (text) => {
  return text
    .replace(/\s+/g, ' ')
    .trim();
};

// Fail-safe programmatic Local NLP Parser
const analyzeTextLocally = (fileName, fileSizeStr, text) => {
  const lowercaseText = text.toLowerCase();
  
  // 1. Calculate Keyword Alignment
  const prioritySkills = [
    { name: 'React', keywords: ['react', 'react.js', 'reactjs'] },
    { name: 'TypeScript', keywords: ['typescript', 'ts'] },
    { name: 'Next.js', keywords: ['next.js', 'nextjs', 'app router'] },
    { name: 'Zustand', keywords: ['zustand', 'state management'] },
    { name: 'Tailwind CSS', keywords: ['tailwind', 'tailwindcss'] },
    { name: 'Node.js', keywords: ['node.js', 'nodejs', 'express'] },
    { name: 'Docker', keywords: ['docker', 'containers'] },
    { name: 'AWS', keywords: ['aws', 'amazon web services', 's3', 'ec2'] },
    { name: 'Kubernetes', keywords: ['kubernetes', 'k8s'] },
    { name: 'CI/CD', keywords: ['ci/cd', 'github actions', 'jenkins'] }
  ];

  const skillsList = prioritySkills.map(skill => {
    const isMatched = skill.keywords.some(kw => lowercaseText.includes(kw));
    return {
      name: skill.name,
      match: isMatched,
      level: isMatched ? (lowercaseText.includes('senior') || lowercaseText.includes('expert') ? 'Expert' : 'Intermediate') : 'Beginner'
    };
  });

  const keywordsFound = skillsList.filter(s => s.match).map(s => s.name);
  const keywordsMissing = skillsList.filter(s => !s.match).map(s => s.name);

  // 2. Formatting Score (Check if single-column, standard headings)
  let formattingScore = 90;
  const headings = ['experience', 'work', 'education', 'skills', 'projects', 'summary'];
  const foundHeadings = headings.filter(h => lowercaseText.includes(h));
  
  if (foundHeadings.length < 4) formattingScore -= 15;
  if (lowercaseText.includes('table') || lowercaseText.includes('columns')) formattingScore -= 8;

  // 3. Grammar Index
  let grammarScore = 95;
  if (lowercaseText.includes('therfore') || lowercaseText.includes('commited') || lowercaseText.includes('recieved')) {
    grammarScore -= 8; // Simulating typological errors checks
  }

  // 4. ATS Parsing Index
  const atsScore = Math.round((keywordsFound.length / prioritySkills.length) * 100);

  // 5. Strengths & Weaknesses compilation
  const strengths = [
    `Clear structural outline detecting core headings (${foundHeadings.join(', ')}).`,
    `Excellent grammatical correction and clean style layout (Score: ${grammarScore}%).`
  ];
  if (keywordsFound.includes('React') || keywordsFound.includes('TypeScript')) {
    strengths.push('Excellent alignment with modern JavaScript/TypeScript application libraries.');
  }

  const weaknesses = [];
  if (keywordsMissing.length > 2) {
    weaknesses.push(`Missing high-priority software engineering keywords: ${keywordsMissing.slice(0, 3).join(', ')}.`);
  }
  if (text.length < 1500) {
    weaknesses.push('Resume length appears brief. Elaborate on project deliverables and architectures.');
  } else if (text.length > 6000) {
    weaknesses.push('Resume length is overly dense. Condense achievements into short bullet sentences.');
  }

  // 6. Actionable suggestions
  const suggestions = [
    {
      category: 'ATS Keyword Enrichment',
      description: `Inject missing core platform vocabulary like ${keywordsMissing.slice(0, 2).join(' and ')} directly in your professional highlights.`,
      impact: 'High'
    }
  ];
  if (formattingScore < 85) {
    suggestions.push({
      category: 'Layout Structure',
      description: 'Condense any side-by-side columns or complex layouts into a clean, single-column vertical system.',
      impact: 'High'
    });
  }
  suggestions.push({
    category: 'Quantify Deliverables',
    description: 'Add quantitative achievements (e.g. "improved load times by 30%") to enhance ATS weighting scales.',
    impact: 'Medium'
  });

  const overallScore = Math.round((atsScore + formattingScore + grammarScore + 80) / 4);

  return {
    id: Math.random().toString(36).substring(2, 9),
    fileName,
    fileSize: fileSizeStr,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    overallScore,
    atsScore,
    skillsScore: Math.round((keywordsFound.length / prioritySkills.length) * 100),
    grammarScore,
    formattingScore,
    strengths,
    weaknesses,
    suggestions,
    skillsList,
    keywordsFound,
    keywordsMissing,
    recommendedRoles: [
      {
        role: keywordsFound.includes('React') ? 'Frontend Engineer' : 'Fullstack Developer',
        salary: '$110k - $145k',
        matchPercentage: Math.max(70, atsScore + 10),
        reasons: ['Strong foundation in web technology stack', 'Excellent styling patterns found']
      }
    ]
  };
};

const uploadAndAnalyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, buffer, size } = req.file;
    const sizeStr = `${(size / (1024 * 1024)).toFixed(1)} MB`;
    let extractedText = '';

    // Step A: Document extraction
    if (originalname.endsWith('.pdf')) {
      const parsedPdf = await pdfParse(buffer);
      extractedText = parsedPdf.text;
    } else if (originalname.endsWith('.docx') || originalname.endsWith('.doc')) {
      const parsedDoc = await mammoth.extractRawText({ buffer });
      extractedText = parsedDoc.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file extension' });
    }

    const cleanText = cleanExtractedText(extractedText);
    
    // CRITICAL ERROR HANDLING
    if (cleanText.length < 50) {
      return res.status(400).json({
        status: "error",
        errorType: "EMPTY_RESUME_TEXT",
        message: "Resume text was not provided or extraction failed in backend.",
        severity: "high",
        possibleCauses: [
          "PDF is scanned or image-based",
          "DOCX extraction failed",
          "Backend did not pass extracted text",
          "File upload corrupted",
          "pdf-parse returned empty output",
          "Unsupported file format",
          "File buffer handling issue in backend"
        ],
        recommendedFix: [
          "Verify pdf-parse and mammoth extraction logic",
          "Add OCR fallback (Tesseract.js or Google Vision API)",
          "Log extracted text before sending to AI",
          "Validate file buffer in Multer middleware",
          "Test multiple resume formats",
          "Improve backend error handling and debugging logs"
        ],
        debugHints: {
          checkPdfParse: true,
          checkMammoth: true,
          checkFileBuffer: true,
          checkFileMimeType: true,
          enableOcrFallback: true
        }
      });
    }

    let analysisResult = null;

    // Step B: Live OpenAI GPT or local programmatic NLP fallbacks
    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an advanced AI Resume Analysis engine inside a production SaaS platform. 
              You act as a Senior HR Recruiter, ATS, Career Coach, and Technical Resume Evaluator.
              
              Analyze the resume text and return structured JSON ONLY.
              
              Rules:
              - You are NOT a chatbot.
              - You MUST NOT ask questions.
              - You MUST NOT request resume text.
              - You MUST NOT explain anything in natural language.
              - You MUST NOT output markdown or text outside JSON.
              - You MUST ALWAYS return valid JSON.
              
              Output Format:
              {
                "status": "success",
                "overallScore": 0,
                "atsScore": 0,
                "skillsScore": 0,
                "experienceScore": 0,
                "grammarScore": 0,
                "formattingScore": 0,
                "strengths": [],
                "weaknesses": [],
                "suggestions": [],
                "missingSections": [],
                "recommendedRoles": [],
                "keywordAnalysis": [],
                "careerInsight": ""
              }`
            },
            {
              role: 'user',
              content: `{"resumeText": "${cleanText}"}`
            }
          ]
        });

        const parsedGpt = JSON.parse(response.choices[0].message.content);
        analysisResult = {
          id: Math.random().toString(36).substring(2, 9),
          fileName: originalname,
          fileSize: sizeStr,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          ...parsedGpt
        };
      } catch (gptErr) {
        console.error('OpenAI processing error, falling back to local NLP:', gptErr.message);
        analysisResult = analyzeTextLocally(originalname, sizeStr, cleanText);
      }
    } else {
      // Local programmatic parsing
      analysisResult = analyzeTextLocally(originalname, sizeStr, cleanText);
    }

    // Step C: Persist result to Mongo (if connected) or push to memory sandbox array
    const isMockDb = !process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb');
    if (isMockDb) {
      localResumesDb.push(analysisResult);
    } else {
      const newResume = new Resume({
        userId: req.user?.id || null,
        ...analysisResult
      });
      await newResume.save();
    }

    res.status(200).json(analysisResult);
  } catch (err) {
    console.error('Upload execution failure:', err.message);
    res.status(500).json({ message: 'Internal processing failure' });
  }
};

const getAnalysisLogs = async (req, res) => {
  try {
    const isMockDb = !process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb');
    if (isMockDb) {
      return res.status(200).json(localResumesDb);
    }

    const resumes = await Resume.find({ userId: req.user?.id });
    res.status(200).json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal fetching error' });
  }
};

module.exports = { uploadAndAnalyzeResume, getAnalysisLogs };
