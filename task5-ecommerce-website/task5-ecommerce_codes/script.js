// ============================================
// OriginMarket — e-commerce logic
// ============================================

const STORAGE_KEYS = { cart: 'originmarket_cart', orders: 'originmarket_orders' };

/* ============================================
   Product catalog
   ============================================ */
const ICONS = {
  cocoa: `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="34" ry="42" fill="#C99A3B"/><path d="M50 10 C 35 28, 35 72, 50 90" stroke="#7A5A22" stroke-width="2" fill="none" opacity=".5"/><path d="M50 10 C 65 28, 65 72, 50 90" stroke="#7A5A22" stroke-width="2" fill="none" opacity=".5"/></svg>`,
  cashew: `<svg viewBox="0 0 100 100"><path d="M62 20 C 40 20, 30 40, 38 55 C 28 62, 26 78, 38 86 C 52 94, 68 82, 66 66 C 78 60, 80 40, 66 26 Z" fill="#E8D3A0"/></svg>`,
  shea: `<svg viewBox="0 0 100 100"><circle cx="50" cy="55" r="30" fill="#F2EAE0"/><ellipse cx="50" cy="30" rx="10" ry="14" fill="#6B7A4F"/></svg>`,
  coffee: `<svg viewBox="0 0 100 100"><path d="M30 20 Q 50 10 70 20 Q 60 55 50 90 Q 40 55 30 20 Z" fill="#5A3A24"/><path d="M50 22 L50 82" stroke="#3A2416" stroke-width="2"/></svg>`,
  spice: `<svg viewBox="0 0 100 100"><rect x="30" y="26" width="40" height="56" rx="6" fill="#C1512D"/><rect x="38" y="14" width="24" height="16" rx="3" fill="#8C3A20"/></svg>`,
  oil: `<svg viewBox="0 0 100 100"><path d="M38 20 h24 l4 14 c8 6 12 16 12 26 a28 28 0 1 1 -56 0 c0-10 4-20 12-26 Z" fill="#C99A3B" opacity=".9"/><rect x="42" y="12" width="16" height="10" fill="#7A5A22"/></svg>`,
};

const PRODUCTS = [
  { id: 'p01', name: 'Fermented Cocoa Beans', category: 'Cocoa', origin: 'Ashanti Cooperative, Ghana', price: 6.20, unit: 'kg', stock: 3, rating: 4.8, reviews: 62, icon: ICONS.cocoa, ingredients: ['100% fermented cocoa beans'] },
  { id: 'p02', name: 'Premium Cocoa Nibs', category: 'Cocoa', origin: 'Suhum Aggregation Center, Ghana', price: 9.40, unit: 'kg', stock: 18, rating: 4.7, reviews: 41, icon: ICONS.cocoa, ingredients: ['100% roasted cocoa nibs'] },
  { id: 'p03', name: 'Single-Origin Cocoa Butter', category: 'Cocoa', origin: 'Kumasi Processing Unit, Ghana', price: 12.75, unit: 'kg', stock: 9, rating: 4.9, reviews: 28, icon: ICONS.cocoa, ingredients: ['100% cold-pressed cocoa butter'] },
  { id: 'p04', name: 'Raw Cashew Nuts (RCN)', category: 'Cashew', origin: 'Techiman Cooperative, Ghana', price: 5.80, unit: 'kg', stock: 24, rating: 4.6, reviews: 55, icon: ICONS.cashew, ingredients: ['100% raw cashew nuts, in-shell'] },
  { id: 'p05', name: 'Roasted Cashew Kernels', category: 'Cashew', origin: 'Wenchi Aggregation Center, Ghana', price: 11.30, unit: 'kg', stock: 2, rating: 4.8, reviews: 33, icon: ICONS.cashew, ingredients: ['Cashew kernels', 'Sunflower oil', 'Sea salt'] },
  { id: 'p06', name: 'Cashew Apple Juice Concentrate', category: 'Cashew', origin: 'Sunyani Cooperative, Ghana', price: 7.90, unit: 'l', stock: 12, rating: 4.4, reviews: 15, icon: ICONS.cashew, ingredients: ['Cashew apple juice', 'Natural fruit sugars', 'Vitamin C (ascorbic acid)'] },
  { id: 'p07', name: 'Unrefined Shea Butter', category: 'Shea', origin: 'Tamale Women\u2019s Cooperative, Ghana', price: 8.10, unit: 'kg', stock: 30, rating: 4.9, reviews: 74, icon: ICONS.shea, ingredients: ['100% unrefined shea butter (Vitellaria paradoxa)'] },
  { id: 'p08', name: 'Shea Nuts, Sun-Dried', category: 'Shea', origin: 'Bolgatanga Cooperative, Ghana', price: 4.50, unit: 'kg', stock: 40, rating: 4.5, reviews: 22, icon: ICONS.shea, ingredients: ['100% sun-dried shea nuts'] },
  { id: 'p09', name: 'Washed Arabica Coffee', category: 'Coffee', origin: 'Volta Highlands Cooperative, Ghana', price: 14.60, unit: 'kg', stock: 6, rating: 4.7, reviews: 19, icon: ICONS.coffee, ingredients: ['100% Arabica coffee beans, washed process'] },
  { id: 'p10', name: 'Natural-Process Robusta', category: 'Coffee', origin: 'Suhum Aggregation Center, Ghana', price: 10.20, unit: 'kg', stock: 15, rating: 4.3, reviews: 12, icon: ICONS.coffee, ingredients: ['100% Robusta coffee beans, natural (dry) process'] },
  { id: 'p11', name: 'Dried Grains of Selim', category: 'Spice', origin: 'Tamale Market Cooperative, Ghana', price: 6.90, unit: 'kg', stock: 20, rating: 4.6, reviews: 9, icon: ICONS.spice, ingredients: ['100% dried grains of Selim (Xylopia aethiopica)'] },
  { id: 'p12', name: 'Ground Alligator Pepper', category: 'Spice', origin: 'Techiman Cooperative, Ghana', price: 8.30, unit: 'kg', stock: 1, rating: 4.8, reviews: 14, icon: ICONS.spice, ingredients: ['100% ground alligator pepper (Aframomum melegueta)'] },
  { id: 'p13', name: 'Cold-Pressed Palm Oil', category: 'Oil', origin: 'Kade Processing Unit, Ghana', price: 5.40, unit: 'l', stock: 26, rating: 4.5, reviews: 31, icon: ICONS.oil, ingredients: ['100% cold-pressed palm fruit oil'] },
  { id: 'p14', name: 'Refined Palm Kernel Oil', category: 'Oil', origin: 'Kade Processing Unit, Ghana', price: 6.10, unit: 'l', stock: 17, rating: 4.4, reviews: 18, icon: ICONS.oil, ingredients: ['100% refined palm kernel oil'] },
  { id: 'p15', name: 'Aged Cocoa Liquor', category: 'Cocoa', origin: 'Kumasi Processing Unit, Ghana', price: 13.90, unit: 'kg', stock: 0, rating: 4.9, reviews: 21, icon: ICONS.cocoa, ingredients: ['100% unsweetened cocoa liquor, aged 6 months'] },
  { id: 'p16', name: 'Whole Roasted Cashews, Salted', category: 'Cashew', origin: 'Wenchi Aggregation Center, Ghana', price: 12.00, unit: 'kg', stock: 14, rating: 4.7, reviews: 27, icon: ICONS.cashew, ingredients: ['Cashew kernels', 'Coconut oil', 'Sea salt'] },
];

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria','Azerbaijan',
  'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia',
  'Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon',
  'Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia',
  'Cuba','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador',
  'Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia',
  'Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti',
  'Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
  'Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos',
  'Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi',
  'Malaysia','Maldives','Mali','Malta','Mauritania','Mauritius','Mexico','Moldova','Monaco','Mongolia',
  'Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nepal','Netherlands','New Zealand','Nicaragua','Niger',
  'Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Panama','Papua New Guinea','Paraguay','Peru',
  'Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Lucia','Samoa','San Marino',
  'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia',
  'South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey',
  'Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu',
  'Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

/* ============================================
   Phone rules per country: calling code, whether the national format
   drops a leading trunk "0" internationally, and the expected count of
   digits to enter after the code. Values reflect common ITU/E.164
   conventions and typical mobile-number lengths — treat as a practical
   best-effort reference rather than an authoritative telecom source.
   ============================================ */
const PHONE_RULES = {
  'Afghanistan': { code: '+93', trunkZero: true, length: 9 },
  'Albania': { code: '+355', trunkZero: true, length: 9 },
  'Algeria': { code: '+213', trunkZero: true, length: 9 },
  'Andorra': { code: '+376', trunkZero: false, length: 6 },
  'Angola': { code: '+244', trunkZero: false, length: 9 },
  'Argentina': { code: '+54', trunkZero: false, length: 10 },
  'Armenia': { code: '+374', trunkZero: true, length: 8 },
  'Australia': { code: '+61', trunkZero: true, length: 9 },
  'Austria': { code: '+43', trunkZero: true, length: 10 },
  'Azerbaijan': { code: '+994', trunkZero: true, length: 9 },
  'Bahamas': { code: '+1', trunkZero: false, length: 10 },
  'Bahrain': { code: '+973', trunkZero: false, length: 8 },
  'Bangladesh': { code: '+880', trunkZero: true, length: 10 },
  'Barbados': { code: '+1', trunkZero: false, length: 10 },
  'Belarus': { code: '+375', trunkZero: false, length: 9 },
  'Belgium': { code: '+32', trunkZero: true, length: 9 },
  'Belize': { code: '+501', trunkZero: false, length: 7 },
  'Benin': { code: '+229', trunkZero: false, length: 8 },
  'Bhutan': { code: '+975', trunkZero: false, length: 8 },
  'Bolivia': { code: '+591', trunkZero: false, length: 8 },
  'Bosnia and Herzegovina': { code: '+387', trunkZero: true, length: 8 },
  'Botswana': { code: '+267', trunkZero: false, length: 8 },
  'Brazil': { code: '+55', trunkZero: true, length: 11 },
  'Brunei': { code: '+673', trunkZero: false, length: 7 },
  'Bulgaria': { code: '+359', trunkZero: true, length: 9 },
  'Burkina Faso': { code: '+226', trunkZero: false, length: 8 },
  'Burundi': { code: '+257', trunkZero: false, length: 8 },
  'Cabo Verde': { code: '+238', trunkZero: false, length: 7 },
  'Cambodia': { code: '+855', trunkZero: true, length: 9 },
  'Cameroon': { code: '+237', trunkZero: false, length: 9 },
  'Canada': { code: '+1', trunkZero: false, length: 10 },
  'Central African Republic': { code: '+236', trunkZero: false, length: 8 },
  'Chad': { code: '+235', trunkZero: false, length: 8 },
  'Chile': { code: '+56', trunkZero: false, length: 9 },
  'China': { code: '+86', trunkZero: false, length: 11 },
  'Colombia': { code: '+57', trunkZero: false, length: 10 },
  'Comoros': { code: '+269', trunkZero: false, length: 7 },
  'Congo': { code: '+242', trunkZero: false, length: 9 },
  'Costa Rica': { code: '+506', trunkZero: false, length: 8 },
  'Croatia': { code: '+385', trunkZero: true, length: 9 },
  'Cuba': { code: '+53', trunkZero: false, length: 8 },
  'Cyprus': { code: '+357', trunkZero: false, length: 8 },
  'Czechia': { code: '+420', trunkZero: false, length: 9 },
  'Denmark': { code: '+45', trunkZero: false, length: 8 },
  'Djibouti': { code: '+253', trunkZero: false, length: 8 },
  'Dominica': { code: '+1', trunkZero: false, length: 10 },
  'Dominican Republic': { code: '+1', trunkZero: false, length: 10 },
  'Ecuador': { code: '+593', trunkZero: true, length: 9 },
  'Egypt': { code: '+20', trunkZero: true, length: 10 },
  'El Salvador': { code: '+503', trunkZero: false, length: 8 },
  'Equatorial Guinea': { code: '+240', trunkZero: false, length: 9 },
  'Eritrea': { code: '+291', trunkZero: true, length: 7 },
  'Estonia': { code: '+372', trunkZero: false, length: 8 },
  'Eswatini': { code: '+268', trunkZero: false, length: 8 },
  'Ethiopia': { code: '+251', trunkZero: true, length: 9 },
  'Fiji': { code: '+679', trunkZero: false, length: 7 },
  'Finland': { code: '+358', trunkZero: true, length: 9 },
  'France': { code: '+33', trunkZero: true, length: 9 },
  'Gabon': { code: '+241', trunkZero: false, length: 8 },
  'Gambia': { code: '+220', trunkZero: false, length: 7 },
  'Georgia': { code: '+995', trunkZero: false, length: 9 },
  'Germany': { code: '+49', trunkZero: true, length: 11 },
  'Ghana': { code: '+233', trunkZero: true, length: 9 },
  'Greece': { code: '+30', trunkZero: false, length: 10 },
  'Grenada': { code: '+1', trunkZero: false, length: 10 },
  'Guatemala': { code: '+502', trunkZero: false, length: 8 },
  'Guinea': { code: '+224', trunkZero: false, length: 9 },
  'Guinea-Bissau': { code: '+245', trunkZero: false, length: 7 },
  'Guyana': { code: '+592', trunkZero: false, length: 7 },
  'Haiti': { code: '+509', trunkZero: false, length: 8 },
  'Honduras': { code: '+504', trunkZero: false, length: 8 },
  'Hungary': { code: '+36', trunkZero: true, length: 9 },
  'Iceland': { code: '+354', trunkZero: false, length: 7 },
  'India': { code: '+91', trunkZero: true, length: 10 },
  'Indonesia': { code: '+62', trunkZero: true, length: 10 },
  'Iran': { code: '+98', trunkZero: true, length: 10 },
  'Iraq': { code: '+964', trunkZero: true, length: 10 },
  'Ireland': { code: '+353', trunkZero: true, length: 9 },
  'Israel': { code: '+972', trunkZero: true, length: 9 },
  'Italy': { code: '+39', trunkZero: false, length: 10 },
  'Ivory Coast': { code: '+225', trunkZero: false, length: 10 },
  'Jamaica': { code: '+1', trunkZero: false, length: 10 },
  'Japan': { code: '+81', trunkZero: true, length: 10 },
  'Jordan': { code: '+962', trunkZero: true, length: 9 },
  'Kazakhstan': { code: '+7', trunkZero: false, length: 10 },
  'Kenya': { code: '+254', trunkZero: true, length: 9 },
  'Kiribati': { code: '+686', trunkZero: false, length: 5 },
  'Kuwait': { code: '+965', trunkZero: false, length: 8 },
  'Kyrgyzstan': { code: '+996', trunkZero: true, length: 9 },
  'Laos': { code: '+856', trunkZero: true, length: 9 },
  'Latvia': { code: '+371', trunkZero: false, length: 8 },
  'Lebanon': { code: '+961', trunkZero: true, length: 8 },
  'Lesotho': { code: '+266', trunkZero: false, length: 8 },
  'Liberia': { code: '+231', trunkZero: false, length: 8 },
  'Libya': { code: '+218', trunkZero: true, length: 9 },
  'Liechtenstein': { code: '+423', trunkZero: false, length: 7 },
  'Lithuania': { code: '+370', trunkZero: true, length: 8 },
  'Luxembourg': { code: '+352', trunkZero: false, length: 9 },
  'Madagascar': { code: '+261', trunkZero: true, length: 9 },
  'Malawi': { code: '+265', trunkZero: false, length: 9 },
  'Malaysia': { code: '+60', trunkZero: true, length: 9 },
  'Maldives': { code: '+960', trunkZero: false, length: 7 },
  'Mali': { code: '+223', trunkZero: false, length: 8 },
  'Malta': { code: '+356', trunkZero: false, length: 8 },
  'Mauritania': { code: '+222', trunkZero: false, length: 8 },
  'Mauritius': { code: '+230', trunkZero: false, length: 7 },
  'Mexico': { code: '+52', trunkZero: false, length: 10 },
  'Moldova': { code: '+373', trunkZero: false, length: 8 },
  'Monaco': { code: '+377', trunkZero: false, length: 8 },
  'Mongolia': { code: '+976', trunkZero: false, length: 8 },
  'Montenegro': { code: '+382', trunkZero: true, length: 8 },
  'Morocco': { code: '+212', trunkZero: true, length: 9 },
  'Mozambique': { code: '+258', trunkZero: false, length: 9 },
  'Myanmar': { code: '+95', trunkZero: true, length: 9 },
  'Namibia': { code: '+264', trunkZero: true, length: 9 },
  'Nepal': { code: '+977', trunkZero: false, length: 10 },
  'Netherlands': { code: '+31', trunkZero: true, length: 9 },
  'New Zealand': { code: '+64', trunkZero: true, length: 9 },
  'Nicaragua': { code: '+505', trunkZero: false, length: 8 },
  'Niger': { code: '+227', trunkZero: false, length: 8 },
  'Nigeria': { code: '+234', trunkZero: true, length: 10 },
  'North Korea': { code: '+850', trunkZero: false, length: 10 },
  'North Macedonia': { code: '+389', trunkZero: true, length: 8 },
  'Norway': { code: '+47', trunkZero: false, length: 8 },
  'Oman': { code: '+968', trunkZero: false, length: 8 },
  'Pakistan': { code: '+92', trunkZero: true, length: 10 },
  'Panama': { code: '+507', trunkZero: false, length: 8 },
  'Papua New Guinea': { code: '+675', trunkZero: false, length: 8 },
  'Paraguay': { code: '+595', trunkZero: true, length: 9 },
  'Peru': { code: '+51', trunkZero: false, length: 9 },
  'Philippines': { code: '+63', trunkZero: true, length: 10 },
  'Poland': { code: '+48', trunkZero: false, length: 9 },
  'Portugal': { code: '+351', trunkZero: false, length: 9 },
  'Qatar': { code: '+974', trunkZero: false, length: 8 },
  'Romania': { code: '+40', trunkZero: true, length: 9 },
  'Russia': { code: '+7', trunkZero: false, length: 10 },
  'Rwanda': { code: '+250', trunkZero: true, length: 9 },
  'Saint Lucia': { code: '+1', trunkZero: false, length: 10 },
  'Samoa': { code: '+685', trunkZero: false, length: 7 },
  'San Marino': { code: '+378', trunkZero: false, length: 10 },
  'Saudi Arabia': { code: '+966', trunkZero: true, length: 9 },
  'Senegal': { code: '+221', trunkZero: false, length: 9 },
  'Serbia': { code: '+381', trunkZero: true, length: 9 },
  'Seychelles': { code: '+248', trunkZero: false, length: 7 },
  'Sierra Leone': { code: '+232', trunkZero: false, length: 8 },
  'Singapore': { code: '+65', trunkZero: false, length: 8 },
  'Slovakia': { code: '+421', trunkZero: true, length: 9 },
  'Slovenia': { code: '+386', trunkZero: true, length: 8 },
  'Solomon Islands': { code: '+677', trunkZero: false, length: 7 },
  'Somalia': { code: '+252', trunkZero: false, length: 8 },
  'South Africa': { code: '+27', trunkZero: true, length: 9 },
  'South Korea': { code: '+82', trunkZero: true, length: 10 },
  'South Sudan': { code: '+211', trunkZero: false, length: 9 },
  'Spain': { code: '+34', trunkZero: false, length: 9 },
  'Sri Lanka': { code: '+94', trunkZero: true, length: 9 },
  'Sudan': { code: '+249', trunkZero: true, length: 9 },
  'Suriname': { code: '+597', trunkZero: false, length: 7 },
  'Sweden': { code: '+46', trunkZero: true, length: 9 },
  'Switzerland': { code: '+41', trunkZero: true, length: 9 },
  'Syria': { code: '+963', trunkZero: true, length: 9 },
  'Taiwan': { code: '+886', trunkZero: true, length: 9 },
  'Tajikistan': { code: '+992', trunkZero: false, length: 9 },
  'Tanzania': { code: '+255', trunkZero: true, length: 9 },
  'Thailand': { code: '+66', trunkZero: true, length: 9 },
  'Timor-Leste': { code: '+670', trunkZero: false, length: 8 },
  'Togo': { code: '+228', trunkZero: false, length: 8 },
  'Tonga': { code: '+676', trunkZero: false, length: 5 },
  'Trinidad and Tobago': { code: '+1', trunkZero: false, length: 10 },
  'Tunisia': { code: '+216', trunkZero: false, length: 8 },
  'Turkey': { code: '+90', trunkZero: true, length: 10 },
  'Turkmenistan': { code: '+993', trunkZero: false, length: 8 },
  'Tuvalu': { code: '+688', trunkZero: false, length: 5 },
  'Uganda': { code: '+256', trunkZero: true, length: 9 },
  'Ukraine': { code: '+380', trunkZero: true, length: 9 },
  'United Arab Emirates': { code: '+971', trunkZero: true, length: 9 },
  'United Kingdom': { code: '+44', trunkZero: true, length: 10 },
  'United States': { code: '+1', trunkZero: false, length: 10 },
  'Uruguay': { code: '+598', trunkZero: false, length: 8 },
  'Uzbekistan': { code: '+998', trunkZero: false, length: 9 },
  'Vanuatu': { code: '+678', trunkZero: false, length: 7 },
  'Vatican City': { code: '+379', trunkZero: false, length: 10 },
  'Venezuela': { code: '+58', trunkZero: true, length: 10 },
  'Vietnam': { code: '+84', trunkZero: true, length: 9 },
  'Yemen': { code: '+967', trunkZero: true, length: 9 },
  'Zambia': { code: '+260', trunkZero: true, length: 9 },
  'Zimbabwe': { code: '+263', trunkZero: true, length: 9 },
};

/* ============================================
   State
   ============================================ */
let cart = loadJSON(STORAGE_KEYS.cart, {});      // { productId: qty }
let orders = loadJSON(STORAGE_KEYS.orders, []);  // [{ id, date, items, subtotal, shipping, total, customer }]
let activeCategory = 'All';
let activeSort = 'featured';
let searchQuery = '';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveCart() { localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart)); }
function saveOrders() { localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders)); }

/* ============================================
   DOM refs
   ============================================ */
const els = {
  searchInput: document.getElementById('searchInput'),
  categoryChips: document.getElementById('categoryChips'),
  sortSelect: document.getElementById('sortSelect'),
  resultsMeta: document.getElementById('resultsMeta'),
  productGrid: document.getElementById('productGrid'),
  emptyState: document.getElementById('emptyState'),
  clearFiltersBtn: document.getElementById('clearFiltersBtn'),

  cartBtn: document.getElementById('cartBtn'),
  cartCount: document.getElementById('cartCount'),
  ordersCount: document.getElementById('ordersCount'),
  cartDrawer: document.getElementById('cartDrawer'),
  drawerOverlay: document.getElementById('drawerOverlay'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  cartItems: document.getElementById('cartItems'),
  cartEmptyState: document.getElementById('cartEmptyState'),
  cartFooter: document.getElementById('cartFooter'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  goToCheckoutBtn: document.getElementById('goToCheckoutBtn'),

  shopView: document.getElementById('shopView'),
  ordersView: document.getElementById('ordersView'),
  checkoutView: document.getElementById('checkoutView'),
  confirmationView: document.getElementById('confirmationView'),

  ordersList: document.getElementById('ordersList'),
  noOrdersState: document.getElementById('noOrdersState'),

  backToCartBtn: document.getElementById('backToCartBtn'),
  checkoutForm: document.getElementById('checkoutForm'),
  checkoutError: document.getElementById('checkoutError'),
  summaryLines: document.getElementById('summaryLines'),
  summaryTotals: document.getElementById('summaryTotals'),

  custName: document.getElementById('custName'),
  custNameError: document.getElementById('custNameError'),
  custEmail: document.getElementById('custEmail'),
  custEmailError: document.getElementById('custEmailError'),
  phoneGroup: document.getElementById('phoneGroup'),
  phonePrefix: document.getElementById('phonePrefix'),
  phoneDigits: document.getElementById('phoneDigits'),
  custPhone: document.getElementById('custPhone'),
  custPhoneError: document.getElementById('custPhoneError'),
  custCity: document.getElementById('custCity'),
  custCityError: document.getElementById('custCityError'),
  countrySearch: document.getElementById('countrySearch'),
  custCountry: document.getElementById('custCountry'),
  custCountryError: document.getElementById('custCountryError'),
  countryListbox: document.getElementById('countryListbox'),
  cardCvc: document.getElementById('cardCvc'),
  cardCvcError: document.getElementById('cardCvcError'),

  confirmOrderId: document.getElementById('confirmOrderId'),

  toast: document.getElementById('toast'),
};

const ALL_VIEWS = [els.shopView, els.ordersView, els.checkoutView, els.confirmationView];
let toastTimeout = null;

/* ============================================
   Navigation
   ============================================ */
function navigateTo(viewName) {
  ALL_VIEWS.forEach(v => { v.hidden = true; });
  closeCart();

  if (viewName === 'shop') { els.shopView.hidden = false; renderProducts(); }
  else if (viewName === 'orders') { els.ordersView.hidden = false; renderOrders(); }
  else if (viewName === 'checkout') { els.checkoutView.hidden = false; renderCheckoutSummary(); }
  else if (viewName === 'confirmation') { els.confirmationView.hidden = false; }

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(el.dataset.nav);
  });
});

/* ============================================
   Toast
   ============================================ */
function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { els.toast.hidden = true; }, 2400);
}

/* ============================================
   Category chips
   ============================================ */
function buildCategoryChips() {
  els.categoryChips.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (cat === activeCategory ? ' is-active' : '');
    chip.textContent = cat;
    chip.addEventListener('click', () => {
      activeCategory = cat;
      buildCategoryChips();
      renderProducts();
    });
    els.categoryChips.appendChild(chip);
  });
}

/* ============================================
   Search + sort
   ============================================ */
els.searchInput.addEventListener('input', () => {
  searchQuery = els.searchInput.value.trim().toLowerCase();
  renderProducts();
});

els.sortSelect.addEventListener('change', () => {
  activeSort = els.sortSelect.value;
  renderProducts();
});

els.clearFiltersBtn.addEventListener('click', () => {
  activeCategory = 'All';
  searchQuery = '';
  els.searchInput.value = '';
  buildCategoryChips();
  renderProducts();
});

function getFilteredProducts() {
  let list = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.origin.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  switch (activeSort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating-desc': list.sort((a, b) => b.rating - a.rating); break;
    default: break; // featured = catalog order
  }
  return list;
}

/* ============================================
   Product grid rendering
   ============================================ */
function renderProducts() {
  const list = getFilteredProducts();
  els.resultsMeta.textContent = `${list.length} product${list.length === 1 ? '' : 's'}${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}`;
  els.productGrid.innerHTML = '';
  els.emptyState.hidden = list.length > 0;
  els.productGrid.hidden = list.length === 0;

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    const inCart = cart[p.id] || 0;
    const outOfStock = p.stock === 0;
    const lowStock = p.stock > 0 && p.stock <= 3;

    card.innerHTML = `
      <div class="product-media" style="background:${mediaBg(p.category)}">
        ${outOfStock ? '<span class="stock-badge is-low">Out of stock</span>' : lowStock ? `<span class="stock-badge is-low">Only ${p.stock} left</span>` : ''}
        <img src="images/${p.id}.jpg" alt="" class="product-photo" data-fallback-icon="true">
        <span class="product-icon-fallback">${p.icon}</span>
      </div>
      <div class="product-info">
        <p class="product-origin">${p.origin}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-rating">★ ${p.rating.toFixed(1)} <span>(${p.reviews})</span></p>
        <p class="product-ingredients"><strong>Ingredients:</strong> ${p.ingredients.join(', ')}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price.toFixed(2)} <small>/ ${p.unit}</small></span>
          <div class="product-controls" data-product-id="${p.id}"></div>
        </div>
      </div>
    `;

    const controls = card.querySelector('.product-controls');
    renderProductControls(controls, p, inCart, outOfStock);

    const photo = card.querySelector('.product-photo');
    const fallback = card.querySelector('.product-icon-fallback');
    photo.addEventListener('load', () => { photo.classList.add('is-loaded'); fallback.hidden = true; });
    photo.addEventListener('error', () => { photo.remove(); });

    els.productGrid.appendChild(card);
  });
}

function mediaBg(category) {
  const map = { Cocoa: '#F2EAE0', Cashew: '#F7F0DE', Shea: '#EFEFE6', Coffee: '#EFE6DC', Spice: '#F5E3DA', Oil: '#F7EFD9' };
  return map[category] || '#F2EAE0';
}

function renderProductControls(container, product, qty, outOfStock) {
  if (outOfStock) {
    container.innerHTML = `<button class="add-btn" disabled style="opacity:.5;cursor:not-allowed;">Sold out</button>`;
    return;
  }
  if (qty > 0) {
    container.innerHTML = `
      <div class="qty-stepper">
        <button class="qty-minus" aria-label="Decrease quantity">−</button>
        <span>${qty}</span>
        <button class="qty-plus" aria-label="Increase quantity">+</button>
      </div>
    `;
    container.querySelector('.qty-minus').addEventListener('click', () => changeQty(product, -1));
    container.querySelector('.qty-plus').addEventListener('click', () => changeQty(product, 1));
  } else {
    container.innerHTML = `<button class="add-btn">Add to cart</button>`;
    container.querySelector('.add-btn').addEventListener('click', () => changeQty(product, 1));
  }
}

/* ============================================
   Cart logic
   ============================================ */
function changeQty(product, delta) {
  const current = cart[product.id] || 0;
  const next = Math.max(0, Math.min(product.stock, current + delta));

  if (next === 0) delete cart[product.id];
  else cart[product.id] = next;

  saveCart();
  updateCartCount();
  renderProducts();
  renderCartDrawer();

  if (delta > 0 && current === 0) showToast(`${product.name} added to cart`);
}

function updateCartCount() {
  const total = Object.values(cart).reduce((sum, q) => sum + q, 0);
  els.cartCount.hidden = total === 0;
  els.cartCount.textContent = total;
}

function updateOrdersCount() {
  els.ordersCount.hidden = orders.length === 0;
  els.ordersCount.textContent = orders.length;
}

function getCartLines() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id === id), qty }))
    .filter(line => line.product);
}

function getCartSubtotal() {
  return getCartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
}

function renderCartDrawer() {
  const lines = getCartLines();
  els.cartItems.innerHTML = '';
  els.cartEmptyState.hidden = lines.length > 0;
  els.cartFooter.hidden = lines.length === 0;

  lines.forEach(({ product, qty }) => {
    const row = document.createElement('div');
    row.className = 'cart-line';
    row.innerHTML = `
      <div class="cart-line-media" style="background:${mediaBg(product.category)}">
        <img src="images/${product.id}.jpg" alt="" class="cart-line-photo">
        <span class="cart-line-icon-fallback">${product.icon}</span>
      </div>
      <div>
        <p class="cart-line-name">${product.name}</p>
        <p class="cart-line-price">$${product.price.toFixed(2)} × ${qty}</p>
      </div>
      <div class="cart-line-actions">
        <strong class="mono">$${(product.price * qty).toFixed(2)}</strong>
        <button class="remove-line">Remove</button>
      </div>
    `;
    const cartPhoto = row.querySelector('.cart-line-photo');
    const cartFallback = row.querySelector('.cart-line-icon-fallback');
    cartPhoto.addEventListener('load', () => { cartPhoto.classList.add('is-loaded'); cartFallback.hidden = true; });
    cartPhoto.addEventListener('error', () => { cartPhoto.remove(); });
    row.querySelector('.remove-line').addEventListener('click', () => {
      delete cart[product.id];
      saveCart();
      updateCartCount();
      renderProducts();
      renderCartDrawer();
    });
    els.cartItems.appendChild(row);
  });

  els.cartSubtotal.textContent = `$${getCartSubtotal().toFixed(2)}`;
}

/* ============================================
   Cart drawer open/close
   ============================================ */
function openCart() {
  renderCartDrawer();
  els.cartDrawer.classList.add('is-open');
  els.drawerOverlay.hidden = false;
}
function closeCart() {
  els.cartDrawer.classList.remove('is-open');
  els.drawerOverlay.hidden = true;
}

els.cartBtn.addEventListener('click', openCart);
els.closeCartBtn.addEventListener('click', closeCart);
els.drawerOverlay.addEventListener('click', closeCart);

els.goToCheckoutBtn.addEventListener('click', () => {
  if (getCartLines().length === 0) return;
  navigateTo('checkout');
});
els.backToCartBtn.addEventListener('click', () => {
  navigateTo('shop');
  openCart();
});

/* ============================================
   Field validation: name / email / city
   ============================================ */
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ'-][A-Za-zÀ-ÖØ-öø-ÿ' -]{1,59}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CVC_PATTERN = /^[0-9]{3,4}$/;

function validateField(input, errorEl, pattern) {
  const value = input.value.trim();
  const valid = value.length > 0 && pattern.test(value);
  errorEl.hidden = valid || value.length === 0;
  return valid;
}

els.custName.addEventListener('input', () => validateField(els.custName, els.custNameError, NAME_PATTERN));
els.custEmail.addEventListener('input', () => validateField(els.custEmail, els.custEmailError, EMAIL_PATTERN));
els.custCity.addEventListener('input', () => validateField(els.custCity, els.custCityError, NAME_PATTERN));
els.cardCvc.addEventListener('input', () => validateField(els.cardCvc, els.cardCvcError, CVC_PATTERN));

// Block digits and symbols from ever landing in name/city fields as they type.
[els.custName, els.custCity].forEach(input => {
  input.addEventListener('keypress', (e) => {
    const char = e.key;
    if (char.length === 1 && !/[A-Za-zÀ-ÖØ-öø-ÿ' -]/.test(char)) {
      e.preventDefault();
    }
  });
  input.addEventListener('paste', (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]*$/.test(pasted)) e.preventDefault();
  });
});

// CVC: digits only, nothing else.
els.cardCvc.addEventListener('keypress', (e) => {
  const char = e.key;
  if (char.length === 1 && !/[0-9]/.test(char)) {
    e.preventDefault();
  }
});
els.cardCvc.addEventListener('paste', (e) => {
  const pasted = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^[0-9]*$/.test(pasted)) e.preventDefault();
});
els.cardCvc.addEventListener('input', () => {
  els.cardCvc.value = els.cardCvc.value.replace(/\D/g, '').slice(0, 4);
});

/* ============================================
   Phone: country code is mandatory and fixed to the selected country;
   the digits field is capped to that country's expected length.
   ============================================ */
function applyPhoneRuleForCountry(country) {
  const rule = PHONE_RULES[country];

  els.phoneDigits.value = '';
  els.custPhone.value = '';
  els.custPhoneError.hidden = true;

  if (!rule) {
    els.phonePrefix.textContent = 'Select a country first';
    els.phoneDigits.disabled = true;
    els.phoneDigits.placeholder = '';
    els.phoneDigits.removeAttribute('maxlength');
    els.phoneGroup.classList.add('is-disabled');
    return;
  }

  els.phonePrefix.textContent = rule.trunkZero ? `${rule.code} (0)` : rule.code;
  els.phoneDigits.disabled = false;
  els.phoneDigits.maxLength = rule.length;
  els.phoneDigits.placeholder = 'X'.repeat(rule.length);
  els.phoneGroup.classList.remove('is-disabled');
  els.custPhoneError.textContent = `Enter exactly ${rule.length} digits after the country code (no leading 0).`;
}

els.phoneDigits.addEventListener('input', () => {
  // Digits only, capped to the active country's required length.
  els.phoneDigits.value = els.phoneDigits.value.replace(/\D/g, '');
  const country = els.custCountry.value;
  const rule = PHONE_RULES[country];
  if (rule) els.phoneDigits.value = els.phoneDigits.value.slice(0, rule.length);
  validatePhone();
});

els.phoneDigits.addEventListener('keypress', (e) => {
  if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
});
els.phoneDigits.addEventListener('paste', (e) => {
  const pasted = (e.clipboardData || window.clipboardData).getData('text');
  if (!/^[0-9]*$/.test(pasted)) e.preventDefault();
});

function validatePhone() {
  const country = els.custCountry.value;
  const rule = PHONE_RULES[country];

  if (!rule) {
    els.custPhoneError.textContent = 'Select a country before entering a phone number.';
    els.custPhoneError.hidden = false;
    els.custPhone.value = '';
    return false;
  }

  const digits = els.phoneDigits.value;
  const valid = digits.length === rule.length;
  els.custPhoneError.hidden = valid;
  if (!valid) {
    els.custPhoneError.textContent = `Enter exactly ${rule.length} digits after the country code (no leading 0).`;
  }
  els.custPhone.value = valid ? `${rule.code}${digits}` : '';
  return valid;
}

/* ============================================
   Country: searchable, auto-populated combobox
   ============================================ */
let countryActiveIndex = -1;

function renderCountryOptions(query) {
  const q = query.trim().toLowerCase();
  const matches = q
    ? COUNTRIES.filter(c => c.toLowerCase().includes(q)).slice(0, 8)
    : COUNTRIES.slice(0, 8);

  els.countryListbox.innerHTML = '';
  countryActiveIndex = -1;

  if (matches.length === 0) {
    els.countryListbox.innerHTML = `<li class="no-match">No matching country</li>`;
    els.countryListbox.hidden = false;
    return;
  }

  matches.forEach(country => {
    const li = document.createElement('li');
    li.textContent = country;
    li.setAttribute('role', 'option');
    li.addEventListener('click', () => selectCountry(country));
    els.countryListbox.appendChild(li);
  });
  els.countryListbox.hidden = false;
}

function selectCountry(country) {
  els.countrySearch.value = country;
  els.custCountry.value = country;
  els.custCountryError.hidden = true;
  applyPhoneRuleForCountry(country);
  closeCountryList();
}

function closeCountryList() {
  els.countryListbox.hidden = true;
  els.countrySearch.setAttribute('aria-expanded', 'false');
}

els.countrySearch.addEventListener('focus', () => {
  els.countrySearch.setAttribute('aria-expanded', 'true');
  renderCountryOptions(els.countrySearch.value);
});

els.countrySearch.addEventListener('input', () => {
  els.custCountry.value = ''; // typing invalidates any prior confirmed selection
  applyPhoneRuleForCountry(''); // no confirmed country → phone field disabled again
  renderCountryOptions(els.countrySearch.value);
});

els.countrySearch.addEventListener('keydown', (e) => {
  const items = Array.from(els.countryListbox.querySelectorAll('li:not(.no-match)'));
  if (els.countryListbox.hidden || items.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    countryActiveIndex = Math.min(countryActiveIndex + 1, items.length - 1);
    highlightCountryOption(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    countryActiveIndex = Math.max(countryActiveIndex - 1, 0);
    highlightCountryOption(items);
  } else if (e.key === 'Enter' && countryActiveIndex >= 0) {
    e.preventDefault();
    items[countryActiveIndex].click();
  } else if (e.key === 'Escape') {
    closeCountryList();
  }
});

function highlightCountryOption(items) {
  items.forEach((li, i) => li.classList.toggle('is-active', i === countryActiveIndex));
  items[countryActiveIndex]?.scrollIntoView({ block: 'nearest' });
}

document.addEventListener('click', (e) => {
  if (!document.getElementById('countryCombobox').contains(e.target)) closeCountryList();
});

/* ============================================
   Checkout
   ============================================ */
const SHIPPING_FLAT = 4.50;
const TAX_RATE = 0.05;

function renderCheckoutSummary() {
  const lines = getCartLines();
  els.summaryLines.innerHTML = lines.map(({ product, qty }) => `
    <div class="summary-line">
      <span class="sl-name">${product.name} × ${qty}</span>
      <span class="sl-price">$${(product.price * qty).toFixed(2)}</span>
    </div>
  `).join('');

  const subtotal = getCartSubtotal();
  const shipping = lines.length ? SHIPPING_FLAT : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  els.summaryTotals.innerHTML = `
    <div class="summary-total-row"><span>Subtotal</span><span class="st-value">$${subtotal.toFixed(2)}</span></div>
    <div class="summary-total-row"><span>Shipping</span><span class="st-value">$${shipping.toFixed(2)}</span></div>
    <div class="summary-total-row"><span>Est. tax (5%)</span><span class="st-value">$${tax.toFixed(2)}</span></div>
    <div class="summary-total-row grand"><span>Total</span><span class="st-value">$${total.toFixed(2)}</span></div>
  `;
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}
document.getElementById('cardNumber').addEventListener('input', (e) => {
  e.target.value = formatCardNumber(e.target.value);
});
document.getElementById('cardExpiry').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
  e.target.value = v;
});

els.checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  els.checkoutError.hidden = true;

  const lines = getCartLines();
  if (lines.length === 0) {
    els.checkoutError.textContent = 'Your cart is empty — add a product before checking out.';
    els.checkoutError.hidden = false;
    return;
  }

  const nameValid = validateField(els.custName, els.custNameError, NAME_PATTERN);
  const emailValid = validateField(els.custEmail, els.custEmailError, EMAIL_PATTERN);
  const phoneValid = validatePhone();
  const cityValid = validateField(els.custCity, els.custCityError, NAME_PATTERN);
  const countryValid = COUNTRIES.includes(els.custCountry.value);
  els.custCountryError.hidden = countryValid;
  const cvcValid = validateField(els.cardCvc, els.cardCvcError, CVC_PATTERN);

  const restOfFormValid = els.checkoutForm.checkValidity();

  if (!nameValid || !emailValid || !phoneValid || !cityValid || !countryValid || !cvcValid || !restOfFormValid) {
    els.checkoutError.textContent = 'Please correct the highlighted fields before continuing.';
    els.checkoutError.hidden = false;
    return;
  }

  const subtotal = getCartSubtotal();
  const shipping = SHIPPING_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: lines.map(({ product, qty }) => ({ id: product.id, name: product.name, price: product.price, qty })),
    subtotal, shipping, tax, total,
    customer: {
      name: els.custName.value.trim(),
      email: els.custEmail.value.trim(),
      phone: els.custPhone.value,
      city: els.custCity.value.trim(),
      country: els.custCountry.value,
    },
    status: 'Confirmed',
  };

  orders.unshift(order);
  saveOrders();
  updateOrdersCount();

  cart = {};
  saveCart();
  updateCartCount();

  els.checkoutForm.reset();
  els.custCountry.value = '';
  applyPhoneRuleForCountry('');
  els.confirmOrderId.textContent = order.id;
  navigateTo('confirmation');
});

function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `OM-${Date.now().toString().slice(-6)}-${rand}`;
}

/* ============================================
   Orders view
   ============================================ */
function renderOrders() {
  els.ordersList.innerHTML = '';
  els.noOrdersState.hidden = orders.length > 0;
  els.ordersList.hidden = orders.length === 0;

  orders.forEach(order => {
    const card = document.createElement('article');
    card.className = 'order-card';
    const dateStr = new Date(order.date).toLocaleString(undefined, {
      dateStyle: 'medium', timeStyle: 'short',
    });
    const itemsSummary = order.items.map(it => `${it.name} × ${it.qty}`).join(', ');

    card.innerHTML = `
      <div class="order-card-top">
        <span class="order-id">${order.id}</span>
        <span class="order-status">${order.status}</span>
      </div>
      <p class="order-date">${dateStr}</p>
      <p class="order-items-summary">${itemsSummary}</p>
      <p class="order-total">$${order.total.toFixed(2)}</p>
    `;
    els.ordersList.appendChild(card);
  });
}

/* ============================================
   Init
   ============================================ */
buildCategoryChips();
updateCartCount();
updateOrdersCount();
navigateTo('shop');
