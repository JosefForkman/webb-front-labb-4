/**
 * @typedef {Object} Links
 * @property {string} name
 * @property {string} url
 * @property {string} favicon
 */

/**
 * @typedef {Object} Wether
 * @property {object} location
 * @property {number} location.latitude
 * @property {number} location.longitude
 * @property {string} location.name
 */

/**
 * @typedef {Object} DashboardData
 * @property {string} title
 * @property {Links[]} Links
 * @property {Wether} wether
 */

/**
 * @typedef {Object} Forecast
 * @property {number} dt
 * @property {object} main
 * @property {number} main.temp
 * @property {number} main.feels_like
 * @property {number} main.temp_min
 * @property {number} main.temp_max
 * @property {number} main.pressure
 * @property {number} main.sea_level
 * @property {number} main.grnd_level
 * @property {number} main.humidity
 * @property {number} main.temp_kf
 * @property {object[]} weather
 * @property {number} weather.id
 * @property {string} weather.main
 * @property {string} weather.description
 * @property {string} weather.icon
 * @property {object} clouds
 * @property {number} clouds.all
 * @property {object} wind
 * @property {number} wind.speed
 * @property {number} wind.deg
 * @property {number} wind.gust
 * @property {number} visibility
 * @property {number} pop
 * @property {object} sys
 * @property {string} sys.pod
 * @property {string} dt_txt
 * @property {object} rain
 * @property {number} rain.3h
 */

/**
 * @typedef {Object} Forecasts
 * @property {string} cod
 * @property {number} message
 * @property {number} cnt
 * @property {Forecast[]} list
 */

/**
 * @typedef {Object} Pokemon
 * @property {string} name
 * @property {string} image
 * @property {number} attack
 * @property {number} hp
 */