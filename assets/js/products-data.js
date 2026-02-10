/**
 * VH Magnet – Product Catalog Data
 * Central data source for all products.
 * Used by products.html (grid) and products/product.html (detail page).
 */

const PRODUCTS = [
  // ─── MAGNETS ─────────────────────────────────
  {
    id: "photo-magnet",
    name: "Photo Magnet",
    category: "magnet",
    tagline: "Turn memories into magnets",
    description:
      "Turn any photo into a stunning fridge magnet with our glossy, high-quality print and strong magnetic backing. Perfect for decorating your fridge, office board, or any metal surface.",
    startingPrice: 99,
    sizes: [
      { label: "3×3 inch", value: "3x3 inch", price: 99 },
      { label: "4×4 inch", value: "4x4 inch", price: 149 },
      { label: "5×5 inch", value: "5x5 inch", price: 199 },
    ],
    features: [
      { icon: "sparkle", label: "Glossy Finish" },
      { icon: "magnet", label: "Strong Magnet" },
      { icon: "palette", label: "Vivid Colors" },
    ],
    gradient: "linear-gradient(135deg, #4c1d95, #7c3aed, #a78bfa)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="18" y="18" width="84" height="84" rx="10" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><rect x="26" y="26" width="68" height="50" rx="6" fill="rgba(255,255,255,0.18)"/><circle cx="44" cy="44" r="8" fill="rgba(255,255,255,0.35)"/><path d="M26 66l20-14 14 12 16-10 16 16H26z" fill="rgba(255,255,255,0.25)"/></svg>',
  },
  {
    id: "fridge-magnet",
    name: "Fridge Magnet Set",
    category: "magnet",
    tagline: "Decorate your fridge beautifully",
    description:
      "A curated set of 4 mini magnets featuring your favourite photos. Perfect for gifting or decorating your kitchen with personal memories.",
    startingPrice: 299,
    sizes: [
      { label: "2×2 inch (set of 4)", value: "2x2 inch set", price: 299 },
      { label: "3×3 inch (set of 4)", value: "3x3 inch set", price: 449 },
    ],
    features: [
      { icon: "grid", label: "Set of 4" },
      { icon: "magnet", label: "Strong Hold" },
      { icon: "gift", label: "Gift Ready" },
    ],
    gradient: "linear-gradient(135deg, #1e3a5f, #3b82f6, #93c5fd)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="14" y="14" width="40" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/><rect x="66" y="14" width="40" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/><rect x="14" y="66" width="40" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/><rect x="66" y="66" width="40" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/></svg>',
  },
  {
    id: "couple-magnet",
    name: "Couple Magnet",
    category: "magnet",
    tagline: "Celebrate your bond",
    description:
      "A heart-shaped photo magnet designed for couples. Upload your favourite couple photo and surprise your partner with this adorable keepsake.",
    startingPrice: 149,
    sizes: [
      { label: "3×3 inch Heart", value: "3x3 inch", price: 149 },
      { label: "4×4 inch Heart", value: "4x4 inch", price: 199 },
      { label: "5×5 inch Heart", value: "5x5 inch", price: 249 },
    ],
    features: [
      { icon: "heart", label: "Heart Shape" },
      { icon: "sparkle", label: "Premium Print" },
      { icon: "gift", label: "Perfect Gift" },
    ],
    gradient: "linear-gradient(135deg, #9f1239, #e11d48, #fb7185)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><path d="M60 100S20 72 20 45a22 22 0 0140-13 22 22 0 0140 13c0 27-40 55-40 55z" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="2"/><circle cx="48" cy="50" r="6" fill="rgba(255,255,255,0.3)"/><circle cx="72" cy="50" r="6" fill="rgba(255,255,255,0.3)"/></svg>',
  },
  {
    id: "wedding-magnet",
    name: "Wedding Magnet",
    category: "magnet",
    tagline: "Cherish your special day",
    description:
      "Custom wedding photo magnets — perfect as save-the-date souvenirs, wedding favours, or a memorable keepsake for the couple. Available in elegant shapes.",
    startingPrice: 129,
    sizes: [
      { label: "3×3 inch", value: "3x3 inch", price: 129 },
      { label: "4×4 inch", value: "4x4 inch", price: 179 },
      { label: "5×7 inch", value: "5x7 inch", price: 249 },
    ],
    features: [
      { icon: "sparkle", label: "Elegant Finish" },
      { icon: "users", label: "Bulk Orders" },
      { icon: "heart", label: "Wedding Favour" },
    ],
    gradient: "linear-gradient(135deg, #78350f, #d97706, #fbbf24)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="24" y="20" width="72" height="80" rx="8" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><path d="M44 55l8 8 24-24" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="36" y="75" width="48" height="4" rx="2" fill="rgba(255,255,255,0.3)"/><rect x="44" y="83" width="32" height="4" rx="2" fill="rgba(255,255,255,0.2)"/></svg>',
  },
  {
    id: "birthday-magnet",
    name: "Birthday Magnet",
    category: "magnet",
    tagline: "Make birthdays unforgettable",
    description:
      "Celebrate birthdays with a personalised photo magnet! Add a birthday photo and we'll create a vibrant, fun magnet that makes the perfect party favour or gift.",
    startingPrice: 99,
    sizes: [
      { label: "3×3 inch", value: "3x3 inch", price: 99 },
      { label: "4×4 inch", value: "4x4 inch", price: 149 },
      { label: "5×5 inch Round", value: "5x5 inch round", price: 199 },
    ],
    features: [
      { icon: "cake", label: "Party Ready" },
      { icon: "palette", label: "Vibrant Print" },
      { icon: "gift", label: "Great Gift" },
    ],
    gradient: "linear-gradient(135deg, #5b21b6, #8b5cf6, #c4b5fd)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="28" y="50" width="64" height="46" rx="8" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><rect x="38" y="40" width="44" height="14" rx="4" fill="rgba(255,255,255,0.18)" stroke="#fff" stroke-width="1.5"/><line x1="60" y1="28" x2="60" y2="40" stroke="#fff" stroke-width="2"/><circle cx="60" cy="25" r="4" fill="rgba(255,255,255,0.5)"/></svg>',
  },
  {
    id: "baby-shower-magnet",
    name: "Baby Shower Magnet",
    category: "magnet",
    tagline: "Tiny moments, big memories",
    description:
      "Adorable custom magnets for baby showers and newborn celebrations. Upload your baby's photo or sonogram for a sweet, lasting memento.",
    startingPrice: 99,
    sizes: [
      { label: "3×3 inch", value: "3x3 inch", price: 99 },
      { label: "4×4 inch", value: "4x4 inch", price: 149 },
    ],
    features: [
      { icon: "heart", label: "Baby Safe Edges" },
      { icon: "sparkle", label: "Soft Finish" },
      { icon: "gift", label: "Cute Packaging" },
    ],
    gradient: "linear-gradient(135deg, #0e7490, #06b6d4, #67e8f9)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><circle cx="60" cy="50" r="30" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><circle cx="48" cy="45" r="4" fill="rgba(255,255,255,0.3)"/><circle cx="72" cy="45" r="4" fill="rgba(255,255,255,0.3)"/><path d="M50 58a12 12 0 0020 0" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M42 25c-4-8 4-16 12-10M78 25c4-8-4-16-12-10" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>',
  },

  // ─── STICKERS ────────────────────────────────
  {
    id: "custom-sticker",
    name: "Custom Sticker",
    category: "sticker",
    tagline: "Stick your style everywhere",
    description:
      "Personalised vinyl stickers perfect for laptops, bottles, notebooks, and more. Waterproof, scratch-resistant, and built to last.",
    startingPrice: 49,
    sizes: [
      { label: "2×2 inch", value: "2x2 inch", price: 49 },
      { label: "3×3 inch", value: "3x3 inch", price: 79 },
      { label: "A5 Sheet", value: "A5 Sheet", price: 149 },
    ],
    features: [
      { icon: "water", label: "Waterproof" },
      { icon: "shield", label: "Scratch-proof" },
      { icon: "palette", label: "Vivid Print" },
    ],
    gradient: "linear-gradient(135deg, #831843, #ec4899, #f9a8d4)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><path d="M60 12L76 46l36 5-26 25 6 36-32-17-32 17 6-36-26-25 36-5z" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="2"/><circle cx="60" cy="52" r="14" fill="rgba(255,255,255,0.18)"/></svg>',
  },
  {
    id: "die-cut-sticker",
    name: "Die-Cut Sticker",
    category: "sticker",
    tagline: "Cut to your shape",
    description:
      "Custom die-cut stickers shaped precisely around your design. No white borders — just your art in its perfect outline. Ideal for branding and creativity.",
    startingPrice: 69,
    sizes: [
      { label: "2×2 inch", value: "2x2 inch", price: 69 },
      { label: "3×3 inch", value: "3x3 inch", price: 99 },
      { label: "4×4 inch", value: "4x4 inch", price: 139 },
    ],
    features: [
      { icon: "scissors", label: "Custom Shape" },
      { icon: "water", label: "Waterproof" },
      { icon: "sparkle", label: "No White Border" },
    ],
    gradient: "linear-gradient(135deg, #065f46, #10b981, #6ee7b7)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><path d="M60 16c24 0 44 20 44 44S84 104 60 104 16 84 16 60 36 16 60 16z" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="2" stroke-dasharray="6 4"/><rect x="36" y="36" width="48" height="48" rx="24" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/></svg>',
  },
  {
    id: "laptop-sticker",
    name: "Laptop Sticker",
    category: "sticker",
    tagline: "Personalise your workspace",
    description:
      "Premium vinyl stickers sized perfectly for laptops and devices. Show off your personality with a custom sticker that lasts through daily use.",
    startingPrice: 79,
    sizes: [
      { label: "3×3 inch", value: "3x3 inch", price: 79 },
      { label: "4×4 inch", value: "4x4 inch", price: 119 },
      { label: "6×4 inch (Landscape)", value: "6x4 inch", price: 159 },
    ],
    features: [
      { icon: "laptop", label: "Device Ready" },
      { icon: "shield", label: "Residue Free" },
      { icon: "water", label: "Waterproof" },
    ],
    gradient: "linear-gradient(135deg, #1e293b, #475569, #94a3b8)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="20" y="28" width="80" height="52" rx="6" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><rect x="28" y="36" width="64" height="36" rx="2" fill="rgba(255,255,255,0.1)"/><path d="M14 80h92a4 4 0 01-4 8H18a4 4 0 01-4-8z" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/></svg>',
  },
  {
    id: "car-sticker",
    name: "Car / Bike Sticker",
    category: "sticker",
    tagline: "Hit the road in style",
    description:
      "Durable outdoor-grade vinyl stickers designed for cars, bikes, and helmets. UV-resistant and weatherproof — built to survive the elements.",
    startingPrice: 99,
    sizes: [
      { label: "4×4 inch", value: "4x4 inch", price: 99 },
      { label: "6×4 inch", value: "6x4 inch", price: 149 },
      { label: "8×4 inch (Bumper)", value: "8x4 inch", price: 199 },
    ],
    features: [
      { icon: "sun", label: "UV Resistant" },
      { icon: "water", label: "Weatherproof" },
      { icon: "shield", label: "Extra Durable" },
    ],
    gradient: "linear-gradient(135deg, #7f1d1d, #ef4444, #fca5a5)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="18" y="44" width="84" height="36" rx="10" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><circle cx="38" cy="82" r="10" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/><circle cx="82" cy="82" r="10" fill="rgba(255,255,255,0.15)" stroke="#fff" stroke-width="1.5"/><path d="M30 44l10-16h40l10 16" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    id: "logo-sticker",
    name: "Logo / Brand Sticker",
    category: "sticker",
    tagline: "Promote your brand everywhere",
    description:
      "Custom logo stickers for businesses, events, and personal branding. Upload your logo and get professional-quality stickers in bulk at affordable prices.",
    startingPrice: 39,
    sizes: [
      { label: "2×2 inch (10 pcs)", value: "2x2 inch x10", price: 199 },
      { label: "3×3 inch (10 pcs)", value: "3x3 inch x10", price: 349 },
      { label: "4×4 inch (10 pcs)", value: "4x4 inch x10", price: 499 },
    ],
    features: [
      { icon: "users", label: "Bulk Packs" },
      { icon: "sparkle", label: "Brand Quality" },
      { icon: "shield", label: "Long Lasting" },
    ],
    gradient: "linear-gradient(135deg, #312e81, #6366f1, #a5b4fc)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><circle cx="60" cy="60" r="40" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="2"/><text x="60" y="55" text-anchor="middle" fill="#fff" font-size="14" font-family="Outfit" font-weight="700">YOUR</text><text x="60" y="72" text-anchor="middle" fill="#fff" font-size="14" font-family="Outfit" font-weight="700">LOGO</text></svg>',
  },
  {
    id: "name-sticker",
    name: "Name Label Sticker",
    category: "sticker",
    tagline: "Label everything that's yours",
    description:
      "Custom name label stickers for kids' school supplies, water bottles, lunch boxes, and more. Durable, waterproof, and available in fun designs.",
    startingPrice: 149,
    sizes: [
      { label: "Small Pack (20 pcs)", value: "Small Pack 20pcs", price: 149 },
      { label: "Medium Pack (40 pcs)", value: "Medium Pack 40pcs", price: 249 },
      { label: "Large Pack (80 pcs)", value: "Large Pack 80pcs", price: 399 },
    ],
    features: [
      { icon: "tag", label: "Name Labels" },
      { icon: "water", label: "Waterproof" },
      { icon: "palette", label: "Fun Designs" },
    ],
    gradient: "linear-gradient(135deg, #854d0e, #eab308, #fde047)",
    svgIcon:
      '<svg width="120" height="120" fill="none" viewBox="0 0 120 120"><rect x="20" y="36" width="80" height="48" rx="8" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/><rect x="32" y="50" width="56" height="6" rx="3" fill="rgba(255,255,255,0.3)"/><rect x="40" y="62" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)"/><circle cx="30" cy="60" r="3" fill="rgba(255,255,255,0.4)"/></svg>',
  },
];

// ─── Feature Icon SVGs ──────────────────────────
const FEATURE_ICONS = {
  sparkle:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
  magnet:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  palette:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
  heart:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
  gift: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a4 4 0 00-4-4 4 4 0 00-4 4v2h8zm0 0V6a4 4 0 014-4 4 4 0 014 4v2h-8zM5 8h14a1 1 0 011 1v3H4V9a1 1 0 011-1zm0 4h14v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z"/></svg>',
  grid: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
  users:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  water:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 01-1.806-1.741L3.5 8.5m16 4.5l-.83-4.15A2 2 0 0016.71 7H7.29a2 2 0 00-1.96 1.85L4.5 13"/></svg>',
  shield:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  cake: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 17.25V21h18v-3.75c0-.414-.168-.81-.454-1.114zM3 17.25V11a2 2 0 012-2h14a2 2 0 012 2v6.25M12 4v5m-4-1V4m8 4V4"/></svg>',
  scissors:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>',
  laptop:
    '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  sun: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
  tag: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5a1.97 1.97 0 011.41.59l7 7a2 2 0 010 2.82l-5 5a2 2 0 01-2.82 0l-7-7A2 2 0 015 10V5a2 2 0 012-2z"/></svg>',
};

/**
 * Get a product by its ID (slug).
 * @param {string} id – product slug, e.g. 'photo-magnet'
 * @returns {object|undefined}
 */
function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
