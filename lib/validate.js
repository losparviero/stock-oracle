// validate.js

import input from "input";
import dotenv from "dotenv";
dotenv.config();

let apiKey;

async function validateEnv() {
  if (!process.env.API_KEY) {
    apiKey = await input.text("API key not set. Please provide API key.");
  } else {
    apiKey = process.env.API_KEY;
  }
  return apiKey;
}

export { validateEnv };
