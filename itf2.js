document.addEventListener("DOMContentLoaded", () => {
  // 1. Data Setup (Simulated CMS)
  const newsData = [
    {
      title: "The Future of AI-First Apps",
      date: "Oct 24, 2024",
      id: "01",
    },
    { title: "Scaling for 10M+ Users", date: "Oct 20, 2024", id: "02" },
    { title: "Design Systems in 2025", date: "Oct 15, 2024", id: "03" },
  ];

  const feed = document.getElementById("news-feed");
  newsData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `
                    <div class="news-thumb">${item.id}</div>
                    <div class="news-content">
                        <h4>${item.title}</h4>
                        <span>${item.date}</span>
                    </div>
                `;
    feed.appendChild(div);
  });

  // 2. Set Current Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // 3. Mobile Accordion Toggle
  const titles = document.querySelectorAll(".footer-title");
  titles.forEach((title) => {
    title.addEventListener("click", () => {
      if (window.innerWidth <= 640) {
        const list = title.nextElementSibling;
        if (list && list.classList.contains("nav-list")) {
          title.classList.toggle("active");
          list.classList.toggle("active");
        }
      }
    });
  });

  // 4. Lottie Animations
  if (typeof lottie !== "undefined") {
    // Wave Animation
    lottie.loadAnimation({
      container: document.getElementById("lottie-wave"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets1.lottiefiles.com/packages/lf20_m6cu9v6f.json", // Soft abstract waves
    });

    // Success Animation (Pre-load)
    const successAnim = lottie.loadAnimation({
      container: document.getElementById("success-animation"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://assets9.lottiefiles.com/packages/lf20_pqnfmone.json", // Success check
    });

    // Newsletter Form Logic
    const form = document.getElementById("subscribe-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".subscribe-btn");
      const btnText = btn.querySelector(".btn-text");

      // Simple UX feedback
      btnText.textContent = "Processing...";

      setTimeout(() => {
        gsap.to(form, { opacity: 0, y: -20, duration: 0.5 });
        document.getElementById("success-animation").style.display = "block";
        successAnim.play();

        // Reveal success message
        const successMsg = document.createElement("p");
        successMsg.textContent = "Welcome to the future!";
        successMsg.style.cssText =
          "text-align:center; font-weight:bold; color:var(--accent-primary); margin-top:1rem;";
        form.parentNode.appendChild(successMsg);
        gsap.from(successMsg, { opacity: 0, y: 10, delay: 0.5 });
      }, 1500);
    });
  }

  // 5. GSAP Cinematic Entrance
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Initial hidden state for items
    gsap.set(".reveal-item", { opacity: 0, y: 50 });
    gsap.set(".news-item", { opacity: 0, x: -20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-footer",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(".reveal-item", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out",
    })
      .to(
        ".news-item",
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        ".social-link",
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

    // Parallax effect on the mesh background
    gsap.to(".footer-mesh", {
      y: -50,
      scrollTrigger: {
        trigger: "#main-footer",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});
