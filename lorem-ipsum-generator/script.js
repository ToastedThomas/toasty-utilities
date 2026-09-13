const paragraphCount = document.getElementById("paragraph-count");
const generateButton = document.getElementById("generate-button");
const result = document.getElementById("generator-result");

const words = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "conesctetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat"
];

function generateParagraph() {
  result.textContent = "";

  const count = Number(paragraphCount.value);

  for (let i = 0; i < count; i++) {
    let paragraph = "";

    for (let j = 0; j < 100; j++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];

      paragraph += randomWord + " ";
    }

    paragraph = paragraph.trim();
    paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + ".";

    const paragraphElement = document.createElement("p");

    paragraphElement.textContent = paragraph;

    result.appendChild(paragraphElement);
  }
}

generateButton.addEventListener("click", generateParagraph);