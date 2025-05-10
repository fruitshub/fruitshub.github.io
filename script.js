// Set Bangla ('bn') as default if no language is stored
let currentLang = localStorage.getItem('lang') || 'bn';
setLanguage(currentLang);

// Language toggle buttons
document.getElementById('langEn').addEventListener('click', () => setLanguage('en'));
document.getElementById('langBn').addEventListener('click', () => setLanguage('bn'));

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateLanguage();
  highlightActiveLangButton();
}

function updateLanguage() {
  document.querySelectorAll('.lang').forEach(el => {
    const text = el.dataset[currentLang];
    if (text) el.textContent = text;
  });
}

function highlightActiveLangButton() {
  document.getElementById('langEn').classList.toggle('btn-warning', currentLang === 'en');
  document.getElementById('langBn').classList.toggle('btn-warning', currentLang === 'bn');
  document.getElementById('langEn').classList.toggle('btn-light', currentLang !== 'en');
  document.getElementById('langBn').classList.toggle('btn-light', currentLang !== 'bn');
}

// Highlight the active navigation link
function highlightActiveNav() {
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

highlightActiveNav();
