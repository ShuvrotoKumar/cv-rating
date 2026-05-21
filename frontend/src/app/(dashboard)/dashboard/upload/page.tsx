"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
            <Upload className="w-12 h-12 text-primary" />
            <div>
              <p className="font-semibold">Drag and drop your resume</p>
              <p className="text-sm text-slate-500">PDF or DOCX up to 5MB</p>
            </div>
            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
            <Button asChild variant="outline">
              <label htmlFor="file-upload">Browse Files</label>
            </Button>
            {file && (
              <div className="flex items-center gap-2 mt-4 bg-slate-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm">{file.name}</span>
              </div>
            )}
          </div>
          <Button className="w-full mt-6" onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
