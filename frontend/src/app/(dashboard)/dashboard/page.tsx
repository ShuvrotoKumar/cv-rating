import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const recentAnalyses = [
    { id: 1, name: "Software Engineer_CV.pdf", score: 85, date: "2026-05-20" },
    { id: 2, name: "Data Analyst_Resume.docx", score: 78, date: "2026-05-18" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button asChild>
            <Link href="/dashboard/upload">Upload New Resume</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">82%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-medium">{analysis.name}</p>
                  <p className="text-sm text-slate-500">{analysis.date}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">{analysis.score}%</span>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/results/${analysis.id}`}>View</Link>
                    </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
