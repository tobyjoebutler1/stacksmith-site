# Handoff: Stacksmith marketing website

## Overview

This is the full marketing site for **Stacksmith**, a Dublin digital agency that builds and
runs the systems behind small Irish businesses (websites, enquiry capture, review generation,
repeat-customer campaigns, AI chatbots and AI receptionists). Positioning: *"We build it, we
run it, and you get your time back."*

The site is four pages — **Home**, **Services**, **How we work**, **Contact** — plus a shared
header and footer. The most recent work added **subtle scroll-driven motion** across all pages
and **three interactive "See it run" flow demos** on the Services page. Recreating that motion
faithfully is a first-class part of this handoff, not a nice-to-have — it's the "flare and
engagement" the site was missing.

---

## About the design files

The files in `design_files/` are **design references authored in HTML** — working prototypes
that show the intended look and behaviour. They are **not production code to copy directly.**

They are written as "Design Components" (`.dc.html`) — a lightweight custom template format used
in the design tool. **Do not try to run these as-is or port the `.dc.html` runtime.** Instead,
**recreate the designs in the target codebase's environment.** The design-system guide notes the
intended production stack is **Astro + Tailwind**, with the tokens mapped to Tailwind theme
values — if that codebase exists, build there using its established components and patterns. If
no codebase exists yet, Astro + Tailwind (or Next.js if a React app is preferred) is the
recommended choice.

**How to read a `.dc.html` file:**
- Everything inside `<helmet>…</helmet>` is `<head>` content — font links, the design-system
  bundle, and a `<style>` block holding `@keyframes` + the scroll-animation rules. **Read this
  block carefully — the motion system lives here.**
- The markup after `</helmet>` is the page body. It is **plain inline-styled HTML** — every
  style is a literal `style="…"` you can read values straight out of. No external CSS classes
  except the animation helpers (`.ss-reveal`, `.ss-seq`, `.ss-seqline`) and the demo classes on
  Services (`.ssdemo-*`, `.ssflow`, `.ss-*`).
- `{{ someName }}` are template holes filled by a small logic class at the bottom of the file
  (`class Component extends DCLogic`). Almost all of them are **inline SVG icons** (Lucide-style,
  drawn in `renderVals()`) and a few interaction handlers. Treat them as "an icon goes here" /
  "this click toggles that panel" — you'll wire real icons and real handlers in your framework.
- `<x-import component-from-global-scope="StacksmithDesignSystem_93023c.Button" …>` mounts a
  design-system component (Button, Logo, SectionLabel, etc.). In your codebase, use the
  equivalent component from the Stacksmith design system / component library.

---

## Fidelity

**High-fidelity (hifi).** These are pixel-level mockups with final colours, typography, spacing,
copy and interactions, all built on the bound **Stacksmith Design System**. Recreate the UI
faithfully using that design system's tokens and components in your codebase. Exact values are
documented below and the token source is in `design_tokens/`.

---

## Design system & tokens

All four pages are built on the **Stacksmith Design System**. The token CSS is included in
`design_tokens/` (`colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`,
`fonts.css`, `base.css`) and `components.css` (component interaction states). Map these to your
theme config (e.g. Tailwind `theme.extend`).

### Colour (exact hex)

Paper / surfaces
- `--paper` **#F4F1E9** — page background (warm cream), used almost everywhere
- `--paper-raised` **#FBFAF6** — cards, raised surfaces, message bubbles
- `--paper-sunken` **#ECE7DB** — wells / inset fields
- `--paper-tint` **#EFEBE1** — subtle section banding (the "customer engine" band on Services)

Ink (warm near-black → greys)
- `--ink` **#1A1915** — primary text, buttons, dark panels, logo
- `--ink-800` #2C2A23 · `--ink-700` **#46443A** (body) · `--ink-500` **#6E6B5F** (muted) ·
  `--ink-400` **#8C887B** (labels/eyebrows) · `--ink-300` #B4AF9F (disabled/faint)

Lines
- `--line` **#E2DDCF** — default hairline · `--line-strong` **#D2CCB9** — dividers that must read
- `--line-ink` rgba(26,25,21,0.12) — lines over ink surfaces

Forest (the ONE accent — used with discipline)
- `--forest` **#2C6E4B** — primary accent, CTAs, icons, ticks, the lit flow dots
- `--forest-700` **#235A3D** — hover/pressed · `--forest-900` **#173B28** — deepest, text on tint
- `--forest-300` #5E9B7C — light accent · `--forest-tint` **#E4EDE6** — accent wash behind icons ·
  `--forest-tint-2` #D6E5DB

On-ink (for dark panels)
- `--on-ink` #F4F1E9 · `--on-ink-muted` #B7B3A6 · `--mint-on-ink` **#7FBF9B** (accent that
  survives on black) · `--on-ink-faint` rgba(244,241,233,0.14)

Semantic: success = forest; `--warning` #B07A1E (ochre); `--danger` #AE3A2B (brick).
Focus ring: `rgba(44,110,75,0.45)` on `:focus-visible` (3px).

### Typography

- **Display / headings:** `'Playfair Display', Georgia, serif` — high-contrast editorial serif.
  Sentence case. Tight tracking `-0.02em` on large sizes. `text-wrap: balance` on headlines.
  Weight 600 for nearly all headings.
- **Body / UI:** `'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif`. Body leading ~1.6.
- **Mono eyebrows / flow-tags:** `'JetBrains Mono', ui-monospace, monospace`. **UPPERCASE**,
  letter-spacing `.1–.14em`, sizes 10–11px. This is the only uppercase in the system.
- All three load from Google Fonts (see `design_tokens/fonts.css`).

Scale actually used across the pages (px): hero H1 `clamp(40,5vw,84)`; section H2
`clamp(28,3–4.5vw,58)`; service H3 28; body 15–20; captions 13–14; mono eyebrows 10–11.

### Radius
inputs 8px · buttons 12px · cards 16px · big panels 24–32px (`--radius-2xl`) · pills/dots 999px.
Message bubbles use an asymmetric `16px 16px 16px 5px` (chat-tail) radius.

### Shadows
Warm-tinted (ink hue, never pure black), low-spread, soft — "paper lifting off paper". Five
steps `--shadow-xs … --shadow-xl`; UI mostly uses `--shadow-sm` / `--shadow-md`. Cards lift 3px
on hover with a larger shadow + darker border.

### Motion baseline (the design system's own rule)
Calm and quick: **120–320ms, ease-out `cubic-bezier(.22,1,.36,1)`, no bounce, no infinite loops.**
The scroll and demo animations below deliberately sit just inside this envelope.

---

## The motion system (shared across all pages)

Every page's `<helmet>` carries a `<style>` block with `@keyframes` and this rule set. It is
**scroll-position-driven** using the CSS Scroll-linked Animations API (`animation-timeline: view()`),
wrapped in `@supports` so unsupported browsers simply show everything (no JS scroll listeners).
A `prefers-reduced-motion: reduce` block disables all of it.

Helper classes and what they do:

- **`.ss-reveal`** — fades an element up as it enters the viewport.
  Keyframe `ssRise`: `opacity 0 → 1`, `translateY(20px) → 0`.
  `animation-timeline: view(); animation-range: entry 2% cover 22%;`
  Applied to nearly every section opener, card grid, quote, and panel. Individual elements can
  override `animation-range` to stagger (e.g. Contact's three reassurance rows use
  `entry 4% / 10% / 16% cover 20/26/32%` to cascade).

- **`.ss-seq`** — "pops" an element in (used for the Home flow-band nodes).
  Keyframe `ssPop`: `opacity .35 → 1`, `scale(.84) → 1`. Each node sets its own
  `animation-range` (`cover 8%→22%`, `20%→34%`, `32%→46%`, `44%→58%`, `56%→70%`) so the five
  nodes light up left-to-right as you scroll through the band.

- **`.ss-seqline`** — draws a connector line in.
  Keyframe `ssGrowX`: `transform: scaleX(0) → 1`, `transform-origin:left`. Used for the
  connectors between Home flow nodes and the underline accents beneath the "How we work" steps,
  each with a staggered `animation-range` so lines draw just after the node before them.

To recreate in a framework **without** CSS scroll-timelines (broadest support), use an
`IntersectionObserver` (or a library like Framer Motion's `whileInView`, or GSAP ScrollTrigger)
that adds an "in view" class / triggers the same keyframes, honouring `prefers-reduced-motion`.
The visual intent: **content fades up ~20px as it enters; the Home flow band and the How-we-work
step underlines build in sequence left-to-right.** Keep it subtle — this is "quiet flare".

The exact keyframes (copy verbatim):
```css
@keyframes ssRise  { from { opacity:0;  transform:translateY(20px); } to { opacity:1; transform:none; } }
@keyframes ssPop   { from { opacity:.35; transform:scale(.84); }      to { opacity:1; transform:scale(1); } }
@keyframes ssGrowX { from { transform:scaleX(0); }                    to { transform:scaleX(1); } }
```

---

## Shared chrome (on every page)

### Header (sticky, translucent)
- `position:sticky; top:0; z-index:50`. Background `color-mix(in srgb, var(--paper) 86%, transparent)`
  with `backdrop-filter: saturate(140%) blur(10px)`. Bottom `1px solid var(--line)`.
- Inner bar: `max-width:1180px`, `padding:0 32px`, height **72px**, `flex; align-items:center;
  justify-content:space-between`.
- Left: Stacksmith **Logo** component (size 26), links to Home.
- Centre: nav links (Services / How we work / Contact), 15px, gap 30px. Current page is
  `--ink` weight 600; others `--ink-700` weight 500.
- Right: primary **Button** (`variant="primary" size="sm"`, solid ink) "Book a call" with a
  trailing calendar icon → Contact.

### Footer
- Top `1px solid var(--line)`, `padding:64px 0 40px`, inner `max-width:1180px; padding:0 32px`.
- Row 1: left column — Logo (26) + a one-line description, max-width 300. Right — two link
  groups ("What we do", "Get in touch") with mono uppercase headings (`--ink-400`, 11px,
  tracking .12em) and 15px `--ink-700` links.
- Row 2 (top border, margin-top 56): copyright left, "Privacy · Terms" right, both 13.5px `--ink-400`.

Container convention everywhere: `max-width:1180px; margin:0 auto; padding:0 32px`. Section
vertical rhythm ~80px. Prose caps ~680px. One dark (`--ink`) panel per page for rhythm.

---

## Screens / views

### 1. Home (`design_files/Home.dc.html`)

**Purpose:** communicate the offer and build trust; route to Services / Contact.

Sections top to bottom:
1. **Hero** — mono eyebrow, big Playfair H1 (`clamp(40,5vw,84)`), Hanken lead, two buttons
   (accent "Book a call" + secondary). Faint automation **flow-motif** node-graph behind it at
   low opacity, `--forest`/`--ink` line art (see design-system `assets/flow-motif.svg`).
2. **Trust strip** — mono "Working quietly for" label + a row of business-type words. `.ss-reveal`.
3. **The flow band** (signature) — five labelled nodes connected by lines:
   *Enquiry in → We sort it → Answered fast → Review asked → They come back.* Each node is a
   62px rounded-16 `--paper-raised` tile with a forest Lucide icon; the final node is filled
   `--forest` with white icon + `--forest-900` label. Nodes are `.ss-seq` (pop in sequence);
   connectors are `.ss-seqline` (draw left→right). This is the piece to get right.
4. **Services preview** — 3-up grid of service cards. `.ss-reveal`.
5. **How-we-work preview** — 3-up steps. `.ss-reveal`.
6. **Proof / quote** — a big Playfair blockquote (dark or tinted). `.ss-reveal`.
7. **FAQ** and **closing CTA** — CTA is the dark `--ink` panel, radius `--radius-2xl`,
   padding `80px 40px`, centred, faint white flow-motif behind, accent button. `.ss-reveal`.

### 2. Services (`design_files/Services.dc.html`) — includes the interactive demos

**Purpose:** the full catalogue of eight systems, grouped, with three interactive demos.

- **Intro:** mono "What we build" eyebrow, H1 *"Eight systems that fix the problems you never get
  round to solving."*, lead pointing at the "See it run" demos.
- **Group 01 — Your digital foundation:** a big Playfair number "01" + heading, then two service
  rows (A website that works · GDPR-compliant data capture). Each row is a `300px 1fr` grid: left
  = forest-tint icon chip (52px, radius 14) + Playfair H3; right = a 3-column
  **problem / what we build / after** layout, each column headed by a tiny mono uppercase tag with
  a short rule (ink for problem/build, forest for "after"). Rows separated by `1px solid var(--line)`.
- **Group 02 — Your customer engine:** on a `--paper-tint` band. Three services, **each with a
  "See it run" demo**: Enquiry capture & follow-up · Review generation & response · Repeat customer
  marketing. (See "Interactive demos" below.)
- **Group 03 — Your AI layer:** AI chatbot · AI receptionist · Hands-on digital consulting. Same
  row layout as Group 01, no demos.
- **Closing CTA:** dark `--ink` panel, *"Not sure which of these you need?"*, accent button.

All group headers, rows and the CTA carry `.ss-reveal`.

### 3. How we work (`design_files/How we work.dc.html`)

**Purpose:** explain the hand-built-then-automated method and set expectations.

- Intro (`.ss-reveal`), then a **3-up step grid** (`.ss-reveal`). Each step has a top progress
  rule whose forest fill is `.ss-seqline` — the three underlines draw in on scroll, staggered.
- A `1fr 1fr` "what you get / what we don't do" panel (`.ss-reveal`).
- Dark `--ink` closing CTA panel (`.ss-reveal`).

### 4. Contact (`design_files/Contact.dc.html`)

**Purpose:** book a call / send a message.

- Header block (`.ss-reveal`), then a two-column layout: left = the form, right = a dark `--ink`
  contact card + three reassurance rows.
- **Form** (`.ss-reveal`): design-system Input / Textarea / Button. On submit it swaps to a
  success state (`<sc-if sent>` in the prototype → in your build, a `sent` boolean toggling a
  thank-you panel).
- **Reassurance rows** (`.ss-reveal`, staggered cascade): three rows — *A real conversation /
  Fifteen minutes / No obligation* — each a 38px forest-tint icon chip + heading + line. Their
  `animation-range` values step (4/10/16%) so they arrive one after another.

---

## Interactive demos — Services "See it run" (recreate these precisely)

Three services on Services each have a **"See it run"** toggle button that expands a panel and
**plays a flow animation on open**. This is the headline interaction of the site.

**Toggle button:** a pill (`border-radius:999px`, `--paper-raised`, `1px solid var(--line)`)
containing a 28px forest-tint circle with a chevron, the label "See it run", and a mono
"Interactive" tag. Hover darkens the border and deepens the chevron chip. The chevron rotates
**90°** when open (`transition: transform .42s cubic-bezier(.22,1,.36,1)`).

**Panel open/close:** height reveal — `max-height 0 → 3000px` over `.6s cubic-bezier(.22,1,.36,1)`
plus `opacity 0 → 1`. (In a framework, animate real height/auto-height or use a
measured-height transition; the `3000px` is just a CSS max-height trick.)

**The flow itself (`.ssflow`):** a vertical timeline.
- A **spine**: a 2px `--line` vertical rail on the left with a `--forest` fill bar (`.ss-fill`)
  that grows `height 0 → 100%` over **1.9s** `cubic-bezier(.42,0,.25,1)` when the panel opens —
  the line "draws down".
- A series of **steps** (`.ss-step`), each = a 48px rounded-14 dot (icon) + a text block. On open,
  each step fades/rises in (`opacity 0→1`, `translateY(16px)→0`, `.6s` ease-out) staggered by a
  per-step `--d` delay (0 / 340 / 680 / 1020 / 1360 ms). Its dot transitions from a muted
  `--paper-sunken`/`--ink-400` chip to a filled **`--forest`** chip with white icon, and emits one
  soft **pulse** ring (`@keyframes ssDotPulse`, `box-shadow` forest ring expanding to 11px then
  fading, 2.2s). The final step's dot is `--forest-700` and marked `.is-final`.
- Steps contain **realistic message mockups** styled from the tokens:
  - **SMS bubbles** — `--paper-raised`, `1px solid var(--line)`, chat-tail radius
    `16px 16px 16px 5px`, `--shadow-sm`, a small forest business-initial avatar + name + mono "SMS" tag.
  - **Email cards** — `--paper-raised`, header row with sender + Playfair subject line, body with an
    inline forest button.
  - **Branch / notification rows** — bordered `--paper-raised` rows with a forest tick or bell chip.

The three flows and their content (keep the exact copy — it's written in the Stacksmith voice,
Irish names/businesses):

1. **Enquiry capture & follow-up** — trigger tag "Triggered by a new enquiry — web form, missed
   call or Google message". 5 steps: enquiry lands (Sinéad, *Brennan Tiling*, bathroom retile) →
   instant SMS reply (within a minute) → you get pinged with details (routed to Mark) → gentle
   nudge SMS after two days → job lands in the diary (`.is-final`).
2. **Review generation & response** — trigger "Triggered the moment an appointment is marked done".
   4 steps: appointment finishes (Aoife, *The Loft Hair Co.*) → review-request SMS after 3 hours
   with a `g.page/theloft/review` link → branch "have they left one?" (Yes → removed from sequence /
   Not yet → one gentle reminder, shown as two bordered outcome rows, the reminder containing a
   nested SMS bubble) → the rating climbs, unhappy caught privately (`.is-final`).
3. **Repeat customer marketing** — trigger "Triggered 90 days after a customer's last visit".
   4 steps: it's been 90 days (Liam, *Quay Street Café*) → win-back **email** ("We've missed you,
   Liam", coffee-on-us, hello@quaystreet.ie) → short reminder SMS a week later → they come back
   (`.is-final`).

**Reduced motion:** all step/spine/dot animation is disabled and everything shows in its final
state; the panel still opens (opacity only). Preserve this.

**State to model:** one open/closed boolean per demo (`enquiry`, `reviews`, `repeat`). An optional
`firstDemoOpen` flag opened the first demo by default. The "play on open" is purely CSS driven off
an `is-open` class on the panel — replicate by toggling a class / mounting the flow and letting the
keyframes run.

---

## Assets

- **Logo** — Stacksmith anvil mark. The design system ships it as PNGs (`assets/logo/*` in the DS)
  and as an inline SVG `AnvilMark` inside the `Logo` component. A copy of the primary logo PNG is
  in `assets/Stacksmith logo.png`. Use the design system's `Logo` component in your build; **do not
  redesign the mark.**
- **Flow-motif** — `assets/flow-motif.svg` in the design system: a faint node-graph of connected
  Lucide icons, used ≤16% opacity behind the Home hero and inside dark CTA panels. `FlowMotif.jsx`
  recolours it.
- **Icons** — **Lucide** (2px round-cap line icons, 24×24, `currentColor`). In the prototypes these
  are hand-drawn inline SVGs in the logic class to avoid CDN timing; in your build, use Lucide
  proper (mail, star, bell, clock, check, chat/message, phone, globe, repeat, shield, users,
  calendar, arrow-right, chevron-right, zap, git-branch). No emoji, ever.

---

## Files in this bundle

- `design_files/Home.dc.html` — Home page prototype
- `design_files/Services.dc.html` — Services page prototype (contains the three interactive demos)
- `design_files/How we work.dc.html` — How we work page prototype
- `design_files/Contact.dc.html` — Contact page prototype
- `design_tokens/` — the Stacksmith Design System token CSS (colors, typography, spacing, radius,
  shadows, fonts, base) + `components.css` (component interaction states). Map these to your theme.
- `assets/Stacksmith logo.png` — primary logo mark.

The full design-system source (all components, the flow-motif SVG, the logo set, `_ds_bundle.js`)
lives in the design-system project bound to this repo — pull `Button`, `Logo`, `SectionLabel`,
`Card`, `Input`, `Textarea`, `Stat`, `Accordion`, etc. from there rather than rebuilding them.

## Voice (don't lose this in implementation)
Warm, plain English, owner-facing — "a tradesperson who knows the work, not a software company."
Sentence case except the mono uppercase eyebrows. Short declarative sentences. The signature move:
name a real pain, answer in two words with the forest accent ("…and nobody's fixing it. **We
will.**"). Banned words: leverage, solutions, synergy, seamless, unlock, empower, robust, scalable,
platform. No emoji. Keep the exact copy from the prototypes.
