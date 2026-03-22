const header = document.getElementById("header");
const heroBg = document.getElementById("heroBg");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");

function revealElementTree(target) {
  if (!target) {
    return;
  }

  if (target.classList.contains("reveal")) {
    target.classList.add("visible");
  }

  target.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}

function revealFromHash(hash) {
  if (!hash || hash === "#") {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  revealElementTree(target);
}

window.toggleMobileNav = function toggleMobileNav() {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.querySelector(".mobile-nav");
  const overlay = document.querySelector(".mobile-overlay");

  if (!hamburger || !mobileNav || !overlay) {
    return;
  }

  const isOpen = mobileNav.classList.toggle("open");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  mobileNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
};

window.addEventListener(
  "scroll",
  () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 60);
    }

    if (!prefersReducedMotion && heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.32}px)`;
    }
  },
  { passive: true }
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -24px 0px",
    }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("href");

    if (!target || target === "#") {
      return;
    }

    window.requestAnimationFrame(() => {
      revealFromHash(target);
    });

    window.setTimeout(() => {
      revealFromHash(target);
    }, 120);
  });
});

window.addEventListener("hashchange", () => {
  revealFromHash(window.location.hash);
});

window.addEventListener("load", () => {
  revealFromHash(window.location.hash);
});

const reservationForm = document.getElementById("reservationForm");
const reservationStatus = document.getElementById("reservationStatus");

if (reservationForm && reservationStatus) {
  reservationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = reservationForm.querySelector('button[type="submit"]');
    const formData = new FormData(reservationForm);

    reservationStatus.textContent = "Envoi en cours...";
    reservationStatus.className = "form-status";

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(reservationForm.action, {
        method: reservationForm.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("La demande n'a pas pu etre envoyee.");
      }

      reservationForm.reset();
      reservationStatus.textContent = "Demande envoyee. Le restaurant reviendra vers toi rapidement.";
      reservationStatus.className = "form-status is-success";
    } catch (error) {
      reservationStatus.textContent = "Impossible d'envoyer la demande pour le moment. Merci d'appeler le restaurant.";
      reservationStatus.className = "form-status is-error";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
