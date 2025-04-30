const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('p');
if (guestName) {
  document.getElementById('guestName').textContent = guestName;
}

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

function openInvitation() {
  document.body.style.overflow = "auto";
  document.getElementById('navbar').classList.add('show');
  document.getElementById('bg-music').play();
  document.getElementById('home').scrollIntoView({ behavior: "smooth" });
}

// Highlight navbar saat scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-item");

  let index = sections.length;

  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[index].classList.add("active");
});

getGuestName();
updateCountdown();
setInterval(updateCountdown, 1000);

// Jika halaman direfresh dan scroll tidak di hero, kembali ke hero
window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      window.scrollTo(0, 0); // paksa kembali ke atas (hero)
      document.body.style.overflow = "hidden"; // nonaktifkan scroll lagi
      document.getElementById('navbar').classList.remove('show'); // sembunyikan navbar
    }, 50);
  }
});
