# 10 — Frontend Technical Spec

## 1. Stack Options
| Option | Pros | Best for |
|---|---|---|
| Plain HTML + CSS + JS | Fastest, no build | Learning, small site, best raw performance |
| Vite + React + Tailwind | Reusable components, easy basket state | Larger, interactive build |
| Astro / Next static export | Great performance with components | Advanced |

**Recommendation:** Vite + React + Tailwind CSS (or plain HTML/CSS/JS if keeping it very light). Deploy free on Vercel or Netlify.

## 2. Repository Structure
```
druk-harvest/
├── docs/                  <- this folder
├── public/                (favicons, og-image, robots.txt, sitemap.xml)
├── src/
│   ├── assets/ (images, icons, fonts)
│   ├── components/
│   ├── pages/
│   ├── data/ (products.json, farmers.json, recipes.json)
│   ├── hooks/ (useReveal, useBasket)
│   ├── styles/ (tokens.css, base.css, animations.css)
│   └── main.jsx
├── index.html
└── package.json
```
For plain HTML: `index.html`, `pages/`, `assets/`, `css/`, `js/`, `data/`.

## 3. Data Models
See [15-sample-data.md](15-sample-data.md).

## 4. Frontend-Only Solutions
| Need | Solution |
|---|---|
| Product data | Local JSON loaded with `fetch` or imported |
| Enquiry basket | `localStorage` wrapped in try/catch |
| Enquiry form | JS validation, success screen, optional `mailto:` or WhatsApp link; later swap for Formspree or Netlify Forms |
| Search/filter | JS array filtering |
| "In season now" | Compare `new Date().getMonth()+1` with `seasonMonths` |
| Routing | Multi-page links or React Router |

## 5. Responsive Rules
Fluid type with `clamp()`, CSS Grid/Flexbox, `srcset` and `sizes`, 44px touch targets, sticky mobile enquiry bar, hamburger menu with focus management.

## 6. Coding Standards
- Semantic HTML, BEM or utility classes consistently.
- CSS variables for all brand tokens.
- No inline styles except dynamic values.
- Small, single-purpose components.
- Commit messages: `feat:`, `fix:`, `docs:`, `style:`.

## 7. Deployment
Push to GitHub → connect to Vercel/Netlify → auto-deploy main branch → test live URL with Lighthouse.
