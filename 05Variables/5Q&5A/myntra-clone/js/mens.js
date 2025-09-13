const menuItems = document.querySelectorAll('.dropdown-content');
const dropdowns = document.querySelectorAll('.dropdown-menu');

menuItems.forEach((item, index) => {
  const dropdown = dropdowns[index];

  item.addEventListener('mouseenter', () => {
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

let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000); // Change image every 3 seconds

}
