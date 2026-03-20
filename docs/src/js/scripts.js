// ========================
// Typed text animation
// ========================
const phrases = ["Hello, world!"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = phrases[phraseIndex];
  const typedEl = document.querySelector(".typed-text");
  if (!typedEl) return;

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  type();

  // ========================
  // Menu mobile — fechar ao clicar em link
  // ========================
  const navLinks = document.querySelectorAll("#navbar-links .nav-link");
  const navbarCollapse = document.getElementById("navbar-links");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // ========================
  // Project card → modal
  // ========================
  const projectCards = document.querySelectorAll(".project-card");
  const modal = new bootstrap.Modal(document.getElementById("projectModal"));

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.dataset.title;
      const description = card.dataset.description;
      const repo = card.dataset.repo;
      const linkLabel = card.dataset.linkLabel || "Ver Repositório";
      const images = JSON.parse(card.dataset.images || "[]");
      const badges = JSON.parse(card.dataset.badges || "[]");

      document.getElementById("projectModalLabel").textContent = title;
      document.getElementById("projectModalDescription").textContent = description;

      const repoBtn = document.getElementById("projectModalRepo");
      repoBtn.href = repo;
      repoBtn.textContent = linkLabel;

      const badgesEl = document.getElementById("projectModalBadges");
      badgesEl.innerHTML = badges
        .map((b) => `<span class="badge ${b.class} me-1">${b.label}</span>`)
        .join("");

      const indicatorsEl = document.getElementById("projectInnerIndicators");
      const innerEl = document.getElementById("projectInnerCarouselInner");

      innerEl.innerHTML = images
        .map((src, i) =>
          `<div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${src}" alt="${title}" class="d-block mx-auto" loading="lazy" />
          </div>`
        ).join("");

      indicatorsEl.innerHTML = images
        .map((_, i) =>
          `<button type="button" data-bs-target="#projectInnerCarousel"
            data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"
            aria-label="Slide ${i + 1}"></button>`
        ).join("");

      const carouselEl = document.getElementById("projectInnerCarousel");
      const newCarousel = carouselEl.cloneNode(true);
      carouselEl.parentNode.replaceChild(newCarousel, carouselEl);

      newCarousel.addEventListener("slide.bs.carousel", (e) => {
        document.querySelectorAll("#projectInnerIndicators button").forEach((btn, i) => {
          btn.classList.toggle("active", i === e.to);
        });
      });

      const carouselControls = document.querySelectorAll(
        "#projectInnerCarousel .carousel-control-prev, #projectInnerCarousel .carousel-control-next"
      );
      carouselControls.forEach((btn) => {
        btn.style.display = images.length > 1 ? "" : "none";
      });

      indicatorsEl.style.display = images.length > 1 ? "" : "none";

      modal.show();
    });
  });

  // ========================
  // Filtro de projetos
  // ========================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const allCards = document.querySelectorAll(".project-card");
  const groupAcademic = document.getElementById("group-academic");
  const groupPersonal = document.getElementById("group-personal");
  const totalEl = document.querySelector(".projects-total");

  if (totalEl) totalEl.textContent = allCards.length;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      const entering = [...allCards].filter(
        (c) => filter === "all" || c.dataset.category === filter
      );
      const leaving = [...allCards].filter(
        (c) => !entering.includes(c) && !c.classList.contains("hidden")
      );

      if (totalEl) totalEl.textContent = entering.length;

      leaving.forEach((card) => {
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        setTimeout(() => {
          card.classList.add("hidden");
          card.style.opacity = "";
          card.style.transform = "";
          card.style.transition = "";
          groupAcademic.classList.toggle("hidden", filter === "personal");
          groupPersonal.classList.toggle("hidden", filter === "academic");
        }, 300);
      });

      const delay = leaving.length > 0 ? 320 : 0;
      entering.forEach((card, i) => {
        setTimeout(() => {
          if (card.closest("#group-academic")) groupAcademic.classList.remove("hidden");
          if (card.closest("#group-personal")) groupPersonal.classList.remove("hidden");

          card.classList.remove("hidden");
          card.style.transition = "none";
          card.style.opacity = "0";
          card.style.transform = "translateY(16px)";

          void card.offsetWidth;

          card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";

          setTimeout(() => {
            card.style.opacity = "";
            card.style.transform = "";
            card.style.transition = "";
          }, 420);
        }, delay + i * 70);
      });
    });
  });

  // ========================
  // Reveal on scroll
  // ========================
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ========================
  // Scroll indicator
  // ========================
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    });
  }


  // ========================
  // Lightbox
  // ========================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Delegar clique nas imagens do carousel
  document.getElementById("projectModal").addEventListener("click", (e) => {
    if (e.target.matches("#projectInnerCarouselInner img")) {
      openLightbox(e.target.src, e.target.alt);
    }
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  });

  lightboxClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
  // ========================
  // Barra de progresso de leitura
  // ========================
  const progressBar = document.getElementById("reading-progress");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + "%";
    });
  }
});