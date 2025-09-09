
// Dropdown Class
class Dropdown {
  constructor(dropdownElement) {
    this.dropdown = dropdownElement;
    this.button = this.dropdown.querySelector('.dropdown-button');
    this.content = this.dropdown.querySelector('.dropdown-content');

    this.init();
  }

  init() {
    // Toggle dropdown on button click
    this.button.addEventListener('click', () => {
      const isOpen = this.content.style.display === 'block';
      this.closeAll();
      this.content.style.display = isOpen ? 'none' : 'block';
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.content.style.display = 'none';
      }
    });

    // Attach add item handlers
    this.content.querySelectorAll('.item button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.addItem(btn);
      });
    });
  }

  closeAll() {
    document.querySelectorAll('.dropdown-content').forEach(dc => {
      dc.style.display = 'none';
    });
  }

  addItem(btn) {
    const itemDiv = btn.closest('.item');
    const name = itemDiv.querySelector('.details div:first-child').textContent;
    const priceText = itemDiv.querySelector('.amount').textContent;
    const unitPrice = parseFloat(priceText.replace('$', ''));

    const menuList = document.getElementById('menuList');

    // Check if this product is already in the list
    let existingItem = Array.from(menuList.querySelectorAll('.item'))
      .find(el => el.querySelector('h4').textContent === name);

    if (existingItem) {
      // Already exists → increase count & update price
      const countSpan = existingItem.querySelector(".count");
      let count = parseInt(countSpan.textContent);
      count++;
      countSpan.textContent = count;

      // Update price = unitPrice × count
      const priceSpan = existingItem.querySelector(".price");
      priceSpan.textContent = `$${(unitPrice * count).toFixed(2)}`;
    } else {
      // New item
      const menuItem = document.createElement('div');
      menuItem.className = 'item';
      menuItem.dataset.unitPrice = unitPrice; // store original price
      menuItem.innerHTML = `
        <h4>${name}</h4>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="price">$${unitPrice.toFixed(2)}</span>
          <div class="quantity-controls" style="display: flex; align-items: center; gap: 5px;">
            <button class="btns" onclick="decreaseCount(this)">-</button>
            <span class="count"  style="margin-right: -8px;">1</span>
            <button class="btns" onclick="increaseCount(this)">+</button>
          </div>
        </div>
      `;
      menuList.appendChild(menuItem);
    }

    this.content.style.display = 'none';
    UpdateItemcount();
  }
}

// Initialize all dropdowns on page
document.querySelectorAll('.dropdown').forEach(drop => new Dropdown(drop));

// Increase item count
function increaseCount(button) {
  const item = button.closest(".item");
  const countSpan = item.querySelector(".count");
  let count = parseInt(countSpan.textContent);
  count++;
  countSpan.textContent = count;

  const unitPrice = parseFloat(item.dataset.unitPrice);
  item.querySelector(".price").textContent = `$${(unitPrice * count).toFixed(2)}`;

  UpdateItemcount();
}

// Decrease item count
function decreaseCount(button) {
  const item = button.closest(".item");
  const countSpan = item.querySelector(".count");
  let count = parseInt(countSpan.textContent);
  if (count > 1) {
    count--;
    countSpan.textContent = count;

    const unitPrice = parseFloat(item.dataset.unitPrice);
    item.querySelector(".price").textContent = `$${(unitPrice * count).toFixed(2)}`;
  } else {
    item.remove();
  }
  UpdateItemcount();
}

// Remove item
function removeItem(button) {
  button.closest(".item").remove();
  UpdateItemcount();
}

// Update item count & totals
function UpdateItemcount() {
  const countItem = document.getElementById("items-count");
  const selectedItems = document.querySelectorAll("#menuList .item");

  let totalQuantity = 0;
  selectedItems.forEach((item) => {
    const count = parseInt(item.querySelector(".count").textContent) || 1;
    totalQuantity += count;
  });

  countItem.firstChild.textContent = `Items (${totalQuantity}):`;
  SumTotalItem(selectedItems, totalQuantity);
}

function SumTotalItem(selectedItems, totalQuantity) {
  let sum = 0;
  selectedItems.forEach((item) => {
    let unitPrice = parseFloat(item.dataset.unitPrice) || 0;
    let count = parseInt(item.querySelector(".count").textContent) || 1;

    sum += unitPrice * count;
  });

  let sumOfItem = (document.getElementById("item-total").textContent =
    sum.toFixed(2));

  SumBeforeTax(sumOfItem, totalQuantity);
}

function SumBeforeTax(sumOfItem, totalQuantity) {
  let Beforetax = document.getElementById("before-tax");
  let Sum = 0;

  if (totalQuantity === 0) {
    Beforetax.textContent = `0.00`;
  } else {
    let itemSum = parseFloat(sumOfItem);
    let shipping = parseFloat(document.getElementById("shipping").textContent);
    let beforeTax = itemSum + shipping;
    Sum = beforeTax.toFixed(2);
    Beforetax.textContent = Sum;
  }
  TotalTax(Sum, totalQuantity);
}

function TotalTax(Sum, totalQuantity) {
  const taxElement = document.getElementById("tax");
  let totaltax = 0;
  if (totalQuantity === 0) {
    taxElement.textContent = `0.00`;
  } else {
    totaltax = (parseFloat(Sum) * 0.1).toFixed(2);
    taxElement.textContent = totaltax;
  }
  OrderTotal(totaltax, totalQuantity, Sum);
}

function OrderTotal(totaltax, totalQuantity, Sum) {
  const ordertext = document.getElementById("order-total");
  if (totalQuantity === 0) {
    ordertext.textContent = `0.00`;
  } else {
    let totalorder = (parseFloat(totaltax) + parseFloat(Sum)).toFixed(2);
    ordertext.textContent = totalorder;
  }
}

function buyProduct() {
  const orderTotal = parseFloat(document.getElementById("order-total").textContent);

  if (orderTotal > 0) {
    const message = document.getElementById("purchase-message");
    message.textContent = "✅ Purchase is successfully completed!";
    message.style.display = "block";

    // Clear cart after purchase
    document.getElementById("menuList").innerHTML = "";
    UpdateItemcount();
  } else {
    alert("Your cart is empty! Please add items before buying.");
  }
}
