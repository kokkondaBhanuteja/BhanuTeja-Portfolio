// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Particles Animation
  createParticles();

  // Initialize Skill Progress Bars
  initializeProgressBars();

  // Timeline Animation on Scroll
  initializeTimelineAnimation();

  // Back to Top Button
  initializeBackToTop();

  // Mobile Navigation
  initializeMobileNav();

  // Theme Toggle
  initializeThemeToggle();

  // Form Validation
  initializeFormValidation();
  
});

// Create Particles
// Create Particles function
function createParticles() {
  const particleContainer = document.getElementById("particle-container");
  const particleCount = 50;
  
  // Create a style element for our animations
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  let keyframesCSS = "";
  
  for (let i = 0; i < particleCount; i++) {
    let particle = document.createElement("div");
    particle.className = "particle";
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Create unique animation name for this particle
    const animationName = `floatParticle${i}`;
    
    // Random animation duration between 10-30s
    const duration = Math.random() * 20 + 10;
    particle.style.animation = `${animationName} ${duration}s linear infinite`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Generate unique keyframes for this particle
    keyframesCSS += `
      @keyframes ${animationName} {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `;
    
    particleContainer.appendChild(particle);
  }
  
  // Add all the keyframe animations to the stylesheet
  styleSheet.innerHTML = keyframesCSS;
  document.head.appendChild(styleSheet);
}

// Initialize Progress Bars
function initializeProgressBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".progress");
          progressBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".skills-category").forEach((category) => {
    observer.observe(category);
  });
}

// Timeline Animation on Scroll
function initializeTimelineAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    observer.observe(item);
  });
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Mobile Navigation
function initializeMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Theme Toggle
function initializeThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const sunIcon = document.querySelector(".fa-sun");
  const moonIcon = document.querySelector(".fa-moon");
  const body = document.body;

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    sunIcon.classList.toggle("active");
    moonIcon.classList.toggle("active");

    // Save preference to localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.remove("dark-mode");
    moonIcon.classList.remove("active");
    sunIcon.classList.add("active");
  }
}

// Form Validation
function initializeFormValidation() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      // Name validation
      const nameInput = document.getElementById("name");
      const nameError = document.getElementById("nameError");

      if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name";
        isValid = false;
      } else {
        nameError.textContent = "";
      }

      // Email validation
      const emailInput = document.getElementById("email");
      const emailError = document.getElementById("emailError");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
      } else {
        emailError.textContent = "";
      }

      // Message validation
      const messageInput = document.getElementById("message");
      const messageError = document.getElementById("messageError");

      if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter your message";
        isValid = false;
      } else {
        messageError.textContent = "";
      }

      // If valid, show success message
      if (isValid) {
        // In a real implementation, you would send the form data to a server here
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
      }
    });
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Update active navigation item based on scroll position
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
