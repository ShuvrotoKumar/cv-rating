"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Analyze your resume with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              AI intelligence
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Get instant feedback, ATS scoring, and actionable insights to land your dream job faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 text-lg" asChild>
              <Link href="/dashboard/upload">Upload Resume</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg" asChild>
              <Link href="/login">Explore Features</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
