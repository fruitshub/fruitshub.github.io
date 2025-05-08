let currentLang = 'en';

document.getElementById('langToggle').addEventListener('click', function () {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  updateLanguage();
  this.textContent = currentLang === 'en' ? 'বাংলা' : 'English';
});

function updateLanguage() {
  document.querySelectorAll('.lang').forEach(el => {
    const translation = el.dataset[currentLang];
    if (translation) {
      el.textContent = translation;
    }
  });
}
