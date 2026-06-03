const mammoth = require('mammoth');

/**
 * Extracts text from a DOCX buffer
 * @param {Buffer} buffer - The DOCX file buffer
 * @returns {Promise<string>} - The extracted text
 */
const extractTextFromDOCX = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: buffer });
    return result.value;
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

module.exports = { extractTextFromDOCX };
