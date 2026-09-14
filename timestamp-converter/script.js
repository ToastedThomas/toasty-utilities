const currentTimestamp = document.getElementById("current-timestamp")
const currentSystemTime = document.getElementById("current-system-time");
const copyCurrentTimestamp = document.getElementById("copy-current-timestamp");

function updateCurrentTime() {
  const now = new Date();

  const unixTimestamp = Math.floor(now.getTime() / 1000);

  currentTimestamp.textContent = unixTimestamp;
  currentSystemTime.textContent = now.toLocaleString();
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

async function copyCurrentUnixTimestamp() {
  await navigator.clipboard.writeText(currentTimestamp.textContent);

  copyCurrentTimestamp.textContent = "✔";

  setTimeout(() => {
    copyCurrentTimestamp.textContent = "⧉";
  }, 1500);
}

copyCurrentTimestamp.addEventListener("click", copyCurrentUnixTimestamp);

const timestampInput = document.getElementById("timestamp");
const timestampUTC = document.getElementById("timestamp-utc");
const timestampLocal = document.getElementById("timestamp-local");


const dateResult = document.getElementById("date-result");

function convertTimestamp() {
  if (timestampInput.value === "") {
    timestampUTC.textContent = "Please enter a timestamp.";
    timestampLocal.textContent = "";
    return;
  }

  const timestamp = Number(timestampInput.value);

  // unix is number of seconds since Jan 1st, 1970
  // JS date object is number of milliseconds since Jan 1st, 1970
  // so we need to multiply by 1000 to get correct time for conversion

  const date = new Date(timestamp * 1000);

  if (Number.isNaN(date.getTime())) {
    timestampUTC.textContent = "Please enter a valid timestamp.";
    timestampLocal.textContent = "";
    return;
  }

  timestampUTC.textContent = `${date.toLocaleString("en-US", {timeZone: "UTC"})} UTC`;
  timestampLocal.textContent = `${date.toLocaleString()} System local time`;
}

timestampInput.addEventListener("input", convertTimestamp);

const dateYear = document.getElementById("date-year");
const dateMonth = document.getElementById("date-month");
const dateDay = document.getElementById("date-day");
const dateHour = document.getElementById("date-hour");
const dateMinutes = document.getElementById("date-minutes");
const dateSeconds = document.getElementById("date-seconds");

const dateUTC = document.getElementById("date-utc");
const dateLocal = document.getElementById("date-local");
const copyDateResult = document.getElementById("copy-date-result");

const dateInputs = [
  dateYear,
  dateMonth,
  dateDay,
  dateHour,
  dateMinutes,
  dateSeconds
];

function convertDateTime() {
  if (dateInputs.some((input) => input.value === "")) {
    dateResult.textContent = "Enter all date and time fields.";
    dateLocal.textContent = "";
    dateUTC.textContent = "";
    return;
  }

  const year = Number(dateYear.value);
  const month = Number(dateMonth.value);
  const day = Number(dateDay.value);
  const hour = Number(dateHour.value);
  const minutes = Number(dateMinutes.value);
  const seconds = Number(dateSeconds.value);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    !Number.isInteger(hour) ||
    !Number.isInteger(minutes) ||
    !Number.isInteger(seconds)
  ) {
    dateResult.textContent = "Please enter whole numbers.";
    dateLocal.textContent = "";
    dateUTC.textContent = "";
    return;
  }

  if (
    year < 1 || year > 275760 ||
    month < 1 || month > 12 ||
    day < 1 || day > 31 ||
    hour < 0 || hour > 23 ||
    minutes < 0 || minutes > 59 ||
    seconds < 0 || seconds > 59
  ) {
    dateResult.textContent = "Please enter valid date and time values.";
    dateLocal.textContent = "";
    dateUTC.textContent = "";
    return;
  }

  const date = new Date(year, month - 1, day, hour, minutes, seconds);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minutes ||
    date.getSeconds() !== seconds
  ) {
    dateResult.textContent = "Please enter a valid calendar date.";
    dateLocal.textContent = "";
    dateUTC.textContent = "";
    return;
  }

  const timestamp = Math.floor(date.getTime() / 1000);

  dateResult.textContent = timestamp;

  dateUTC.textContent = `${date.toLocaleString("en-US", {timezone: "UTC"})} UTC`;
  dateLocal.textContent = `${date.toLocaleString()} System local time`;
}

dateInputs.forEach((input) => {
  input.addEventListener("input", convertDateTime);
});

async function copyDateUnixTimestamp() {
  if (dateResult.textContent === "--") {
    return;
  }

  if (!/^-?\d+$/.test(dateResult.textContent)) {
    return;
  }

  await navigator.clipboard.writeText(dateResult.textContent);

  copyDateResult.textContent = "✔";

  setTimeout(() => {
    copyDateResult.textContent = "⧉";
  }, 1500);
}

copyDateResult.addEventListener("click", copyDateUnixTimestamp);