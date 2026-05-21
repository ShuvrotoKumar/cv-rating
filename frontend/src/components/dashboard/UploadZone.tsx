"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, RefreshCw, X } from "lucide-react";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useToastStore } from "@/store/useToastStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function UploadZone() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const addToast = useToastStore((state) => state.addToast);
  const router = useRouter();

  const {
    isUploading,
    uploadProgress,
    isProcessing,
    triggerMockAnalysis,
    setError,
    error
  } = useAnalysisStore();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith(".docx") && !selectedFile.name.endsWith(".doc")) {
      addToast("Invalid file format. Please upload PDF or DOCX.", "error");
      return false;
    }

    if (selectedFile.size > maxSize) {
      addToast("File size too large. Limit is 5MB.", "error");
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    if (isUploading || isProcessing) return;
    setFile(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    try {
      addToast("Uploading resume to analyzer...", "info");
      const result = await triggerMockAnalysis(file.name, file.size);
      addToast("CVInsight AI analysis completed successfully!", "success");
      router.push(`/dashboard/results/${result.id}`);
    } catch (err) {
      setError("An unexpected error occurred during processing. Please try again.");
      addToast("Analysis failed. Please retry.", "error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all ${
          dragActive
            ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            : "border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,.doc"
          onChange={handleFileChange}
          disabled={isUploading || isProcessing}
        />

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-6 w-full max-w-sm"
            >
              {/* Premium Scanning Paper Representation */}
              <div className="relative w-36 h-48 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-lg shadow-2xl p-4 overflow-hidden mb-6 flex flex-col gap-2">
                {/* Horizontal lines simulated text */}
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-4/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-2/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-4/6" />
                
                {/* Moving Scanning Laser */}
                <motion.div
                  animate={{
                    top: ["0%", "100%", "0%"]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute left-0 right-0 h-1 bg-cyan-400 dark:bg-cyan-500 shadow-[0_0_12px_#22D3EE] z-10"
                />
                <motion.div
                  animate={{
                    top: ["0%", "100%", "0%"]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute left-0 right-0 h-12 bg-gradient-to-b from-cyan-400/20 to-transparent pointer-events-none transform -translate-y-12"
                />
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                AI Scanning Active...
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Extracting layout syntax and checking ATS keyword coverage
              </p>
            </motion.div>
          ) : isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8 w-full max-w-md"
            >
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                {/* Circular ring spinner */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-primary fill-none"
                    strokeWidth="4"
                    strokeDasharray={176}
                    strokeDashoffset={176 - (176 * uploadProgress) / 100}
                    transition={{ duration: 0.1 }}
                  />
                </svg>
                <span className="absolute text-sm font-bold text-slate-800 dark:text-slate-200">
                  {uploadProgress}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Uploading your Resume
              </h3>
              <p className="text-xs text-slate-500 mt-1">{file?.name}</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-primary mb-4 shadow-sm hover:scale-105 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Drag & Drop your resume here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                Supports PDF or DOCX file formats up to 5MB in size.
              </p>
              <button
                onClick={handleBrowseClick}
                className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-sm font-medium transition-all shadow-md hover:-translate-y-0.5"
              >
                Browse Files
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected file preview card */}
      <AnimatePresence>
        {file && !isUploading && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl glass-card flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 text-accent rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 max-w-[250px] truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRemoveFile}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Remove File"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload action button */}
      {file && !isUploading && !isProcessing && (
        <button
          onClick={handleAnalyze}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-600/95 text-white font-bold transition-all shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5 animate-spin-slow" />
          Analyze Resume with CVInsight AI
        </button>
      )}

      {error && (
        <div className="p-4 border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-950/10 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-medium text-center">
          {error}
        </div>
      )}
    </div>
  );
}
