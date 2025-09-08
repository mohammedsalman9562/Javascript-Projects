// 2a At a restaurant, you order 1 soup for $10, 3 burgers for $8 each, and 1 ice cream for $5.
//    Use JavaScript to calculate the cost of the order.

const soup = 10;
const ThreeBurger = 8 * 3;
const iceCream = 5;
const total = soup + ThreeBurger + iceCream;

console.log(`Total cost is $${total}`);

// 2b You're at a restaurant with 2 friends (3 people in total) and make the same order as 2a.
//    Calculate how much each person pays.

console.log(`Total cost for each person $${total / 3}`);

// 2c Calculate the total cost of a toaster ($18.50) and 2 shirts ($7.50 each).

const toaster = 18.5;
const Twoshirt = 7.5 * 2;
const totals = toaster + Twoshirt;

console.log(`Total cost of a toaster and Two shirts is $${totals}`);

// 2d Calculate a 10% tax for the total in exercise 2c.

const Tax = totals * (10 / 100);
const Finalcost = totals + Tax;

console.log(`Final cost after 10% tax $${Finalcost}`);

// 2e Calculate a 20% tax for the total in 2c (remember that 1% = 1 / 100, so 20% = 20 / 100 = 0.2).
//    Solutions + more exercises in description.

const tax = totals * (20 / 100);
const finalcost = totals + tax;

console.log(`Final cost after 20% tax $${finalcost}`);

/* Setup: in the Amazon project, go to the home page and add a toaster ($18.99) to your cart so you have 1 basketball,
   1 t-shirt, and 1 toaster. Choose $4.99 shipping for the toaster. */

// 2f Calculate the cost of the products (before shipping and taxes).
//    Hint: calculate in cents to avoid inaccuracies.
/*
Order Summary

Items (3):             $47.93
Shipping & handling:    $4.99
Total before tax:      $52.92
Estimated tax (10%):    $5.29

Order total:           $58.21
*/

const order = document.querySelector(".order-summary");

order.innerHTML = `
<div class="left">
        <h2>Your Items</h2>
        <div class="item">
          <h4>Basketball <span>$20.94</span></h4>
        </div>
        <div class="item">
          <h4>Socks <span>$10.90</span></h4>
        </div>
        <div class="item">
          <h4>T-shirt <span>$15.23</span></h4>
        </div>
      </div>

      <div class="right">
        <h1>Order Summary</h1>
        <div class="list">
          <p id="items-count">Items (0):
            <span
              ><strong>$<span id="item-total">0.00</span></strong></span
            >
          </p>
          <p>
            Shipping &amp; handling:
            <span
              ><strong>$<span id="shipping">4.99</span></strong></span
            >
          </p>
          <hr class="total" />
          <p>
            Total before tax:
            <span
              ><strong>$<span id="before-tax">0.00</span></strong></span
            >
          </p>
          <p>
            Estimated tax (10%):
            <span
              ><strong>$<span id="tax">0.00</span></strong></span
            >
          </p>
        </div>
        <hr />
        <h2>
          Order total: $<span class="order-total" id="order-total">0.00</span>
        </h2>
      </div>
`;

const items = document.querySelectorAll(".item");
const countItem = document.getElementById("items-count");
const itemTotal = document.getElementById("item-total");

items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
    UpdateItemcount();
  });
});

UpdateItemcount();

function UpdateItemcount() {
  const selectedItems = document.querySelectorAll(".item.selected");
  const count = selectedItems.length;
  countItem.firstChild.textContent = `Item (${count}):`;
  SumTotalItem(selectedItems, count);
}

function SumTotalItem(selectedItems, count) {
  let sum = 0;
  selectedItems.forEach((item) => {
    let priceText = item.querySelector("span").textContent;
    let price = parseFloat(priceText.replace("$", ""));
    sum = sum + price;
  });
  let sumOfItem = (itemTotal.textContent = sum.toFixed(2));
  console.log(`Total cost of Items is: $${sumOfItem}`);
  SumBeforeTax(sumOfItem, count);
}

// 2g Calculate the Total before tax.
/*
Order Summary

Items (3):             $47.93
Shipping & handling:    $4.99
Total before tax:      $52.92
Estimated tax (10%):    $5.29

Order total:           $58.21
*/

function SumBeforeTax(sumOfItem, count) {
  let Beforetax = document.getElementById("before-tax");
  let Sum = 0; // always define it

  if (count === 0) {
    Beforetax.textContent = `0.00`;
  } else {
    let itemSum = parseFloat(sumOfItem);
    let shipping = parseFloat(document.getElementById("shipping").textContent);
    let beforeTax = itemSum + shipping;

    Sum = beforeTax.toFixed(2);
    Beforetax.textContent = Sum;
    console.log(`Total cost of Items before tax is: $${Sum}`);
  }

  TotalTax(Sum, count);
}

// 2h Calculate the 10% tax exactly. Hint: use Math.round()
/*
Order Summary

Items (3):             $47.93
Shipping & handling:   $4.99
Total before tax:      $52.92
Estimated tax (10%):   $5.29

Order total:           $58.21
*/

function TotalTax(Sum, count) {
  const taxElement = document.getElementById("tax");
  let totaltax = 0;

  if (count === 0) {
    taxElement.textContent = `0.00`;
  } else {
    totaltax = Math.round(parseFloat(Sum) * 0.1).toFixed(2);
    taxElement.textContent = totaltax;
    console.log(`Estimated Tax (10%): $${totaltax}`);
  }

  OrderTotal(totaltax, count, Sum);
}

// 2i Calculate Order total at the bottom.
/*
Order Summary

Items (3):             $47.93
Shipping & handling:   $4.99
Total before tax:      $52.92
Estimated tax (10%):   $5.29

Order total:           $58.21
*/

function OrderTotal(totaltax, count, Sum) {
  const ordertext = document.getElementById("order-total");

  if (count === 0) {
    ordertext.textContent = `0.00`; // fixed here
  } else {
    let totalorder = (parseFloat(totaltax) + parseFloat(Sum)).toFixed(2);
    ordertext.textContent = totalorder;
    console.log(`Order Total: $${totalorder}`);
  }
}

// Finish: after finishing 2i remove the toaster from your cart.

// 2j Let's say we want to always round a number down (2.8 => 2) Using Google or an A.I. tool,
//   search for the code to do this.

const Number = 2.8;
console.log(`The number 2.8 is round off into : ${Math.floor(Number)}`);

//few examplels in 2h we rename TotalTax function in to floor function

function floor(Sum, count) {
  const taxElement = document.getElementById("tax");
  let totaltax = 0;

  if (count === 0) {
    taxElement.textContent = `0.00`;
  } else {
    totaltax = Math.floor(parseFloat(Sum) * 0.1).toFixed(2);
    taxElement.textContent = totaltax;
    console.log(`Estimated Tax (10%): $${totaltax}`);
  }

  OrderTotal(totaltax, count, Sum);
}

// 2k Let's always round a number up (2.2 => 3). Search how to do this.
/*
Challenge Exercises

We'll use JavaScript to convert temperatures from Celsius (°C) to Fahrenheit (°F). The formula is:
• Fahrenheit = (Celsius * 9/5) + 32
• Celsius = (Fahrenheit - 32) * 5/9
*/

const number = 2.2;
console.log(`The number 2.2 is round off into : ${Math.ceil(number)}`);

const converter = document.querySelector(".temperature-converter");

converter.innerHTML = `
      <h2>Temperature Converter</h2>
    <div class="temperature">
      <div class="temp">
        <h4>Celsius</h4>
        <input type="number" id="celsius" class="tempInput" placeholder="Celsius">
      </div>
      <div class="temp">
        <h4>Fahrenheit</h4>
        <input type="number" id="fahrenheit" class="tempInput" placeholder="Fahrenheit">
      </div>
      <div class="temp">
        <h4>Kelvin</h4>
        <input type="number" id="kelvin" class="tempInput" placeholder="Kelvin">
      </div>
    </div>
  </div>
      `;

// 2l The temperature is 25°C. Calculate the temperature in Fahrenheit. (77)

const fahrenheit = document.getElementById("fahrenheit");

function round(num) {
  return Math.round(num * 100) / 100; // 2 decimals
}

fahrenheit.addEventListener("input", () => {
  let f = parseFloat(fahrenheit.value);
  if (isNaN(f)) {
    celsius.value = kelvin.value = "";
    return;
  }
  console.log(
    `The temprature is ${(celsius.value = round(((f - 32) * 5) / 9))}`
  );
  console.log(
    `The kelvin is ${(kelvin.value = round(((f - 32) * 5) / 9 + 273.15))}`
  );
});

// 2m The temperature is 86°F. Calculate the temperature in Celsius. (30)

const celsius = document.getElementById("celsius");

celsius.addEventListener("input", () => {
  let c = parseFloat(celsius.value);
  if (isNaN(c)) {
    fahrenheit.value = kelvin.value = "";
    return;
  }
  fahrenheit.value = round((c * 9) / 5 + 32);
  kelvin.value = round(c + 273.15);
});

// 2n The temperature is -5°C. Calculate the temperature in Fahrenheit. (23)

const kelvin = document.getElementById("kelvin");

kelvin.addEventListener("input", () => {
  let k = parseFloat(kelvin.value);
  if (isNaN(k)) {
    celsius.value = fahrenheit.value = "";
    return;
  }
  celsius.value = round(k - 273.15);
  fahrenheit.value = round(((k - 273.15) * 9) / 5 + 32);
});
