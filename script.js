document.getElementById('langToggle').addEventListener('click', function() {
  alert('Language switching will be added soon.');
});

document.querySelectorAll('.lang-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll('.lang').forEach(el => {
      el.innerText = el.dataset[lang];
    });
  });
});
