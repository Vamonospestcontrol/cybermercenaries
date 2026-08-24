/* ============================================
   CyberMercenaries — Main JavaScript
   Vanilla JS + GSAP via CDN, zero build step
   Enhanced with gsap-core, gsap-timeline, gsap-scrolltrigger,
   gsap-plugins, gsap-utils, gsap-performance
   ============================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance: Match media for responsive animations
const mm = gsap.matchMedia();

// ============================================
// UTILITIES (using gsap-utils patterns)
// ============================================
const clamp = (min, max, value) => Math.max(min, Math.min(max, value));
const mapRange = (inMin, inMax, outMin, outMax, value) =>
  outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));

// Reduced motion check
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ============================================
// 1. HERO ENTRANCE ANIMATION (Enhanced with timeline)
// Staggered fade+slide-up with text splitting
// ============================================
function initHeroEntrance() {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

  // Eyebrow labels - scramble reveal
  tl.from(".hero__eyebrow", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    onStart: () => {
      document.querySelectorAll(".hero__eyebrow").forEach((el, i) => {
        gsap.delayedCall(0.2 + i * 0.15, () => scrambleText(el, 0.6));
      });
    },
  })
  // Primary headline - split by lines
  .from(".hero__headline-line--primary", {
    y: 60,
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 1.2,
    ease: "power4.out",
  }, "-=0.5")
  // Secondary headline
  .from(".hero__headline-line--secondary", {
    y: 40,
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 1,
    ease: "power3.out",
  }, "-=0.4")
  // Contact links
  .from(".hero__contact-link", {
    y: 20,
    opacity: 0,
    stagger: 0.08,
  }, "-=0.4")
  // Status indicator
  .from(".hero__status", {
    y: 20,
    opacity: 0,
    scale: 0.8,
  }, "-=0.3")
  // Primary CTA
  .from(".btn--primary", {
    y: 20,
    opacity: 0,
    scale: 0.9,
  }, "-=0.3")
  // Preview cards - staggered with rotation
  .from(".preview-card", {
    y: 50,
    opacity: 0,
    rotation: -2,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(1.2)",
  }, "-=0.4");
}

// Text scramble utility (gsap-utils pattern)
function scrambleText(el, duration = 0.8) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const finalText = el.textContent;
  const len = finalText.length;
  const frames = Math.round(duration * 60);
  let frame = 0;

  const tick = () => {
    let output = "";
    const revealCount = Math.floor((frame / frames) * len);

    for (let i = 0; i < len; i++) {
      if (i < revealCount) {
        output += finalText[i];
      } else if (finalText[i] === " ") {
        output += " ";
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = output;
    frame++;
    if (frame <= frames) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };
  tick();
}

// ============================================
// 2. HERO PARALLAX (gsap-scrolltrigger)
// Parallax depth on scroll
// ============================================
function initHeroParallax() {
  if (prefersReducedMotion()) return;

  const hero = document.querySelector(".hero");
  if (!hero) return;

  const bg = hero.querySelector(".hero__bg");
  const eyebrows = hero.querySelectorAll(".hero__eyebrow");
  const headline = hero.querySelector(".hero__headline");
  const previews = hero.querySelector(".hero__previews");

  // Background parallax
  gsap.to(bg, {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  // Eyebrows parallax
  eyebrows.forEach((el, i) => {
    gsap.to(el, {
      yPercent: i === 0 ? -50 : 50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "center top",
        scrub: 0.5,
      },
    });
  });

  // Headline parallax
  gsap.to(headline, {
    yPercent: 20,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "center top",
      scrub: 0.5,
    },
  });

  // Previews parallax
  gsap.to(previews, {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 0.3,
    },
  });
}

// ============================================
// 3. SECTION HEADER CLIP-PATH REVEAL ON SCROLL
// Enhanced with stagger and rotation
// ============================================
function initSectionHeaderReveal() {
  if (prefersReducedMotion()) return;

  const headers = gsap.utils.toArray(".section-header");

  headers.forEach((header) => {
    const label = header.querySelector(".section-header__label");
    const title = header.querySelector(".section-header__title");

    gsap.set([label, title], {
      clipPath: "inset(0% 0% 100% 0%)",
      y: 20,
      opacity: 0,
    });

    gsap.to([label, title], {
      clipPath: "inset(0%)",
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Accent line animation
    gsap.from(title, {
      "--accent-line-width": "0%",
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      onUpdate: function () {
        const progress = this.progress();
        title.style.setProperty("--accent-line-width", `${progress * 100}%`);
      },
    });
  });
}

// ============================================
// 4. STATS COUNT-UP ON VIEWPORT ENTRY
// Enhanced with stagger and rotation
// ============================================
function initStatsCountUp() {
  if (prefersReducedMotion()) return;

  const statValues = gsap.utils.toArray(".stat-card__value[data-count]");

  statValues.forEach((el, i) => {
    const target = parseInt(el.dataset.count, 10);
    const obj = { value: 0 };
    const card = el.closest(".stat-card");

    // Card entrance
    gsap.from(card, {
      y: 40,
      opacity: 0,
      rotationY: 15,
      duration: 0.8,
      ease: "back.out(1.2)",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Count up
    gsap.to(obj, {
      value: target,
      duration: 2.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toLocaleString();
      },
    });
  });
}

// ============================================
// 5. CARD SCROLL REVEALS (Enhanced per section)
// Each section gets distinct entrance animation
// ============================================
function initCardScrollReveal() {
  if (prefersReducedMotion()) return;

  // Service cards - scale + fade with rotation
  gsap.from(".service-card", {
    y: 50,
    opacity: 0,
    scale: 0.9,
    rotationX: -10,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: ".services__grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Pricing cards - elastic entrance with color accent
  gsap.from(".pricing-card", {
    y: 60,
    opacity: 0,
    scale: 0.85,
    duration: 0.9,
    ease: "elastic.out(1, 0.5)",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".pricing__grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Work cards - horizontal slide from sides
  gsap.from(".work-card", {
    x: (i) => (i % 2 === 0 ? -80 : 80),
    opacity: 0,
    rotation: (i) => (i % 2 === 0 ? -5 : 5),
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".work__scroller",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Testimonial cards - scale from center
  gsap.from(".testimonial-card", {
    scale: 0.8,
    opacity: 0,
    rotationY: 10,
    duration: 0.9,
    ease: "back.out(1.3)",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".testimonials__scroller",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Founder cards - vertical stagger
  gsap.from(".founder-card", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".about__founders",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Portrait images - reveal with clip-path
  gsap.from(".about__portrait", {
    clipPath: "inset(50% 50% 50% 50%)",
    scale: 1.1,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".about__images",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Contact form - slide from right
  gsap.from(".contact-form", {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Contact info items - stagger from left
  gsap.from(".contact-info__item", {
    x: -40,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: ".contact-info__details",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

// ============================================
// 6. HOVER INTERACTIONS (gsap-core + gsap-utils)
// Magnetic, glow, scale, underline reveal - varied per element
// ============================================
function initHoverInteractions() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (prefersReducedMotion()) return;

  // Service cards - magnetic icon + glow
  document.querySelectorAll(".service-card").forEach((card) => {
    const icon = card.querySelector(".service-card__icon");

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -12,
        borderColor: "var(--accent)",
        boxShadow: "0 24px 48px rgba(79, 70, 229, 0.15), 0 0 80px rgba(79, 70, 229, 0.08)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        filter: "drop-shadow(0 8px 24px rgba(79, 70, 229, 0.5))",
        duration: 0.5,
        ease: "back.out(1.5)",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        borderColor: "var(--border)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        filter: "drop-shadow(0 4px 12px rgba(79, 70, 229, 0.3))",
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });

  // Work cards - media zoom + content lift
  document.querySelectorAll(".work-card").forEach((card) => {
    const media = card.querySelector(".work-card__media");
    const content = card.querySelector(".work-card__content");

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -16,
        borderColor: "var(--accent)",
        boxShadow: "0 40px 80px rgba(79, 70, 229, 0.2), 0 0 120px rgba(79, 70, 229, 0.1)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(media, {
        scale: 1.08,
        opacity: 0.25,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(content, {
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        borderColor: "var(--border)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(media, {
        scale: 1,
        opacity: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Testimonial cards - subtle lift + border glow
  document.querySelectorAll(".testimonial-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -12,
        borderColor: "var(--accent)",
        boxShadow: "0 32px 64px rgba(79, 70, 229, 0.15), 0 0 100px rgba(79, 70, 229, 0.08)",
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        borderColor: "var(--border)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // Pricing cards - featured pulse, others lift
  document.querySelectorAll(".pricing-card").forEach((card) => {
    const isFeatured = card.classList.contains("pricing-card--featured");

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: isFeatured ? -8 : -12,
        borderColor: isFeatured ? "var(--accent-light)" : "var(--accent)",
        boxShadow: isFeatured
          ? "0 40px 80px rgba(79, 70, 229, 0.2), 0 0 120px rgba(79, 70, 229, 0.1)"
          : "0 32px 64px rgba(79, 70, 229, 0.15), 0 0 100px rgba(79, 70, 229, 0.08)",
        duration: 0.4,
        ease: "power2.out",
      });

      if (isFeatured) {
        gsap.to(card, {
          boxShadow: "0 0 60px rgba(129, 140, 248, 0.4), 0 0 120px rgba(79, 70, 229, 0.2)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        borderColor: isFeatured ? "var(--accent)" : "var(--border)",
        boxShadow: isFeatured
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "0 8px 32px rgba(0, 0, 0, 0.4)",
        duration: 0.5,
        ease: "power2.out",
      });

      if (isFeatured) {
        gsap.killTweensOf(card, "boxShadow");
      }
    });
  });

  // Founder cards - subtle glow
  document.querySelectorAll(".founder-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        borderColor: "var(--accent)",
        boxShadow: "0 24px 48px rgba(79, 70, 229, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        borderColor: "var(--border)",
        boxShadow: "none",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // Portrait images - zoom + grayscale shift
  document.querySelectorAll(".about__portrait").forEach((portrait) => {
    const img = portrait.querySelector("img");

    portrait.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.08,
        filter: "grayscale(0.3) contrast(1.1)",
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(portrait, {
        borderColor: "var(--accent)",
        boxShadow: "0 0 40px rgba(79, 70, 229, 0.2)",
        duration: 0.4,
        ease: "power2.out",
      });
    });

    portrait.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        filter: "grayscale(0) contrast(1)",
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(portrait, {
        borderColor: "var(--border)",
        boxShadow: "none",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // Nav links - underline reveal
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        "--underline-width": "100%",
        color: "var(--text)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        "--underline-width": "0%",
        color: "var(--text-muted)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Buttons - magnetic + ripple (already in magnetic buttons)
  // Enhanced with ripple
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.5 },
        {
          scale: 2.5,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    });
  });

  // Preview cards - tilt effect
  document.querySelectorAll(".preview-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        transformPerspective: 1000,
      });
    });
  });

  // Contact info items - slide
  document.querySelectorAll(".contact-info__item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        x: 8,
        borderColor: "var(--accent)",
        boxShadow: "0 8px 24px rgba(79, 70, 229, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        x: 0,
        borderColor: "var(--border)",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// ============================================
// 7. NAV SCROLL STATE + ACTIVE LINK (gsap-scrolltrigger)
// ============================================
function initNavScrollState() {
  const nav = document.querySelector(".nav");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }

      // Hide nav on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const scrollPos = window.scrollY + 150;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
  });
}

// ============================================
// 8. CUSTOM CURSOR FOLLOW ANIMATION (Enhanced)
// ============================================
function initCustomCursor() {
  if (window.innerWidth < 1024) return;
  if (prefersReducedMotion()) return;

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
    "a, button, .service-card, .pricing-card, .work-card, .testimonial-card, .preview-card, .btn, .nav__link, .nav__toggle, .founder-card, .about__portrait, .contact-info__item"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor--active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--active"));
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => cursor.classList.add("cursor--hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("cursor--hidden"));

  // Smooth cursor animation (performance optimized)
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cleanup on resize to mobile
  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth < 1024) {
        cursor.remove();
      }
    },
    { once: true }
  );
}

// ============================================
// 9. SCROLL PROGRESS BAR (Enhanced)
// ============================================
function initScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });

  gsap.set(bar, { scaleX: 0, transformOrigin: "left" });
}

// ============================================
// 10. MAGNETIC BUTTON EFFECT (Enhanced)
// ============================================
function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (prefersReducedMotion()) return;

  const magnets = document.querySelectorAll(".btn--primary, .pricing-card--featured .btn");

  magnets.forEach((magnet) => {
    const strength = 0.3;

    magnet.addEventListener("mousemove", (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(magnet, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: "power2.out",
      });
    });

    magnet.addEventListener("mouseleave", () => {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    });
  });
}

// ============================================
// 11. TEXT SCRAMBLE REVEAL — Extended
// ============================================
function initTextScramble() {
  if (prefersReducedMotion()) return;

  const chars = "!<>-_\\/[]{}—=+*^?#________";

  class Scrambler {
    constructor(el) {
      this.el = el;
      this.finalText = el.textContent;
    }
    run(duration = 1) {
      const frames = Math.round(duration * 60);
      let frame = 0;
      const len = this.finalText.length;

      const tick = () => {
        let output = "";
        const revealCount = Math.floor((frame / frames) * len);

        for (let i = 0; i < len; i++) {
          if (i < revealCount) {
            output += this.finalText[i];
          } else if (this.finalText[i] === " ") {
            output += " ";
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        this.el.textContent = output;
        frame++;

        if (frame <= frames) {
          requestAnimationFrame(tick);
        } else {
          this.el.textContent = this.finalText;
        }
      };
      tick();
    }
  }

  // Hero eyebrows
  const targets = document.querySelectorAll(".hero__eyebrow");
  targets.forEach((el, i) => {
    const scrambler = new Scrambler(el);
    gsap.delayedCall(0.3 + i * 0.15, () => scrambler.run(0.8));
  });

  // Service card titles on scroll
  const serviceTitles = document.querySelectorAll(".service-card__title");
  serviceTitles.forEach((el) => {
    const scrambler = new Scrambler(el);
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => scrambler.run(0.6),
      once: true,
    });
  });
}

// ============================================
// 12. MOBILE NAV: FULL-SCREEN OVERLAY OPEN/CLOSE
// ============================================
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

// ============================================
// 13. SMOOTH SCROLL ON NAV CLICKS (Enhanced)
// ============================================
function initSmoothScroll() {
  const navLinks = gsap.utils.toArray(
    ".nav__link, .nav__overlay-link, .hero__contact-link, .btn[href^='#'], .pricing-card__cta"
  );

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
        duration: 1.2,
        ease: "power3.inOut",
      });

      // Close mobile nav if open
      const overlay = document.querySelector(".nav__overlay");
      if (overlay && !overlay.hidden) {
        const toggle = document.querySelector(".nav__toggle");
        toggle.setAttribute("aria-expanded", "false");
        overlay.hidden = true;
        document.body.style.overflow = "";
      }
    });
  });
}

// ============================================
// 14. FORM VALIDATION (Preserved from original)
// ============================================
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
    gsap.from(errorEl, { opacity: 0, y: -10, duration: 0.3, ease: "power2.out" });
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
      statusEl.style.color = "#f87171";
      gsap.from(statusEl, { opacity: 0, y: -10, duration: 0.3 });
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
        gsap.from(statusEl, { opacity: 0, y: -10, duration: 0.3 });
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      statusEl.hidden = false;
      statusEl.textContent = "Something went wrong. Please try again or email us directly.";
      statusEl.style.color = "#f87171";
      gsap.from(statusEl, { opacity: 0, y: -10, duration: 0.3 });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

// ============================================
// 15. PERFORMANCE OPTIMIZATIONS (gsap-performance)
// ============================================
function initPerformanceOptimizations() {
  // Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    gsap.globalTimeline.timeScale(0.8);
  }

  // Pause animations when tab is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.resume();
    }
  });

  // Optimize ScrollTrigger refresh
  let scrollTriggerRefreshTimeout;
  const originalRefresh = ScrollTrigger.refresh;
  ScrollTrigger.refresh = function (...args) {
    clearTimeout(scrollTriggerRefreshTimeout);
    scrollTriggerRefreshTimeout = setTimeout(() => {
      originalRefresh.apply(ScrollTrigger, args);
    }, 100);
  };
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Core animations
  initHeroEntrance();
  initHeroParallax();
  initSectionHeaderReveal();
  initStatsCountUp();
  initCardScrollReveal();

  // Navigation
  initMobileNav();
  initSmoothScroll();
  initNavScrollState();

  // Interactions
  initHoverInteractions();
  initCustomCursor();
  initScrollProgress();
  initMagneticButtons();
  initTextScramble();

  // Form
  initFormValidation();

  // Performance
  initPerformanceOptimizations();
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