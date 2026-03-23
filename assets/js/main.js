const header = document.getElementById("header");
const heroBg = document.getElementById("heroBg");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
const hamburger = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.querySelector(".mobile-overlay");
const mobileCloseTriggers = document.querySelectorAll("[data-mobile-close='true']");

/**
 * Stores the last focused element before the mobile navigation opens so focus
 * can be restored when the drawer closes.
 *
 * @type {HTMLElement | null}
 */
let lastFocusedElement = null;

/**
 * Immediately marks a target and its nested reveal items as visible.
 *
 * @param {Element | null | undefined} target
 */
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

/**
 * Reveals the section pointed to by the current hash and opens its mobile
 * accordion when relevant.
 *
 * @param {string | null | undefined} hash
 */
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

/**
 * Applies the visual and ARIA state of the mobile navigation drawer.
 *
 * @param {boolean} isOpen
 */
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

/**
 * Returns the focusable elements currently available inside the mobile drawer.
 *
 * @returns {HTMLElement[]}
 */
function getMobileFocusableElements() {
  if (!mobileNav) {
    return [];
  }

  return Array.from(
    mobileNav.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])")
  ).filter((element) => !element.hasAttribute("disabled"));
}

/**
 * Opens the mobile navigation and moves focus to its first actionable element.
 */
function openMobileNav() {
  if (!mobileNav || !hamburger) {
    return;
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  setMobileNavState(true);
  const [firstFocusable] = getMobileFocusableElements();
  firstFocusable?.focus();
}

/**
 * Closes the mobile navigation and restores focus to the previous element.
 */
function closeMobileNav() {
  if (!mobileNav || !hamburger) {
    return;
  }

  setMobileNavState(false);
  lastFocusedElement?.focus();
}

/**
 * Toggles the mobile navigation drawer.
 */
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

/**
 * Describes how each desktop section should be repackaged as a mobile
 * accordion without duplicating the source markup.
 *
 * @type {Array<{
 *   section: string,
 *   title: string,
 *   subtitle: string,
 *   panelSelectors: string[],
 *   kicker?: string,
 *   hasDesktopHeading?: boolean,
 *   dark?: boolean
 * }>}
 */
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
    panelSelectors: [".horaires-grid", ".contact-grid", ".map-card"],
    hasDesktopHeading: true,
  },
];
const mobileAccordions = [];
const mobileAccordionMedia = window.matchMedia("(max-width: 768px)");
const mediaPreloadCache = new Set();

/**
 * Builds the mobile accordion shells once and moves the existing section nodes
 * into those shells. Desktop markup remains the source of truth.
 */
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

    const accordion = document.createElement("article");
    accordion.className = "mobile-accordion";
    accordion.setAttribute("data-accordion", "");
    accordion.dataset.open = "false";

    const summary = document.createElement("button");
    summary.type = "button";
    summary.className = "mobile-accordion-summary";
    summary.setAttribute("aria-expanded", "false");

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
    panel.hidden = true;

    const panelInner = document.createElement("div");
    panelInner.className = "mobile-accordion-panel-inner";
    nodes.forEach((node) => panelInner.appendChild(node));
    panel.appendChild(panelInner);

    panel.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "height") {
        return;
      }

      if (!mobileAccordionMedia.matches) {
        panel.hidden = false;
        panel.style.height = "auto";
        panel.style.opacity = "1";
        return;
      }

      if (accordion.dataset.open === "true") {
        panel.hidden = false;
        panel.style.height = "auto";
        panel.style.opacity = "1";
        return;
      }

      panel.hidden = true;
    });

    accordion.append(summary, panel);
    accordion._button = summary;
    accordion._panel = panel;
    accordion._panelInner = panelInner;

    inner.appendChild(accordion);
    mobileAccordions.push(accordion);
  });
}

/**
 * Preloads the first images from an accordion just before it opens, which
 * reduces the perceived delay in long mobile sections.
 *
 * @param {Element & { _panelInner?: HTMLElement }} accordion
 */
function primeAccordionMedia(accordion) {
  const panelInner = accordion?._panelInner;

  if (!panelInner) {
    return;
  }

  Array.from(panelInner.querySelectorAll("img"))
    .slice(0, 2)
    .forEach((image, index) => {
      image.loading = "eager";
      image.fetchPriority = index === 0 ? "high" : "auto";

      const source = image.currentSrc || image.getAttribute("src");

      if (!source || mediaPreloadCache.has(source)) {
        return;
      }

      const preloader = new Image();
      preloader.src = source;
      mediaPreloadCache.add(source);
    });
}

/**
 * Synchronizes an accordion visual state, including ARIA, height animation and
 * lazy media priming when a panel is opened.
 *
 * @param {Element & {
 *   _panel?: HTMLElement,
 *   _panelInner?: HTMLElement,
 *   _button?: HTMLButtonElement,
 *   dataset: DOMStringMap
 * }} accordion
 * @param {boolean} isOpen
 * @param {boolean} [animate=true]
 */
function setAccordionState(accordion, isOpen, animate = true) {
  const panel = accordion._panel;
  const panelInner = accordion._panelInner;
  const button = accordion._button;

  if (!panel || !panelInner || !button) {
    return;
  }

  accordion.dataset.open = isOpen ? "true" : "false";
  button.setAttribute("aria-expanded", isOpen ? "true" : "false");

  if (!mobileAccordionMedia.matches) {
    panel.hidden = false;
    panel.style.height = "auto";
    panel.style.opacity = "1";
    return;
  }

  if (!animate) {
    panel.hidden = !isOpen;
    panel.style.height = isOpen ? "auto" : "0px";
    panel.style.opacity = isOpen ? "1" : "0";
    if (isOpen) {
      primeAccordionMedia(accordion);
    }
    return;
  }

  if (isOpen) {
    primeAccordionMedia(accordion);
    panel.hidden = false;
    panel.style.height = "0px";
    panel.style.opacity = "0";

    window.requestAnimationFrame(() => {
      panel.style.height = `${panelInner.scrollHeight}px`;
      panel.style.opacity = "1";
    });

    return;
  }

  const currentHeight = panelInner.scrollHeight;

  panel.hidden = false;
  panel.style.height = `${currentHeight}px`;
  panel.style.opacity = "1";

  window.requestAnimationFrame(() => {
    panel.style.height = "0px";
    panel.style.opacity = "0";
  });
}

/**
 * Reconciles every accordion with the current viewport. On mobile the first
 * card opens by default, while desktop keeps all content visible.
 */
function syncMobileAccordions() {
  if (mobileAccordions.length === 0) {
    return;
  }

  if (mobileAccordionMedia.matches) {
    mobileAccordions.forEach((accordion, index) => {
      const shouldOpen = accordion.dataset.userTouched ? accordion.dataset.open === "true" : index === 0;
      setAccordionState(accordion, shouldOpen, false);
    });
    return;
  }

  mobileAccordions.forEach((accordion) => {
    setAccordionState(accordion, true, false);
  });
}

/**
 * Opens the accordion that contains the requested target when the user lands
 * on an anchored section from mobile navigation or deep links.
 *
 * @param {Element | null | undefined} target
 */
function openAccordionForTarget(target) {
  if (!target || !mobileAccordionMedia.matches) {
    return;
  }

  const accordion =
    target.querySelector?.(".mobile-accordion") ||
    target.closest?.(".mobile-accordion") ||
    target.closest?.("section")?.querySelector(".mobile-accordion");

  if (!accordion) {
    return;
  }

  mobileAccordions.forEach((item) => {
    setAccordionState(item, item === accordion, false);
  });
}

/**
 * Updates an animating accordion height after internal media or embeds change
 * the panel content size.
 *
 * @param {Element} node
 */
function refreshAccordionHeightForNode(node) {
  const panel = node.closest?.(".mobile-accordion-panel");
  const inner = panel?.querySelector(".mobile-accordion-panel-inner");

  if (!panel || !inner || panel.hidden || panel.style.height === "auto") {
    return;
  }

  panel.style.height = `${inner.scrollHeight}px`;
}

/**
 * Adds progressive loading states to deferred media and to the map iframe so
 * mobile accordions do not jump when content finishes loading.
 */
function enhanceDeferredMedia() {
  const mediaSelector = ".kitchen-visual img, .experience-photo img, .galerie-item img, .contact-doc-card img";

  document.querySelectorAll(mediaSelector).forEach((image) => {
    const shell = image.closest(".kitchen-visual, .experience-photo, .galerie-item, .contact-doc-card");

    if (!shell) {
      return;
    }

    const markLoaded = () => {
      shell.classList.remove("media-pending");
      shell.classList.add("media-loaded");
      shell.setAttribute("aria-busy", "false");
      refreshAccordionHeightForNode(shell);
    };

    if (image.complete) {
      markLoaded();
      return;
    }

    shell.classList.add("media-pending");
    shell.setAttribute("aria-busy", "true");
    image.addEventListener("load", markLoaded, { once: true });
  });

  document.querySelectorAll(".map-frame").forEach((frame) => {
    const iframe = frame.querySelector("iframe");
    const button = frame.querySelector(".map-activate");

    if (!iframe) {
      return;
    }

    const loadMap = () => {
      const source = iframe.dataset.mapSrc;

      if (!source || frame.dataset.mapLoaded === "true") {
        return;
      }

      frame.dataset.mapLoaded = "true";
      frame.classList.add("media-pending");
      frame.setAttribute("aria-busy", "true");
      iframe.setAttribute("src", source);
      button?.setAttribute("hidden", "true");
      refreshAccordionHeightForNode(frame);
    };

    iframe.addEventListener("load", () => {
      frame.classList.remove("media-pending");
      frame.classList.add("media-loaded");
      frame.setAttribute("aria-busy", "false");
      refreshAccordionHeightForNode(frame);
    });

    if (mobileAccordionMedia.matches) {
      button?.addEventListener("click", loadMap, { once: true });
      return;
    }

    loadMap();
  });
}

buildMobileAccordions();
syncMobileAccordions();
enhanceDeferredMedia();

// Accordion click handling is registered after creation because the buttons do
// not exist in the original desktop DOM.
mobileAccordions.forEach((accordion) => {
  accordion._button?.addEventListener("click", () => {
    const shouldOpen = accordion.dataset.open !== "true";

    accordion.dataset.userTouched = "true";

    mobileAccordions.forEach((item) => {
      item.dataset.userTouched = "true";
      setAccordionState(item, shouldOpen && item === accordion);
    });
  });
});

// When the viewport crosses the mobile threshold, keep accordions and deferred
// map loading aligned with the new layout mode.
mobileAccordionMedia.addEventListener("change", () => {
  syncMobileAccordions();

  if (!mobileAccordionMedia.matches) {
    document.querySelectorAll(".map-frame").forEach((frame) => {
      if (frame.dataset.mapLoaded === "true") {
        return;
      }

      const iframe = frame.querySelector("iframe");
      const source = iframe?.dataset.mapSrc;

      if (!iframe || !source) {
        return;
      }

      frame.dataset.mapLoaded = "true";
      iframe.setAttribute("src", source);
      frame.classList.add("media-pending");
      frame.setAttribute("aria-busy", "true");
    });
  }
});

/**
 * Activates the selected menu tab and hides the inactive panel.
 *
 * @param {string | undefined} targetKey
 */
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

// Tabs support both pointer interaction and arrow-key navigation so the menu
// remains fast to scan on touch devices and keyboard-friendly on desktop.
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
  // The reservation form keeps the feedback loop inline to avoid leaving the
  // page or opening a new tab for a simple availability request.
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
