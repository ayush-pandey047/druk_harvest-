# 09 — Animation & Motion Spec

## 1. Principles
- **Purposeful:** animation explains, guides or delights, never distracts.
- **Fast:** most transitions 200–500ms; hero and storytelling up to 800ms.
- **Smooth:** animate only `transform` and `opacity`.
- **Respectful:** honour `prefers-reduced-motion`.

## 2. Easing & Timing Tokens
| Token | Value | Use |
|---|---|---|
| ease-out | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals, entrances |
| ease-in-out | `cubic-bezier(0.65, 0, 0.35, 1)` | Panels, toggles |
| fast | 200ms | Hover, button feedback |
| base | 400ms | Card reveal, filter change |
| slow | 800ms | Hero, story scenes |
| stagger | 80ms | Lists and grids |

## 3. Animation Catalogue
| Where | Animation | Technique |
|---|---|---|
| Page load | Soft fade-in; hero text rises word by word | CSS keyframes |
| Hero background | Layered terrace illustration, slight parallax | CSS transforms, throttled scroll or CSS scroll-driven animation |
| Scroll reveals | Fade + 24px rise | IntersectionObserver adds a class once |
| Farm-to-table journey | Progress line draws on scroll; step icons pop in | SVG `stroke-dashoffset` + IntersectionObserver |
| Farmer "Season" story | Four scenes change with scroll | Sticky container, swap via opacity |
| Product filter | Cards fade out/in and re-flow | FLIP technique or opacity/transform |
| Product card hover | Lift and image zoom (1.04) | CSS transform |
| Detail panel | Slides in from right with overlay fade | CSS transform |
| Seasonal calendar bar | Months fill in | CSS `scaleX` |
| Tabs and accordion | Cross-fade; height via grid-rows trick | CSS |
| Buttons | Subtle press and colour shift | CSS |
| Enquiry basket | Small bounce on add; badge count updates | CSS |
| Form success | Check-mark draws itself | SVG stroke animation |
| Page transitions | Gentle fade | CSS or View Transitions API where supported |

## 4. Starter Code Patterns
**Reveal on scroll**
```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```
```css
[data-reveal] { opacity: 0; transform: translateY(24px);
  transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }
[data-reveal].is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { transform: none; transition: opacity .2s; }
  * { animation-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

## 5. Optional Library
CSS + IntersectionObserver covers almost everything. For richer storytelling add **GSAP + ScrollTrigger** only on Home and Farmer pages (optionally Lenis for smooth scroll). Keep added JS under about 60KB gzipped.

## 6. No-Lag Rules (must follow)
1. Animate transform/opacity only; use `will-change` sparingly and remove after animation.
2. Use IntersectionObserver, not heavy scroll handlers; if needed, use `requestAnimationFrame` and passive listeners.
3. Animate each element once, then unobserve.
4. Limit simultaneous animations; stagger instead.
5. Compress and lazy-load images (WebP/AVIF); set width and height to prevent layout shift.
6. Avoid autoplay video on mobile; if used, short, muted, compressed, with poster.
7. Test on a low-end phone and with 4x CPU throttling.
8. Provide a reduced-motion fallback.

## 7. Animation Review Checklist
- Does it help the user understand something?
- Does it run at 60 fps on a mid-range phone?
- Does it cause layout shift?
- Is there a reduced-motion version?
