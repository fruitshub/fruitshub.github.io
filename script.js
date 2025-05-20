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

 const divisionData = {
 "Dhaka": {
    "Dhaka": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar", "Dhaka North", "Dhaka South"],
    "Gazipur": ["Gazipur Sadar", "Kaliakoir", "Kaliganj", "Kapasia", "Sreepur"],
    "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
    "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shibalaya", "Singair"],
    "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
    "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
    "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
    "Rajbari": ["Baliakandi", "Goalanda", "Pangsha", "Rajbari Sadar", "Kalukhali"],
    "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shakhipur", "Shariatpur Sadar"],
    "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"]
  },
  "Chattogram": {
    "Chattogram": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
    "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
    "Bandarban": ["Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
    "Brahmanbaria": ["Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
    "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
    "Cumilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Comilla Adarsha Sadar", "Comilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Meghna", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"],
    "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Sonagazi"],
    "Khagrachari": ["Dighinala", "Khagrachari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
    "Lakshmipur": ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
    "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Subarnachar"],
    "Rangamati": ["Baghaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"]
  },
  "Barisal": {
    "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
    "Barisal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barisal Sadar", "Gournadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
    "Bhola": ["Bhola Sadar", "Borhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
    "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
    "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
    "Pirojpur": ["Bhandaria", "Kaukhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"]
  },
  "Khulna": {
    "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
    "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
    "Jessore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Jessore Sadar", "Manirampur", "Sharsha"],
    "Jhenaidah": ["Harinakundu", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
    "Khulna": ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada", "Khulna Sadar"],
    "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
    "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
    "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
    "Narail": ["Kalia", "Lohagara", "Narail Sadar", "Naragati"],
    "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"]
  },
  "Mymensingh": {
    "Jamalpur": ["Baksiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
    "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Mymensingh Sadar", "Nandail", "Phulpur", "Trishal"],
    "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
    "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"]
  },
    "Rajshahi": {
  "Bogura": ["Adamdighi", "Bogra Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
  "Chapai Nawabganj": ["Bholahat", "Gomastapur", "Nachole", "Nawabganj Sadar", "Shibganj"],
  "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
  "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  "Natore": ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Natore Sadar", "Singra"],
  "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
  "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Rajshahi Sadar", "Tanore"],
  "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"]
},
    "Rangpur": {
  "Dinajpur": ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Fulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
  "Gaibandha": ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
  "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Fulbari", "Kurigram Sadar", "Nageshwari", "Rajarhat", "Raomari", "Ulipur"],
  "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
  "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
  "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
  "Rangpur": ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
  "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
},
    "Sylhet": {
  "Habiganj": ["Ajmiriganj", "Bahubal", "Baniachang", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj"],
  "Moulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
  "Sunamganj": ["Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur"],
  "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmaninagar", "Sylhet Sadar", "Zakiganj"]
};

  // Populate divisions on page load
  window.onload = function() {
    const divisionSelect = document.getElementById('division');
    for (let division in divisionData) {
      let option = document.createElement('option');
      option.value = division;
      option.text = division;
      divisionSelect.add(option);
    }
  };

  // Populate districts based on selected division
  function populateDistricts() {
    const divisionSelect = document.getElementById('division');
    const districtSelect = document.getElementById('district');
    const upazilaSelect = document.getElementById('upazila');
    const selectedDivision = divisionSelect.value;

    // Clear previous options
    districtSelect.innerHTML = '<option value="">Select District</option>';
    upazilaSelect.innerHTML = '<option value="">Select Upazila</option>';

    if (selectedDivision && divisionData[selectedDivision]) {
      const districts = Object.keys(divisionData[selectedDivision]);
      districts.forEach(district => {
        let option = document.createElement('option');
        option.value = district;
        option.text = district;
        districtSelect.add(option);
      });
    }
  }

  // Populate upazilas based on selected district
  function populateUpazilas() {
    const divisionSelect = document.getElementById('division');
    const districtSelect = document.getElementById('district');
    const upazilaSelect = document.getElementById('upazila');
    const selectedDivision = divisionSelect.value;
    const selectedDistrict = districtSelect.value;

    // Clear previous options
    upazilaSelect.innerHTML = '<option value="">Select Upazila</option>';

    if (
      selectedDivision &&
      selectedDistrict &&
      divisionData[selectedDivision] &&
      divisionData[selectedDivision][selectedDistrict]
    ) {
      const upazilas = divisionData[selectedDivision][selectedDistrict];
      upazilas.forEach(upazila => {
        let option = document.createElement('option');
        option.value = upazila;
        option.text = upazila;
        upazilaSelect.add(option);
      });
    }
  }

  // Function to update price per kg based on selected mango type
  function updatePrice() {
    const mangoTypeSelect = document.getElementById('mangoType');
    const pricePerKgInput = document.getElementById('pricePerKg');
    const selectedOption = mangoTypeSelect.options[mangoTypeSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    pricePerKgInput.value = price;
    calculateTotal();
  }

  // Function to calculate total price including courier charges
  function calculateTotal() {
    const pricePerKg = parseFloat(document.getElementById('pricePerKg').value) || 0;
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const division = document.getElementById('division').value;
    const courierType = document.querySelector('input[name="courier_type"]:checked').value;

    let courierChargePerKg = 0;

    if (division === "Dhaka") {
      courierChargePerKg = courierType === "point" ? 13 : 22;
    } else {
      courierChargePerKg = courierType === "point" ? 16 : 25;
    }

    const totalCourierCharge = courierChargePerKg * quantity;
    const totalPrice = (pricePerKg * quantity) + totalCourierCharge;

    document.getElementById('totalPrice').value = totalPrice.toFixed(2);
  }
