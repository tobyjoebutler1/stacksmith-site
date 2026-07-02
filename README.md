# Stacksmith — marketing website

The marketing site for **Stacksmith**, a Dublin digital agency that builds and runs the
systems behind small Irish businesses. *"We build it, we run it, and you get your time back."*

## The site

Four pages of plain HTML/CSS/JS — no build step, no frameworks. Open `index.html` in a
browser, or serve the folder with any static server.

| File | Page |
|---|---|
| `index.html` | Home — hero, flow band, services preview, proof, FAQ |
| `services.html` | Services — eight systems + three interactive "See it run" demos |
| `how-we-work.html` | How we work — the hand-built-then-automated method |
| `contact.html` | Contact — booking form with thank-you state |

- `css/tokens.css` — the Stacksmith design tokens (colours, type, spacing, radius, shadows)
- `css/components.css` — component styles (buttons, cards, forms, accordion…)
- `css/site.css` — shared chrome, the scroll-driven motion system, demo animations, responsive rules
- `js/main.js` — demo toggles, FAQ accordion, contact-form thank-you state

## Editing

Colours and fonts live as CSS variables in `css/tokens.css` — change them there and the whole
site follows. Page copy is directly in each HTML file. The original design handoff (design
references and the full design-system notes) is kept in `design-handoff/` — read its README
before making bigger design changes.

## Notes

- The contact form is front-end only for now — it shows the thank-you state but doesn't send
  anywhere yet. Wiring it to email/a form service is the obvious next step.
- Scroll animations use CSS scroll-linked animations where supported; other browsers simply
  show the content. `prefers-reduced-motion` is respected throughout.
