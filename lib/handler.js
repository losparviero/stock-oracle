// handler.js

import axios from "axios";

async function fetchAPI(ticker, apiKey) {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?serietype=line&apikey=${apiKey}`
    );

    if (response.status === 200) {
      console.log("Historical data fetched.");
      return response.data;
    } else if (response.status === 400) {
      console.error("Bad Request:", response.data);
      throw new Error("Bad Request: The API request was malformed or invalid.");
    } else if (response.status === 401) {
      console.error("Unauthorized:", response.data);
      throw new Error(
        "Unauthorized: The API request lacks valid authentication credentials. Make sure you have set the API key in the .env file."
      );
    } else if (response.status === 403) {
      console.error("Forbidden:", response.data);
      throw new Error(
        "Forbidden: The client's credentials are valid, but access is not allowed."
      );
    } else if (response.status === 404) {
      console.error("Not Found:", response.data);
      throw new Error("Not Found: The requested resource could not be found.");
    } else if (response.status === 405) {
      console.error("Method Not Allowed:", response.data);
      throw new Error(
        "Method Not Allowed: The HTTP method is not allowed for the resource."
      );
    } else if (response.status === 429) {
      console.error("Too Many Requests:", response.data);
      throw new Error(
        "Too Many Requests: The client has exceeded the API rate-limiting threshold."
      );
    } else if (response.status >= 500) {
      console.error("Server Error:", response.data);
      throw new Error(
        "Server Error: An unexpected error occurred on the server."
      );
    } else {
      console.error("Unexpected Status Code:", response.status);
      throw new Error(`Unexpected Status Code: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred during the API call:", error.message);
    throw error;
  }
}

export { fetchAPI };
