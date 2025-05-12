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

  // Also update payment instruction text if visible
  const payment = document.getElementById('payment');
  if (payment) updatePaymentVisibility();
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
  const paymentField = document.getElementById('payment');

  if (paymentField) {
    paymentField.addEventListener('change', updatePaymentVisibility);
    updatePaymentVisibility(); // call on page load
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    const payment = document.getElementById('payment').value;

    if (payment === 'cod') {
      // COD: Submit form normally
      return;
    }

    // Prevent default form submission for online payment
    e.preventDefault();

    const formData = new FormData(form);
    const orderData = {};

    formData.forEach((value, key) => {
      orderData[key] = value;
    });

    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    window.location.href = 'thank-you.html'; // Optional: you can use payment page if needed
  });
});

function updatePaymentVisibility() {
  const method = document.getElementById('payment').value;
  const details = document.getElementById('paymentDetails');
  const instruction = document.getElementById('paymentInstruction');

  const info = {
    cod: {
      en: '',
      bn: ''
    },
    bkash: {
      en: 'Send money to bKash Personal Number: 📱 01920-539997. Please complete the form below after payment.',
      bn: 'বিকাশ পার্সোনাল নম্বরে টাকা পাঠান: 📱 ০১৯২০-৫৩৯৯৯৭। পেমেন্ট করার পরে নিচের ফর্মটি পূরণ করুন।'
    },
    nagad: {
      en: 'Send money to Nagad Number: 📱 01743-127122. Please complete the form below after payment.',
      bn: 'নগদ নম্বরে টাকা পাঠান: 📱 ০১৭৪৩-১২৭১২২। পেমেন্ট করার পরে নিচের ফর্মটি পূরণ করুন।'
    },
    rocket: {
      en: 'Send money to Rocket Number: 📱 01743-127122. Please complete the form below after payment.',
      bn: 'রকেট নম্বরে টাকা পাঠান: 📱 ০১৭৪৩-১২৭১২২। পেমেন্ট করার পরে নিচের ফর্মটি পূরণ করুন।'
    },
    bank: {
      en: 'Transfer to Bank - Dutch Bangla Bank. A/C: 1791030100041, Name: Md. Moshiur Rahman, Routing: 090331639.',
      bn: 'ব্যাংক ট্রান্সফার করুন - ডাচ্-বাংলা ব্যাংক। একাউন্ট: 1791030100041, নাম: মোঃ মশিউর রহমান, রাউটিং: 090331639।'
    }
  };

  if (method === 'cod') {
    details.classList.add('d-none');
    instruction.classList.add('d-none');
  } else {
    const lang = localStorage.getItem('lang') || 'bn';
    instruction.dataset.en = info[method].en;
    instruction.dataset.bn = info[method].bn;
    instruction.classList.remove('d-none');
    details.classList.remove('d-none');
  }

  updateLanguage(); // Apply current language text to instruction
}
