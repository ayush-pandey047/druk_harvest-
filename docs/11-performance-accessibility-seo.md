# 11 — Performance, Accessibility & SEO

## 1. Performance Budget
| Item | Budget |
|---|---|
| Home page weight | under 1.5 MB |
| JavaScript | under 150 KB gzipped |
| Hero image | under 200 KB |
| Largest Contentful Paint | under 2.5 s |
| Cumulative Layout Shift | under 0.1 |
| Interaction to Next Paint | under 200 ms |

**Techniques:** lazy-load below-the-fold images, preload hero and key font, inline critical CSS, minify, SVG illustrations, CDN delivery.

## 2. Accessibility (WCAG 2.1 AA)
- Semantic landmarks (header, nav, main, footer); logical heading order.
- Text contrast at least 4.5:1.
- Keyboard navigation and visible focus everywhere.
- Alt text, labelled fields, errors linked with `aria-describedby`.
- Reduced-motion support; nothing flashes.
- Tabs, accordion and modal follow ARIA patterns.
- Skip-to-content link.

## 3. SEO & Metadata
- Unique title and meta description per page.
- Open Graph image and tags.
- Clean URLs, `sitemap.xml`, `robots.txt`, favicon set.
- Optional structured data: Organization, Product.

## 4. Measurement
Run Lighthouse (mobile) on every page, record scores in `docs/` after each milestone.
