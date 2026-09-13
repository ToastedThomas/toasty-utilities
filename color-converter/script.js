const hexInput = document.getElementById("hex-input");
const hexResult = document.getElementById("hex-result");

const rgbInput = document.getElementById("rgb-input");
const rgbResult = document.getElementById("rgb-result");

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
}

rgbInput.addEventListener("input", convertRGBToHEX);