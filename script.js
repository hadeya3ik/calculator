
function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch(op) {
        case "+" : return a + b;
        case "-" : return a - b;
        case "x" : return a * b;
        case "/" : return a / b;
        case "%" : return a % b;
    }
}

// container element
const container = document.createElement("div");
container.className = "container";

// screen
const screen = document.createElement("div");
screen.className = "screen";

// screen text
const result_text = document.createElement("h1");
const op_text = document.createElement("h3");
screen.appendChild(op_text);
screen.appendChild(result_text);

// the buttons 
const buttons = document.createElement("div");
buttons.className = "buttons";

// array to rep the button text
const buttonData = [
  ["AC", "C", "%", "/"],
  ["7", "8", "9", "+"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "x"],
  ["0", ".", "="]
];

const is_digit = function(a) { 
    return (a == "0") || (a == '1') || (a == '2') || (a == '3') || (a == '4') || 
    (a == '5') || (a == '6') || (a == '7') || (a == '8') || (a == '9') || (a == '0') };


let num1=""; 
let num2=""; 
let op="";

let first_op=true; 
let operand=false; 
let second_op=false;

// Create the structure with nested loops
for (const rowTexts of buttonData) {
  const row = document.createElement("div");
  row.className = "row";
  
  for (const buttonText of rowTexts) {
    const button = document.createElement("div");
    button.className = "button";
    if (buttonText == "=") {button.style.width='165px';}

    const h1 = document.createElement("h1");
    h1.textContent = buttonText;

    button.addEventListener('click', () => buttonText = calc(buttonText));

    button.appendChild(h1);
    row.appendChild(button);
  }  
  buttons.appendChild(row);
}

// handles input
const calc = function(str) {
    if (str == "AC") {
        num1=""; 
        num2=""; 
        op="";
        first_op = true; 
        second_op = false;
        operand = false 
        result_text.textContent = "";
        op_text.textContent = "";
        return ;
    }

    if (str == "C") {
        if (first_op) {
            num1 = num1.slice(0, -1);
            result_text.textContent = num1;
        } else if (second_op) {
            num2 = num2.slice(0, -1);
            result_text.textContent = num2;
        }
    }

    if (str === "=") {
      if (num1 && num2 && op) {
        const result = operate(num1, num2, op);
        op_text.textContent = num1 + " " + op + " " + num2;
        console.log("Result: " + result);
        num1 = result.toString();
        num2 = "";
        op = "";
        
        result_text.textContent = result;
      }
    } else if (!isNaN(parseInt(str))) {
      if (first_op) {
        num1 += str;
        result_text.textContent = num1;
      } else if (second_op) {
        num2 += str;
        result_text.textContent = num2;
      }
    } else {
      op = str;
      first_op = false;
      second_op = true;
    }
    console.log(num1 + " " + op  + " " + num2);
  };

// Append the elements to the document
container.appendChild(screen);
container.appendChild(buttons);
document.body.appendChild(container);

