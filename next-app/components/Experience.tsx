"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    role: "Backend Developer Intern",
    company: "Tapza",
    date: "Jan 2025 – Present",
    desc: "Built multi-tenant pharmacy API serving N pharmacies from a single codebase.",
    impact: "Reduced async job processing latency by ~40% using Redis + BullMQ queues.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "AWS"],
  },
  {
    role: "Freelance Full-Stack",
    company: "Nervaya",
    date: "2025",
    desc: "Delivered sleep & wellness SaaS end-to-end in 6 weeks solo.",
    impact: "Integrated Razorpay checkout with idempotent order handling to prevent duplicate charges under concurrent requests.",
    tags: ["MERN", "Razorpay", "Vercel"],
  },
  {
    role: "Java Developer Intern",
    company: "Infosys SpringBoard",
    date: "Dec 2024 – Feb 2025",
    desc: "Built microservice observability dashboards with Grafana + Prometheus.",
    impact: "Identified 3 latency hotspots that reduced p99 response times by 25%.",
    tags: ["Spring Boot", "Microservices", "Grafana"],
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-wrapper",
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }

      // Card staggered reveal
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        const xOffset = i % 2 === 0 ? -50 : 50;
        gsap.from(card, {
          x: xOffset,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 bg-bg-subtle relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="mb-24 max-w-3xl">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">About & Experience</h2>
          <p className="text-3xl md:text-4xl text-fg font-medium leading-tight">
            I'm a backend-focused software engineer (B.Tech CSE, 2026) who enjoys turning messy, real-world problems into clean, scalable systems.
          </p>
        </div>

        <div className="timeline-wrapper relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg className="h-full w-[2px]" preserveAspectRatio="none">
              <path 
                ref={lineRef}
                d="M 1 0 V 10000" 
                stroke="var(--border)" 
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          
          {/* Mobile Line */}
          <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px bg-border"></div>

          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <div key={i} className={`timeline-card relative flex flex-col md:flex-row gap-8 md:gap-0 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[11px] md:left-1/2 top-8 md:-translate-x-1/2 w-2 h-2 rounded-full bg-accent ring-4 ring-bg-subtle z-10"></div>

                <div className={`md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 text-left" : "md:pl-12 md:text-left"}`}>
                  <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                    <span className="text-sm font-medium text-fg-muted mb-2 block">{exp.date}</span>
                    <h3 className="text-2xl font-bold text-fg mb-1">{exp.company}</h3>
                    <div className="text-accent font-medium mb-4">{exp.role}</div>
                    
                    <p className="text-fg-muted mb-3">↳ {exp.desc}</p>
                    <p className="text-fg-muted font-medium mb-6">↳ Impact: {exp.impact}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-bg-subtle border border-border rounded-full text-xs font-medium text-fg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
