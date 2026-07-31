export default class CurrentLocation {
  #lon;
  #lat;
  #name;
  #unit;
  constructor() {
    this.#lon = null;
    this.#lat = null;
    this.#name = "Current Location";
    this.#unit = "imperial";
  }

  get longitude() {
    return this.#lon;
  }

  set longitude(longitude) {
    this.#lon = longitude;
  }

  get latitude() {
    return this.#lat;
  }

  set latitude(latitude) {
    this.#lat = latitude;
  }

  get currentUnit() {
    return this.#unit;
  }

  set currentUnit(unit) {
    this.#unit = unit;
  }

  get locationName() {
    return this.#name;
  }

  set locationName(name) {
    this.#name = name;
  }

  toogleUnit() {
    this.#unit = this.#unit === "imperial" ? "metric" : "imperial";
  }
}
