/**
 * VH Magnet – Order Flow (WhatsApp + Cloudinary Upload)
 * Handles product customisation, image upload to Cloudinary,
 * message generation with image link, and WhatsApp redirect.
 */

// ─── Config ──────────────────────────────────────
const WHATSAPP_NUMBER = "919265318453";
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// ─── Cloudinary Config ───────────────────────────
// ⚠️  Replace these with your Cloudinary credentials:
//     1. CLOUD_NAME  → Cloudinary Dashboard → Cloud Name
//     2. UPLOAD_PRESET → Settings → Upload → Upload Presets → Add Unsigned Preset
const CLOUDINARY_CLOUD_NAME = "dltmiswel";
const CLOUDINARY_UPLOAD_PRESET = "VHmagnet";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// ─── State ───────────────────────────────────────
const orderState = {
  product: "",
  size: "",
  quantity: 1,
  price: 0,
  imageUploaded: false,
  imageUrl: "", // Cloudinary URL after upload
  isUploading: false, // Upload in progress flag
};

// Pricing tables keyed by product id (set per-page)
const PRICING = {};

// ─── Init ────────────────────────────────────────
function initOrderPage(productName, priceMap) {
  orderState.product = productName;
  Object.assign(PRICING, priceMap);

  initSizeSelector();
  initQuantityStepper();
  initImageUpload();
  updatePrice();
  updateOrderButton();
}

// ─── Size Selector ───────────────────────────────
function initSizeSelector() {
  const buttons = document.querySelectorAll(".size-options .size-btn");
  if (!buttons.length) return;

  // Auto-select first
  buttons[0].classList.add("active");
  orderState.size = buttons[0].dataset.size;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      orderState.size = btn.dataset.size;
      updatePrice();
    });
  });
}

// ─── Quantity Stepper ────────────────────────────
function initQuantityStepper() {
  const minusBtn = document.getElementById("qty-minus");
  const plusBtn = document.getElementById("qty-plus");
  const qtyDisplay = document.getElementById("qty-value");
  if (!minusBtn || !plusBtn || !qtyDisplay) return;

  minusBtn.addEventListener("click", () => {
    if (orderState.quantity > 1) {
      orderState.quantity--;
      qtyDisplay.textContent = orderState.quantity;
      updatePrice();
    }
  });

  plusBtn.addEventListener("click", () => {
    if (orderState.quantity < 100) {
      orderState.quantity++;
      qtyDisplay.textContent = orderState.quantity;
      updatePrice();
    }
  });
}

// ─── Image Upload ────────────────────────────────
function initImageUpload() {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("image-input");
  const preview = document.getElementById("image-preview");
  const previewImg = document.getElementById("preview-img");
  const removeBtn = document.getElementById("remove-img");

  if (!uploadArea || !fileInput) return;

  // Drag-and-drop visual
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });
  uploadArea.addEventListener("dragleave", () =>
    uploadArea.classList.remove("dragover"),
  );
  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      handleFileSelect(fileInput.files[0], preview, previewImg);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
      handleFileSelect(fileInput.files[0], preview, previewImg);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.value = "";
      preview.style.display = "none";
      orderState.imageUploaded = false;
      orderState.imageUrl = "";
      updateOrderButton();
    });
  }
}

function handleFileSelect(file, previewContainer, previewImg) {
  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    showToast("Please upload a JPG, PNG, or WebP image.", "error");
    return;
  }
  // Validate size
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    showToast(`Image must be under ${MAX_FILE_SIZE_MB} MB.`, "error");
    return;
  }

  // Show local preview immediately
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    previewContainer.style.display = "block";
  };
  reader.readAsDataURL(file);

  // Upload to Cloudinary
  uploadToCloudinary(file);
}

// ─── Cloudinary Upload ──────────────────────────
async function uploadToCloudinary(file) {
  orderState.isUploading = true;
  orderState.imageUploaded = false;
  orderState.imageUrl = "";
  updateOrderButton();
  showUploadProgress(true);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "vhmagnet-orders");

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed (${response.status})`);
    }

    const data = await response.json();
    orderState.imageUrl = data.secure_url;
    orderState.imageUploaded = true;
    orderState.isUploading = false;
    updateOrderButton();
    showUploadProgress(false);
    showToast("Image uploaded! You can now place your order.", "success");
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    orderState.isUploading = false;
    orderState.imageUploaded = false;
    orderState.imageUrl = "";
    updateOrderButton();
    showUploadProgress(false);
    showToast("Image upload failed. Please try again.", "error");
  }
}

// ─── Upload Progress Indicator ──────────────────
function showUploadProgress(show) {
  const uploadArea = document.getElementById("upload-area");
  let progressEl = document.getElementById("upload-progress");

  if (show) {
    if (!progressEl) {
      progressEl = document.createElement("div");
      progressEl.id = "upload-progress";
      progressEl.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1.25rem;
        background: rgba(124, 58, 237, 0.1);
        border: 1px solid rgba(124, 58, 237, 0.3);
        border-radius: 0.5rem;
        font-size: 0.9rem;
        color: #A78BFA;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      `;
      progressEl.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="animation:spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
        </svg>
        Uploading image...
      `;
      if (uploadArea && uploadArea.parentNode) {
        uploadArea.parentNode.insertBefore(progressEl, uploadArea.nextSibling);
      }
    }
    progressEl.style.display = "flex";
  } else if (progressEl) {
    progressEl.style.display = "none";
  }
}

// ─── Price Update ────────────────────────────────
function updatePrice() {
  const unitPrice = PRICING[orderState.size] || 0;
  orderState.price = unitPrice * orderState.quantity;

  const priceEl = document.getElementById("total-price");
  if (priceEl) {
    priceEl.innerHTML = `<span class="currency">₹</span>${orderState.price.toLocaleString("en-IN")}`;
  }
}

// ─── Order Button ────────────────────────────────
function updateOrderButton() {
  const btn = document.getElementById("order-btn");
  if (!btn) return;
  btn.disabled = !orderState.imageUploaded || orderState.isUploading;

  // Update button text during upload
  const btnText = btn.querySelector(".btn-text") || btn;
  if (orderState.isUploading) {
    btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
  }
}

// ─── WhatsApp Redirect ──────────────────────────
function placeOrder() {
  if (!orderState.imageUploaded || !orderState.imageUrl) {
    showToast("Please upload your image first.", "error");
    return;
  }

  const message = [
    "Hello, I want to place an order:",
    `Product: ${orderState.product}`,
    `Size: ${orderState.size}`,
    `Quantity: ${orderState.quantity}`,
    `Total: ₹${orderState.price.toLocaleString("en-IN")}`,
    "",
    `My image: ${orderState.imageUrl}`,
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ─── Toast ───────────────────────────────────────
function showToast(msg, type = "success") {
  // Remove existing
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─── Shared: Navbar scroll & mobile toggle ──────
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  // Mobile toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    // Close on link click
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // Scroll-reveal animations
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
});
