const timeContiner = document.querySelector(".date-continer .time");
const dateContiner = document.querySelector(".date-continer .date");

const dashbordWrapper = document.querySelector(".dashbord-wrapper");
const dashbordTitle = dashbordWrapper.querySelector(".dashboard-name");
const dashbordForm = dashbordWrapper.querySelector("form");

/* Local Storage */
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
    note: "",
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
