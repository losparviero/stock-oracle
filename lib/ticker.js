// ticker.js

function validateTicker(ticker) {
  if (!ticker || typeof ticker !== "string") {
    throw new Error("Ticker must be a non-empty string");
  }

  if (ticker.length > 5) {
    throw new Error("Ticker cannot be longer than 5 characters");
  }

  return true;
}

export { validateTicker };
