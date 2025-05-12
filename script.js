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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const payment = document.getElementById('payment').value;

    if (payment === 'cod') {
      // Let the form submit directly to Google Sheets
      return;
    }

    // Prevent default submission for online payment methods
    e.preventDefault();

    const formData = new FormData(form);
    const orderData = {};

    formData.forEach((value, key) => {
      orderData[key] = value;
    });

    // Save to localStorage
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));

    // Redirect to appropriate payment page
    let redirectUrl = '#';
    if (payment === 'bkash') redirectUrl = 'payment-bkash.html';
    else if (payment === 'nagad') redirectUrl = 'payment-nagad.html';
    else if (payment === 'rocket') redirectUrl = 'payment-rocket.html';
    else if (payment === 'bank') redirectUrl = 'payment-bank.html';

    window.location.href = redirectUrl;
  });
});
