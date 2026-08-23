/* ============================================
   CyberMercenaries — Main JavaScript
   Vanilla JS + GSAP via CDN, zero build step
   ============================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   1. HERO ENTRANCE ANIMATION
   Staggered fade+slide-up: eyebrow → headline → CTA
   0.1s stagger, ease "power3.out"
   ============================================ */
function initHeroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

  tl.from(".hero__eyebrow", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
  })
  .from(".hero__headline-line--primary", {
    y: 50,
    opacity: 0,
  }, "-=0.4")
  .from(".hero__headline-line--secondary", {
    y: 30,
    opacity: 0,
  }, "-=0.3")
  .from(".hero__contact-link", {
    y: 20,
    opacity: 0,
    stagger: 0.08,
  }, "-=0.3")
  .from(".hero__status", {
    y: 20,
    opacity: 0,
  }, "-=0.2")
  .from(".btn--primary", {
    y: 20,
    opacity: 0,
  }, "-=0.2")
  .from(".preview-card", {
    y: 40,
    opacity: 0,
    stagger: 0.08,
    duration: 0.6,
  }, "-=0.3");
}

/* ============================================
   2. SECTION HEADER CLIP-PATH REVEAL ON SCROLL
   inset(0% 0% 100% 0%) → inset(0%), 0.8s, "power3.out"
   Triggered via ScrollTrigger at 80% viewport
   ============================================ */
function initSectionHeaderReveal() {
  const headers = gsap.utils.toArray(".section-header");

  headers.forEach((header) => {
    const label = header.querySelector(".section-header__label");
    const title = header.querySelector(".section-header__title");

    gsap.set([label, title], { clipPath: "inset(0% 0% 100% 0%)" });

    gsap.to([label, title], {
      clipPath: "inset(0%)",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

/* ============================================
   3. STATS COUNT-UP ON VIEWPORT ENTRY
   ============================================ */
function initStatsCountUp() {
  const statValues = gsap.utils.toArray(".stat-card__value[data-count]");

  statValues.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toLocaleString();
      },
    });
  });
}

/* ============================================
   4. WORK / TESTIMONIAL CARDS: FADE+SLIDE-IN ON SCROLL
   0.08s stagger per card
   ============================================ */
function initCardScrollReveal() {
  // Work cards
  gsap.from(".work-card", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: ".work__scroller",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Testimonial cards
  gsap.from(".testimonial-card", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: ".testimonials__scroller",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Service cards
  gsap.from(".service-card", {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.06,
    scrollTrigger: {
      trigger: ".services__grid",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Pricing cards
  gsap.from(".pricing-card", {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.06,
    scrollTrigger: {
      trigger: ".pricing__grid",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Founder cards
  gsap.from(".founder-card", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".about__founders",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Portrait images
  gsap.from(".about__portrait", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".about__images",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}

/* ============================================
   5. MOBILE NAV: FULL-SCREEN OVERLAY OPEN/CLOSE ANIMATION
   ============================================ */
function initMobileNav() {
  const toggle = document.querySelector(".nav__toggle");
  const overlay = document.querySelector(".nav__overlay");
  const links = gsap.utils.toArray(".nav__overlay-link");
  let isOpen = false;

  function openNav() {
    isOpen = true;
    toggle.setAttribute("aria-expanded", "true");
    overlay.hidden = false;

    gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } })
      .to(overlay, { opacity: 1, visibility: "visible" })
      .from(links, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      }, "-=0.3");

    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    isOpen = false;
    toggle.setAttribute("aria-expanded", "false");

    gsap.timeline({ defaults: { ease: "power3.in", duration: 0.4 } })
      .to(links, { y: -20, opacity: 0, stagger: 0.04, duration: 0.3 })
      .to(overlay, { opacity: 0, visibility: "hidden" }, "-=0.2")
      .call(() => {
        overlay.hidden = true;
        document.body.style.overflow = "";
      });
  }

  toggle.addEventListener("click", () => {
    if (isOpen) closeNav();
    else openNav();
  });

  // Close on link click
  links.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeNav();
  });

  // Close on overlay click (outside links)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeNav();
  });
}

/* ============================================
   6. SMOOTH SCROLL ON NAV CLICKS
   ============================================ */
function initSmoothScroll() {
  const navLinks = gsap.utils.toArray(".nav__link, .nav__overlay-link, .hero__contact-link, .btn[href^='#'], .pricing-card__cta");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const navHeight = document.querySelector(".nav").offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      gsap.to(window, {
        scrollTo: { y: targetPosition, autoKill: false },
        duration: 1,
        ease: "power3.inOut",
      });
    });
  });
}

/* ============================================
   7. CLIENT-SIDE FORM VALIDATION BEFORE FORMSPREE SUBMIT
   ============================================ */
function initFormValidation() {
  const form = document.querySelector(".contact-form");
  const submitBtn = form.querySelector(".contact-form__submit");
  const statusEl = form.querySelector(".form-status");

  const validators = {
    name: (value) => value.trim().length >= 2 || "Name must be at least 2 characters",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid email",
    phone: (value) => !value || /^[\d\s\-\+\(\)]{7,}$/.test(value) || "Please enter a valid phone number",
    message: (value) => value.trim().length >= 10 || "Message must be at least 10 characters",
  };

  function showError(input, message) {
    const group = input.closest(".form-group");
    const errorEl = group.querySelector(".form-error");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
  }

  function clearError(input) {
    const group = input.closest(".form-group");
    const errorEl = group.querySelector(".form-error");
    input.removeAttribute("aria-invalid");
    errorEl.textContent = "";
  }

  function validateField(input) {
    const name = input.name;
    const validator = validators[name];
    if (!validator) return true;

    const result = validator(input.value);
    if (result === true) {
      clearError(input);
      return true;
    } else {
      showError(input, result);
      return false;
    }
  }

  function validateForm() {
    const inputs = form.querySelectorAll("[name]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    return isValid;
  }

  // Real-time validation on blur
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.hasAttribute("aria-invalid")) validateField(input);
    });
  });

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      statusEl.hidden = false;
      statusEl.textContent = "Please fix the errors above";
      statusEl.style.color = "#ff6b6b";
      return;
    }

    // Disable submit
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusEl.hidden = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.hidden = false;
        statusEl.textContent = "Message sent — we'll reply within 24 hours";
        statusEl.style.color = "#4ade80";
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      statusEl.hidden = false;
      statusEl.textContent = "Something went wrong. Please try again or email us directly.";
      statusEl.style.color = "#ff6b6b";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

/* ============================================
   8. CUSTOM CURSOR FOLLOW ANIMATION
   ============================================ */
function initCustomCursor() {
  // Only on desktop
  if (window.innerWidth < 1024) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Elements that trigger cursor expansion
  const interactiveElements = document.querySelectorAll(
    "a, button, .service-card, .pricing-card, .work-card, .testimonial-card, .preview-card, .btn, .nav__link, .nav__toggle"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor--active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--active"));
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => cursor.classList.add("cursor--hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("cursor--hidden"));

  // Smooth cursor animation
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cleanup on resize to mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1024) {
      cursor.remove();
    }
  }, { once: true });
}

/* ============================================
   9. NAV SCROLL STATE (backdrop-blur on scroll)
   ============================================ */
function initNavScrollState() {
  const nav = document.querySelector(".nav");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ============================================
   INITIALIZE ALL
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initHeroEntrance();
  initSectionHeaderReveal();
  initStatsCountUp();
  initCardScrollReveal();
  initMobileNav();
  initSmoothScroll();
  initFormValidation();
  initNavScrollState();
  initCustomCursor();
});

/* ============================================
   SCROLLTRIGGER REFRESH ON RESIZE
   ============================================ */
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});