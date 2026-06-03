const OpenAI = require('openai');
const { zodResponseFormat } = require('openai/helpers/zod');
const { extractTextFromPDF } = require('./parsers/pdfParser');
const { extractTextFromDOCX } = require('./parsers/docxParser');
const { resumeSchema } = require('./schemas/resumeSchema');
const { getSystemPrompt } = require('./prompts');
const fs = require('fs');
const path = require('path');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Extracts text based on the file type (PDF, DOCX)
 * @param {string} filePath - Path to the file
 * @param {string} mimeType - The mime type of the file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromFile = async (filePath, mimeType) => {
  const buffer = fs.readFileSync(filePath);

  if (mimeType === 'application/pdf') {
    return await extractTextFromPDF(buffer);
  } else if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) {
    return await extractTextFromDOCX(buffer);
  } else {
    throw new Error('Unsupported file type. Only PDF and DOCX are currently supported.');
  }
};

/**
 * Analyzes a resume file and returns structured JSON
 * @param {string} filePath - Path to the uploaded resume file
 * @param {string} mimeType - The mime type (e.g. application/pdf)
 * @param {string} targetRole - (Optional) The specific role to evaluate against
 * @returns {Promise<Object>} - The parsed JSON matching resumeSchema
 */
const analyzeResume = async (filePath, mimeType, targetRole = null) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables.');
  }

  console.log(`Extracting text from ${filePath}...`);
  const resumeText = await extractTextFromFile(filePath, mimeType);
  
  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error('Could not extract any text from the document.');
  }

  console.log(`Text extracted. Analyzing with OpenAI...`);
  const systemPrompt = getSystemPrompt(targetRole);

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini', // Recommended model for speed, cost, and structured output
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Here is the resume text to analyze:\n\n${resumeText}` },
    ],
    response_format: zodResponseFormat(resumeSchema, 'resume_analysis'),
    temperature: 0.2, // Low temperature for more deterministic/objective output
  });

  const parsedData = completion.choices[0].message.parsed;
  return parsedData;
};

module.exports = { analyzeResume, extractTextFromFile };
