"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(".mobile-menu", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".mobile-menu", {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const links = [
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-syne font-bold text-2xl tracking-tighter text-fg">
            BT.
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-fg-muted font-medium hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-fg z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className="mobile-menu fixed inset-0 bg-bg z-40 flex flex-col justify-center px-8"
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        <nav className="flex flex-col gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-syne text-5xl font-bold tracking-tight text-fg hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
