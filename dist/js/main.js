import { setLocationObject } from "./dataFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
import { addSpinner, displayError } from "./domFunctions.js";

const currentLoc = new CurrentLocation();

const initApp = () => {
  //add Listeners
  const geoLocation = document.getElementById("getLocation");
  geoLocation.addEventListener("click", getGeoWeather);
  //set up
  //load default weather
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

const updataDataAndDisplay = async (locationObj) => {
  // const weatherJson = await getWeatherFromCoords(locationObj);
  // if (weatherJson) updateDisplay(weatherJson, locationObj);
};
document.addEventListener("DOMContentLoaded", initApp());
