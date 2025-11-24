const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
 

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

});
