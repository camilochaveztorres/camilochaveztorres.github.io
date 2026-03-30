const body = document.body;
const html = document.documentElement;
const themeToggleButton = document.getElementById('theme-toggle');
const languageToggleButton = document.getElementById('language-toggle');

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