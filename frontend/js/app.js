const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : '';

const NAV_ITEMS = [
  'Sale', "What's New", 'Designers', 'Clothing', 'Shoes', 'Accessories',
  'Gifts', 'Kids', 'Watches', 'Sport', 'Home', 'Grooming', 'Shop By', 'The Journal'
];

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/', label: 'Facebook', icon: 'public' },
  { href: '#', label: 'Instagram', icon: 'photo_camera' },
  { href: '#', label: 'Twitter', icon: 'tag' },
  { href: '#', label: 'YouTube', icon: 'play_circle' },
  { href: '#', label: 'Spotify', icon: 'music_note' },
  { href: '#', label: 'Apple Music', icon: 'headphones' }
];

function icon(name) {
  return `<span class="material-symbols-outlined">${name}</span>`;
}

function renderNav() {
  const list = document.getElementById('nav-items');
  if (!list) return;
  list.innerHTML = NAV_ITEMS.map((item, i) => {
    const saleAttr = i === 0 ? ' id="sale"' : '';
    return `<li class="items-li"><a href="#" class="items-a"${saleAttr}>${item}</a></li>`;
  }).join('');
}

function renderSocial(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = SOCIAL_LINKS.map(({ href, label, icon: ic }) =>
    `<div class="rradha"><a href="${href}" aria-label="${label}">${icon(ic)}</a></div>`
  ).join('');
}

function productCard({ id, name, price, image_url }) {
  return `
    <article class="items" data-id="${id}">
      <div class="info">
        <a href="#"><img src="${image_url}" alt="${name}" class="product-img" loading="lazy"></a>
        <a href="#"><h3>${name}</h3></a>
        <div class="rregullim">
          <p>$${Number(price).toFixed(2)}</p>
          <label class="container-1">
            <input type="checkbox" checked>
            <div class="line"></div>
            <div class="line line-indicator"></div>
          </label>
        </div>
      </div>
    </article>`;
}

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error('Failed to load products');
    const products = await res.json();
    grid.innerHTML = products.map(productCard).join('');
  } catch {
    grid.innerHTML = '<p class="error-msg">Could not load products. Start the backend server.</p>';
  }
}

renderNav();
renderSocial('social-desktop');
renderSocial('social-mobile');
loadProducts();
