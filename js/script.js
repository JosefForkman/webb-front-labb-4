const timeContiner = document.querySelector(".date-continer .time");
const dateContiner = document.querySelector(".date-continer .date");

const dashbordWrapper = document.querySelector(".dashbord-wrapper");
const dashbordTitle = dashbordWrapper.querySelector(".dashboard-name");
const dashbordForm = dashbordWrapper.querySelector("form");

const linksContiner = document.querySelector(".links-bord ul");
const addLinkButton = document.querySelector(".add-link");
const addLinkForm = document.querySelector(".add-link-form");

const pokemonContainer = document.querySelector(".pokemon-bord ul");

const noteContainer = document.querySelector(".note-bord textarea");

const changeBg = document.querySelector(".change-bg");
const bgContiner = document.querySelector("body");

/* Local Storage */
/**
 * This is the dashboard data
 * @type {DashboardData}
 */
const dashboardData = JSON.parse(localStorage.getItem("dashboardData")) || {
    title: "John Doe Dashboard",
    Links: [
        {
            name: "Google",
            url: "https://www.google.com",
            favicon:
                "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com/&size=128",
        },
        {
            name: "Notion",
            url: "https://www.notion.com",
            favicon:
                "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.notion.com/&size=128",
        },
        {
            name: "Slack",
            url: "https://www.Slack.com",
            favicon:
                "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.Slack.com/&size=128",
        },
        {
            name: "Chat GPT",
            url: "https://www.ChatGPT.com",
            favicon:
                "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.ChatGPT.com/&size=128",
        },
    ],
    wether: {
        location: { latitude: 0, longitude: 0, name: "" },
        numberOfDays: 3,
        isGPS: true,
    },
    note: "",
    backgroundImage: "",
};
const updateDashbordLocalStorge = () => {
    localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
};

/* Date & Time */
const date = new Date();
const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
};
const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
timeContiner.innerHTML = date.toLocaleTimeString(undefined, timeOptions);
dateContiner.innerHTML = date.toLocaleDateString(undefined, dateOptions);
setInterval(() => {
    const date = new Date();
    timeContiner.innerHTML = date.toLocaleTimeString(undefined, timeOptions);
}, 1000 * 60); // update every minute

/* Dashbord */
dashbordTitle.innerText = dashboardData.title;
dashbordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = dashbordForm.querySelector("input").value;
    if (title === "") {
        return;
    }
    dashboardData.title = title;
    updateDashbordLocalStorge();
    dashbordTitle.innerHTML = title;
    dashbordTitle.style.display = "block";
    dashbordForm.style.display = "none";
});
dashbordTitle.addEventListener("click", () => {
    dashbordForm.querySelector("input").value = dashboardData.title;
    dashbordTitle.style.display = "none";
    dashbordForm.style.display = "flex";
});

/* Links */
const createLinkElement = (link) => {
    const linkElement = document.createElement("li");

    const removeButton = document.createElement("button");
    removeButton.innerHTML = `<span class="sr-only">Ta bort</span>
        <i class="fa-solid fa-circle-minus"></i>`;
    removeButton.addEventListener("click", () => {
        dashboardData.Links = dashboardData.Links.filter(
            (filterLink) => filterLink !== link,
        );
        updateDashbordLocalStorge();
        linkElement.remove();
    });
    linkElement.innerHTML = `
    <img
    src="${link.favicon}"
    alt="Google logo" />
    <p><a href="${link.url}" target="_blank">${link.name}</a></p>
    `;
    linkElement.appendChild(removeButton);
    linksContiner.appendChild(linkElement);
};

linksContiner.innerHTML = "";
dashboardData.Links.forEach((link) => {
    createLinkElement(link);
});

addLinkButton.addEventListener("click", () => {
    addLinkButton.nextElementSibling.showModal();
});

addLinkForm.addEventListener("submit", (event) => {
    const formData = new FormData(addLinkForm);
    const url = formData.get("link").trim();
    const title = formData.get("title").trim();

    if (url === "" || title === "") {
        return;
    }

    const link = {
        name: title,
        url,
        favicon: `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`,
    };
    dashboardData.Links.push(link);
    updateDashbordLocalStorge();
    createLinkElement(link);

    addLinkForm.reset();
});

/* Pokemon */
(async function () {
    const pokemons = [];

    for (let i = 1; i < 11; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        const attack = data.stats.find((stat) => stat.stat.name === "attack");
        const hp = data.stats.find((stat) => stat.stat.name === "hp");
        pokemons.push({
            name: data.name,
            image: data.sprites.front_default,
            attack,
            hp,
        });
    }
    pokemonContainer.innerHTML = "";
    pokemons.forEach((pokemon) => {
        const pokemonElement = document.createElement("li");
        pokemonElement.innerHTML = `
        <img
        src="${pokemon.image}"
        alt="Google logo" />
        <p><b>${pokemon.name}</b></p>
        <span>Attack: ${pokemon.attack.base_stat}</span>
        <span>HP: ${pokemon.hp.base_stat}</span>
        `;
        pokemonContainer.appendChild(pokemonElement);
    });
})();

/* Note */
noteContainer.value = dashboardData.note;
noteContainer.addEventListener("input", (event) => {
    dashboardData.note = event.target.value;
    updateDashbordLocalStorge();
});

/* Background */
bgContiner.style.backgroundImage = `url(${dashboardData.backgroundImage})`;
changeBg.addEventListener("click", () => {
    fetch(
        `https://api.unsplash.com/photos/random?client_id=${unsplashAPIKey}&orientation=landscape`,
    )
        .then((response) => response.json())
        .then((data) => {
            bgContiner.style.backgroundImage = `url(${data.urls.regular})`;
            dashboardData.backgroundImage = data.urls.regular;
            updateDashbordLocalStorge();
        });
});
