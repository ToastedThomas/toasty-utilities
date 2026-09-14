const fromValue = document.getElementById("from-value");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const result = document.getElementById("result");
const swapButton = document.getElementById("swap-button");
const copyButton = document.getElementById("copy-button");

const units = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  miles: 1609.344,
  yards: 0.9144,
  feet: 0.3048,
  inches: 0.0254,
  fathoms: 1.8288,
  nauticalMiles: 1852,
  chains: 20.1168,
  rods: 5.0292,
  earthRadius: 6371008
}
// meters is the base unit for this dictionary
// so, 1 inch = 0.0254 meters

const irregularSingularNames = {
  feet: "Foot",
  inches: "Inch"
};

function formatResult(value) {
  return Number(value.toFixed(6));
}

function formatUnitName(unitSelect, value) {
  const unitName = unitSelect.options[unitSelect.selectedIndex].text;
  const unitType = unitSelect.value;

  if (Math.abs(value) === 1) {
    if (irregularSingularNames[unitType]) {
      return irregularSingularNames[unitType]
    }

    return unitName.replace(/s$/, "");
  }

  return unitName;
}

function convertUnits() {
  if (fromValue.value === "") {
    result.textContent = "Please enter a value.";
    return;
  }

  const value = Number(fromValue.value);

  if (Number.isNaN(value)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  const fromFactor = units[fromUnit.value];
  const toFactor = units[toUnit.value];

  const resultValue = value * fromFactor / toFactor;

  const formattedValue = formatResult(value);
  const formattedFromUnit = formatUnitName(fromUnit, value);

  const formattedResult = formatResult(resultValue);
  const formattedToUnit = formatUnitName(toUnit, formattedResult);

  result.textContent = `${formattedValue} ${formattedFromUnit} = ${formattedResult} ${formattedToUnit}`;
}

fromValue.addEventListener("input", convertUnits);
fromUnit.addEventListener("change", convertUnits);
toUnit.addEventListener("change", convertUnits);

function swapUnits() {
  const currentFromUnit = fromUnit.value;

  fromUnit.value = toUnit.value;
  toUnit.value = currentFromUnit;

  convertUnits();
}

swapButton.addEventListener("click", swapUnits);

async function copyResult() {
  if (result.textContent === "--" || result.textContent.startsWith("Please")) {
    return;
  }

  await navigator.clipboard.writeText(result.textContent);

  copyButton.textContent = "✔";

  setTimeout(() => {
    copyButton.textContent = "⧉";
  }, 1500);
}

copyButton.addEventListener("click", copyResult);