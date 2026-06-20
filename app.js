/* ==========================================================================
   Cairo Vape E-Commerce JS Storefront Logic
   ========================================================================== */

// 🌐 Localization Translations Map
const TRANSLATIONS = {
  en: {
    trackOrder: "Track Order",
    cartTitle: "Shopping Cart",
    cairoArea: "Cairo & Greater Cairo Area",
    heroTitle: "PREMIUM VAPE SELECTION",
    heroDesc: "Get premium devices, disposables, pod systems, and e-liquids delivered straight to your Cairo doorstep within 3 hours. Cash on delivery.",
    fastDelivery: "3-Hour Shipping",
    codTag: "Cash on Delivery",
    ageTag: "21+ Age Verified",
    categories: "Categories",
    all: "All Products",
    devices: "Devices",
    disposables: "Disposables",
    eliquids: "E-Liquids",
    accessories: "Accessories",
    bestSeller: "Best Seller",
    newArrival: "New",
    addToCart: "Add to Cart",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    nicotine: "Nicotine Level",
    flavor: "Flavor",
    specifications: "Specifications",
    battery: "Battery Capacity",
    capacity: "Liquid Capacity",
    resistance: "Resistance",
    reviews: "Reviews",
    emptyCart: "Your cart is empty.",
    checkout: "Checkout via WhatsApp",
    deliveryTitle: "Delivery Destination",
    selectAddress: "Pin location on map",
    subtotal: "Subtotal",
    deliveryFee: "Cairo Delivery Fee",
    total: "Total",
    cod: "Cash on Delivery (COD)",
    orderTracking: "Order Status Tracking",
    trackId: "Order Reference",
    trackPlaced: "Placed Time",
    trackAddress: "Destination",
    trackAmount: "Total Bill",
    step1Title: "Order Placed",
    step1Desc: "We have received your order ticket and routing to Cairo processing center.",
    step2Title: "Preparing & Packing",
    step2Desc: "Flavors, battery capacity, and pod resistances are checked and sealed.",
    step3Title: "Out for Delivery",
    step3Desc: "Our motorcycle shipping representative is driving to your pin location.",
    step4Title: "Delivered",
    step4Desc: "Order confirmed and signed against cash payment.",
    trackHelpBtn: "Ask Support on WhatsApp",
    confirmLocation: "Confirm Pin Location",
    mapHeader: "Select Address - Cairo Maps Picker",
    searchPlaceholder: "Search devices, pods, flavors...",
    mapSearchPlaceholder: "Search Cairo neighborhoods (e.g. Maadi)...",
    notesPlaceholder: "Additional details (e.g. Apartment, floor, building number, district...)",
    discount: "Discount",
    loyaltyPoints: "Loyalty Points:",
    redeemPoints: "Redeem Points (10 pts = 1 EGP)"
  },
  ar: {
    trackOrder: "تتبع طلبك",
    cartTitle: "سلة المشتريات",
    cairoArea: "القاهرة وضواحيها الكبرى",
    heroTitle: "تشكيلة فيب فاخرة",
    heroDesc: "احصل على أفضل الأجهزة، البودات، النكهات والديسبوزابل مباشرة إلى باب منزلك بالقاهرة خلال ٣ ساعات. الدفع عند الاستلام.",
    fastDelivery: "توصيل خلال ٣ ساعات",
    codTag: "الدفع عند الاستلام",
    ageTag: "+٢١ التحقق من السن",
    categories: "الأقسام",
    all: "الكل",
    devices: "أجهزة الفيب",
    disposables: "ديسبوزابل",
    eliquids: "نكهات / ليكويد",
    accessories: "اكسسوارات وبودات",
    bestSeller: "الأكثر مبيعاً",
    newArrival: "جديد",
    addToCart: "أضف للسلة",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    nicotine: "نسبة النيكوتين",
    flavor: "النكهة",
    specifications: "المواصفات",
    battery: "سعة البطارية",
    capacity: "سعة السائل",
    resistance: "المقاومة",
    reviews: "تقييمات",
    emptyCart: "سلة المشتريات فارغة.",
    checkout: "تأكيد الطلب عبر الواتساب",
    deliveryTitle: "عنوان التوصيل",
    selectAddress: "حدد موقعك على الخريطة",
    subtotal: "المجموع الفرعي",
    deliveryFee: "تكلفة التوصيل للقاهرة",
    total: "الإجمالي",
    cod: "الدفع نقداً عند الاستلام (COD)",
    orderTracking: "حالة تتبع الطلب",
    trackId: "رقم مرجع الطلب",
    trackPlaced: "وقت الطلب",
    trackAddress: "موقع التوصيل",
    trackAmount: "الحساب الإجمالي",
    step1Title: "تم استلام الطلب",
    step1Desc: "تلقينا طلبك وجاري توجيهه لمركز التجهيز بالقاهرة.",
    step2Title: "جاري التعبئة والتغليف",
    step2Desc: "يتم فحص النكهات، والبطاريات، والتأكد من إحكام الغلق قبل الشحن.",
    step3Title: "خرج مع مندوب التوصيل",
    step3Desc: "مندوب الشحن على الدراجة النارية متوجه الآن لموقع الدبوس الخاص بك.",
    step4Title: "تم التوصيل بنجاح",
    step4Desc: "تم تأكيد الاستلام ودفع الحساب للمندوب.",
    trackHelpBtn: "استفسار عبر الواتساب",
    confirmLocation: "تأكيد موقع التوصيل",
    mapHeader: "تحديد العنوان - خريطة القاهرة",
    searchPlaceholder: "ابحث عن أجهزة، نكهات، بودات...",
    mapSearchPlaceholder: "ابحث عن أحياء القاهرة (مثال: المعادي)...",
    notesPlaceholder: "تفاصيل إضافية (رقم الشقة، الدور، المبنى، اسم الشارع، المنطقة...)",
    discount: "الخصم",
    loyaltyPoints: "نقاط الولاء:",
    redeemPoints: "استبدال النقاط (١٠ نقاط = ١ جنيه)"
  }
};

// 📦 Core Egyptian Vape Products catalog Database
const DEFAULT_PRODUCTS = [
  {
    id: 'eg_1',
    name: 'Al Fakher Crown Bar 60K Puffs',
    category: 'disposables',
    price: 1100,
    image: 'https://www.betavape.com/wp-content/uploads/2026/06/1781530891_al-fakher-e-hose-x-60000-puffs-peach-ice.webp',
    nicotineLevels: ['5% (50mg)', '2% (20mg)'],
    flavors: ['Peach Ice', 'Double Apple', 'Grape Mint', 'Blue Razz Ice'],
    battery: '1000mAh Rechargeable',
    capacity: 'Approx. 50ml Pre-filled Juice',
    resistance: '0.6Ω Mesh Coil',
    description: 'Hookah-inspired high puff disposable. Real Al Fakher shisha-style taste with Curve LCD screen monitoring juice & battery level.',
    rating: 4.9,
    reviewsCount: 312,
    inStock: true
  },
  {
    id: 'eg_2',
    name: 'Vozol Star 20000 Puffs',
    category: 'disposables',
    price: 950,
    image: 'https://www.betavape.com/wp-content/uploads/2026/02/1724399026_Tropical20Blast-247x247.webp',
    nicotineLevels: ['5% (50mg)', '2% (20mg)'],
    flavors: ['Tropical Blast', 'Watermelon Ice', 'Strawberry Kiwi', 'Blueberry Storm'],
    battery: '650mAh Rechargeable',
    capacity: '20ml Pre-filled Juice',
    resistance: 'Dual Mesh Coil',
    description: 'Eco-friendly high capacity disposable vape with full curved screen, visual battery indicator, and fast charging support.',
    rating: 4.8,
    reviewsCount: 198,
    inStock: true
  },
  {
    id: 'eg_3',
    name: 'Waka Smash 15000 Puffs',
    category: 'disposables',
    price: 850,
    image: 'https://www.betavape.com/wp-content/uploads/2025/12/1743619529_B54BEBC9-8B67-480C-BEC2-472D12976874-247x247.webp',
    nicotineLevels: ['5% (50mg)'],
    flavors: ['Aloe Grape Ice', 'Watermelon Ice', 'Banana Cherry'],
    battery: '600mAh Rechargeable',
    capacity: '18ml Juice',
    resistance: 'Mesh Coil tech',
    description: 'Compact box-style disposable vape featuring dual mesh coils for rich flavor delivery and up to 15,000 dense vapor clouds.',
    rating: 4.7,
    reviewsCount: 86,
    inStock: true
  },
  {
    id: 'eg_4',
    name: 'OXBAR G8000 Disposable',
    category: 'disposables',
    price: 700,
    image: 'https://www.betavape.com/wp-content/uploads/2026/02/1715653264_MAD20BLUE-247x247.webp',
    nicotineLevels: ['5% (50mg)'],
    flavors: ['Mad Blue', 'Strawberry Watermelon', 'Peach Mango'],
    battery: '650mAh Rechargeable',
    capacity: '16ml Pre-filled',
    resistance: '1.2Ω Mesh Coil',
    description: 'Stunning crystal shell transparent design disposable with high nicotine delivery and satisfying flavor output.',
    rating: 4.7,
    reviewsCount: 140,
    inStock: true
  },
  {
    id: 'eg_5',
    name: 'MOTI 7000 Puffs Disposable',
    category: 'disposables',
    price: 650,
    image: 'https://www.betavape.com/wp-content/uploads/2026/05/1707021734_383093973_616030317361770_1536419869813227828_n-247x247.webp',
    nicotineLevels: ['2% (20mg)', '5% (50mg)'],
    flavors: ['Strawberry Banana', 'Watermelon Ice', 'Peach Ice'],
    battery: '600mAh Rechargeable',
    capacity: '14ml juice capacity',
    resistance: '1.1Ω Mesh',
    description: 'Ergonomic shape vape kit offering rich strawberry banana mix clouds. Very popular entry level choice in Cairo.',
    rating: 4.6,
    reviewsCount: 79,
    inStock: true
  },
  {
    id: 'eg_6',
    name: 'Vaporesso XROS 4 Pod Kit',
    category: 'devices',
    price: 1850,
    image: 'img_device.png',
    nicotineLevels: ['N/A (Refillable Pods)'],
    flavors: ['Classic Cyan', 'Matte Black', 'Silver Flare'],
    battery: '1000mAh Built-in',
    capacity: '3ml Refillable pods',
    resistance: '0.4Ω / 0.8Ω MESH Pods',
    description: 'The premier open pod system device with complete output control, aluminum body, and fast USB-C charge.',
    rating: 4.9,
    reviewsCount: 420,
    inStock: true
  },
  {
    id: 'eg_7',
    name: 'Nasty Juice Cush Man Mango Grape',
    category: 'eliquids',
    price: 650,
    image: 'img_ejuice.png',
    nicotineLevels: ['3mg Freebase', '35mg SaltNic', '50mg SaltNic'],
    flavors: ['Mango Grape Low Mint'],
    battery: 'N/A',
    capacity: '60ml Bottle / 30ml Salt Bottle',
    resistance: 'N/A',
    description: 'Award-winning e-liquid juice representing rich sweet mangoes mixed with fresh grapes and low cooling mint.',
    rating: 4.8,
    reviewsCount: 512,
    inStock: true
  },
  {
    id: 'eg_8',
    name: 'OXVA Xlim V3 Cartridges (3 Pack)',
    category: 'accessories',
    price: 450,
    image: 'img_accessories.png',
    nicotineLevels: ['N/A'],
    flavors: ['0.6 ohm Pods', '0.8 ohm Pods'],
    battery: 'N/A',
    capacity: '2ml Top Fill Cartridges',
    resistance: '0.6Ω / 0.8Ω',
    description: 'Anti-leak replacement cartridges compatible with the OXVA Xlim Pro, Xlim SQ Pro, and Xlim SE pod systems.',
    rating: 4.7,
    reviewsCount: 205,
    inStock: true
  }
];

// 🗺️ Simulated Cairo Locations Database
const MAP_LOCATIONS = {
  zamalek: { name: "Zamalek, Cairo Island, Cairo", lat: 30.0634, lng: 31.2223 },
  heliopolis: { name: "Heliopolis, Cairo Governorate", lat: 30.0901, lng: 31.3229 },
  maadi: { name: "Road 9, Maadi, Cairo", lat: 29.9602, lng: 31.2625 },
  newcairo: { name: "90th Street (South), New Cairo, Cairo", lat: 30.0166, lng: 31.4913 }
};

// 🗃️ Application State Repository (persisted in LocalStorage)
const STATE = {
  locale: 'en',
  cart: [],
  selectedCategory: 'all',
  searchQuery: '',
  
  // Selection states for the details drawer
  activeDetailProduct: null,
  selectedNicotine: '',
  selectedFlavor: '',
  detailQuantity: 1,

  // Address picking states
  tempSelectedMapLocation: MAP_LOCATIONS.newcairo,
  confirmedAddress: null, // { addressString, lat, lng, notes }

  // Promo Rewards & Coupon states
  loyaltyPoints: 120, // default starting balance for demonstration
  redeemedPointsVal: 0, // points spent on current order
  appliedCoupon: null, // active coupon object (code, type, value)

  // Active tracking order states
  activeOrder: null, // { referenceId, time, address, total, stage }
  trackingInterval: null
};

// ==========================================================================
// LocalStorage Persistence Handlers
// ==========================================================================
let productsCatalog = [];
let ordersHistory = [];

function loadDataFromStorage() {
  // Database version control to migrate data to real Egyptian vape products
  const dbVersion = localStorage.getItem('vape_db_version');
  
  if (dbVersion !== '4') {
    // Migration to updated database structure
    productsCatalog = [...DEFAULT_PRODUCTS];
    localStorage.setItem('vape_products', JSON.stringify(productsCatalog));
    localStorage.setItem('vape_db_version', '4');
  } else {
    const storedProd = localStorage.getItem('vape_products');
    if (storedProd) {
      productsCatalog = JSON.parse(storedProd);
    } else {
      productsCatalog = [...DEFAULT_PRODUCTS];
      localStorage.setItem('vape_products', JSON.stringify(productsCatalog));
    }
  }

  // Load orders history logs
  const storedOrders = localStorage.getItem('vape_orders');
  if (storedOrders) {
    ordersHistory = JSON.parse(storedOrders);
  } else {
    ordersHistory = [];
  }

  // Load user loyalty points balance
  const storedPoints = localStorage.getItem('vape_loyalty_points');
  if (storedPoints) {
    STATE.loyaltyPoints = parseInt(storedPoints);
  } else {
    STATE.loyaltyPoints = 120; // 120 EGP equivalent starting balance for rewards testing
    localStorage.setItem('vape_loyalty_points', STATE.loyaltyPoints.toString());
  }
}

function saveDataToStorage() {
  localStorage.setItem('vape_products', JSON.stringify(productsCatalog));
  localStorage.setItem('vape_orders', JSON.stringify(ordersHistory));
  localStorage.setItem('vape_loyalty_points', STATE.loyaltyPoints.toString());
}

// ==========================================================================
// Initialization & Mounting Actions
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  loadDataFromStorage();
  renderCategories();
  renderProducts();
  applyTranslations();
  updateCartBadge();
  syncLoyaltyBalanceUI();
});

// Render the category filters tabs dynamically
function renderCategories() {
  const container = document.getElementById('categoryTabsContainer');
  const categoriesList = [
    { id: 'all', en: 'All Products', ar: 'الكل' },
    { id: 'devices', en: 'Devices', ar: 'أجهزة الفيب' },
    { id: 'disposables', en: 'Disposables', ar: 'ديسبوزابل' },
    { id: 'eliquids', en: 'E-Liquids', ar: 'نكهات / ليكويد' },
    { id: 'accessories', en: 'Accessories', ar: 'اكسسوارات وبودات' }
  ];

  container.innerHTML = categoriesList.map(cat => `
    <button class="tab-btn ${STATE.selectedCategory === cat.id ? 'active' : ''}" 
            onclick="setCategory('${cat.id}')">
      ${STATE.locale === 'en' ? cat.en : cat.ar}
    </button>
  `).join('');
}

// Render product catalog grid based on category and search query filters
function renderProducts() {
  const container = document.getElementById('productsGridContainer');
  
  // Reload catalog from local storage to catch updates from the separate admin tab!
  const storedProd = localStorage.getItem('vape_products');
  if (storedProd) {
    productsCatalog = JSON.parse(storedProd);
  }

  const filtered = productsCatalog.filter(product => {
    const matchesCategory = STATE.selectedCategory === 'all' || product.category === STATE.selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(STATE.searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(STATE.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-grid-indicator">
        No products found matching filters.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => `
    <div class="product-card" style="opacity: ${product.inStock ? '1' : '0.6'}" onclick="openProductDetail('${product.id}')">
      <div class="card-badge">${product.rating} ⭐</div>
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img">
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-specs">${product.capacity} • ${product.resistance}</div>
      <div class="card-footer" onclick="event.stopPropagation()">
        <div class="product-price">${product.price} EGP</div>
        ${product.inStock 
          ? `<button class="btn-add-quick" onclick="quickAddProduct('${product.id}')">+</button>` 
          : `<span style="font-size:11px; font-weight:700; color:var(--danger);">${STATE.locale === 'en' ? 'OUT OF STOCK' : 'نفذت الكمية'}</span>`
        }
      </div>
    </div>
  `).join('');
}

// Set category filter state
function setCategory(categoryId) {
  STATE.selectedCategory = categoryId;
  renderCategories();
  renderProducts();
}

// Search field query inputs handler
function handleSearch() {
  const input = document.getElementById('productSearchInput');
  STATE.searchQuery = input.value;
  renderProducts();
}

// Language translations wrapper toggler
function toggleLanguage() {
  STATE.locale = STATE.locale === 'en' ? 'ar' : 'en';
  
  const body = document.body;
  const toggleBtn = document.getElementById('langToggleBtn');

  if (STATE.locale === 'ar') {
    body.classList.add('rtl-mode');
    toggleBtn.innerHTML = 'English 🇬🇧';
  } else {
    body.classList.remove('rtl-mode');
    toggleBtn.innerHTML = 'العربية 🇪🇬';
  }

  applyTranslations();
  renderCategories();
  renderProducts();
  if (STATE.activeDetailProduct) {
    renderDetailDrawerContent();
  }
  renderCartDrawer();
}

// Scan DOM elements containing data-i18n attributes and apply translated strings
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = TRANSLATIONS[STATE.locale][key];
    if (translated) {
      el.innerHTML = translated;
    }
  });

  // Handle placeholders mappings
  const searchInput = document.getElementById('productSearchInput');
  const mapSearchInput = document.getElementById('mapDistrictSearchInput');
  const notesInput = document.getElementById('cartAddressNotes');

  if (searchInput) searchInput.placeholder = TRANSLATIONS[STATE.locale].searchPlaceholder;
  if (mapSearchInput) mapSearchInput.placeholder = TRANSLATIONS[STATE.locale].mapSearchPlaceholder;
  if (notesInput) notesInput.placeholder = TRANSLATIONS[STATE.locale].notesPlaceholder;
}

// Scroll layout smoothly down to the status tracking cards
function scrollToTracker() {
  const trackerSection = document.getElementById('orderTrackingSection');
  if (STATE.activeOrder) {
    trackerSection.style.display = 'block';
    trackerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert(STATE.locale === 'en' ? "Please place an order first to track status." : "برجاء تقديم طلب أولاً لتتمكن من التتبع.");
  }
}

// Sync rewards/loyalty points balance in layout elements
function syncLoyaltyBalanceUI() {
  const pointsVal = document.getElementById('cartLoyaltyBalanceVal');
  if (pointsVal) pointsVal.innerHTML = STATE.loyaltyPoints;
}

// ==========================================================================
// Cart State Operations
// ==========================================================================
function updateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  const count = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.innerHTML = count;
}

function quickAddProduct(productId) {
  const product = productsCatalog.find(p => p.id === productId);
  if (!product) return;

  const defaultNic = product.nicotineLevels[0] || 'N/A';
  const defaultFlavor = product.flavors[0] || 'N/A';

  addToCart(product, 1, defaultNic, defaultFlavor);
  alert(`${product.name} added to cart!`);
}

function addToCart(product, qty, nic, flavor) {
  const existingIndex = STATE.cart.findIndex(
    item => item.product.id === product.id && item.nicotine === nic && item.flavor === flavor
  );

  if (existingIndex > -1) {
    STATE.cart[existingIndex].quantity += qty;
  } else {
    STATE.cart.push({ product, quantity: qty, nicotine: nic, flavor: flavor });
  }

  updateCartBadge();
  renderCartDrawer();
}

function updateCartItemQty(index, amount) {
  STATE.cart[index].quantity += amount;
  if (STATE.cart[index].quantity <= 0) {
    STATE.cart.splice(index, 1);
  }
  updateCartBadge();
  renderCartDrawer();
}

function removeCartItem(index) {
  STATE.cart.splice(index, 1);
  updateCartBadge();
  renderCartDrawer();
}

// Recalculates cart bills, shipping scales, rewards deductions, and grand totals
function getCartTotals() {
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  let discountVal = 0;

  // 1. Check active coupon discount (e.g. WELCOME10)
  if (STATE.appliedCoupon && STATE.appliedCoupon.code === 'WELCOME10') {
    discountVal = Math.round(subtotal * 0.10); // 10% off
  }

  // 2. Add loyalty points discount value if redeemed
  if (STATE.redeemedPointsVal > 0) {
    const loyaltyDiscount = Math.round(STATE.redeemedPointsVal / 10); // 10 points = 1 EGP
    discountVal += loyaltyDiscount;
  }

  const shippingFee = subtotal > 0 ? 50 : 0; // Flat Cairo shipping fee
  const total = Math.max(0, subtotal - discountVal + shippingFee);

  return {
    subtotal,
    discountVal,
    shippingFee,
    total
  };
}

// Apply Welcome Coupon Code
function applyCouponCode() {
  const input = document.getElementById('cartCouponInput').value.trim().toUpperCase();
  const feedback = document.getElementById('couponFeedbackMessage');
  
  if (input === 'WELCOME10') {
    STATE.appliedCoupon = { code: 'WELCOME10', type: 'percent', val: 10 };
    feedback.innerHTML = STATE.locale === 'en' ? 'WELCOME10 coupon applied! 10% discount subtracted.' : 'تم تطبيق كوبون الخصم! تم خصم ١٠٪.';
    feedback.style.color = 'var(--success)';
  } else {
    STATE.appliedCoupon = null;
    feedback.innerHTML = STATE.locale === 'en' ? 'Invalid coupon code.' : 'رمز الكوبون غير صحيح.';
    feedback.style.color = 'var(--danger)';
  }

  renderCartDrawer();
}

// Redeem loyalty points
function redeemLoyaltyPoints() {
  const feedback = document.getElementById('couponFeedbackMessage');
  if (STATE.loyaltyPoints <= 0) {
    alert(STATE.locale === 'en' ? "You don't have loyalty points to redeem yet." : "ليس لديك نقاط ولاء كافية لاستبدالها.");
    return;
  }

  const { subtotal } = getCartTotals();
  const maxRedeemPoints = subtotal * 10; // 10 points per EGP
  
  if (STATE.loyaltyPoints > maxRedeemPoints) {
    STATE.redeemedPointsVal = maxRedeemPoints;
  } else {
    STATE.redeemedPointsVal = STATE.loyaltyPoints;
  }

  feedback.innerHTML = STATE.locale === 'en' 
    ? `Redeemed ${STATE.redeemedPointsVal} points for a ${STATE.redeemedPointsVal / 10} EGP discount.`
    : `تم استبدال ${STATE.redeemedPointsVal} نقطة بخصم قدره ${STATE.redeemedPointsVal / 10} جنيه.`;
  feedback.style.color = 'var(--success)';
  
  renderCartDrawer();
}

// ==========================================================================
// Drawers Slide toggles
// ==========================================================================
function closeAllDrawers() {
  toggleCartDrawer(false);
  toggleDetailDrawer(false);
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (open) {
    renderCartDrawer();
    drawer.classList.add('active');
    backdrop.classList.add('active');
  } else {
    drawer.classList.remove('active');
    if (!document.getElementById('productDetailDrawer').classList.contains('active')) {
      backdrop.classList.remove('active');
    }
  }
}

function toggleDetailDrawer(open) {
  const drawer = document.getElementById('productDetailDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (open) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
  } else {
    drawer.classList.remove('active');
    if (!document.getElementById('cartDrawer').classList.contains('active')) {
      backdrop.classList.remove('active');
    }
  }
}

// ==========================================================================
// Cart Render Loop
// ==========================================================================
function renderCartDrawer() {
  const container = document.getElementById('cartItemsContainer');
  const checkoutInputs = document.getElementById('cartCheckoutInputs');

  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
        <p style="font-size:48px; margin-bottom:10px;">🛒</p>
        <p data-i18n="emptyCart">${TRANSLATIONS[STATE.locale].emptyCart}</p>
      </div>
    `;
    checkoutInputs.style.display = 'none';
  } else {
    checkoutInputs.style.display = 'block';
    container.innerHTML = STATE.cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-img-wrapper">
          <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
        </div>
        <div class="cart-item-info">
          <div>
            <div class="cart-item-title">${item.product.name}</div>
            <div class="cart-item-specs">${item.flavor} | ${item.nicotine}</div>
          </div>
          <div class="cart-item-footer">
            <div class="qty-spinner">
              <button class="qty-btn" onclick="updateCartItemQty(${idx}, -1)">-</button>
              <div class="qty-number">${item.quantity}</div>
              <button class="qty-btn" onclick="updateCartItemQty(${idx}, 1)">+</button>
            </div>
            <div class="cart-item-price">${item.product.price * item.quantity} EGP</div>
            <button class="btn-delete-item" onclick="removeCartItem(${idx})">🗑️</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update Bill Summaries
  const { subtotal, discountVal, shippingFee, total } = getCartTotals();
  document.getElementById('billSubtotalVal').innerHTML = `${subtotal} EGP`;
  
  const discountRow = document.getElementById('billDiscountRow');
  const discountValEl = document.getElementById('billDiscountVal');
  if (discountVal > 0) {
    discountRow.style.display = 'flex';
    discountValEl.innerHTML = `-${discountVal} EGP`;
  } else {
    discountRow.style.display = 'none';
  }
  
  document.getElementById('billShippingVal').innerHTML = `${shippingFee} EGP`;
  document.getElementById('billTotalVal').innerHTML = `${total} EGP`;

  // Address summary details review
  const deliveryBtnTitle = document.getElementById('deliveryBtnTitle');
  const deliveryBtnDesc = document.getElementById('deliveryBtnDesc');

  if (STATE.confirmedAddress) {
    deliveryBtnTitle.innerHTML = STATE.confirmedAddress.addressString;
    deliveryBtnDesc.innerHTML = `Lat: ${STATE.confirmedAddress.lat.toFixed(4)}, Lng: ${STATE.confirmedAddress.lng.toFixed(4)}`;
  } else {
    deliveryBtnTitle.innerHTML = TRANSLATIONS[STATE.locale].selectAddress;
    deliveryBtnDesc.innerHTML = STATE.locale === 'en' ? "Double-click to set coordinates" : "اضغط مرتين لتحديد الإحداثيات";
  }

  syncLoyaltyBalanceUI();
}

// ==========================================================================
// Product Details Drawer Render
// ==========================================================================
function openProductDetail(productId) {
  const product = productsCatalog.find(p => p.id === productId);
  if (!product) return;

  STATE.activeDetailProduct = product;
  STATE.selectedNicotine = product.nicotineLevels[0] || 'N/A';
  STATE.selectedFlavor = product.flavors[0] || 'N/A';
  STATE.detailQuantity = 1;

  renderDetailDrawerContent();
  toggleDetailDrawer(true);
}

function selectDetailOption(optionType, value) {
  if (optionType === 'nicotine') {
    STATE.selectedNicotine = value;
  } else {
    STATE.selectedFlavor = value;
  }
  renderDetailDrawerContent();
}

function updateDetailQty(amount) {
  STATE.detailQuantity = Math.max(1, STATE.detailQuantity + amount);
  document.getElementById('detailQtyNum').innerHTML = STATE.detailQuantity;
}

function addDetailToCart() {
  if (!STATE.activeDetailProduct) return;
  addToCart(
    STATE.activeDetailProduct,
    STATE.detailQuantity,
    STATE.selectedNicotine,
    STATE.selectedFlavor
  );
  alert(`${STATE.activeDetailProduct.name} added to cart!`);
  toggleDetailDrawer(false);
}

function renderDetailDrawerContent() {
  const product = STATE.activeDetailProduct;
  const content = document.getElementById('detailDrawerContent');
  const footer = document.getElementById('detailDrawerFooter');

  content.innerHTML = `
    <div class="detail-img-container">
      <img src="${product.image}" alt="${product.name}" class="detail-img">
    </div>
    <div class="detail-price">${product.price} EGP</div>
    <div class="detail-rating">
      <span class="rating-star">★</span>
      <span>${product.rating} (142 ${TRANSLATIONS[STATE.locale].reviews})</span>
    </div>
    <div class="detail-desc">${product.description}</div>

    <!-- Flavor Selection option cards -->
    ${product.flavors[0] !== 'N/A' ? `
      <div class="selection-section">
        <div class="section-label">${TRANSLATIONS[STATE.locale].flavor}</div>
        <div class="options-grid">
          ${product.flavors.map(flavor => `
            <div class="option-badge ${STATE.selectedFlavor === flavor ? 'selected' : ''}" 
                 onclick="selectDetailOption('flavor', '${flavor}')">
              ${flavor}
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Nicotine Strength selection option cards -->
    ${product.nicotineLevels[0] !== 'N/A' ? `
      <div class="selection-section">
        <div class="section-label">${TRANSLATIONS[STATE.locale].nicotine}</div>
        <div class="options-grid">
          ${product.nicotineLevels.map(nic => `
            <div class="option-badge ${STATE.selectedNicotine === nic ? 'selected' : ''}" 
                 onclick="selectDetailOption('nicotine', '${nic}')">
              ${nic}
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Tech specs list -->
    <div class="selection-section">
      <div class="section-label">${TRANSLATIONS[STATE.locale].specifications}</div>
      <div class="detail-specs-list">
        <div class="spec-line">
          <span class="spec-title">${TRANSLATIONS[STATE.locale].battery}</span>
          <span class="spec-val">${product.battery}</span>
        </div>
        <div class="spec-line">
          <span class="spec-title">${TRANSLATIONS[STATE.locale].capacity}</span>
          <span class="spec-val">${product.capacity}</span>
        </div>
        <div class="spec-line">
          <span class="spec-title">${TRANSLATIONS[STATE.locale].resistance}</span>
          <span class="spec-val">${product.resistance}</span>
        </div>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <div class="detail-purchase-row">
      <div class="qty-spinner">
        <button class="qty-btn" onclick="updateDetailQty(-1)">-</button>
        <div class="qty-number" id="detailQtyNum">${STATE.detailQuantity}</div>
        <button class="qty-btn" onclick="updateDetailQty(1)">+</button>
      </div>
      ${product.inStock 
        ? `<button class="btn-add-cart" onclick="addDetailToCart()">${TRANSLATIONS[STATE.locale].addToCart}</button>`
        : `<button class="btn-add-cart" style="background:var(--text-muted); cursor:default;" disabled>${TRANSLATIONS[STATE.locale].outOfStock}</button>`
      }
    </div>
  `;
}

// ==========================================================================
// Google Maps Picker Logic
// ==========================================================================
function openMapsPicker() {
  const modal = document.getElementById('mapsModal');
  modal.classList.add('active');
}

function closeMapsPicker() {
  const modal = document.getElementById('mapsModal');
  modal.classList.remove('active');
}

// Map Click zones selections
function selectMapDistrict(districtKey) {
  const district = MAP_LOCATIONS[districtKey];
  if (!district) return;

  STATE.tempSelectedMapLocation = district;

  // Visual repositioning of center pin coordinates
  const container = document.querySelector('.map-center-pin-container');
  const zoneEl = document.querySelector(`.district-${districtKey}`);
  
  if (zoneEl && container) {
    const parentRect = zoneEl.parentElement.getBoundingClientRect();
    const zoneRect = zoneEl.getBoundingClientRect();
    
    const relativeLeft = zoneRect.left - parentRect.left + (zoneRect.width / 2);
    const relativeTop = zoneRect.top - parentRect.top + (zoneRect.height / 2);
    
    container.style.left = `${relativeLeft}px`;
    container.style.top = `${relativeTop}px`;
  }

  document.getElementById('mapConfirmTitle').innerHTML = district.name;
  document.getElementById('mapConfirmCoords').innerHTML = `Lat: ${district.lat.toFixed(4)}, Lng: ${district.lng.toFixed(4)}`;
}

// Neighborhood lookup search bar handler
function handleMapSearch() {
  const searchVal = document.getElementById('mapDistrictSearchInput').value.toLowerCase().trim();
  let found = false;

  for (let key in MAP_LOCATIONS) {
    if (MAP_LOCATIONS[key].name.toLowerCase().includes(searchVal) || key.includes(searchVal)) {
      selectMapDistrict(key);
      found = true;
      break;
    }
  }

  if (!found) {
    alert(STATE.locale === 'en' ? "Neighborhood not found. Select New Cairo, Zamalek, Heliopolis, or Maadi on the map." : "لم يتم العثور على الحي. يرجى اختيار مصر الجديدة، الزمالك، المعادي أو التجمع على الخريطة.");
  }
}

// Pins selection confirmations
function confirmMapAddress() {
  const notes = document.getElementById('cartAddressNotes').value;
  STATE.confirmedAddress = {
    addressString: STATE.tempSelectedMapLocation.name,
    lat: STATE.tempSelectedMapLocation.lat,
    lng: STATE.tempSelectedMapLocation.lng,
    notes: notes
  };

  closeMapsPicker();
  renderCartDrawer();
}

// ==========================================================================
// Checkout & Order Dispatch System
// ==========================================================================
function handleCheckout() {
  if (STATE.cart.length === 0) return;

  const pastedLocationUrl = document.getElementById('cartLocationUrl').value.trim();

  // Validate address (either clicked pin, or pasted maps link)
  if (!STATE.confirmedAddress && !pastedLocationUrl) {
    alert(STATE.locale === 'en' ? "Please select a location on the map OR paste a Google Maps location link." : "برجاء تحديد موقعك على الخريطة أو لصق رابط عنوان جوجل ماب.");
    openMapsPicker();
    return;
  }

  const orderId = 'EGP' + Math.floor(1000 + Math.random() * 9000);
  const { subtotal, discountVal, shippingFee, total } = getCartTotals();
  const timeString = new Date().toLocaleTimeString();
  const addressNotes = document.getElementById('cartAddressNotes').value;

  // Format cart items summary for logging & whatsapp
  const itemsText = STATE.cart.map(item => 
    `• ${item.product.name} (${item.flavor}, ${item.nicotine}) x${item.quantity} = ${item.product.price * item.quantity} EGP`
  ).join('\n');

  // Determine final coordinates / link text
  let mapsLinkText = '';
  let destinationText = '';

  if (pastedLocationUrl) {
    mapsLinkText = pastedLocationUrl;
    destinationText = STATE.confirmedAddress ? STATE.confirmedAddress.addressString : "Custom Google Maps Link Provided";
  } else {
    mapsLinkText = `https://maps.google.com/?q=${STATE.confirmedAddress.lat.toFixed(6)},${STATE.confirmedAddress.lng.toFixed(6)}`;
    destinationText = STATE.confirmedAddress.addressString;
  }

  const messageTemplate = 
`--- NEW ORDER: #${orderId} ---
*Items Ordered:*
${itemsText}

*Subtotal:* ${subtotal} EGP
${discountVal > 0 ? `*Discount Applied:* -${discountVal} EGP\n` : ''}*Cairo Delivery (Flat):* ${shippingFee} EGP
*Grand Total:* ${total} EGP

*Delivery Address:* 
${destinationText}
GPS Location URL: ${mapsLinkText}
${addressNotes ? `*Delivery Notes:* ${addressNotes}` : ''}

*Payment Method:* Cash on Delivery (COD)
Please dispatch my order. Thank you!`;

  const encodedMsg = encodeURIComponent(messageTemplate);
  const waNumber = '+201000000000'; // Cairo vape shop representative line

  // Save new order to active tracking state
  STATE.activeOrder = {
    referenceId: orderId,
    time: timeString,
    address: destinationText,
    total: total,
    stage: 1
  };

  // Add order to database orders history log
  const newOrderLog = {
    referenceId: orderId,
    time: timeString,
    address: destinationText,
    notes: addressNotes,
    locationUrl: mapsLinkText,
    itemsSummary: STATE.cart.map(i => `${i.product.name} (${i.flavor}, ${i.nicotine}) x${i.quantity}`).join('\n'),
    total: total
  };

  // Reload history to avoid overriding updates from the admin page
  const storedOrders = localStorage.getItem('vape_orders');
  if (storedOrders) {
    ordersHistory = JSON.parse(storedOrders);
  }
  ordersHistory.push(newOrderLog);

  // 💎 Rewards Update: Deduct spent loyalty points, and credit 1 point for every 10 EGP spent!
  const pointsEarned = Math.round(total / 10);
  STATE.loyaltyPoints = Math.max(0, STATE.loyaltyPoints - STATE.redeemedPointsVal) + pointsEarned;
  
  // Reset coupon & points states
  STATE.redeemedPointsVal = 0;
  STATE.appliedCoupon = null;
  document.getElementById('cartCouponInput').value = '';
  document.getElementById('couponFeedbackMessage').innerHTML = '';
  document.getElementById('cartLocationUrl').value = '';

  saveDataToStorage();

  // Hide the welcome banner after first order is completed
  const welcomeBanner = document.getElementById('rewardsWelcomeBanner');
  if (welcomeBanner) welcomeBanner.style.display = 'none';

  // Launch WhatsApp pre-filled text in blank tab
  window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');

  // Reset Cart
  STATE.cart = [];
  updateCartBadge();
  toggleCartDrawer(false);

  // Trigger Logistics tracking progress timelines
  startOrderTrackingSim();
}

// Launches support conversation
function triggerSupportChat() {
  const waNumber = '+201000000000';
  const welcomeText = encodeURIComponent(
    STATE.locale === 'en' 
      ? "Hello Vape Cairo, I need assistance with my delivery order." 
      : "مرحباً فيب القاهرة، أحتاج مساعدة بخصوص طلبي."
  );
  window.open(`https://wa.me/${waNumber}?text=${welcomeText}`, '_blank');
}

// ==========================================================================
// Simulated Order Logistics Tracking Timeline
// ==========================================================================
function startOrderTrackingSim() {
  if (STATE.trackingInterval) {
    clearInterval(STATE.trackingInterval);
  }

  const trackerSection = document.getElementById('orderTrackingSection');
  trackerSection.style.display = 'block';

  document.getElementById('trackRefVal').innerHTML = `#${STATE.activeOrder.referenceId}`;
  document.getElementById('trackPlacedVal').innerHTML = STATE.activeOrder.time;
  document.getElementById('trackAddressVal').innerHTML = STATE.activeOrder.address;
  document.getElementById('trackAmountVal').innerHTML = `${STATE.activeOrder.total} EGP`;

  updateTimelineVisuals();

  // Progress tracking stages every 20 seconds for demo testing purposes
  STATE.trackingInterval = setInterval(() => {
    if (STATE.activeOrder && STATE.activeOrder.stage < 4) {
      STATE.activeOrder.stage += 1;
      updateTimelineVisuals();
    } else {
      clearInterval(STATE.trackingInterval);
    }
  }, 20000);

  trackerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateTimelineVisuals() {
  const currentStage = STATE.activeOrder.stage;

  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`stepNode${i}`);
    node.className = 'timeline-node';

    if (i < currentStage) {
      node.classList.add('completed');
    } else if (i === currentStage) {
      node.classList.add('active');
    }
  }
}
