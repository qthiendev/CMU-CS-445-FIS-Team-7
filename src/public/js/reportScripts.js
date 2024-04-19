const btnList = document.querySelector(".btn.btn-list");
const subnav = document.querySelector(".sub-nav");
const arrow = document.querySelector(".bx-chevron-down");

btnList.addEventListener("click", () => {
  arrow.classList.toggle("rotate");
  subnav.classList.toggle("active");
});
function createClock() {
  const clockElement = document.createElement('div');
  clockElement.id = 'clock';
  document.body.appendChild(clockElement);
}

// Function to update clock time
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = formatTime(now);
}

// Function to format time
function formatTime(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh' // Set time zone to Vietnam
  };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

// Create and update clock
createClock();
updateClock();
// Update clock every second
setInterval(updateClock, 1000);