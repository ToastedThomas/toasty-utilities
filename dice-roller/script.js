const diceCount = document.getElementById("dice-count");
const diceSides = document.getElementById("dice-sides");
const rollButton = document.getElementById("generate-button");

const results = document.getElementById("results");
const total = document.getElementById("total");

function rollDice() {
  const count = Number(diceCount.value);
  const sides = Number(diceSides.value);

  if (!Number.isInteger(count) || !Number.isInteger(sides)) {
    results.textContent = "Please enter whole numbers.";
    total.textContent = "--";
    return;
  }

  if (
    count < 1 || count > 100 ||
    sides < 2 || sides > 1000
  ) {
    results.textContent = "Please enter valid dice and side counts.";
    total.textContent = "--";
    return;
  }

  const rolls = [];

  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;

    rolls.push(roll);
  }

  results.textContent = rolls.join(", ");

  let diceTotal = 0;

  for (let roll of rolls) {
    diceTotal += roll;
  }

  total.textContent = diceTotal;
}

rollButton.addEventListener("click", rollDice);