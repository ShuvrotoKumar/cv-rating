const { z } = require('zod');

const resumeSchema = z.object({
  overallScore: z.number().describe('A score out of 100 based on the overall quality of the resume.'),
  atsScore: z.number().describe('A score out of 100 representing how ATS-friendly the resume is.'),
  skillsScore: z.number().describe('A score out of 100 representing the strength of the skills section.'),
  grammarScore: z.number().describe('A score out of 100 representing the grammatical correctness and writing quality.'),
  formattingScore: z.number().describe('A score out of 100 representing the visual structure and formatting.'),
  strengths: z.array(z.string()).describe('An array of 3-5 key strengths found in the resume.'),
  weaknesses: z.array(z.string()).describe('An array of 2-4 weaknesses or areas for improvement.'),
  suggestions: z.array(
    z.object({
      category: z.string().describe('The category of the suggestion, e.g., "Formatting", "Content", "Skills".'),
      description: z.string().describe('Detailed description of the suggestion.'),
      impact: z.string().describe('The potential impact of implementing this suggestion (High, Medium, Low).'),
    })
  ).describe('Specific actionable suggestions to improve the resume.'),
  skillsList: z.array(
    z.object({
      name: z.string().describe('The name of the skill.'),
      match: z.boolean().describe('Whether this skill matches the target role (if any) or standard industry requirements.'),
      level: z.string().describe('Inferred level of the skill (e.g., "Beginner", "Intermediate", "Expert").'),
    })
  ).describe('A list of skills extracted from the resume.'),
  keywordsFound: z.array(z.string()).describe('Important industry keywords found in the resume.'),
  keywordsMissing: z.array(z.string()).describe('Important industry keywords missing from the resume that should be added.'),
  recommendedRoles: z.array(
    z.object({
      role: z.string().describe('A recommended job title based on the resume.'),
      salary: z.string().describe('Estimated salary range for this role (e.g., "$70,000 - $90,000").'),
      matchPercentage: z.number().describe('Percentage match of the resume to this role (0-100).'),
      reasons: z.array(z.string()).describe('Reasons for recommending this role based on the resume content.'),
    })
  ).describe('A list of recommended job roles that fit this candidate.'),
});

module.exports = { resumeSchema };
