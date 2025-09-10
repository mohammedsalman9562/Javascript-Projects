(function() {
  const outputEl = document.getElementById("output");
  const historyEl = document.getElementById("history");
  const keys = document.querySelectorAll("button.key");

  let expr = "";  // what the student types
  let memory = 0; // memory store

  // show expression or 0
  function updateDisplay() {
    outputEl.textContent = expr === "" ? "0" : expr;
  }

  // add number or symbol
  function append(val) {
    expr += val;
    updateDisplay();
  }

  // remove last number
  function backspace() {
    expr = expr.slice(0, -1);
    updateDisplay();
  }

  // clear everything
  function clearAll() {
    expr = "";
    historyEl.textContent = "";
    updateDisplay();
  }

  // calculate answer
  function evaluateExpression() {
    if (expr.trim() === "") return;
    try {
      let result = eval(expr); // simple for class 10
      historyEl.textContent = expr + " =";
      expr = String(result);
      updateDisplay();
    } catch (err) {
      outputEl.textContent = "Error";
      expr = "";
    }
  }

  // memory buttons
  function memoryClear() { memory = 0; }
  function memoryRecall() { expr = String(memory); updateDisplay(); }
  function memoryAdd() { evaluateExpression(); memory += Number(outputEl.textContent) || 0; }
  function memorySubtract() { evaluateExpression(); memory -= Number(outputEl.textContent) || 0; }

  // button clicks
  keys.forEach(k => {
    k.addEventListener("click", () => {
      const val = k.getAttribute("data-value");
      const action = k.getAttribute("data-action");

      if (action === "clear") clearAll();
      else if (action === "back") backspace();
      else if (action === "equals") evaluateExpression();
      else if (action === "mc") memoryClear();
      else if (action === "mr") memoryRecall();
      else if (action === "mplus") memoryAdd();
      else if (action === "mminus") memorySubtract();
      else if (val) append(val);
    });
  });

  updateDisplay();
})();
