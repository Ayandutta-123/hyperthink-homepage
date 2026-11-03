# HyperThink Systems — homepage redesign prototype

This folder is a static prototype of the new hyperthinksys.com homepage, plus the files an Elementor operator
needs to rebuild it on the live WordPress site. The prototype is a reference only; `index.html` and `js/main.js`
are not uploaded to WordPress.

## Files

| File | Purpose |
|---|---|
| `index.html` | The full homepage: 12 sections plus the announcement bar, header and footer, with final copy and SEO markup |
| `css/tokens.css` | Brand tokens (colours, type, spacing, radii, motion). The only stylesheet with raw colour values |
| `css/style.css` | Layout and components for the prototype, mobile-first, at Elementor's breakpoints |
| `js/main.js` | Prototype-only behaviour. Each block names the Elementor feature that replaces it |
| `assets/logo.svg`, `assets/logo-white.svg` | Production logo, plus a white version made by changing the SVG fills |
| `assets/icons/` | 28 line icons (1.5px stroke, 24px grid, Lucide geometry) as separate SVG files, also inlined in `index.html` |
| `assets/img/` | 12 full-colour HD images: composite photography + product UI cards for AI in a Box and the 5 "Why HyperThink" tabs, plus 6 regional & industry photos |
| `elementor-custom.css` | Paste into Elementor → Site Settings → Custom CSS |
| `ELEMENTOR-BUILD-MAP.md` | Widget-by-widget rebuild instructions for every section |
| `COPY-DECK.md` | All copy, the SEO target per block, and the list of pages that must exist before launch |

## Viewing the prototype

The page loads partner logos and news images from hyperthinksys.com and the font from Google Fonts, so you need
an internet connection. Use a local web server rather than double-clicking the file, so the paths behave like a live site:

```powershell
# from this folder, with Python installed
python -m http.server 8000
# then open http://localhost:8000/
```

Any static server works (VS Code Live Server, `npx serve`, IIS Express).

## Handover sequence

1. **Client sign-off on the placeholders.** Search `index.html` for `[`. Every item in square brackets needs a
   real value or must be removed: the enterprise-client count, the "figures as at" date, the ISO certifications,
   the Sovereign AI brief PDF and the Open Graph image.
2. **Create the missing pages:** `/sovereign-ai/`, `/ai-consulting/`, `/ai-data-services/` and `/managed-ai-operations/`
   (see `COPY-DECK.md`). Without them the homepage links return 404.
3. **Brief the photographer and screen captures** using the labels on the files in `assets/img/`. Export WebP
   (hero under 200KB, cards under 90KB) with a JPG fallback.
4. **Back up the site**, then follow section 0 of `ELEMENTOR-BUILD-MAP.md` (global colours, fonts, breakpoints,
   custom CSS, removing unused theme CSS).
5. **Build the header, footer and announcement popup** in Theme Builder, then remove Blockchain, Mobility,
   Smart City Consulting, ESG Consultancy and Retail from the WordPress menu.
6. **Build S01–S12** on the Home page using the Elementor Full Width template.
7. **Add the JSON-LD** from the `<head>` of `index.html` with an SEO plugin (Rank Math or Yoast schema) or a
   header-code snippet, and set the title and meta description from `COPY-DECK.md`.
8. **Check before launch:** Lighthouse mobile (LCP under 2.5s, CLS under 0.1), keyboard-only navigation, reduced
   motion on, and a 360px-wide phone with no sideways scroll.

## Deliberate departures from the brief

| Brief said | Built as | Why |
|---|---|---|
| Hero CTA 2 outlined in navy | Outlined in white | Navy on the ink background is 1.2:1 contrast, so the button would be invisible |
| Red highlights in the hero artwork | Red used only as solid fills | Red lines on ink (2.71:1) and navy (2.26:1) fail contrast |
| Meta description as written (183 characters) | Trimmed to 157 characters | The checklist requires 150–160 characters |
| Eyebrows as `h4` in the build-map example | Tag `p` | An `h4` above an `h2` skips heading levels |
| No heading on the tabs or proof band | Added "The HyperThink difference" and a screen-reader-only heading on the proof band | Every section needs a heading for screen readers and outline order |
| Ink closing CTA directly above the navy footer | Light badge band between them | The brief's own rule: never two dark sections back to back |
| `/products/ai-in-the-box/`, `/industries/x/` | Existing live URLs `/ai-in-the-box/`, `/bfsi/` etc. | Keeps current rankings and avoids broken links |
| Full desktop nav from 1025px | Full nav from 1200px; hamburger below | The six menu items, logo and CTA overflow by about 108px at 1030px |
| Headings at most 2 lines on desktop | The H1 runs to 3 lines and the AI in a Box H2 to 3 lines | At the specified H1 size, the 55/45 split cannot fit either heading in 2 lines. Balanced line wrapping keeps the lines even. |
| Chip row as a single line on a white background | Seven icon tiles on the hero's ink background: 7 equal columns on desktop, one scrolling line below 1025px | Text-only chips read as a wall of text; icon tiles make the entry points scannable, and the shared ink background turns hero and tiles into one visual band |
| Hero split 55/45, H1 up to the original maximum size | 50/50 split, H1 max 52px (`clamp(2.4rem, 3.6vw, 3.25rem)`) | The layered hero artwork with floating product cards needs the extra width; the smaller maximum keeps the H1 at 3 lines beside it |
| Hero artwork as a static illustration | Layered artwork with ambient CSS loops (perimeter march, data packets, blocked egress, floating cards) and pointer parallax on desktop | Makes the sovereign-perimeter idea visible at a glance. Loops run longer than the 400ms motion maximum by design; every one stops under reduced motion |
| Montserrat for all text | Arabic text in the chat card falls back to the system Arabic font | Montserrat has no Arabic glyphs |
| Hero image loaded with `fetchpriority="high"` | No hero image request | The hero artwork is inline SVG, so the H1 text is the LCP element and nothing needs priority loading |
| Navy duotone filter and placeholder boxes on industry, product, and news images | Full-colour HD images (`.ht-duotone` now renders crisp full-colour photos with a subtle hover zoom), plus Tractian-style photo + floating product-UI composites for AI in a Box and the 5 "Why HyperThink" tabs | The navy duotone multiply filter (`grayscale(1)` + `rgba(37,42,97,.70)`) gave every photo a murky bluish cast; full-colour HD imagery and product overlays match the reference B2B standard |
