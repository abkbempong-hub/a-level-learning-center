// -----------------------------
// NAVBAR TOGGLE + HEADER SHRINK
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Navbar toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      if (menuToggle.innerHTML === "☰") {
        menuToggle.innerHTML = "✖";
      } else {
        menuToggle.innerHTML = "☰";
      }
    });
  }

  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";
      }
    });
  });

  // Shrink header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  // Hero slider
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
});