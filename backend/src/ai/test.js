require('dotenv').config();
const { analyzeResume } = require('./aiService');
const path = require('path');
const fs = require('fs');

async function test() {
  try {
    // Note: You need a sample PDF or DOCX file to run this test
    // For now, let's just make sure the file can run if provided a path
    const sampleFilePath = path.join(__dirname, 'sample.pdf');
    
    if (!fs.existsSync(sampleFilePath)) {
      console.log('--- TEST SCRIPT ---');
      console.log('To run a real test, place a resume at:', sampleFilePath);
      console.log('And ensure OPENAI_API_KEY is in your .env file.');
      return;
    }

    console.log('Starting analysis on:', sampleFilePath);
    
    // Simulate analyzing a PDF without a target role
    const result = await analyzeResume(sampleFilePath, 'application/pdf');
    
    console.log('--- ANALYSIS RESULT ---');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();
