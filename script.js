const body = document.body;
const html = document.documentElement;
const themeToggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-desktop');

function applyTheme(theme) {
    body.classList.toggle('light-theme', theme === 'light');

    themeToggleButtons.forEach((button) => {
        button.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
    });

    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(nextTheme);
    });
});

const navToggleButton = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggleButton && mobileNav) {
    navToggleButton.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('nav-open');
        navToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggleButton.textContent = isOpen ? '✕' : '☰';
    });
}

const specThumbs = document.querySelectorAll('.spec-thumb');
const specMediaItems = document.querySelectorAll('.spec-media-item');

specThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        const targetIndex = thumb.dataset.target;
        const targetMedia = document.getElementById(`spec-media-${targetIndex}`);

        specThumbs.forEach((button) => button.classList.remove('active'));

        specMediaItems.forEach((item) => {
            item.classList.remove('active');

            if (item.tagName === 'VIDEO') {
                item.pause();
                item.currentTime = 0;
            }
        });

        thumb.classList.add('active');
        targetMedia.classList.add('active');

        if (targetMedia.tagName === 'VIDEO') {
            targetMedia.play().catch(() => { });
        }
    });
});

const videos = document.querySelectorAll('.spec-feature-media video');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play();
        } else {
            video.pause();
        }
    });
}, {
    threshold: 0.5 // 50% måste synas
});

videos.forEach(video => {
    observer.observe(video);
});

const jobButtons = document.querySelectorAll('.spec-job-button');
const jobVideos = document.querySelectorAll('.spec-job-video');
const jobCaptions = document.querySelectorAll('[data-job-caption]');

jobButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const targetIndex = button.dataset.jobTarget;
        const targetVideo = document.getElementById(`job-video-${targetIndex}`);

        jobButtons.forEach((btn) => btn.classList.remove('active'));
        jobVideos.forEach((video) => {
            video.classList.remove('active');
            video.pause();
            video.currentTime = 0;
        });
        jobCaptions.forEach((caption) => caption.classList.remove('active'));

        button.classList.add('active');

        if (targetVideo) {
            targetVideo.classList.add('active');
            targetVideo.play().catch(() => {});
        }

        const targetCaption = document.querySelector(`[data-job-caption="${targetIndex}"]`);
        if (targetCaption) {
            targetCaption.classList.add('active');
        }
    });
});