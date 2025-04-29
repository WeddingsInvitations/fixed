const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('p');
if (guestName) {
  document.getElementById('guestName').textContent = guestName;
}

// Countdown
const targetDate = new Date("2026-06-03T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);

// Action on button
function openInvitation() {
  window.location.href = "undangan.html?p=" + guestName;
}
