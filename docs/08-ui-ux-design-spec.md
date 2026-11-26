# 08 — UI/UX Design Spec

## 1. Design Principles
1. **Farmers first:** people and place before product grids.
2. **Clarity over decoration:** every animation must help understanding.
3. **Mobile first:** design at 360px, then expand.
4. **One primary action per screen:** Explore, or Enquire.

## 2. Layout System
- 12-column grid on desktop, 4 on mobile; max content width 1200px.
- 8px spacing scale: 8, 16, 24, 32, 48, 64, 96.
- Breakpoints: 360 (mobile), 768 (tablet), 1024 (laptop), 1440 (large).

## 3. Component Library
Header/nav with mobile menu · Hero · Section heading · Product card · Filter chip · Search bar · Detail drawer/modal · Farmer card · Story timeline · Steps · Tabs · Accordion · Recipe card · Form fields · Toast/success message · Sticky enquiry bar · Footer · Buttons (primary, secondary, ghost) · Badges (In Season, Coming Soon).

## 4. Interaction States
Every clickable item needs default, hover, focus (visible outline), active, disabled and loading states.

## 5. Wireframe Checklist
Low-fidelity: Home, Products, Farmer profile, How It Works, Enquiry. Then high-fidelity of Home and Products in Figma before coding.

## 6. Mobile Specifics
- Touch targets at least 44px.
- Sticky bottom bar with "Make an Enquiry".
- Filters in a bottom sheet.
- Product detail as full-screen panel.

## 7. Empty, Loading and Error States
- Loading: skeleton cards with soft shimmer (opacity only).
- Empty search: friendly message and "Clear filters" button.
- Form error: inline, specific, polite.
