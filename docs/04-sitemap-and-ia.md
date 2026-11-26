# 04 — Sitemap & Information Architecture

```
Home
├── Our Story
├── Products
│   └── Product detail (modal or page)
├── Farmer Stories
│   └── Farmer profile (modal or page)
├── How It Works
├── Recipes & Seasonal Updates
│   └── Article / recipe page
└── Contact & Enquiry
    ├── Customer enquiry
    ├── Business / wholesale enquiry
    └── Supplier enquiry
```

## Navigation
- **Main nav:** Home · Our Story · Products · Farmers · How It Works · Recipes · Contact
- **Persistent button:** "Make an Enquiry" (header on desktop, sticky bottom bar on mobile)
- **Footer:** quick links, contact details, social links, honest-sourcing note, copyright

## URL Plan
| Page | URL |
|---|---|
| Home | `/` |
| Our Story | `/our-story` |
| Products | `/products` |
| Farmer Stories | `/farmers` |
| How It Works | `/how-it-works` |
| Recipes & Updates | `/recipes` |
| Contact & Enquiry | `/contact` |

## Navigation Rules
- Enquiry reachable within 2 clicks from anywhere.
- Current page highlighted in nav.
- Breadcrumbs on product and farmer detail pages.
- Mobile: hamburger menu with focus trap and close on route change.
