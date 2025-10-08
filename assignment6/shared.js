/* shared.js - packages data, utility functions, modal and nav handling */

/* Packages array: id, destination, durationDays, basePrice, season */
const packages = [
  { id: 1, destination: "Goa Beach Retreat", durationDays: 4, basePrice: 8000, season: "peak" },
  { id: 2, destination: "Himalayan Escape (Manali)", durationDays: 6, basePrice: 12000, season: "mid" },
  { id: 3, destination: "Kerala Backwaters", durationDays: 5, basePrice: 10000, season: "low" },
  { id: 4, destination: "Golden Triangle (Delhi-Agra-Jaipur)", durationDays: 7, basePrice: 15000, season: "peak" },
  { id: 5, destination: "Andaman Adventure", durationDays: 5, basePrice: 18000, season: "mid" }
];

/* computeFinalPrice: uses operators and control flow (if/switch) */
function computeFinalPrice(pkg){
  if(!pkg) return 0;
  let price = pkg.basePrice * pkg.durationDays;
  // seasonal multiplier
  let seasonMult = 1;
  switch(pkg.season){
    case 'peak': seasonMult = 1.3; break;
    case 'mid': seasonMult = 1.1; break;
    case 'low': seasonMult = 0.9; break;
    default: seasonMult = 1;
  }
  price = price * seasonMult;
  // weekend surcharge example: add flat 5% for packages that include weekend days (approx)
  if(pkg.durationDays >= 5) price = price * 1.05;
  return Math.round(price);
}

/* NAV: highlight active link based on data-link attribute and URL */
function initNav(){
  const links = document.querySelectorAll('.nav-link');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const map = { 'index.html':'home', 'packages.html':'packages', 'gallery.html':'gallery', 'about.html':'about' };
  const current = map[path] || 'home';
  links.forEach(a => {
    if(a.getAttribute('data-link') === current) a.classList.add('active');
    else a.classList.remove('active');
    // smooth scroll behavior example: if link has hash, smooth scroll
    a.addEventListener('click', (e) => {
      // simple active toggle immediate feedback
      links.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
    });
  });
  // on scroll, change active based on position (simple behavior)
  window.addEventListener('scroll', () => {
    // placeholder for more advanced behavior
  });
}

/* Gallery modal: detect images with data-large and open modal */
function initGalleryModal(){
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  if(!modal) {
    // attach handlers to any thumbnails (images with data-large)
    document.querySelectorAll('img[data-large]').forEach(img => {
      img.addEventListener('click', (e) => {
        openModalFromImg(img);
      });
    });
    return;
  }

  function openModalFromImg(img){
    const large = img.dataset.large;
    const title = img.dataset.title || img.alt || '';
    const caption = img.dataset.caption || '';
    modalImg.src = large;
    modalImg.alt = title;
    modalCaption.textContent = caption;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  // attach to inline thumbnails
  document.querySelectorAll('img[data-large]').forEach(img => {
    img.addEventListener('click', () => openModalFromImg(img));
  });

  modalClose && modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=> { if(e.target===modal) closeModal(); });
  function closeModal(){
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }
}

/* basic DOM-ready init: highlight nav and gallery listeners */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGalleryModal();
});
