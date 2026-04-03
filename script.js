const body = document.body;
const html = document.documentElement;
const themeToggleButton = document.getElementById('theme-toggle');

function applyTheme(theme) {
    body.classList.toggle('light-theme', theme === 'light');
    themeToggleButton.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggleButton.addEventListener('click', () => {
    const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
});

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