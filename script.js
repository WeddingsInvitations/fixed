document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    const openInvitationButton = document.getElementById('open-invitation');
    const mainNavbar = document.getElementById('main-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const audioPlayer = document.getElementById('wedding-music');
    const sections = document.querySelectorAll('.section');
    const guestNameElement = document.getElementById('guest-name');
    const desktopGuestNameElement = document.getElementById('desktop-guest-name');
    const desktopHero = document.querySelector('.desktop-hero');
    const mobileHero = document.querySelector('.mobile-hero');
    const desktopHeroLeft = document.querySelector('.desktop-hero-left');
    const desktopCountdownDays = document.getElementById('d-days');
    const desktopCountdownHours = document.getElementById('d-hours');
    const desktopCountdownMinutes = document.getElementById('d-minutes');
    const desktopCountdownSeconds = document.getElementById('d-seconds');

    // Countdown Timer Settings
    const weddingDate = new Date('2025-05-05T10:00:00').getTime(); // Ganti dengan tanggal pernikahan Anda
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

        if (desktopCountdownDays) desktopCountdownDays.textContent = String(days).padStart(2, '0');
        if (desktopCountdownHours) desktopCountdownHours.textContent = String(hours).padStart(2, '0');
        if (desktopCountdownMinutes) desktopCountdownMinutes.textContent = String(minutes).padStart(2, '0');
        if (desktopCountdownSeconds) desktopCountdownSeconds.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysElement) {
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
            }
            if (desktopCountdownDays) {
                desktopCountdownDays.textContent = '00';
                desktopCountdownHours.textContent = '00';
                desktopCountdownMinutes.textContent = '00';
                desktopCountdownSeconds.textContent = '00';
            }
        }
    }

    let countdownInterval = setInterval(updateCountdown, 1000);

    // Fungsi untuk memutar musik
    function playMusic() {
        if (audioPlayer) {
            audioPlayer.play().catch(error => {
                console.error("Gagal memutar musik:", error);
                // Mungkin perlu menampilkan pesan ke pengguna untuk mengizinkan pemutaran audio
            });
        }
    }

    // Animasi smooth hero ke atas dan tampilkan navbar saat tombol dibuka
    if (openInvitationButton && hero && mainNavbar) {
        openInvitationButton.addEventListener('click', function(event) {
            event.preventDefault();
            hero.style.transition = 'transform 0.5s ease-in-out';
            hero.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                hero.style.display = 'none';
                mainNavbar.style.display = 'flex';
                playMusic();
                // Scroll ke bagian #home setelah animasi selesai (sedikit jeda)
                setTimeout(() => {
                    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                }, 600);
            }, 500);
            if (desktopHero && mobileHero) {
                desktopHero.style.display = 'flex';
                mobileHero.style.display = 'none';
            }
        });
    }

    // Smooth scrolling untuk navigasi navbar
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Tambahkan event listener untuk scroll untuk mengubah warna navbar aktif
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= (sectionTop - (window.innerHeight / 2))) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // Mendapatkan nama tamu dari URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('p');
    if (guestParam) {
        if (guestNameElement) {
            guestNameElement.textContent = guestParam;
        }
        if (desktopGuestNameElement) {
            desktopGuestNameElement.textContent = guestParam;
        }
    }

    // Sembunyikan navbar di awal (untuk tampilan hero) pada perangkat mobile
    if (mainNavbar && mobileHero) {
        mainNavbar.style.display = 'none';
    }
    if (mainNavbar && desktopHero) {
        mainNavbar.style.position = 'fixed';
        mainNavbar.style.top = '0';
    }

    // Set background image untuk hero desktop
    const backgroundImage = 'path/ke/foto/anda.jpg'; // Ganti dengan path gambar Anda
    if (desktopHeroLeft) {
        desktopHeroLeft.style.backgroundImage = `url('${backgroundImage}')`;
    }
});
