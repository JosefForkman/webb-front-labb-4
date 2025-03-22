const weatherContainer = document.querySelector(".wetter-bord ul");
const updateWetherButton = document.querySelector(".update-wether");
const updateWetherForm = document.querySelector(".update-wether-form");
const GPSCheckbox = updateWetherForm.querySelector("input[name='isGPS']");
const locationInput = updateWetherForm.querySelector("#location");

const getDay = (date) => {
    const days = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
    ];
    return days[date.getDay()];
};
const updateWether = async function () {
    const forecastData = await fetchForecast();
    const sortedForecasts = groupAndSortForecasts(forecastData);
    renderWeatherForecasts(sortedForecasts);
};
updateWetherButton.addEventListener("click", () => {
    // update wether form with current values
    updateWetherButton.nextElementSibling.showModal();

    locationInput.children[0].disabled = dashboardData.wether.isGPS;
    updateWetherForm.querySelector("input[name='location']").value =
        dashboardData.wether.location.name;
    updateWetherForm.querySelector("select[name='numberOfDays']").value =
        dashboardData.wether.numberOfDays;
    updateWetherForm.querySelector("input[name='isGPS']").checked =
        dashboardData.wether.isGPS;
});

GPSCheckbox.addEventListener("change", (event) => {
    // disable location input if GPS is checked
    locationInput.children[0].disabled = event.target.checked;
    dashboardData.wether.isGPS = event.target.checked;
    updateDashbordLocalStorge();
});

updateWetherForm.addEventListener("submit", () => {
    const formData = new FormData(updateWetherForm);
    const location = formData.get("location");
    const numberOfDays = formData.get("numberOfDays");
    const isGPS = formData.get("isGPS") === "on";

    dashboardData.wether = {
        location: {
            ...dashboardData.wether.location,
            name: location || dashboardData.wether.location.name,
        },
        numberOfDays,
        isGPS,
    };

    updateDashbordLocalStorge();
    updateWether();
});

navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    dashboardData.wether.location = {
        name: dashboardData.wether.location.name,
        latitude,
        longitude,
    };
    updateWether();
});
/**
 * Fetches the weather forecast data from the OpenWeatherMap API.
 * @returns {Promise<Forecasts>} - The weather forecast data.
 */
async function fetchForecast() {
    const baseURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${wetherAPIKey}&units=metric&lang=sv`;
    const curentLocation = dashboardData.wether.location;

    if (!wetherAPIKey) {
        console.error("No API key for weather found");
        return;
    }

    const url = dashboardData.wether.isGPS
        ? `${baseURL}&lat=${curentLocation.latitude}&lon=${curentLocation.longitude}`
        : `${baseURL}&q=${curentLocation.name}`;

    const response = await fetch(url);
    return await response.json();
}
/**
 * Groups and sorts the weather forecasts by day and temperature.
 * @param {Forecasts} forecasts - The weather forecast data.
 * @returns {Array<Array<Forecast>>} - The grouped and sorted forecasts.
 */
function groupAndSortForecasts(forecasts) {
    return Object.values(
        Object.groupBy(forecasts.list, ({ dt_txt }) => dt_txt.split(" ")[0]),
    )
        .map((day) => day.sort((dayA, dayB) => dayB.main.temp - dayA.main.temp))
        .splice(0, dashboardData.wether.numberOfDays);
}
/**
 *
 * @param {Forecasts} forecasts
 */
function renderWeatherForecasts(forecasts) {
    weatherContainer.innerHTML = "";

    forecasts.forEach((day) => {
        const curentDay = day[0];
        const weather = {
            name: curentDay.dt_txt.split(" ")[0],
            description: curentDay.weather[0].description,
            day: getDay(new Date(curentDay.dt_txt.split(" ")[0])),
            temp: Math.floor(curentDay.main.temp),
            icon: `http://openweathermap.org/img/wn/${curentDay.weather[0].icon}.png`,
        };
        const weatherElement = document.createElement("li");
        weatherElement.innerHTML = `
            <img
            src="${weather.icon}"
            alt="Google logo" />
            <p><b>${weather.day}</b></p>
            <span>${weather.temp}°C</span>
            <span>${weather.description}</span>
            `;
        weatherContainer.appendChild(weatherElement);
    });
}
