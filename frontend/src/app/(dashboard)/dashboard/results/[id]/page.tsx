import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/dashboard/CircularProgress";

export default function AnalysisResultsPage() {
  const scores = {
    overall: 85,
    ats: 90,
    skills: 80,
    grammar: 95,
    formatting: 88,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analysis Results</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Score Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <CircularProgress value={scores.overall} label="Overall" />
          <CircularProgress value={scores.ats} label="ATS Score" />
          <CircularProgress value={scores.skills} label="Skills" />
          <CircularProgress value={scores.grammar} label="Grammar" />
          <CircularProgress value={scores.formatting} label="Formatting" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Strong action verbs used throughout.</li>
              <li>Clear formatting and easy to read.</li>
              <li>Relevant skills highlighted clearly.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Add more metrics/quantifiable achievements.</li>
              <li>Ensure consistent date formatting.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
