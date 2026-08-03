export const setPlaceholderText = () => {
  const input = document.getElementById("searchBar__text");
  innerWidth < 400
    ? (input.placeholder = "City, State, Country")
    : (input.placeholder = "City, State, Country, or Zip Code");
};

export const addSpinner = (element) => {
  animateButton(element);
  setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
  element.classList.toggle("none");
  element.nextElementSibling.classList.toggle("block");
  element.nextElementSibling.classList.toggle("none");
};

export const displayError = (headerMsg, srMsg) => {
  updateWeatherLocationHeader(headerMsg);
  updateScreenReaderConfirmation(srMsg);
};

export const displayApiError = (statusCode) => {
  const properMsg = toProperCase(statusCode.message);
  updateWeatherLocationHeader(properMsg);
  updateScreenReaderConfirmation(`${properMsg}. Please try again`);
};

const toProperCase = (text) => {
  const words = text.split(" ");
  const properWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return properWords.join(" ");
};

const updateWeatherLocationHeader = (message) => {
  const h2 = document.getElementById("currentForecast__location");
  h2.textContent = message;
};

export const updateScreenReaderConfirmation = (message) => {
  document.getElementById("confirmation").textContent = message;
};

export const updateDisplay = (weatherJson, locationObj) => {
  fadeDisplay();
  clearDisplay();
  const code = weatherJson.current.weather_code;
  const isDay = weatherJson.current.is_day;
  const weatherClass = getWeatherDetails(code, isDay).weatherClass;
  setBGImage(weatherClass);
  const screenReaderWeather = buildScreenReaderWeather(
    weatherJson,
    locationObj,
    getWeatherDetails(code, isDay).description,
  );
  updateScreenReaderConfirmation(screenReaderWeather);
  updateWeatherLocationHeader(locationObj.locationName);
  fadeDisplay();
};

const fadeDisplay = () => {
  const cc = document.getElementById("currentForecast");
  cc.classList.toggle("zero-vis");
  cc.classList.toggle("fade-in");
  const sixDay = document.getElementById("dailyForecast");
  sixDay.classList.toggle("zero-vis");
  sixDay.classList.toggle("fade-in");
};

const clearDisplay = () => {
  const currentConditions = document.getElementById(
    "currentForecast__condition",
  );
  deleteContents(currentConditions);

  const sixDayForecast = document.getElementById("dailyForecast__contents");
  deleteContents(sixDayForecast);
};

const deleteContents = (parentElement) => {
  console.log(parentElement);
  while (parentElement.lastElementChild) {
    parentElement.lastElementChild.remove();
  }
};

export const getWeatherDetails = (code, isDay) => {
  const config = weatherCode[code];
  if (!config) return "not-available";
  const time = isDay ? "day" : "night";
  const weatherC =
    config.class === "clouds" && time === "night" ? "night" : config.class;

  console.log(weatherC);
  return {
    iconName: config[time],
    description: config.label,
    weatherClass: weatherC,
  };
};

const weatherCode = {
  0: {
    day: "clear-day",
    night: "clear-night",
    label: "Clear Sky",
    class: "clouds",
  },

  1: {
    day: "partly-cloudy-day",
    night: "partly-cloudy-night",
    label: "Mainly Clear",
    class: "clouds",
  },

  2: {
    day: "partly-cloudy-day",
    night: "partly-cloudy-night",
    label: "Partly Cloudy",
    class: "clouds",
  },

  3: {
    day: "overcast-day",
    night: "overcast-night",
    label: "Overcast",
    class: "clouds",
  },

  45: { day: "fog-day", night: "fog-night", label: "Fog", class: "fog" },

  48: {
    day: "fog-day",
    night: "fog-night",
    label: "Depositing Rime Fog",
    class: "fog",
  },

  51: {
    day: "drizzle",
    night: "drizzle",
    label: "Light Drizzle",
    class: "rain",
  },

  53: {
    day: "drizzle",
    night: "drizzle",
    label: "Moderate Drizzle",
    class: "rain",
  },

  55: {
    day: "drizzle",
    night: "drizzle",
    label: "Dense Drizzle",
    class: "rain",
  },

  56: {
    day: "sleet",
    night: "sleet",
    label: "Light Freezing Drizzle",
    class: "snow",
  },

  57: {
    day: "sleet",
    night: "sleet",
    label: "Dense Freezing Drizzle",
    class: "snow",
  },

  61: { day: "rain", night: "rain", label: "Slight Rain", class: "rain" },

  63: { day: "rain", night: "rain", label: "Moderate Rain", class: "rain" },

  65: { day: "rain", night: "rain", label: "Heavy Rain", class: "rain" },

  66: {
    day: "sleet",
    night: "sleet",
    label: "Light Freezing Rain",
    class: "rain",
  },

  67: {
    day: "sleet",
    night: "sleet",
    label: "Heavy Freezing Rain",
    class: "snow",
  },

  71: { day: "snow", night: "snow", label: "Slight Snowfall", class: "snow" },

  73: { day: "snow", night: "snow", label: "Moderate Snowfall", class: "snow" },

  75: { day: "snow", night: "snow", label: "Heavy Snowfall", class: "snow" },

  77: { day: "snow", night: "snow", label: "Snow Grains", class: "snow" },

  80: {
    day: "partly-cloudy-day-rain",
    night: "partly-cloudy-night-rain",
    label: "Slight Rain Showers",
    class: "rain",
  },

  81: {
    day: "partly-cloudy-day-rain",
    night: "partly-cloudy-night-rain",
    label: "Moderate Rain Showers",
    class: "rain",
  },

  82: {
    day: "partly-cloudy-day-rain",
    night: "partly-cloudy-night-rain",
    label: "Violent Rain Showers",
    class: "rain",
  },

  85: {
    day: "partly-cloudy-day-snow",
    night: "partly-cloudy-night-snow",
    label: "Slight Snow Showers",
    class: "snow",
  },

  86: {
    day: "partly-cloudy-day-snow",
    night: "partly-cloudy-night-snow",
    label: "Heavy Snow Showers",
    class: "snow",
  },

  95: {
    day: "thunderstorms-day",
    night: "thunderstorms-night",
    label: "Thunderstorm",
    class: "thunder",
  },

  96: {
    day: "thunderstorms-day-rain",
    night: "thunderstorms-night-rain",
    label: "Thunderstorm with Slight Hail",
    class: "thunder",
  },

  99: {
    day: "thunderstorms-day-rain",
    night: "thunderstorms-night-rain",
    label: "Thunderstorm with Heavy Hail",
    class: "thunder",
  },
};

const setBGImage = (weatherClass) => {
  document.documentElement.classList.add(weatherClass);
  document.documentElement.classList.forEach((background) => {
    if (background !== weatherClass)
      document.documentElement.classList.remove(background);
  });
};

const buildScreenReaderWeather = (weatherJson, locationObj, description) => {
  const location = locationObj.locationName;
  const unit = locationObj.currentUnit;
  return `${description} and ${weatherJson.current.temperature_2m} ${unit} in ${location} `;
};
