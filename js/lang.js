const currentLang = document.getElementById('currentLang');
const langSelect = document.querySelector('.popup__language-select');

currentLang.addEventListener('click', () => {
    langSelect.classList.toggle('show');
});

langSelect.addEventListener('click', (e) => {
    const button = e.target.closest('.popup__language-btn');
    if (button) {
        const selectedLang = button.dataset.lang;
        const selectedText = button.textContent;

        currentLang.textContent = `${selectedText}`;
        langSelect.classList.remove('show');

        // Вызов функции смены языка
        changeLanguage(selectedLang);
    }
});

function changeLanguage(lang) {
    // 1. Определяем название страницы
    const pathname = window.location.pathname;
    let page = 'earth'; // default fallback
    if (pathname.includes('moon')) page = 'moon';
    else if (pathname.includes('mars')) page = 'mars';
    else if (pathname.includes('earth') || pathname === '/') page = 'earth';

    // 2. Загружаем JSON с переводами
    fetch(`locales/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            const translations = data[page];

            // 3. Применяем переводы
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) {
                    el.innerHTML = translations[key];

                    const header_link = el.closest('.header__item-link');
                    if (header_link && header_link.hasAttribute('data-text')) {
                        header_link.setAttribute('data-text', translations[key]);
                    }
                }
            });

            // 4. Сохраняем язык в localStorage
            localStorage.setItem('lang', lang);
        })
        .catch(err => console.error("Language error:", err));
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    const currentLangButton = document.getElementById('currentLang');

    // Устанавливаем текст выбранного языка в кнопку
    const langTextMap = {
        en: 'English',
        de: 'Deutsch',
        ua: 'Українська'
    };
    currentLangButton.textContent = langTextMap[savedLang];

    // Применяем переводы
    changeLanguage(savedLang);
});
