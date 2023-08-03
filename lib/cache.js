// cache.js

import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

// In memory data cache

const client = new Redis(process.env.DB_URL);

function getFromCache(ticker) {
  return new Promise((resolve, reject) => {
    client.get(ticker, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function setInCache(ticker, data) {
  return new Promise((resolve, reject) => {
    client.set(ticker, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Data cached successfully");
        resolve();
      }
    });
  });
}

export { getFromCache, setInCache };
