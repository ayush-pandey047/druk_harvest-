# 05 — Page-by-Page Content & Feature Spec

## 1. Home
| Section | Content | Animation |
|---|---|---|
| Hero | "From Bhutanese farms to your table." Sub-line; buttons *Explore Products* and *Meet Our Farmers* | Layered terrace illustration with gentle parallax; headline words fade up in sequence |
| Intro strip | One sentence on what Druk Harvest does | Fade in on scroll |
| Farm-to-table journey | 5 steps: Grow → Harvest → Check → Pack → Deliver | Scroll-driven progress line |
| Featured seasonal products | 4–6 product cards | Staggered card reveal |
| Farmer highlight | One farmer image, short quote | Slow image reveal, quote fade |
| Who we serve | Households, restaurants, hotels, retailers | Icon cards lift on hover |
| Trust section | "Honest sourcing" explanation | Subtle fade |
| Call to action | "Ready to bring local flavour home?" + Enquiry button | Gentle one-time pulse |

## 2. Our Story
- Mission statement and why Druk Harvest exists.
- Timeline (fictional): idea → first farmers → first customers → today.
- Values: Freshness, Honesty, Community, Dependability.
- Quote block about working with farming communities.

## 3. Products Catalogue
**Features**
- Category tabs: Vegetables · Fruits · Grains · Honey · Local Goods
- Filters: In season now, Origin (district/valley), Available for business
- Client-side search by name
- Product card: image, name, short description, origin, season months, badge (In Season / Coming Soon)
- Detail panel: description, origin and farmer link, seasonal calendar bar, storage tip, recipe link, "Add to enquiry"
- **Enquiry basket** (frontend only): selected items kept in browser storage and pre-filled into the form

**Animations:** card reveal on scroll, smooth filter transition, detail panel slide-in.

## 4. Farmer Stories
The heart of the brand: *the farmers' work*.
- Grid of producer profiles: portrait, name, village/district, what they grow.
- Profile story: a day in their life, how they farm, what they are proud of, products supplied.
- **"A Season With [Farmer]"** scroll story: prepare → plant → tend → harvest, with illustrated scenes.
- Decorative Bhutan map illustration marking regions.
- All stories illustrative until real farmers consent.

**Animations:** sticky scroll storytelling, image parallax, scene cross-fades.

## 5. How It Works
Tabs: **Customers · Businesses · Farmers**
- **Customers:** Browse → Send enquiry → We confirm availability, price, delivery → Receive produce.
- **Businesses:** Share needs → Receive supply plan → Regular delivery schedule.
- **Farmers:** Tell us what you grow → Discuss quality and quantity → Agree fair terms → Start supplying.
- Also: delivery arrangements (placeholders), quality checks, FAQ accordion (8 questions).

## 6. Recipes & Seasonal Updates
- Seasonal calendar: what is fresh this month.
- Recipe cards using featured products.
- Short food stories and farm updates.
- Filter by type: Recipe / Story / Seasonal update.

## 7. Contact & Enquiry
- Enquiry types: Customer, Business, Supplier.
- Fields: name, phone, email, type, selected products (auto-filled), quantity/notes, preferred contact method, delivery area.
- Frontend validation with friendly messages; success screen with "What happens next".
- Contact details, address placeholder, illustrated map block, opening hours.
- Frontend-only handling: success state, optional `mailto:` or WhatsApp-style link with prefilled text.
