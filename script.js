document.addEventListener('DOMContentLoaded', () => {
  // ===== ORDER PAGE LOGIC =====
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
    const qty = parseFloat(quantity?.value);
    const price = parseFloat(pricePerKg?.value);
    if (totalPrice) {
      totalPrice.value = (!isNaN(qty) && !isNaN(price)) ? (qty * price).toFixed(2) : '';
    }
  }

  quantity?.addEventListener('input', updateTotal);
  pricePerKg?.addEventListener('input', updateTotal);

  // Show/hide payment fields
  paymentSelect?.addEventListener('change', () => {
    if (paymentSelect.value === 'cod') {
      if (paymentFields) paymentFields.style.display = 'none';
      trxId?.removeAttribute('required');
      senderNumber?.removeAttribute('required');
      if (paymentConfirmed) paymentConfirmed.value = 'Not Required';
    } else {
      if (paymentFields) paymentFields.style.display = 'block';
      trxId?.setAttribute('required', true);
      senderNumber?.setAttribute('required', true);
      if (paymentConfirmed) paymentConfirmed.value = 'Confirmed';
    }
  });

  // ===== LANGUAGE TOGGLE =====
  let currentLang = localStorage.getItem('lang') || 'bn';
  const langEnBtn = document.getElementById('langEn');
  const langBnBtn = document.getElementById('langBn');

  setLanguage(currentLang); // Apply saved/default language

  if (langEnBtn && langBnBtn) {
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langBnBtn.addEventListener('click', () => setLanguage('bn'));
    highlightActiveLangButton();
  }

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
    if (langEnBtn && langBnBtn) {
      langEnBtn.classList.toggle('btn-warning', currentLang === 'en');
      langBnBtn.classList.toggle('btn-warning', currentLang === 'bn');
      langEnBtn.classList.toggle('btn-light', currentLang !== 'en');
      langBnBtn.classList.toggle('btn-light', currentLang !== 'bn');
    }
  }

  // ===== NAVIGATION ACTIVE HIGHLIGHT =====
  function highlightActiveNav() {
    const currentPage = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  highlightActiveNav();
});
