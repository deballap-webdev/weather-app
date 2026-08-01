import { setLocationObject, getHomeLocation } from "./dataFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
import { addSpinner, displayError } from "./domFunctions.js";

const currentLoc = new CurrentLocation();

const initApp = () => {
  //add Listeners
  const geoButton = document.getElementById("getLocation");
  geoButton.addEventListener("click", getGeoWeather);

  const homeButton = document.getElementById("home");
  homeButton.addEventListener("click", loadWeather);

  //set up
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
    name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`,
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
    displayHomeLocation(savedLocation);
  } else if (savedLocation && event) {
    const homeIcon = document.querySelector("fa-house-chimney");
    addSpinner(homeIcon);
  }
};

const updateDataAndDisplay = async (locationObj) => {
  // const weatherJson = await getWeatherFromCoords(locationObj);
  // if (weatherJson) updateDisplay(weatherJson, locationObj);
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
document.addEventListener("DOMContentLoaded", initApp());
