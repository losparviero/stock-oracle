#!/usr/bin/env node

/*!
 * Stock Oracle
 * Copyright (c) 2023
 *
 * @author Zubin
 * @username (GitHub) losparviero
 * @license AGPL-3.0
 */

// Add env vars as a preliminary

import dotenv from "dotenv";
dotenv.config();
import input from "input";
import { validateTicker } from "./ticker.js";
import { getFromCache, setInCache } from "./cache.js";
import { fetchAPI } from "./handler.js";
import { predict } from "./predict.js";
import { validateEnv } from "./validate.js";

// Get ticker

let apiKey;

async function takeInput() {
  const ticker = await input.text("Enter ticker: ");
  validateTicker(ticker);
  console.log(`\nPredicting stock price for ${ticker}.`);
  return ticker;
}

async function getData(ticker) {
  if (!process.env.DB_URL) {
    const data = await fetchAPI(ticker, apiKey);
    return data;
  } else {
    const cachedData = await getFromCache(ticker);
    if (cachedData) {
      console.log("Cache hit! Using cached data.");
      return cachedData;
    } else {
      console.log("Fetching data...");
      const data = await fetchAPI(ticker, apiKey);
      await setInCache(ticker, data);
      return data;
    }
  }
}

async function predictionLoop() {
  while (true) {
    apiKey = await validateEnv();
    const ticker = await takeInput();
    const data = await getData(ticker);
    await predict(data, ticker);

    const continuePrediction = await input.confirm(
      "Do you want to predict another stock? "
    );
    if (!continuePrediction) {
      break;
    }
  }
  process.exit();
}

predictionLoop();
