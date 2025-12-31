// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Custom Cursor Follower
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Mobile Menu Logic
// Ensure IDs match your HTML
const hamburger = document.getElementById("hamburger");
const mobileClose = document.getElementById("mobileClose");
const mobileMenu = document.getElementById("mobileOverlay"); // Use 'mobileOverlay'

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

mobileClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});

function toggleMobileDropdown(event) {
  event.preventDefault(); // Stops the "#" from jumping the page

  // 'event.currentTarget' is the <a> link
  const link = event.currentTarget;
  // The dropdown is the <div> immediately after the <a>
  const dropdown = link.nextElementSibling;

  if (dropdown) {
    dropdown.classList.toggle("open");

    // Optional: Rotate chevron if you want
    link.style.color = dropdown.classList.contains("open")
      ? "var(--accent-secondary)"
      : "#fff";
  }
}
