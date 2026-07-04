---
name: consultancy-site-design
description: Brand, audience, and design direction for the Stacksmith marketing site — an AI automation consultancy for service businesses. Use whenever designing, building, or editing pages, styles, or copy for this site.
---

# Stacksmith — consultancy site design

Stacksmith is an AI automation consultancy. We build and run automations *for* service
businesses — the client never touches the plumbing. Every design and copy decision on
this site serves one conversion goal: **get a business owner to book a discovery call.**

## Audience

Owners and managers of service businesses (trades, clinics, agencies, local firms).
They are time-poor, sceptical of tech hype, and buying an outcome, not software.

- They care about: **time saved, cost cut, revenue recovered.** Lead with these.
- They do not care about: model names, stacks, integrations, "AI" as a buzzword.
  Technical detail appears only as *proof of competence*, never as the pitch.
- Reading mode: skimming on a phone between jobs. Front-load every section's payoff.

## Page strategy

The site must always support this structure, in this narrative order:

1. **Hero** — one outcome-focused value proposition in plain words (what they get,
   not what we do), with the primary CTA visible without scrolling.
2. **What we automate** — services framed as jobs the owner recognises (quoting,
   invoicing, follow-ups, scheduling), each tied to its outcome.
3. **Proof** — case studies with numbers, before/after workflow examples,
   testimonials with real names and businesses. Proof beats claims; never ship a
   proof section with placeholder logos or fake stats.
4. **About / credibility** — who builds this, why they can be trusted with a
   business's operations. Human, specific, brief.
5. **Final CTA** — a strong, low-friction close: book a discovery call. Restate the
   outcome, remove risk ("no obligation", "30 minutes"), one button.

Every page ends at the discovery-call CTA. If a section doesn't move a sceptical
owner one step closer to booking, cut it.

## Design direction

**Vibe: confident startup energy on the Stacksmith brand.** Bold type sizes, assertive
colour blocking, punchy purposeful motion — modern and ambitious, never gimmicky.
High polish signals "these people are precise; they can run my operations."

### Colour — keep the Stacksmith palette (source of truth: `css/tokens.css`)

Warm paper surfaces, warm near-black ink, **one** forest-green accent used with
discipline. Do not introduce new hues. Confidence comes from *bolder use* of the
existing palette — full-bleed ink sections, larger forest moments, strong
paper/ink contrast — not from new colours.

### Typography — modern geometric sans (this is a deliberate change)

The site is moving off Playfair Display. New and redesigned pages use **one
confident geometric sans** for display and body (shortlist: Sora, Space Grotesk,
Outfit — pick one and commit), with **JetBrains Mono retained** for automation-flow
tags and technical labels; the mono is a brand signature. Big, tight display
sizes; generous weight contrast between headline and body. Update
`css/tokens.css` font variables when migrating, and migrate the whole site
deliberately — no page should mix the old serif and the new sans.

## Copy rules

- Outcome first, mechanism second: "Invoices chased for you" not "AI-powered
  invoice automation."
- Quantify wherever honest: hours per week, euros recovered, days faster.
- Plain verbs, sentence case, no filler, no jargon. Speak owner-to-owner.
- Voice: direct, warm, Irish plain-spoken confidence. "We build it, we run it,
  and you get your time back."
- CTAs name the action: "Book a discovery call", never "Submit" or "Learn more".

## Working with the frontend-design skill

The `frontend-design` skill governs craft and process (design plan before code,
anti-generic critique, quality floor). This file supplies the brand and strategy
that plan must serve. Where the two meet: our warm-cream palette is close to a
known AI-default look — the geometric sans, bold scale, and disciplined forest
accent are what keep it ours. Quality floor applies always: responsive to mobile,
visible keyboard focus, `prefers-reduced-motion` respected.
