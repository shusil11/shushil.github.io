//  Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

//  Typing Effect
const typedTextElement = document.querySelector(".typed-text");
const textArray = [
  "student.learn()",
  "developer.code()",
  "problem.solve()",
  "portfolio.build()",
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentText = textArray[textArrayIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    typingDelay = 500;
  }

  setTimeout(typeText, typingDelay);
}

// Start typing effect
if (typedTextElement) {
  setTimeout(typeText, 1000);
}

//  Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Trigger skill bar animations
      if (entry.target.classList.contains("skills")) {
        animateSkillBars();
      }

      // Trigger counter animations
      if (entry.target.classList.contains("about")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Add fade-in effect to sections
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(section);
});

//  Skill Bar Animation
let skillBarsAnimated = false;

function animateSkillBars() {
  if (skillBarsAnimated) return;

  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    setTimeout(() => {
      bar.style.width = progress + "%";
    }, 100);
  });

  skillBarsAnimated = true;
}

//  Counter Animation
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });

  countersAnimated = true;
}

//  Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

//  Active Navigation Link
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

//  Form Submission
// NO FORM BLOCKING - Let Formspree handle it naturally
// The form will submit to Formspree's server when user clicks "Send Message"

//  Navbar Background on Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 15, 0.95)";
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.8)";
  }
});

//  Project Card Tilt Effect
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

//  Initialize Animations on Load
window.addEventListener("load", () => {
  // Add loaded class to body for any additional animations
  document.body.classList.add("loaded");

  // Trigger animations for visible sections
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
});

//  Glitch Effect on Hero Title
const glitchText = document.querySelector(".glitch-text");

if (glitchText) {
  setInterval(() => {
    const glitchChance = Math.random();
    if (glitchChance > 0.95) {
      glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        glitchText.style.transform = "translate(0, 0)";
      }, 100);
    }
  }, 500);
}
