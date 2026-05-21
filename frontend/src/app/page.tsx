import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
}
