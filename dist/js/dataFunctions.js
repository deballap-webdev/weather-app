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

export const getWeatherFromCoords = async (locationObj) => {
  const lat = locationObj.latitude;
  const lon = locationObj.longitude;
  const unit = locationObj.currentUnit;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&temperature_unit=${unit}&daily=weather_code,temperature_2m_min,temperature_2m_max&current=weather_code,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,temperature_2m&timezone=auto&wind_speed_unit=mph`;

  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    console.log(err);
  }
};

export const getCoordsFromApi = async (entryText, units) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${entryText}&count=1`;
  const encodedUrl = encodeURI(url);
  try {
    const dataStream = await fetch(encodedUrl);
    const jsonData = await dataStream.json();
    return jsonData;
    console.log(jsonData);
  } catch (err) {
    console.log(err.stack);
  }
};

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ").trim();
  return entryText;
};

export const generateName = (coordsData) => {
  const result = coordsData.results[0];
  let name = `${result.name}`;
  if (result.country) {
    name = name === `${result.country}` ? name : name + `: ${result.country}`;
  }
  if (result.admin1) {
    name = name + `, ${result.admin1}`;
  }
  if (result.admin2) {
    name = name + `, ${result.admin2}`;
  }
  if (result.admin3) {
    name = name + `, ${result.admin3}`;
  }
  if (result.admin4) {
    name = name + `, ${result.admin4}`;
  }
  return name;
};
