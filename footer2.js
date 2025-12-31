document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Intersection Observer for Scroll Reveal Animations ---

  const footer = document.getElementById("mainFooter");
  if (footer) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.05 /* Trigger animation when 5% of footer is visible */,
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("animated");
          observer.unobserve(footer);
        }
      });
    }, observerOptions);

    scrollObserver.observe(footer);
  }

  // --- 2. Newsletter Form Handler ---
  window.handleSubscribe = function (e) {
    e.preventDefault();
    const emailInput = document.getElementById("newsletterEmail");
    const statusP = document.getElementById("subscribe-status");

    if (emailInput.checkValidity()) {
      // Success message in distinct color
      statusP.style.color = "var(--product-cta-color)";
      statusP.textContent = "Subscribed successfully! Thank you.";
      emailInput.value = ""; // Clear input
    } else {
      // Error/validation hint
      statusP.style.color = "var(--accent-light)";
      statusP.textContent = "Please enter a valid email address.";
    }

    return false;
  };
});
