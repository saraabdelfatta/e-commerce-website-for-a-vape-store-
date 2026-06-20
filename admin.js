/* ==========================================================================
   Cairo Vape E-Commerce JS Admin Logic
   ========================================================================== */

let productsCatalog = [];
let ordersHistory = [];

// Load state from localStorage
function loadDataFromStorage() {
  const storedProd = localStorage.getItem('vape_products');
  if (storedProd) {
    productsCatalog = JSON.parse(storedProd);
  } else {
    // If empty, standard defaults will be populated by app.js on first run
    productsCatalog = [];
  }

  const storedOrders = localStorage.getItem('vape_orders');
  if (storedOrders) {
    ordersHistory = JSON.parse(storedOrders);
  } else {
    ordersHistory = [];
  }
}

// Save state back to localStorage
function saveDataToStorage() {
  localStorage.setItem('vape_products', JSON.stringify(productsCatalog));
  localStorage.setItem('vape_orders', JSON.stringify(ordersHistory));
}

// Initial Mount
window.addEventListener('DOMContentLoaded', () => {
  loadDataFromStorage();
  renderAdminCatalog();
  renderAdminOrders();
});

// Render catalog table list
function renderAdminCatalog() {
  const body = document.getElementById('adminCatalogTableBody');
  document.getElementById('adminStatProducts').innerHTML = productsCatalog.length;

  body.innerHTML = productsCatalog.map(product => `
    <tr>
      <td style="font-weight:700; color:var(--text-dark);">${product.name}</td>
      <td style="text-transform: capitalize; font-size:12px;">${product.category}</td>
      <td>
        <input type="number" class="form-input" style="width:90px; height:30px;" 
               value="${product.price}" onchange="handleAdminPriceChange('${product.id}', this.value)">
      </td>
      <td>
        <button class="btn-admin-action stock ${product.inStock ? '' : 'out'}" 
                onclick="handleAdminStockToggle('${product.id}')">
          ${product.inStock ? 'In Stock' : 'Out of Stock'}
        </button>
      </td>
      <td>
        <button class="btn-admin-action delete" onclick="handleAdminDeleteProduct('${product.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Render session placed orders history list
function renderAdminOrders() {
  const body = document.getElementById('adminOrdersTableBody');
  document.getElementById('adminStatOrders').innerHTML = ordersHistory.length;

  if (ordersHistory.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted);">No orders recorded in this session yet.</td>
      </tr>
    `;
    return;
  }

  body.innerHTML = ordersHistory.map(order => `
    <tr>
      <td style="font-weight:800; color:var(--primary);">#${order.referenceId}</td>
      <td style="font-size:12px;">${order.time}</td>
      <td style="font-size:12px; max-width: 250px;">
        <strong>Address:</strong> ${order.address}<br>
        ${order.notes ? `<strong>Notes:</strong> ${order.notes}` : ''}
      </td>
      <td>
        <a href="${order.locationUrl}" target="_blank" style="color:var(--accent); font-weight:600; text-decoration:underline;">
          View Map Location 📍
        </a>
      </td>
      <td style="font-size:11px; white-space:pre-line;">${order.itemsSummary}</td>
      <td style="font-weight:700; color:var(--success);">${order.total} EGP</td>
    </tr>
  `).join('');
}

// Handle price updates
function handleAdminPriceChange(productId, newPrice) {
  const price = parseInt(newPrice);
  if (isNaN(price) || price < 0) return;

  const idx = productsCatalog.findIndex(p => p.id === productId);
  if (idx > -1) {
    productsCatalog[idx].price = price;
    saveDataToStorage();
    renderAdminCatalog();
  }
}

// Handle stock toggles
function handleAdminStockToggle(productId) {
  const idx = productsCatalog.findIndex(p => p.id === productId);
  if (idx > -1) {
    productsCatalog[idx].inStock = !productsCatalog[idx].inStock;
    saveDataToStorage();
    renderAdminCatalog();
  }
}

// Handle deletions
function handleAdminDeleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    productsCatalog = productsCatalog.filter(p => p.id !== productId);
    saveDataToStorage();
    renderAdminCatalog();
  }
}

// Handle additions
function handleAdminAddProduct() {
  const name = document.getElementById('adminProdName').value;
  const category = document.getElementById('adminProdCategory').value;
  const price = parseInt(document.getElementById('adminProdPrice').value);
  const image = document.getElementById('adminProdImage').value;
  const battery = document.getElementById('adminProdBattery').value || 'N/A';
  const capacity = document.getElementById('adminProdCapacity').value || 'N/A';
  const resistance = document.getElementById('adminProdResistance').value || 'N/A';
  const desc = document.getElementById('adminProdDesc').value;

  const flavorsInput = document.getElementById('adminProdFlavors').value;
  const nicotineInput = document.getElementById('adminProdNicotine').value;

  const flavors = flavorsInput ? flavorsInput.split(',').map(f => f.trim()) : ['N/A'];
  const nicotine = nicotineInput ? nicotineInput.split(',').map(n => n.trim()) : ['N/A'];

  const newProduct = {
    id: 'ADMIN_' + Math.floor(1000 + Math.random() * 9000),
    name: name,
    category: category,
    price: price,
    image: image,
    nicotineLevels: nicotine,
    flavors: flavors,
    battery: battery,
    capacity: capacity,
    resistance: resistance,
    description: desc,
    rating: 5.0,
    reviewsCount: 0,
    inStock: true
  };

  productsCatalog.push(newProduct);
  saveDataToStorage();
  renderAdminCatalog();
  document.getElementById('adminAddProductForm').reset();
  alert("Vape product successfully added to store!");
}
