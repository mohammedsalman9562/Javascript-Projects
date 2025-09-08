// 3a. Create the text 'My name is: ' as a string.

const Name = "Mohammed salman";
const age = 21;

// 3b. Create your name as a string (for example: 'Salman').

console.log(`Myname is: ${Name}\nMy age is: ${age}`);

// 3c. Using concatenation, add the 2 strings from 3a and 3b together to create the
//     text: 'My name is: ______' (replace with your name).

console.log(`Myname is: ${Name}\nMy age is: ${age}`);

// 3d. At a restaurant, you order 1 coffee ($5) and 1 bagel ($3).
//     Using math, calculate the total cost, and using concatenation,
//     create the text: 'Total cost: $_____' (replace with the total you calculated).

// 3e. Do the same thing as 3d, but use a template string and interpolation.

// 3f. Display the text from 3e in a popup using alert(...);

// 3g. You order 1 coffee ($5.99) and 1 bagel ($2.95). Using math, calculate the total cost,
//     and using concatenation, create the text: 'Total cost: $_____' (hint: calculate in cents to avoid inaccuracies)

// 3h. Do the same thing as 3g, but use a template string and interpolation.

// 3i. Display the text from 3h in a popup.

// 3j. Using a multi-line string, create the text from 3h and add a line of
// text underneath: 'Thank you, come again!'. Display both lines in a popup.

/* Total cost: $8.94
   Thank you, come again! */

// Setup: in the Amazon project, update the cart to 2 basketballs ($20.95 each) with $4.99 shipping,
// and 2 t-shirts ($7.99 each) with $4.99 shipping. of text (use math to calculate the numbers 4 and 57.88).

// Challenge Exercises
// Items (4):               $57.88
// Shipping & handling:      $9.98
// Total before tax:        $67.86
// Estimated tax (10%):      $6.79
// Order total:             $74.65

// 3k. Using interpolation, create the first line

// 3l. Create second line of text: 'Shipping & handling: $9.98' (use math).

// 3m. Create third line: 'Total before tax: $67.86' (use math).

// 3n. Create fourth line of text: 'Estimated tax (10%): $6.79' (use math and Math.round(...);
// to calculate the exact number).

// Finish: change the cart back to 1 basketball, 1 t-shirt (both free shipping).

document.querySelector(".page-container").innerHTML = `
      <div class="order-summary">
        <div class="left">
          <h2>Zam Zam Restaurant</h2>
          <div class="text-content">
            <input
              class="input"
              type="text"
              id="nameInput"
              placeholder="Coffee 5.99 or Coffee $5.99"
            />
            <button class="btn" onclick="addItem()">Add</button>
          </div>
          <div id="menuList"></div>
        </div>
        <div class="right">
          <h1>Food Delivery</h1>
          <div class="list">
            <p id="items-count">Items (0):
              <span><strong>$<span id="item-total">0.00</span></strong></span>
            </p>
            <p>
              Delivery &amp; handling:
              <span><strong>$<span id="shipping">3.99</span></strong></span>
            </p>
            <hr class="total" />
            <p>
              Total before tax:
              <span><strong>$<span id="before-tax">0.00</span></strong></span>
            </p>
            <p>
              Estimated tax (10%):
              <span><strong>$<span id="tax">0.00</span></strong></span>
            </p>
          </div>
          <hr />
          <h2>
            Total Cost: $<span class="order-total" id="order-total">0.00</span>
          </h2>
        </div>
      </div>
    `;

function addItem() {
  const input = document.getElementById("nameInput");
  const value = input.value.trim();
  if (!value) return;

  const parts = value.split(" ");
  const price = parts.pop().replace("$", "");
  const name = parts.join(" ");

  const item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
        <h4>${name}</h4>
        <div>
          <span>$${price}</span>
          <button class="btns" onclick="removeItem(this)">Delete</button>
        </div>
      `;

  document.getElementById("menuList").appendChild(item);
  input.value = "";
  input.focus();

  selectedItem();
}

function removeItem(button) {
  button.closest(".item").remove();
  UpdateItemcount();
}

document.getElementById("nameInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

function selectedItem() {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    // remove old listener before adding new one
    item.onclick = () => {
      item.classList.toggle("selected");
      UpdateItemcount();
    };
  });
}

UpdateItemcount();

function UpdateItemcount() {
  const countItem = document.getElementById("items-count");
  const selectedItems = document.querySelectorAll(".item.selected");
  const count = selectedItems.length;
  countItem.firstChild.textContent = `Items (${count}):`;
  SumTotalItem(selectedItems, count);
}

function SumTotalItem(selectedItems, count) {
  let sum = 0;
  selectedItems.forEach((item) => {
    let priceText = item.querySelector("span").textContent;
    let price = parseFloat(priceText.replace("$", ""));
    sum += price;
  });
  let sumOfItem = (document.getElementById("item-total").textContent =
    sum.toFixed(2));
  SumBeforeTax(sumOfItem, count);
}

function SumBeforeTax(sumOfItem, count) {
  let Beforetax = document.getElementById("before-tax");
  let Sum = 0;

  if (count === 0) {
    Beforetax.textContent = `0.00`;
  } else {
    let itemSum = parseFloat(sumOfItem);
    let shipping = parseFloat(document.getElementById("shipping").textContent);
    let beforeTax = itemSum + shipping;
    Sum = beforeTax.toFixed(2);
    Beforetax.textContent = Sum;
  }
  TotalTax(Sum, count);
}

function TotalTax(Sum, count) {
  const taxElement = document.getElementById("tax");
  let totaltax = 0;
  if (count === 0) {
    taxElement.textContent = `0.00`;
  } else {
    totaltax = (parseFloat(Sum) * 0.1).toFixed(2);
    taxElement.textContent = totaltax;
  }
  OrderTotal(totaltax, count, Sum);
}

function OrderTotal(totaltax, count, Sum) {
  const ordertext = document.getElementById("order-total");
  if (count === 0) {
    ordertext.textContent = `0.00`;
  } else {
    let totalorder = (parseFloat(totaltax) + parseFloat(Sum)).toFixed(2);
    ordertext.textContent = totalorder;
  }
}

//Rough study

  const Values = "Hot Coffee 10.50";
  console.log(Values);

  const Parts = Values.split(" ") //Hot Coffee 10.50 in to threee array parts
  console.log(Parts);              // ['Hot','Coffee','10.50']

  const Prices = Parts.pop();
  console.log(Prices);         // print last number or words in an array

  const Names = Parts.join(" "); // after space join two array ['Hot','Coffee','10.50']
  console.log(Names);            // Hot coffie
