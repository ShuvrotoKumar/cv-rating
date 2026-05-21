export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-slate-500">Resumes Analyzed</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
