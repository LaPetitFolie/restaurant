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

  openAccordionForTarget(target);
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
const mobileAccordionSections = [
  {
    section: "#restaurant",
    title: "Le restaurant",
    subtitle: "Une terrasse vive, une salle simple et un lieu qui raconte le geste sans detour.",
    panelSelectors: [".resto-grid"],
    hasDesktopHeading: true,
  },
  {
    section: ".experience-section",
    title: "Une table ouverte sur l'horizon.",
    subtitle: "Une cuisine sincere, une vue imprenable et une atmosphere iodee qui s'adapte au rythme de chacun.",
    kicker: "L'ambiance",
    panelSelectors: [".experience-layout"],
    dark: true,
  },
  {
    section: "#carte",
    title: "La carte",
    subtitle: "Formules, menu du midi et selections de saison dans une lecture plus legere sur smartphone.",
    panelSelectors: [".menu-highlight", ".menu-tabs-shell", ".signature-section", ".carte-note"],
    hasDesktopHeading: true,
    dark: true,
  },
  {
    section: ".kitchen-section",
    title: "La cuisine en mouvement",
    subtitle: "Des plans de travail, de la matiere et de la preparation dans une section repliable sur mobile.",
    kicker: "Le geste",
    panelSelectors: [".kitchen-grid"],
    hasDesktopHeading: true,
  },
  {
    section: "#galerie",
    title: "Galerie",
    subtitle: "Les photos du lieu et du service restent disponibles, sans allonger inutilement la page mobile.",
    panelSelectors: [".galerie-grid"],
    hasDesktopHeading: true,
  },
  {
    section: "#reservation",
    title: "Reservation",
    subtitle: "Une demande simple, claire et rapide, repliable sur smartphone pour garder une page plus courte.",
    panelSelectors: [".reservation-layout"],
    hasDesktopHeading: true,
  },
  {
    section: "#contact",
    title: "Informations pratiques",
    subtitle: "Adresse, telephone, horaires et acces rapide sans obliger a tout faire defiler sur mobile.",
    panelSelectors: [".horaires-grid", ".contact-grid"],
    hasDesktopHeading: true,
  },
];
const mobileAccordions = [];
const mobileAccordionMedia = window.matchMedia("(max-width: 768px)");

function buildMobileAccordions() {
  mobileAccordionSections.forEach((config) => {
    const section = document.querySelector(config.section);
    const inner = section?.querySelector(".section-inner");

    if (!section || !inner || inner.querySelector(".mobile-accordion")) {
      return;
    }

    const nodes = config.panelSelectors.flatMap((selector) => Array.from(inner.querySelectorAll(`:scope > ${selector}`)));

    if (nodes.length === 0) {
      return;
    }

    if (config.hasDesktopHeading && inner.firstElementChild) {
      inner.firstElementChild.classList.add("desktop-section-head");
    }

    const details = document.createElement("details");
    details.className = "mobile-accordion";
    details.setAttribute("data-accordion", "");

    const summary = document.createElement("summary");
    summary.className = "mobile-accordion-summary";

    if (config.kicker) {
      const kicker = document.createElement("span");
      kicker.className = "mobile-accordion-kicker";
      kicker.textContent = config.kicker;
      summary.appendChild(kicker);
    }

    const title = document.createElement("span");
    title.className = "mobile-accordion-title";
    title.textContent = config.title;
    summary.appendChild(title);

    const subtitle = document.createElement("span");
    subtitle.className = "mobile-accordion-subtitle";
    subtitle.textContent = config.subtitle;
    summary.appendChild(subtitle);

    const panel = document.createElement("div");
    panel.className = "mobile-accordion-panel";

    nodes.forEach((node) => panel.appendChild(node));
    details.append(summary, panel);
    inner.appendChild(details);
    mobileAccordions.push(details);
  });
}

function syncMobileAccordions() {
  if (mobileAccordions.length === 0) {
    return;
  }

  if (mobileAccordionMedia.matches) {
    mobileAccordions.forEach((accordion, index) => {
      if (!accordion.dataset.userTouched) {
        accordion.open = index === 0;
      }
    });
    return;
  }

  mobileAccordions.forEach((accordion) => {
    accordion.open = true;
  });
}

function openAccordionForTarget(target) {
  if (!target || !mobileAccordionMedia.matches) {
    return;
  }

  const accordion = target.querySelector?.(".mobile-accordion") || target.closest?.(".mobile-accordion");

  if (!accordion) {
    return;
  }

  mobileAccordions.forEach((item) => {
    item.open = item === accordion;
  });
}

buildMobileAccordions();
syncMobileAccordions();

mobileAccordions.forEach((accordion) => {
  accordion.addEventListener("toggle", () => {
    if (!mobileAccordionMedia.matches) {
      return;
    }

    accordion.dataset.userTouched = "true";

    if (!accordion.open) {
      return;
    }

    mobileAccordions.forEach((item) => {
      if (item !== accordion) {
        item.open = false;
      }
    });
  });
});

mobileAccordionMedia.addEventListener("change", () => {
  syncMobileAccordions();
});

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
