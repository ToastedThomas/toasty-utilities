const timestampInput = document.getElementById("timestamp");
const timestampUTC = document.getElementById("timestamp-utc");
const timestampLocal = document.getElementById("timestamp-local");

const dateTimeInput = document.getElementById("date-time");
const dateResult = document.getElementById("date-result");

function convertTimestamp() {
  if (timestampInput.value === "") {
    timestampResult.textContent = "Please enter a timestamp.";
    return;
  }

  const timestamp = Number(timestampInput.value);

  // unix is number of seconds since Jan 1st, 1970
  // JS date object is number of milliseconds since Jan 1st, 1970
  // so we need to multiply by 1000 to get correct time for conversion

  const date = new Date(timestamp * 1000);

  if (Number.isNaN(date.getTime())) {
    timestampResult.textContent = "Please enter a valid timestamp.";
    return;
  }

  timestampUTC.textContent = `${date.toLocaleString("en-US", {timeZone: "UTC"})} UTC`;
  timestampLocal.textContent = `${date.toLocaleString()} System local time`;
}

timestampInput.addEventListener("input", convertTimestamp);

function convertDateTime() {
  if (dateTimeInput.value === "") {
    dateResult.textContent = "Please enter a date and time.";
    return;
  }

  const date = new Date(dateTimeInput.value);

  const timestamp = Math.floor(date.getTime() / 1000);

  dateResult.textContent = timestamp;
}

dateTimeInput.addEventListener("input", convertDateTime);