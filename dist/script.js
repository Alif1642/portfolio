(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const savedTheme = localStorage.getItem("alif-portfolio-theme");

  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  function updateThemeButton() {
    const isLight = root.dataset.theme === "light";
    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  }

  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("alif-portfolio-theme", root.dataset.theme);
    updateThemeButton();
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.textContent = isOpen ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  const sections = [...document.querySelectorAll("main section[id]")];
  const navItems = [...navLinks.querySelectorAll("a")];
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 12);
    const position = window.scrollY + 180;
    let current = "";
    sections.forEach((section) => { if (position >= section.offsetTop) current = section.id; });
    navItems.forEach((item) => item.classList.toggle("active", item.getAttribute("href") === `#${current}`));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
