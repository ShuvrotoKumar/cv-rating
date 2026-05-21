"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Zap, Bot, Target } from "lucide-react";

const features = [
  {
    title: "ATS Optimization",
    description: "Ensure your resume beats the bots and reaches recruiters.",
    icon: ShieldCheck,
  },
  {
    title: "AI Scoring",
    description: "Get an instant, data-driven score out of 100.",
    icon: Zap,
  },
  {
    title: "Smart Suggestions",
    description: "Get personalized, AI-powered tips to improve your CV.",
    icon: Bot,
  },
  {
    title: "Role Matching",
    description: "Find jobs that match your skills perfectly.",
    icon: Target,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything you need to <span className="text-primary">land your dream job</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 bg-indigo-100 text-primary rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
