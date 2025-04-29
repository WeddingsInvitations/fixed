document.addEventListener('DOMContentLoaded', function() {
    const bukaUndanganBtn = document.getElementById('buka-undangan');
    const heroSection = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const audioUndangan = document.getElementById('audio-undangan');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('.section');
    const namaTamuElement = document.querySelector('.nama-tamu');
    const countdownElements = {
        hari: document.getElementById('hari'),
        jam: document.getElementById('jam'),
        menit: document.getElementById('menit'),
        detik: document.getElementById('detik')
    };
    const tanggalNikah = new Date('2025-05-05T09:00:00').getTime(); // Ganti dengan tanggal dan waktu pernikahan Anda

    // Fungsi untuk mendapatkan parameter dari URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set nama tamu jika ada parameter 'p' di URL
    const namaTamuDariUrl = getQueryParam('p');
    if (namaTamuDariUrl) {
        namaTamuElement.textContent = `Bapak/Ibu/Saudara/i ${namaTamuDariUrl}`;
    }

    // Countdown Timer
    const updateCountdown = () => {
        const now = new Date().getTime();
        const selisih = tanggalNikah - now;

        if (selisih < 0) {
            clearInterval(countdownInterval);
            Object.values(countdownElements).forEach(el => el.textContent = '00');
            return;
        }

        const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);

        countdownElements.hari.textContent = String(hari).padStart(2, '0');
        countdownElements.jam.textContent = String(jam).padStart(2, '0');
        countdownElements.menit.textContent = String(menit).padStart(2, '0');
        countdownElements.detik.textContent = String(detik).padStart(2, '0');
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    // Efek smooth scroll ke bagian
    const scrollToSection = (hash) => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - (navbar ? navbar.offsetHeight : 0),
                behavior: 'smooth'
            });
        }
    };

    // Event listener untuk tombol Buka Undangan
    bukaUndanganBtn.addEventListener('click', () => {
        heroSection.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        heroSection.style.opacity = 0;
        heroSection.style.transform = 'translateY(-100%)';
        if (navbar) {
            navbar.style.display = 'flex';
        }
        audioUndangan.play();
        scrollToSection('#home');
    });

    // Event listener untuk navigasi navbar
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('href');
            scrollToSection(target);
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Ubah warna aktif navbar saat scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5, // Ubah sesuai kebutuhan kapan warna aktif berubah
        rootMargin: navbar ? `-${navbar.offsetHeight}px 0px 0px 0px` : '0px 0px 0px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Sembunyikan navbar di awal
    if (navbar) {
        navbar.style.display = 'none';
    }

    // Deteksi ukuran layar untuk layout desktop
    const checkDesktopView = () => {
        if (window.innerWidth >= 768) {
            bukaUndanganBtn.addEventListener('click', () => {
                document.body.classList.add('desktop-view');
                heroSection.style.display = 'none';
                if (navbar) {
                    navbar.style.display = 'flex';
                }
                audioUndangan.play();
                scrollToSection('#home');
            }, { once: true }); // Pastikan event listener hanya dijalankan sekali
        }
    };

    checkDesktopView();
    window.addEventListener('resize', checkDesktopView);
});

