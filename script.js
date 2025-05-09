let currentLang = localStorage.getItem('lang') || 'en';
setLanguage(currentLang);

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
// Highlight active nav link
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
