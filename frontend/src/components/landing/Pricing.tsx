"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 Resume Analysis", "Basic ATS Score", "Email Support"],
  },
  {
    name: "Pro",
    price: "$29",
    features: ["Unlimited Analyses", "Advanced ATS Score", "AI Suggestions", "Priority Support"],
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Simple, transparent pricing</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="flex-1"
              whileHover={{ y: -10 }}
            >
              <Card className={plan.highlight ? "border-primary shadow-xl" : ""}>
                <CardHeader>
                  <CardTitle className="text-center">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-center mt-4">{plan.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-slate-600">
                        <Check className="w-5 h-5 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.highlight ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
