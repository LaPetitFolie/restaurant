const header = document.getElementById("header");
const heroBg = document.getElementById("heroBg");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
const hamburger = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.querySelector(".mobile-overlay");
const mobileCloseTriggers = document.querySelectorAll("[data-mobile-close='true']");
let lastFocusedElement = null;

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

function setMobileNavState(isOpen) {
  if (!hamburger || !mobileNav || !overlay) {
    return;
  }

  mobileNav.classList.toggle("open", isOpen);
  hamburger.classList.toggle("active", isOpen);
  overlay.classList.toggle("open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  mobileNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

function getMobileFocusableElements() {
  if (!mobileNav) {
    return [];
  }

  return Array.from(
    mobileNav.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])")
  ).filter((element) => !element.hasAttribute("disabled"));
}

function openMobileNav() {
  if (!mobileNav || !hamburger) {
    return;
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  setMobileNavState(true);
  const [firstFocusable] = getMobileFocusableElements();
  firstFocusable?.focus();
}

function closeMobileNav() {
  if (!mobileNav || !hamburger) {
    return;
  }

  setMobileNavState(false);
  lastFocusedElement?.focus();
}

function toggleMobileNav() {
  if (!mobileNav) {
    return;
  }

  const isOpen = mobileNav.classList.contains("open");

  if (isOpen) {
    closeMobileNav();
    return;
  }

  openMobileNav();
}

window.toggleMobileNav = toggleMobileNav;

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

hamburger?.addEventListener("click", () => {
  toggleMobileNav();
});

overlay?.addEventListener("click", () => {
  closeMobileNav();
});

mobileCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    closeMobileNav();
  });
});

document.addEventListener("keydown", (event) => {
  if (!mobileNav?.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeMobileNav();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getMobileFocusableElements();

  if (focusableElements.length === 0) {
    return;
  }

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
  } else if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
});

window.addEventListener("hashchange", () => {
  revealFromHash(window.location.hash);
});

window.addEventListener("load", () => {
  revealFromHash(window.location.hash);
});

const reservationForm = document.getElementById("reservationForm");
const reservationStatus = document.getElementById("reservationStatus");
const menuTabs = Array.from(document.querySelectorAll("[data-menu-tab]"));
const menuPanels = Array.from(document.querySelectorAll("[data-menu-panel]"));

function activateMenuTab(targetKey) {
  if (!targetKey || menuTabs.length === 0 || menuPanels.length === 0) {
    return;
  }

  menuTabs.forEach((tab) => {
    const isActive = tab.dataset.menuTab === targetKey;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;
  });

  menuPanels.forEach((panel) => {
    const isActive = panel.dataset.menuPanel === targetKey;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    activateMenuTab(tab.dataset.menuTab);
  });

  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + menuTabs.length) % menuTabs.length;
    const nextTab = menuTabs[nextIndex];

    nextTab.focus();
    activateMenuTab(nextTab.dataset.menuTab);
  });
});

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
