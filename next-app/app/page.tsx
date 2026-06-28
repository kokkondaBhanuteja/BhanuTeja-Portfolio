import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-bg overflow-hidden relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      <Hero />
      <Experience />
      <Projects />
    </main>
  );
}
