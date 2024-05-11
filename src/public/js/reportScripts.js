const btnList = document.querySelector(".btn.btn-list");
const subnav = document.querySelector(".sub-nav-1");
const arrow = document.querySelector(".bx-chevron-down-1");

const btnList_2 = document.querySelector(".btn-list-2");
const subnav_2 = document.querySelector(".sub-nav-2");
const arrow_2 = document.querySelector(".bx-chevron-down-2");

const btnList_3 = document.querySelector(".btn-list-3");
const subnav_3 = document.querySelector(".sub-nav-3");
const arrow_3 = document.querySelector(".bx-chevron-down-3");

btnList.addEventListener("click", () => {
  subnav.classList.toggle("active");
  arrow.classList.toggle("rotate");
});

btnList_2.addEventListener("click", () => {
  subnav_2.classList.toggle("active");
  arrow_2.classList.toggle("rotate");
});

btnList_3.addEventListener("click", () => {
  subnav_3.classList.toggle("active");
  arrow_3.classList.toggle("rotate");
});

function createClock() {
  const clockElement = document.createElement("div");
  clockElement.id = "clock";
  document.body.appendChild(clockElement);
}

// Function to update clock time
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = formatTime(now);
}

// Function to format time
function formatTime(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh", // Set time zone to Vietnam
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

// Create and update clock
createClock();
updateClock();
// Update clock every second
setInterval(updateClock, 1000);

const btnAction = document.querySelector(".btn-action");
const sideBar = document.querySelector(".sidebar");
const btnClose = document.querySelector(".btn-close");
const background = document.querySelector(".background");

btnAction.addEventListener("click", () => {
  btnAction.classList.toggle("active");
  sideBar.classList.toggle("active");
  background.classList.toggle("active");
});

btnClose.addEventListener("click", () => {
  sideBar.classList.toggle("active");
  btnAction.classList.toggle("active");
  background.classList.toggle("active");
});

background.addEventListener("click", () => {
  btnAction.classList.toggle("active");
  sideBar.classList.toggle("active");
  background.classList.toggle("active");
});
