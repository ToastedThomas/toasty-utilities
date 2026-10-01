const colorPicker = document.getElementById("color-picker");

const hexInput = document.getElementById("hex-input");
const hexResult = document.getElementById("hex-result");

const rgbInput = document.getElementById("rgb-input");
const rgbResult = document.getElementById("rgb-result");

const copyRGBBtn = document.getElementById("copy-rgb");
const copyHEXBtn = document.getElementById("copy-hex");

function updateColorFromHex(hex) {
  const cleanHex = hex.replace("#", "");

  const red = parseInt(cleanHex.substring(0, 2), 16);
  const green = parseInt(cleanHex.substring(2, 4), 16);
  const blue = parseInt(cleanHex.substring(4, 6), 16);

  rgbInput.value = `${red}, ${green}, ${blue}`;
  colorPicker.value = `#${cleanHex}`;
}

function convertHEXToRGB() {
  if (hexInput.value === "") {
    hexResult.textContent = "Please enter a HEX color.";
    return;
  }

  const hex = hexInput.value.replace("#", "");

  // checks for only valid hex characters using regex
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    hexResult.textContent = "Please enter a valid HEX color.";
    return;
  }

  const red = hex.substring(0, 2);
  const green = hex.substring(2, 4);
  const blue = hex.substring(4, 6);

  const redValue = parseInt(red, 16);
  const greenValue = parseInt(green, 16);
  const blueValue = parseInt(blue, 16);

  hexResult.textContent = `RGB(${redValue}, ${greenValue}, ${blueValue})`;

  updateColorFromHex(hex);
}

hexInput.addEventListener("input", convertHEXToRGB);

function convertRGBToHEX() {
  if (rgbInput.value === "") {
    rgbResult.textContent = "Please enter an RGB color.";
    return;
  }

  const rgb = rgbInput.value.split(",");

  if (rgb.length != 3) {
    rgbResult.textContent = "Please enter three RGB values.";
    return;
  }

  const red = Number(rgb[0]);
  const green = Number(rgb[1]);
  const blue = Number(rgb[2]);

  if (Number.isNaN(red) || Number.isNaN(green) || Number.isNaN(blue)) {
    rgbResult.textContent = "Please enter valid RGB values.";
    return;
  }

  if (!Number.isInteger(red) || !Number.isInteger(green) || !Number.isInteger(blue)) {
    rgbResult.textContent = "RGB values must be whole numbers.";
    return;
  }

  if (
    red < 0 || red > 255 ||
    green < 0 || green > 255 ||
    blue < 0 || blue > 255
  ) {
    rgbResult.textContent = "RGB values must be between 0 and 255.";
    return;
  }

  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  const hex = `#${hexRed}${hexGreen}${hexBlue}`;

  rgbResult.textContent = hex;

  colorPicker.value = hex;
  hexInput.value = hex;
  hexResult.textContent = `RGB(${red}, ${green}, ${blue})`;
}

rgbInput.addEventListener("input", convertRGBToHEX);

colorPicker.addEventListener("input", () => {
  const hex = colorPicker.value.replace("#", "");

  hexInput.value = `#${hex}`;

  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  rgbInput.value = `${red}, ${green}, ${blue}`;

  hexResult.textContent = `RGB(${red}, ${green}, ${blue})`;
  rgbResult.textContent = `#${hex}`
});

async function copyHEX() {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput.value)) {
    return;
  }

  await navigator.clipboard.writeText(hexInput.value);

  copyHEXBtn.textContent = "✔";

  setTimeout(() => {
    copyHEXBtn.textContent = "⧉";  
  }, 1500);
}

async function copyRGB() {
  if (!/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/.test(rgbInput.value)) {
    return;
  }

  await navigator.clipboard.writeText(rgbInput.value);

  copyRGBBtn.textContent = "✔";

  setTimeout(() => {
    copyRGBBtn.textContent = "⧉";
  }, 1500);
}

copyHEXBtn.addEventListener("click", copyHEX);
copyRGBBtn.addEventListener("click", copyRGB);