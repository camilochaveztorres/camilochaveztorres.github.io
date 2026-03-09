
const body = document.body;
    const html = document.documentElement;
    const themeToggleButton = document.getElementById('theme-toggle');
    const languageToggleButton = document.getElementById('language-toggle');

    function applyTheme(theme) {
      body.classList.toggle('light-theme', theme === 'light');
      themeToggleButton.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
      localStorage.setItem('theme', theme);
    }

    function applyLanguage(language) {
      html.lang = language;

      document.querySelectorAll('[data-en]').forEach((element) => {
        element.textContent = language === 'sv' ? element.dataset.sv : element.dataset.en;
      });

      languageToggleButton.textContent = language === 'sv' ? 'EN' : 'SV';
      localStorage.setItem('language', language);
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLanguage = localStorage.getItem('language') || 'en';

    applyTheme(savedTheme);
    applyLanguage(savedLanguage);

    themeToggleButton.addEventListener('click', () => {
      const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
      applyTheme(nextTheme);
    });

    languageToggleButton.addEventListener('click', () => {
      const nextLanguage = html.lang === 'sv' ? 'en' : 'sv';
      applyLanguage(nextLanguage);
    });
