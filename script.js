document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const quantity = document.getElementById('quantity');
  const pricePerKg = document.getElementById('pricePerKg');
  const totalPrice = document.getElementById('totalPrice');
  const paymentSelect = document.getElementById('payment');
  const paymentFields = document.getElementById('paymentFields');
  const trxId = document.getElementById('trxId');
  const senderNumber = document.getElementById('senderNumber');
  const noteField = document.getElementById('note');
  const paymentConfirmed = document.getElementById('paymentConfirmed');

  // Auto calculate total price
  function updateTotal() {
    const qty = parseFloat(quantity.value);
    const price = parseFloat(pricePerKg.value);
    totalPrice.value = (!isNaN(qty) && !isNaN(price)) ? (qty * price).toFixed(2) : '';
  }

  quantity.addEventListener('input', updateTotal);
  pricePerKg.addEventListener('input', updateTotal);

  // Show/hide payment fields
  paymentSelect.addEventListener('change', () => {
    if (paymentSelect.value === 'cod') {
      paymentFields.style.display = 'none';
      trxId.removeAttribute('required');
      senderNumber.removeAttribute('required');
      paymentConfirmed.value = 'Not Required';
    } else {
      paymentFields.style.display = 'block';
      trxId.setAttribute('required', true);
      senderNumber.setAttribute('required', true);
      paymentConfirmed.value = 'Confirmed';
    }
  });

  // Language support
  let currentLang = localStorage.getItem('lang') || 'bn';
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
});
