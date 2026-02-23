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
  isUploading: false,
  cropper: null,
  activeShape: "square", // square, circle, heart
  uploadBlob: null, // The final cropped blob to upload
};

const PRICING = {};

// ─── Init ────────────────────────────────────────
function initOrderPage(productData, priceMap) {
  orderState.product = productData;
  Object.assign(PRICING, priceMap);

  injectCropperModal(); // Add modal to DOM
  initSizeSelector();
  initQuantityStepper();
  initImageUpload();
  updatePrice();
  updateOrderButton();

  // Auto-detect shape from product type
  if (
    productData.id.includes("couple") ||
    productData.name.toLowerCase().includes("heart")
  ) {
    orderState.activeShape = "heart";
  } else if (
    productData.id.includes("round") ||
    productData.name.toLowerCase().includes("round")
  ) {
    orderState.activeShape = "circle";
  } else {
    orderState.activeShape = "square";
  }
}

// ─── Modal Injection ─────────────────────────────
function injectCropperModal() {
  if (document.getElementById("editor-modal")) return;

  const modalHtml = `
  <div id="editor-modal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Adjust Your Photo</h3>
        <button class="modal-close" id="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="img-container" style="height: 350px; width: 100%;">
          <img id="cropper-img" src="" style="max-width: 100%; display: block;">
        </div>
      </div>
      <div class="modal-footer">
        <!-- Shape Controls -->
        <div class="shape-controls">
          <button class="shape-btn" data-shape="square" title="Square">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          </button>
          <button class="shape-btn" data-shape="circle" title="Circle/Round">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          </button>
          <button class="shape-btn" data-shape="heart" title="Heart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <!-- Actions -->
        <div class="action-buttons">
          <button id="modal-cancel" class="btn btn-secondary" style="flex:1">Cancel</button>
          <button id="modal-confirm" class="btn btn-primary" style="flex:1">Done</button>
        </div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Modal Event Listeners
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-cancel").addEventListener("click", closeModal);
  document
    .getElementById("modal-confirm")
    .addEventListener("click", confirmCrop);

  // Shape Switching
  document.querySelectorAll(".shape-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const shape = btn.dataset.shape;
      setCropperShape(shape);
      // Update UI active state
      document
        .querySelectorAll(".shape-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function openModal(imageSrc) {
  const modal = document.getElementById("editor-modal");
  const img = document.getElementById("cropper-img");

  img.src = imageSrc;
  modal.classList.add("open");

  // Init Cropper
  if (orderState.cropper) orderState.cropper.destroy();

  img.onload = () => {
    orderState.cropper = new Cropper(img, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1, // Default to square/1:1 for most magnets
      autoCropArea: 0.9,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      ready() {
        // Set initial shape
        setCropperShape(orderState.activeShape);
        // Highlight active button
        document.querySelectorAll(".shape-btn").forEach((b) => {
          b.classList.toggle(
            "active",
            b.dataset.shape === orderState.activeShape,
          );
        });
      },
    });
  };
}

function closeModal() {
  const modal = document.getElementById("editor-modal");
  modal.classList.remove("open");
  if (orderState.cropper) {
    orderState.cropper.destroy();
    orderState.cropper = null;
  }
}

function setCropperShape(shape) {
  orderState.activeShape = shape;
  const viewBox = document.querySelector(".cropper-view-box");
  const face = document.querySelector(".cropper-face");

  if (!viewBox) return;

  // Reset
  viewBox.style.borderRadius = "0";
  viewBox.style.clipPath = "none";
  viewBox.style.outline = "2px solid #fff"; // Reset default outline

  if (shape === "circle") {
    viewBox.style.borderRadius = "50%";
    viewBox.style.outline = "none";
    // We can use a box-shadow to dim the outside if we want, handled by cropper css mostly
  } else if (shape === "heart") {
    // CSS Clip Path for Heart
    // Real Heart Polygon (approx)
    viewBox.style.borderRadius = "0";
    viewBox.style.outline = "none";
    viewBox.style.clipPath =
      "polygon(50% 88%, 39% 78%, 27% 66%, 18% 55%, 12% 44%, 10% 32%, 12% 21%, 18% 12%, 28% 7%, 39% 7%, 50% 18%, 61% 7%, 72% 7%, 82% 12%, 88% 21%, 90% 32%, 88% 44%, 82% 55%, 73% 66%, 61% 78%)";
  } else {
    // Square
    viewBox.style.borderRadius = "0";
  }
}

function confirmCrop() {
  if (!orderState.cropper) return;

  orderState.cropper
    .getCroppedCanvas({
      width: 600, // Reasonable max width for upload
      height: 600,
    })
    .toBlob(
      (blob) => {
        // 1. Store the blob for uploading later (or upload now)
        orderState.uploadBlob = blob;

        // 2. Create a local URL for preview
        const previewUrl = URL.createObjectURL(blob);

        // 3. Update the Product Visual with this image
        updateProductPreview(previewUrl);

        // 4. Update the "Upload Area" to show "Image Selected"
        document.getElementById("upload-area").style.display = "none";
        document.getElementById("image-preview").style.display = "flex";
        document.getElementById("preview-img").src = previewUrl;

        // 5. Automatically start upload (good UX)
        uploadToCloudinary(blob);

        closeModal();
      },
      "image/jpeg",
      0.95,
    );
}

// ─── Size Selector ───────────────────────────────
function initSizeSelector() {
  const buttons = document.querySelectorAll(".size-options .size-btn");
  if (!buttons.length) return;

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
  const removeBtn = document.getElementById("remove-img");

  if (!uploadArea || !fileInput) return;

  uploadArea.addEventListener("click", () => fileInput.click()); // Ensure click works on area

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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
      handleFileSelect(fileInput.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering uploadArea click
      orderState.imageUploaded = false;
      orderState.imageUrl = "";
      orderState.uploadBlob = null;
      document.getElementById("upload-area").style.display = "flex";
      document.getElementById("image-preview").style.display = "none";
      updateProductPreview(null);
      updateOrderButton();
      // Reset file input
      fileInput.value = "";
    });
  }
}

function handleFileSelect(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    showToast("Please upload a JPG, PNG, or WebP image.", "error");
    return;
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    showToast(`Image must be under ${MAX_FILE_SIZE_MB} MB.`, "error");
    return;
  }

  // Read and Open Modal
  const reader = new FileReader();
  reader.onload = (e) => {
    openModal(e.target.result);
  };
  reader.readAsDataURL(file);
}

// ─── Cloudinary Upload ──────────────────────────
async function uploadToCloudinary(blob) {
  orderState.isUploading = true;
  orderState.imageUploaded = false;
  updateOrderButton();
  showUploadProgress(true);

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "vhmagnet-orders");

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    orderState.imageUrl = data.secure_url;
    orderState.imageUploaded = true;
    showToast("Image ready!", "success");
  } catch (err) {
    console.error("Upload error:", err);
    showToast("Upload failed. Please try again.", "error");
  } finally {
    orderState.isUploading = false;
    updateOrderButton();
    showUploadProgress(false);
  }
}

// ─── UI Helpers ──────────────────────────────────
function showUploadProgress(show) {
  let progressEl = document.getElementById("upload-progress");
  const previewContainer = document.querySelector(
    ".option-group:has(.image-preview)",
  );

  if (show) {
    if (!progressEl) {
      progressEl = document.createElement("div");
      progressEl.id = "upload-progress";
      progressEl.style.cssText = `
        display:flex; align-items:center; gap:0.5rem; color:#1F4E9E; font-size:0.9rem; margin-top:0.5rem;
      `;
      progressEl.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="32" stroke-linecap="round"/></svg>
        <span>Uploading...</span>
      `;
      if (previewContainer) previewContainer.appendChild(progressEl);
      else {
        // Fallback if :has not supported or container not found
        const ua = document.getElementById("image-preview");
        if (ua && ua.parentNode) ua.parentNode.appendChild(progressEl);
      }
    }
    progressEl.style.display = "flex";
  } else if (progressEl) {
    progressEl.style.display = "none";
  }
}

function updatePrice() {
  const unitPrice = PRICING[orderState.size] || 0;
  orderState.price = unitPrice * orderState.quantity;
  const priceEl = document.getElementById("total-price");
  if (priceEl) {
    priceEl.innerHTML = `<span class="currency">₹</span>${orderState.price.toLocaleString("en-IN")}`;
  }
}

function updateOrderButton() {
  const btn = document.getElementById("order-btn");
  if (!btn) return;
  btn.disabled = !orderState.imageUploaded || orderState.isUploading;

  // Optional: Change text
}

function placeOrder() {
  if (!orderState.imageUploaded || !orderState.imageUrl) {
    showToast("Please upload the image first.", "error");
    return;
  }
  const message = [
    "Hello! I want to order:",
    `Product: ${orderState.product.name} (${orderState.activeShape})`,
    `Size: ${orderState.size}`,
    `Quantity: ${orderState.quantity}`,
    `Total: ₹${orderState.price}`,
    "",
    `Image: ${orderState.imageUrl}`,
  ].join("\n");

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
}

function showToast(msg, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type} show`;
  toast.innerText = msg;
  toast.style.cssText = `
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: ${type === "error" ? "#ef4444" : "#10b981"};
    color: white; padding: 0.75rem 1.5rem; border-radius: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999; font-size: 0.9rem;
    animation: fadeUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ─── Product Preview ─────────────────────────────
function updateProductPreview(imageSrc) {
  const container = document.getElementById("product-visual-container");
  if (!container) return;

  const existingImg = container.querySelector(".product-preview-overlay");
  if (existingImg) existingImg.remove(); // Clear old

  if (!imageSrc) return;

  const img = document.createElement("img");
  img.src = imageSrc;
  img.className = "product-preview-overlay";
  img.style.cssText = `
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    object-fit: contain; z-index: 10;
  `;

  // Apply visual mask to the preview on the page too!
  if (orderState.activeShape === "circle") {
    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
  } else if (orderState.activeShape === "heart") {
    img.style.clipPath =
      "polygon(50% 88%, 39% 78%, 27% 66%, 18% 55%, 12% 44%, 10% 32%, 12% 21%, 18% 12%, 28% 7%, 39% 7%, 50% 18%, 61% 7%, 72% 7%, 82% 12%, 88% 21%, 90% 32%, 88% 44%, 82% 55%, 73% 66%, 61% 78%)";
    img.style.objectFit = "cover";
  } else {
    // Square/Rect
    img.style.borderRadius = "var(--radius)";
    img.style.objectFit = "contain";
  }

  container.appendChild(img);
}

// ─── Shared: Navbar scroll (optional if not in shared file) ──────
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
