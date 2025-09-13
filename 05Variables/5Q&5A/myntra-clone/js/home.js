// ✅ Dropdown Logic
const menuItems = document.querySelectorAll('.dropdown-content');
const dropdowns = document.querySelectorAll('.dropdown-menu');

menuItems.forEach((item, index) => {
  const dropdown = dropdowns[index];

  item.addEventListener('mouseenter', () => {
    // Close other dropdowns
    dropdowns.forEach(d => d.classList.remove('active'));
    dropdown.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!dropdown.matches(':hover') && !item.matches(':hover')) {
        dropdown.classList.remove('active');
      }
    }, 100);
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.classList.remove('active');
  });
});

// ✅ Slideshow Logic
let slideIndex = 0;
let timerID;

showSlides();

function plusSlides(n) {
  clearTimeout(timerID); // stop previous timer
  slideIndex += n - 1; // adjust since showSlides increments
  showSlides();
}

function currentSlide(n) {
  clearTimeout(timerID);
  slideIndex = n - 1;
  showSlides();
}

function showSlides() {
  const slides = document.getElementsByClassName("mySlides");

  // Hide all
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  // Restart timer
  timerID = setTimeout(showSlides, 3000);
}


