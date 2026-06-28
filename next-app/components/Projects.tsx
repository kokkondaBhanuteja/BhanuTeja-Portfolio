"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Tapza",
    tagline: "Pharmacy Management SaaS",
    desc: "Multi-tenant row-level isolation in PostgreSQL with schema-per-tenant fallback.",
    tags: ["NestJS", "PostgreSQL", "Redis"],
    image: "/images/proj-tapza.png",
    large: true,
  },
  {
    id: "02",
    title: "Nervaya",
    tagline: "Sleep & Wellness Platform",
    desc: "Idempotent Razorpay webhooks + Redis lock to prevent duplicate order creation.",
    tags: ["MERN", "Payments"],
    image: "/images/proj-nervaya.png",
    large: true,
  },
  {
    id: "03",
    title: "Quick Park Assist",
    tagline: "Smart Parking",
    desc: "Optimistic slot locking with DB-level row locks to prevent double-booking.",
    tags: ["Spring Boot", "EV Routing"],
    image: "/images/proj-quickpark.png",
    large: false,
  },
  {
    id: "04",
    title: "Dr. Derma",
    tagline: "AI Skin Analysis",
    desc: "ML inference pipeline with Python FastAPI microservice + React polling client.",
    tags: ["Python", "React", "ML"],
    image: "/images/proj-drderma.png",
    large: false,
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 bg-bg relative z-10">
      <div className="container mx-auto px-6">
        
        <div className="mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-wider mb-4 block">Selected Work</span>
          <h2 className="text-5xl md:text-7xl font-bold text-fg">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-8">
          
          {/* Top Row: Large Projects */}
          <div className="col-span-1 md:col-span-7 group cursor-pointer">
            <ProjectCard project={projects[0]} />
          </div>
          
          <div className="col-span-1 md:col-span-5 group cursor-pointer mt-0 md:mt-32">
            <ProjectCard project={projects[1]} />
          </div>

          {/* Bottom Row: Small Projects */}
          <div className="col-span-1 md:col-span-4 group cursor-pointer mt-0 md:mt-16">
            <ProjectCard project={projects[2]} />
          </div>

          {/* Architecture Callout Strip for spacing/narrative */}
          <div className="hidden md:flex col-span-4 items-center justify-center p-12 text-center">
            <p className="text-xl text-fg-muted font-medium italic">
              "Focusing on the parts users never see, but always feel."
            </p>
          </div>

          <div className="col-span-1 md:col-span-4 group cursor-pointer mt-0 md:-mt-16">
            <ProjectCard project={projects[3]} />
          </div>

        </div>
        
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="flex flex-col h-full">
      <div className={`relative overflow-hidden rounded-2xl bg-bg-subtle mb-6 ${project.large ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-square md:aspect-[4/5]'}`}>
        <div className="absolute -inset-y-[15%] inset-x-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="parallax-img object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-white font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Project <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-3">
        <span className="text-fg-muted text-sm font-medium">{project.id}</span>
        <div className="flex gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-white border border-border rounded-full text-xs font-medium text-fg-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-fg mb-2 flex items-center gap-2 group-hover:text-accent transition-colors">
        {project.title} <ArrowUpRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </h3>
      
      <p className="text-fg-muted mb-4">{project.tagline}</p>
      
      <div className="mt-auto p-4 bg-bg-subtle border border-border rounded-xl">
        <p className="text-sm text-fg-muted font-medium">
          <strong className="text-fg block mb-1">Architecture:</strong>
          {project.desc}
        </p>
      </div>
    </div>
  );
}
