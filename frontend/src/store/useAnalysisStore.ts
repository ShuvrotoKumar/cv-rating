import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  date: string;
  overallScore: number;
  atsScore: number;
  skillsScore: number;
  grammarScore: number;
  formattingScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: { category: string; description: string; impact: "High" | "Medium" | "Low" }[];
  skillsList: { name: string; match: boolean; level: "Expert" | "Intermediate" | "Beginner" }[];
  keywordsFound: string[];
  keywordsMissing: string[];
  recommendedRoles: { role: string; salary: string; matchPercentage: number; reasons: string[] }[];
}

interface AnalysisState {
  analyses: AnalysisResult[];
  activeAnalysis: AnalysisResult | null;
  isUploading: boolean;
  uploadProgress: number;
  isProcessing: boolean;
  error: string | null;
  addAnalysis: (analysis: AnalysisResult) => void;
  deleteAnalysis: (id: string) => void;
  setActiveAnalysis: (id: string) => void;
  setUploading: (uploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  triggerMockAnalysis: (fileName: string, fileSize: number) => Promise<AnalysisResult>;
}

// Rich mock data generators
const generateMockReport = (id: string, fileName: string, fileSizeStr: string): AnalysisResult => {
  const roles = [
    { role: "Senior Frontend Engineer", salary: "$130k - $165k", matchPercentage: 92, reasons: ["Excellent React & Next.js skills shown", "Strong understanding of web vitals", "Demonstrated team lead experience"] },
    { role: "Full Stack Developer", salary: "$115k - $145k", matchPercentage: 84, reasons: ["Good Node.js familiarity", "Zustand & state handling is strong", "Missing advanced system design metrics"] },
    { role: "Technical Product Manager", salary: "$140k - $180k", matchPercentage: 68, reasons: ["Demonstrated user experience focus", "Needs stronger technical metrics for scale", "Lacks product roadmap keywords"] }
  ];

  const randomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const baseScores = {
    overall: randomScore(75, 94),
    ats: randomScore(70, 92),
    skills: randomScore(75, 95),
    grammar: randomScore(80, 98),
    formatting: randomScore(82, 96)
  };

  const skills = [
    { name: "React & React 19", match: true, level: "Expert" as const },
    { name: "TypeScript", match: true, level: "Expert" as const },
    { name: "Next.js App Router", match: true, level: "Expert" as const },
    { name: "Tailwind CSS", match: true, level: "Expert" as const },
    { name: "Node.js & Express", match: true, level: "Intermediate" as const },
    { name: "Zustand & State Caching", match: true, level: "Intermediate" as const },
    { name: "AWS Cloud Infrastructure", match: false, level: "Beginner" as const },
    { name: "CI/CD & Github Actions", match: false, level: "Intermediate" as const },
    { name: "SQL & Mongoose (MongoDB)", match: true, level: "Intermediate" as const },
    { name: "GraphQL & REST APIs", match: false, level: "Intermediate" as const }
  ];

  return {
    id,
    fileName,
    fileSize: fileSizeStr,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    overallScore: Math.round((baseScores.overall + baseScores.ats + baseScores.skills + baseScores.grammar + baseScores.formatting) / 5),
    atsScore: baseScores.ats,
    skillsScore: baseScores.skills,
    grammarScore: baseScores.grammar,
    formattingScore: baseScores.formatting,
    strengths: [
      "Excellent technical stack alignment highlighting deep expertise in React 19, Next.js, and Zustand.",
      "Highly readable structure utilizing bulleted achievements with strong, impactful action verbs.",
      "Clear contact section, well-positioned social proof links, and clean modern styling layout.",
      "Excellent grammatical correctness and professional spelling maintained throughout."
    ],
    weaknesses: [
      "Lacks quantified metrics in recent positions (e.g., 'increased speed' instead of 'improved load times by 40%').",
      "Missing critical cloud infrastructure keywords (like AWS, Docker, Kubernetes) required for Senior positions.",
      "Under-optimized resume length: could be condensed slightly to maintain a tight, concise layout."
    ],
    suggestions: [
      { category: "Quantify Achievements", description: "Incorporate numerical metrics into your work experience statements. For instance, describe the scale of projects or percentage improvements in load speeds or user retention.", impact: "High" as const },
      { category: "ATS Keywords Insertion", description: "Incorporate missing high-priority tech words like 'System Design', 'AWS Deployment', and 'Unit Testing (Jest)' to better clear ATS filter parsing.", impact: "High" as const },
      { category: "Refining Resume Objective", description: "Shorten your professional summary section slightly to focus on technical value-adds rather than generic career goal statements.", impact: "Low" as const }
    ],
    skillsList: skills,
    keywordsFound: ["React", "TypeScript", "Next.js", "Zustand", "Tailwind CSS", "Redux", "Node.js", "Express", "REST APIs", "Git"],
    keywordsMissing: ["AWS", "Docker", "System Design", "Kubernetes", "GraphQL", "Jest", "CI/CD Pipeline"],
    recommendedRoles: roles
  };
};

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set, get) => ({
      analyses: [
        {
          id: "1",
          fileName: "Software Engineer_CV.pdf",
          fileSize: "1.2 MB",
          date: "May 20, 2026",
          overallScore: 85,
          atsScore: 90,
          skillsScore: 80,
          grammarScore: 95,
          formattingScore: 88,
          strengths: [
            "Strong use of modern tech stacks (React, Next.js, Zustand).",
            "Consistent date layout and clean formatting."
          ],
          weaknesses: [
            "Missing detailed cloud platform references (AWS/GCP).",
            "Needs more metrics to back up engineering accomplishments."
          ],
          suggestions: [
            { category: "ATS Keywords", description: "Add keywords like AWS, Serverless, Docker.", impact: "High" }
          ],
          skillsList: [
            { name: "React", match: true, level: "Expert" },
            { name: "TypeScript", match: true, level: "Expert" },
            { name: "AWS", match: false, level: "Beginner" }
          ],
          keywordsFound: ["React", "TypeScript", "Next.js", "CSS"],
          keywordsMissing: ["AWS", "Docker"],
          recommendedRoles: [
            { role: "Senior Frontend Developer", salary: "$130k - $160k", matchPercentage: 88, reasons: ["Matches React experience"] }
          ]
        },
        {
          id: "2",
          fileName: "Data Analyst_Resume.docx",
          fileSize: "840 KB",
          date: "May 18, 2026",
          overallScore: 78,
          atsScore: 80,
          skillsScore: 72,
          grammarScore: 90,
          formattingScore: 78,
          strengths: [
            "Great SQL and Python competency showcased.",
            "Includes excellent dashboard optimization examples."
          ],
          weaknesses: [
            "Cluttered layout makes ATS parser alignment difficult.",
            "Formatting has uneven spacing."
          ],
          suggestions: [
            { category: "Formatting", description: "Use a single-column clean layout format.", impact: "Medium" }
          ],
          skillsList: [
            { name: "SQL", match: true, level: "Expert" },
            { name: "Tableau", match: true, level: "Intermediate" }
          ],
          keywordsFound: ["SQL", "Python", "Excel"],
          keywordsMissing: ["PowerBI", "R Programming"],
          recommendedRoles: [
            { role: "Business Intelligence Analyst", salary: "$95k - $115k", matchPercentage: 80, reasons: ["Strong database and math skills"] }
          ]
        }
      ],
      activeAnalysis: null,
      isUploading: false,
      uploadProgress: 0,
      isProcessing: false,
      error: null,

      addAnalysis: (analysis) => set((state) => ({ analyses: [analysis, ...state.analyses] })),
      deleteAnalysis: (id) => set((state) => ({ 
        analyses: state.analyses.filter((a) => a.id !== id),
        activeAnalysis: state.activeAnalysis?.id === id ? null : state.activeAnalysis
      })),
      setActiveAnalysis: (id) => {
        const found = get().analyses.find((a) => a.id === id);
        set({ activeAnalysis: found || null });
      },
      setUploading: (uploading) => set({ isUploading: uploading }),
      setUploadProgress: (progress) => set({ uploadProgress: progress }),
      setProcessing: (processing) => set({ isProcessing: processing }),
      setError: (error) => set({ error }),

      triggerMockAnalysis: async (fileName, fileSize) => {
        set({ isUploading: true, uploadProgress: 0, error: null });
        
        // Simulating upload progress
        for (let i = 1; i <= 10; i++) {
          await new Promise((resolve) => setTimeout(resolve, 150));
          set({ uploadProgress: i * 10 });
        }
        
        set({ isUploading: false, isProcessing: true });
        
        // Simulating background processing (scanning/parsing)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const newId = (get().analyses.length + 1).toString();
        const sizeStr = `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
        const result = generateMockReport(newId, fileName, sizeStr);
        
        set((state) => ({
          analyses: [result, ...state.analyses],
          activeAnalysis: result,
          isProcessing: false
        }));
        
        return result;
      }
    }),
    {
      name: "analysis-storage",
    }
  )
);
