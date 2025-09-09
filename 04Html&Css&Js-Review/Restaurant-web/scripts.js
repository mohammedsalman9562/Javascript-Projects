document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".app__navbar-smallscreen > svg");
  const overlay = document.querySelector(".app__navbar-smallscreen_overlay");
  const closeBtn = document.querySelector(".overlay__close");

  // Toggle overlay when clicking hamburger
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // stop bubbling
    overlay.classList.toggle("active");
  });

  // Close overlay when clicking close button
  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  // Close overlay when clicking a link
  document
    .querySelectorAll(".app__navbar-smallscreen_links a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        overlay.classList.remove("active");
      });
    });

  // Optional: click outside overlay closes it
  document.addEventListener("click", (e) => {
    if (overlay.classList.contains("active") && !overlay.contains(e.target) && !hamburger.contains(e.target)) {
      overlay.classList.remove("active");
    }
  });
});





