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

function checkcredentials() {

  let form = document.getElementById("login");
  let mobileno = form.mobileno.value;
  let password = form.password.value;


  let arr;
  arr = JSON.parse(localStorage.getItem("details"));

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].mobileno === mobileno && arr[i].password === password) {
      window.location.href = "bag.html"
      return;
    }
  }
  let div = document.createElement("div");
  div.innerHTML = "Invalid Mobile Number or Password"
  let alert = document.getElementById("alert");
  alert.innerHTML = null;
  alert.append(div);



}

function signinpage() {
  window.location.href = "signin.html";
}