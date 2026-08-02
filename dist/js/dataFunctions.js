export const setLocationObject = (locationObject, coordsObj) => {
  const { lon, lat, name, unit } = coordsObj;
  locationObject.longitude = lon;
  locationObject.latitude = lat;
  locationObject.locationName = name;
  if (unit) {
    locationObject.currentUnit = unit;
  }
};

export const getHomeLocation = () =>
  localStorage.getItem("defaultWeatherLocation");

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ").trim();
  return entryText;
};
