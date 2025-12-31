const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const desktopDropdowns = document.querySelectorAll(".nav-item.dropdown");
const mobileDropdowns = document.querySelectorAll(
  ".mobile-nav-item.dropdown-mobile"
);

// --- Core Functions ---

/**
 * Closes all other open dropdowns in the specified list (desktop or mobile).
 * @param {NodeList} list - The list of dropdown items (e.g., desktopDropdowns or mobileDropdowns).
 * @param {HTMLElement} currentItem - The dropdown item that should remain open (or is currently being closed).
 */
function closeOtherDropdowns(list, currentItem) {
  list.forEach((item) => {
    if (item !== currentItem && item.classList.contains("open")) {
      item.classList.remove("open");
    }
  });
}

/**
 * Handles the click event for the dropdown toggle arrow.
 * @param {Event} e - The click event object.
 */
function handleDropdownToggle(e) {
  e.preventDefault();

  // Find the closest parent item that controls the dropdown state
  const toggleButton = e.currentTarget;
  const toggleId = toggleButton.dataset.toggleId;

  // Check if we are in mobile view (by checking if hamburger is displayed)
  const isMobile = window.getComputedStyle(hamburger).display !== "none";

  let dropdownList;
  let parentItem;

  if (isMobile) {
    // Find parent using the specific mobile data attribute
    parentItem = document.querySelector(
      `.mobile-nav-item[data-dropdown-id="${toggleId}"]`
    );
    dropdownList = mobileDropdowns;
  } else {
    // Find parent using the specific desktop data attribute
    parentItem = document.querySelector(
      `.nav-item[data-dropdown-id="${toggleId}"]`
    );
    dropdownList = desktopDropdowns;

    // On desktop, clicking the arrow toggles the state, overriding hover
  }

  if (parentItem) {
    closeOtherDropdowns(dropdownList, parentItem);
    parentItem.classList.toggle("open");
  }
}

// --- Event Listeners ---

// 1. Hamburger Menu Toggle (Mobile)
hamburger.addEventListener("click", () => {
  navbar.classList.toggle("nav-open");
  // Close all mobile dropdowns when the main menu closes
  if (!navbar.classList.contains("nav-open")) {
    mobileDropdowns.forEach((item) => item.classList.remove("open"));
  }
});

// 2. Dropdown Arrow Click Logic (Desktop & Mobile)
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", handleDropdownToggle);
});

// 3. Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-menu-overlay a").forEach((link) => {
  // Only close if the main menu is open and the link is not part of a dropdown toggle group
  link.addEventListener("click", () => {
    // Check if the link clicked is NOT a dropdown submenu link
    if (!link.closest(".mobile-dropdown-content")) {
      navbar.classList.remove("nav-open");
    }
    // Ensure all dropdowns are collapsed visually when any navigation happens
    mobileDropdowns.forEach((item) => item.classList.remove("open"));
  });
});

// 4. Desktop Hover Management (CSS handles hover state, JS ensures cleanup)
document.addEventListener("click", (e) => {
  // Check if the click target is outside the navigation element
  if (!navbar.contains(e.target)) {
    // Close any open JS-managed dropdowns (primarily for mobile state bleed or desktop arrow click)
    mobileDropdowns.forEach((item) => item.classList.remove("open"));
    desktopDropdowns.forEach((item) => item.classList.remove("open"));
  }
});
