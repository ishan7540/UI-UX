Assignment 6 - Travel Website (based on Assignment 2)
Files:
- index.html (Home)
- packages.html (Packages + Booking Price Estimator)
- gallery.html (Gallery with modal using data-large attributes)
- about.html (About / Contact)
- shared.js (packages array, functions: computeFinalPrice, initNav, initGalleryModal)
- style.css (styles)

Features implemented (JS-driven):
- Packages table rendered from `packages` array (loops + functions)
- Final Price column computed using season multipliers, duration and surcharges
- Booking estimator live calculation (date math, guest multiplier, promo codes)
- Validation disables submit when required fields invalid
- Gallery thumbnails with `data-large` attributes open modal showing large image and captions
- Nav link active highlighting via JS (adds .active class)
- DOM manipulation, control flow (if/switch), loops, functions used throughout

How to run:
1. Unzip the package.
2. Open any .html file in a browser (or use VS Code Live Server / a local static server).
