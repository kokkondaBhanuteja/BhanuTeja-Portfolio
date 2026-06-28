"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
});

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: "120%",
        opacity: 0,
        rotation: 3,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.2,
      });

      gsap.from(".reveal-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 1,
        stagger: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
      <ThreeBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          
          <div className="reveal-fade inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-border mb-8 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-fg-muted">Available for backend & cloud roles</span>
          </div>

          <div className="overflow-hidden pb-2">
            <h1 className="reveal-text text-5xl md:text-7xl lg:text-[6rem] font-bold text-fg leading-none">
              Bhanu Teja
            </h1>
          </div>
          <div className="overflow-hidden pb-4">
            <h1 className="reveal-text text-5xl md:text-7xl lg:text-[6rem] font-bold text-fg leading-none">
              Kokkonda.
            </h1>
          </div>

          <div className="mt-6 max-w-xl">
            <div className="overflow-hidden">
              <p className="reveal-text text-xl md:text-2xl text-fg-muted font-medium">
                Backend & Cloud Engineer
              </p>
            </div>
            <div className="overflow-hidden mt-2">
              <p className="reveal-text text-lg text-fg-muted/80">
                I build backends that hold up under real traffic.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              href="#work" 
              className="reveal-fade group relative inline-flex items-center gap-2 px-8 py-4 bg-fg text-white rounded-full font-medium overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                View Work <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </span>
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="reveal-fade text-fg font-medium underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
            >
              Download Résumé
            </a>
          </div>

          <div className="mt-16 flex gap-6 text-sm font-medium text-fg-muted reveal-fade">
            <a href="https://github.com/kokkondaBhanuteja" className="hover:text-accent transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/kokkonda-bhanu-teja/" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="mailto:bhanutejakokkonda@gmail.com" className="hover:text-accent transition-colors">Email</a>
          </div>

        </div>
      </div>
    </section>
  );
}
