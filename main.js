(() => {
      const header = document.querySelector(".site-header");
      const menuToggle = document.querySelector(".menu-toggle");
      const mobileNav = document.getElementById("mobileNav");

      const closeMenu = () => {
        if (!menuToggle || !mobileNav) return;
        mobileNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
        document.body.classList.remove("menu-open");
      };

      if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
          const isOpen = mobileNav.classList.toggle("is-open");
          menuToggle.setAttribute("aria-expanded", String(isOpen));
          menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
          document.body.classList.toggle("menu-open", isOpen);
        });

        mobileNav.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
          if (window.innerWidth > 920) closeMenu();
        });

        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") closeMenu();
        });
      }

      const onScroll = () => {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // Testimonial slider
      const track = document.getElementById("testimonialTrack");
      const slides = track ? Array.from(track.children) : [];
      const dots = Array.from(document.querySelectorAll(".dot"));
      const prevBtn = document.querySelector("[data-prev]");
      const nextBtn = document.querySelector("[data-next]");
      let currentIndex = 0;

      const goToSlide = (index) => {
        if (!track || slides.length === 0) return;
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === currentIndex);
          dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
        });
      };

      prevBtn?.addEventListener("click", () => goToSlide(currentIndex - 1));
      nextBtn?.addEventListener("click", () => goToSlide(currentIndex + 1));
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
      });

      // Reveal on scroll
      const revealElements = document.querySelectorAll(".reveal");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
      } else {
        const revealObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px",
          }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
      }

      // Active navigation
      const navLinks = Array.from(document.querySelectorAll(".nav-link"));
      const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

      if ("IntersectionObserver" in window && sections.length > 0) {
        const navObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const id = `#${entry.target.id}`;
              navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === id);
              });
            });
          },
          {
            rootMargin: "-45% 0px -50% 0px",
            threshold: 0,
          }
        );

        sections.forEach((section) => navObserver.observe(section));
      }
    })();