"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // IST Clock
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setTime(`${istTime} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA Reveal
      gsap.from(".footer-cta-line", {
        y: "100%",
        opacity: 0,
        rotation: 2,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });
    }, footerRef);

    // Magnetic Button
    const btn = btnRef.current;
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power3.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      };

      const wrapper = btn.parentElement;
      if (wrapper) {
        wrapper.addEventListener("mousemove", handleMouseMove);
        wrapper.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        ctx.revert();
        if (wrapper) {
          wrapper.removeEventListener("mousemove", handleMouseMove);
          wrapper.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="sticky bottom-0 -z-10 bg-bg-footer text-white min-h-[80vh] flex flex-col justify-between pt-32 pb-12">
      <div className="container mx-auto px-6 text-center">
        
        <h2 ref={ctaRef} className="text-5xl md:text-[8vw] font-bold leading-[0.9] tracking-tighter mb-16 overflow-hidden">
          <div className="footer-cta-line">LET'S BUILD SOMETHING</div>
          <div className="footer-cta-line relative inline-block">
            RELIABLE.
            <div className="absolute -bottom-2 left-0 right-0 h-1 md:h-3 bg-white origin-left footer-underline"></div>
          </div>
        </h2>

        <div className="relative inline-block p-12 -m-12 cursor-pointer group">
          <button 
            ref={btnRef}
            className="px-10 py-5 bg-white text-bg-footer rounded-full font-bold text-xl md:text-2xl hover:scale-105 transition-transform duration-300"
            onClick={() => window.location.href = "mailto:bhanutejakokkonda@gmail.com"}
          >
            Get in Touch
          </button>
        </div>

      </div>

      <div className="container mx-auto px-6 mt-32">
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-white/70 font-medium text-sm md:text-base">
            <a href="mailto:bhanutejakokkonda@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail size={16} /> bhanutejakokkonda@gmail.com
            </a>
            <a href="tel:+917893881841" className="hover:text-white transition-colors flex items-center gap-2">
              <Phone size={16} /> +91 78938 81841
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Warangal, India
            </span>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4 text-white/70">
              <a href="https://github.com/kokkondaBhanuteja" className="hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/kokkonda-bhanu-teja/" className="hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                <Linkedin size={20} />
              </a>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-white/50 font-mono text-sm tracking-wider mb-1">{time}</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-mono font-medium text-white/80">All Systems Operational</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
