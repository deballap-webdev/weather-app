import {
  setLocationObject,
  getHomeLocation,
  getWeatherFromCoords,
  cleanText,
  getCoordsFromApi,
  generateName,
} from "./dataFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
import {
  updateDisplay,
  setPlaceholderText,
  addSpinner,
  displayError,
  updateScreenReaderConfirmation,
  displayApiError,
} from "./domFunctions.js";

const currentLoc = new CurrentLocation();

const initApp = () => {
  //add Listeners
  const geoButton = document.getElementById("getLocation");
  geoButton.addEventListener("click", getGeoWeather);
  const homeButton = document.getElementById("home");
  homeButton.addEventListener("click", loadWeather);
  const saveButton = document.getElementById("saveLocation");
  saveButton.addEventListener("click", saveLocation);
  const unitButton = document.getElementById("unit");
  unitButton.addEventListener("click", setUnitPref);
  const refreshButton = document.getElementById("refresh");
  refreshButton.addEventListener("click", refreshWeather);
  const locationEntry = document.getElementById("searchBar__form");
  locationEntry.addEventListener("submit", submitNewLocation);
  //set up
  setPlaceholderText();
  //load default weather
  loadWeather();
};

const getGeoWeather = (event) => {
  if (event) {
    if (event.type === "click") {
      const mapIcon = document.querySelector(".fa-location-dot");
      addSpinner(mapIcon);
    }
  }
  if (!navigator.geolocation) return geoError();
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = (errObj) => {
  const errMsg = errObj ? errObj.message : "Geolocation not supported";
  displayError(errMsg, errMsg);
};

const geoSuccess = (position) => {
  const myCoordsObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    name: `Lat: ${position.coords.latitude.toFixed(2)} • Long: ${position.coords.longitude.toFixed(2)}`,
  };
  setLocationObject(currentLoc, myCoordsObj);
  updateDataAndDisplay(currentLoc);
};

const loadWeather = (event) => {
  const savedLocation = getHomeLocation();
  if (!savedLocation && !event) return getGeoWeather();
  if (!savedLocation && event) {
    displayError(
      "No Home Location Saved",
      "Sorry. Please save your home location first",
    );
  } else if (savedLocation && !event) {
    displayHomeLocationWeather(savedLocation);
  } else if (savedLocation && event) {
    const homeIcon = document.querySelector("fa-house-chimney");
    addSpinner(homeIcon);
  }
};

const setUnitPref = () => {
  const unitIcon = document.querySelector(".fa-chart-column");
  addSpinner(unitIcon);
  currentLoc.toogleUnit();
  updateDataAndDisplay(currentLoc);
};

const refreshWeather = () => {
  const refreshIcon = document.querySelector(".refresh");
  addSpinner(refreshIcon);
  updateDataAndDisplay(currentLoc);
};

const submitNewLocation = async (event) => {
  event.preventDefault();
  const text = document.getElementById("searchBar__text").value;
  const entryText = cleanText(text);
  if (!entryText.length) return;
  const searchIcon = document.querySelector(".fa-magnifying-glass");
  addSpinner(searchIcon);
  const coordsData = await getCoordsFromApi(entryText, currentLoc.currentUnit);
  console.log(coordsData);
  if (coordsData) {
    if (coordsData.error) {
      displayApiError(coordsData.reason);
      console.log(coordsData.reason);
      return;
    }
    if (coordsData.results) {
      console.log(coordsData.results);
      // work with api data
      console.log(generateName(coordsData));
      const myCoordsObj = {
        lat: coordsData.results[0].latitude,
        lon: coordsData.results[0].longitude,
        name: generateName(coordsData),
      };
      setLocationObject(currentLoc, myCoordsObj);
      updateDataAndDisplay(currentLoc);
    } else {
      displayError("No Match Found", "No Match Found");
    }
  } else {
    displayError("Connection Error", "Connection Error");
  }
};

const updateDataAndDisplay = async (locationObj) => {
  const weatherJson = await getWeatherFromCoords(locationObj);
  if (weatherJson.error) {
    displayApiError(weatherJson.reason);
    return;
  }
  if (weatherJson) updateDisplay(weatherJson, locationObj);
};

const displayHomeLocationWeather = (home) => {
  if (typeof home === "string") {
    const homeJson = JSON.parse(home);
    const myCoordsObj = {
      lat: homeJson.lat,
      lon: homeJson.lon,
      name: homeJson.name,
      unit: homeJson.unit,
    };
    setLocationObject(currentLoc, myCoordsObj);
    updateDataAndDisplay(currentLoc);
  }
};

const saveLocation = () => {
  if (currentLoc.latitude && currentLoc.longitude) {
    const saveIcon = document.querySelector(".fa-floppy-disk");
    addSpinner(saveIcon);
    const location = {
      lat: currentLoc.latitude,
      lon: currentLoc.longitude,
      name: currentLoc.locationName,
      unit: currentLoc.currentUnit,
    };
    localStorage.setItem("defaultWeatherLocation", JSON.stringify(location));
    updateScreenReaderConfirmation(
      `Saved ${currentLoc.locationName} as home location.`,
    );
  }
};

document.addEventListener("DOMContentLoaded", initApp());
