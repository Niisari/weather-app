const API_KEY = "X46WCL4JVFS5FHTK57AAXR9GL";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

/**
 * Fetches weather data for a specific location.
 * @param {string} location
 * @returns {Promise<Object>} - The formatted weather data.
 */
export const getWeatherData = async (location) => {
  try {
    // 1. Construct the URL with metric units for Celsius
    const url = `${BASE_URL}/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    // 2. Make the request
    const response = await fetch(url);

    // 3. Handle errors (like 404 or 401)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    // 4. Parse and return the JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
