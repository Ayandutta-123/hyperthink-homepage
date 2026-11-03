# Elementor build map — HyperThink Systems homepage

This file tells an Elementor operator how to rebuild `index.html` widget by widget on hyperthinksys.com.
Section numbers (S01–S12) match the comments in `index.html`. The announcement bar, header and footer
are shared Theme Builder parts (G-A, G-B, G-C).

**Requires:** WordPress with the existing `hyperthink` theme, Elementor 3.16+ with Flexbox Containers on,
and Elementor Pro (Theme Builder, Popup, Menu, Posts, Form, Sticky, Motion Effects, Custom CSS).

---

## 0. One-time site setup (do this before building any section)

| Step | Where in Elementor | Setting |
|---|---|---|
| 1 | Site Settings → Global Colors | Add: Red `#C1262A`, Navy `#252A61`, Navy alt `#292B62`, Navy soft `#333A65`, Amber `#FFAC00`, Ink `#1A1E47`, Slate `#5B6280`, Line `#E3E6EF`, Mist `#F5F6FA`. Set Primary = Navy, Secondary = Red, Text = Navy soft, Accent = Red. |
| 2 | Site Settings → Global Fonts | Set Primary, Secondary, Text and Accent to **Montserrat**. This stops the Roboto and Roboto Slab requests. |
| 3 | Site Settings → Typography | Body: Montserrat 16px / 1.7, weight 400, colour Navy soft. H1–H6: Montserrat, colour Navy. |
| 4 | Site Settings → Layout | Content Width **1200px**. Container padding 24px (desktop), 32px (tablet), 16px (mobile). Gaps 24 / 20 / 16. |
| 5 | Site Settings → Layout → Breakpoints | Mobile **767**, Tablet **1024**. Enable **Tablet Extra = 1199** (used only for the header menu, see G-B). |
| 6 | Site Settings → Custom CSS | Paste all of `elementor-custom.css`. |
| 7 | Elementor → Settings → Features | Inline Font Icons: **Active**. Load Font Awesome 4 Support: **No**. Optimized DOM Output / Improved Asset Loading: **Active**. |
| 8 | Theme `functions.php` (developer task) | Dequeue the theme's `font-awesome.css`, `flaticon1.css`, `owl.carousel.css`, `magnific-popup.css`, `modal-video-min.css` and `bootstrap.min.css` on the front page. The new homepage does not use them. |
| 9 | Pages → Home → Page Attributes | Template: **Elementor Full Width** so the theme's hard-coded front-page sections no longer render. |

### Class naming rule
Type every class **without the leading dot** into Advanced → CSS Classes. Example: `ht-card ht-card--media`.
Every top-level section container also gets `ht-section` plus one background class
(`ht-bg-ink`, `ht-bg-navy`, `ht-bg-mist`, or nothing for white). The focus ring and entrance-animation
override in `elementor-custom.css` only apply inside `.ht-section`, `.ht-header`, `.ht-footer` and `.ht-announce`.

### Motion rule (applies to every row below)
- The only entrance animation on the page is **Fade In Up**, set at Advanced → Motion Effects → Entrance Animation.
  Pick Animation Duration **Fast**. The custom CSS normalises it to 500ms, 24px travel, ease-out.
- Delays step by 100ms **within a row only** (0 / 100 / 200 / 300). Never stagger across sections.
- **The hero gets no entrance animation.** The H1 is the Largest Contentful Paint element and must render at once.
- Section padding is 96px top/bottom on desktop, 64px on tablet and 48px on mobile, unless a row says otherwise.

### Legacy content to delete
The current homepage sections are **hard-coded in the theme's front-page template**, not built in Elementor.
Switching the Home page to Elementor Full Width (setup step 9) removes all of them at once. Each section
below still lists what it replaces, so the operator can confirm nothing old is left showing under the new section.
After the switch, view the page source and search for `section2-bottom-left.png` and `section7-top-right.png`
(old theme decorations). If either still appears, the old template is still rendering.

---

## G-A — Announcement bar (§4.1)

**Delete first:** nothing (new element).

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Templates → Popups → New "Announcement" | Popup | Layout: width 100%, height fit to content, position **top**, overlay **off**, close button **on** (colour white, 20px), Prevent page scroll: off. Triggers: On page load, 0s. Advanced Rules: show up to **1 time per session**. Conditions: Front page. | `ht-announce` | Entrance animation: none | On mobile the NEWS chip is hidden and the text and link run as one 13px line of text (custom CSS); close button stays top-right |
| Popup → Container (row, centred, gap 16, padding 6/24) | — | Background Navy `#252A61`, min-height 44px | — | — | Wrap: Wrap on mobile |
| Row → Heading | Heading | Text `NEWS`, HTML tag `span` | `ht-announce-chip` | — | — |
| Row → Text Editor | Text Editor | "HyperThink Systems wins two awards in the Deloitte Technology Fast 50." 14px, weight 500, white | — | — | — |
| Row → Heading (link) | Heading | "Read the story →", HTML tag `span`, link `/news/hyperthink-systems-secures-two-prestigious-awards-in-the-deloitte-technology-fast-50/` | — | — | `white-space: nowrap` comes from the custom CSS |

---

## G-B — Header and navigation (§4.2)

**Delete first:** the theme header for the front page. Theme Builder → Header → Display Conditions: Entire Site
(or Front Page first, to test). Remove **Blockchain** and **Mobility** from Appearance → Menus, along with
**Smart City Consulting**, **ESG Consultancy** and **Retail**.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Theme Builder → Header → Container (boxed 1200, row, align centre, gap 24) | — | Background white, min-height 72px | `ht-header` | Advanced → Motion Effects → **Sticky: Top**, Sticky On: Desktop/Tablet/Mobile, **Effects Offset 100** | Shrinks to 60px with a 1px hairline through `.elementor-sticky--effects` |
| Header → Site Logo / Image | Image | `/wp-content/themes/hyperthink/assets/images/logo.svg`, width 180px, alt "HyperThink Systems", link Home | `ht-logo` | — | 140px on mobile. Never below these widths. |
| Header → Menu | Menu (Pro, v3.16+) | Items: Home, Company, Consulting, Technology Services, Process Outsourcing, Products. Each parent = **Dropdown → Content Type "Custom"** containing a container (see mega-menu table). Open on: **Hover** (desktop), **Click** (tablet). Dropdown indicator: chevron-down. **Mobile Dropdown Breakpoint: Tablet Extra (1199px)**, Full Width on, Toggle: Hamburger. | `ht-nav` | — | Below 1200px the full menu does not fit beside the logo and CTA, so the hamburger shows from 1199px down |
| Header → Button | Button | "Contact Us" → `/contact-us/`, solid Navy, 2px radius | `ht-btn-navy` | — | Hidden on mobile (Advanced → Responsive → Hide on Mobile); pinned in the drawer instead |
| Menu drawer → last item | Button | "Contact Us", full width | `ht-btn-navy` | — | Mobile and tablet only |

**Mega-menu panels** (one container per parent; class `ht-mega`; max 3 columns):

| Parent | Short descriptor | Columns → items |
|---|---|---|
| Company | Who we are, who we work with, and what we have shipped. | About HyperThink `/company/` · Leadership `/leadership/` · Partners `/partners/` — News & events `/news-and-events/` · Careers `/careers/` |
| Consulting | Plan the programme before you fund it. | AI Consulting `/ai-consulting/` · Digital Transformation · Innovation Labs · Startup Incubation |
| Technology Services | (one per column) | **Enterprise AI** — Private AI stacks and the applications on top: Sovereign AI, AI in a Box, AI & Data Services, Agentic AI, Generative AI, Vision AI, AI use cases. **Enterprise services** — The data, applications and infrastructure AI runs on: BI & Data Warehousing, Enterprise Applications, GIS Solutions, Enterprise Content Management, IT Infrastructure Services, Product Development, Testing Services. **Deep tech** — Core technologies we build with: Artificial Intelligence, Internet of Things, Robotic Process Automation, Cloud, IT Security. |
| Process Outsourcing | Managed teams for back-office operations. | Contact Center · HR Outsourcing · Records Management · Digital Marketing |
| Products | Platforms we build, ship and support. | AI in a Box · KnowerAI Platform · HashECM Pistaceo · News LLM Application · HyperThings IoT Platform |

Inside each panel: column headings are Heading widgets (HTML tag `p`) styled like `ht-eyebrow`; links are an Icon List with icons off.
Keyboard: the Menu widget opens on focus and closes on Escape natively.

---

## S01 — Hero (§4.3) · background ink

**Replaces:** the old hero/slider at the top of the theme's front page.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed 1200) → 2 child containers **50 / 50**, align centre, gap 48 | — | Background: classic `#1A1E47` (the custom CSS layers an amber glow, the mesh and a faded blueprint grid on top, plus a slow-drifting red glow); padding 80 top / 48 bottom desktop | `ht-section ht-bg-ink ht-hero` | No scrolling effect on the container: the hero has its own ambient motion (custom CSS) | Stack to 1 column below 1025px, copy first. Top padding 32px on mobile (custom CSS) so "Book a discovery call" shows on a 667px-tall phone without scrolling |
| Left → Heading | Heading | Tag `p`. Text (Text tab, HTML allowed): `<span class="ht-live" aria-hidden="true"></span>Enterprise AI · Sovereign by design` | `ht-eyebrow ht-hero-eyebrow` | none (the live dot pings via custom CSS) | Pill with a pulsing amber dot. 12px with tighter letter-spacing on mobile so it stays on one line |
| Left → Heading | Heading | `Deploy enterprise&nbsp;AI.<br> Keep your data <span class="ht-hl">sovereign.</span>`, tag **`h1`** (the only H1) | `ht-h1` | none (the `ht-hl` amber underline draws in once, 900ms, custom CSS) | The `&nbsp;` stops "AI." sitting alone on a line. Max 52px desktop, 32px mobile (custom CSS) |
| Left → Text Editor | Text Editor | Hero sub copy from `COPY-DECK.md`, 18–20px, white 82% | `ht-lead` | none | 16px / 1.6 on mobile |
| Left → Container (row, gap 16) | — | — | — | — | Column + full-width buttons below 768px |
| → Button | Button | "Book a discovery call" → `/contact-us/` | `ht-btn-primary` | none | Full width mobile |
| → Button | Button | "Explore Sovereign AI" → `/sovereign-ai/` | `ht-btn-outline-light` | none | Full width mobile. White outline, not navy: navy on ink is 1.2:1 |
| Right → Container | — | Full width, max 560, no padding | `ht-hero-visual` | — | Centred under the copy below 1025px |
| → HTML (art) | HTML | Paste the `<svg class="ht-art">…</svg>` from inside `.ht-hero__layer--art` in `index.html`: isometric stack, dashed sovereign perimeter, data packets, blocked egress. Inline SVG lets the strokes and gradients read the colour tokens. | `ht-hero__layer ht-hero__layer--art` | Advanced → Motion Effects → **Mouse Track**: Opposite, speed **1** (desktop only). Layer build-in, marching perimeter, packets and the blocked × are custom CSS loops | Same art at every size. If the operator cannot use the HTML widget, export it to **Lottie** (trigger On Viewport, loop on) |
| → HTML (cards) | HTML | Paste the three cards from inside `.ht-hero__layer--ui` in `index.html`: chat card (Arabic prompt → sourced answer), "AI in a Box" status card with its 5-row status list, and the "Sovereign perimeter" pill | `ht-hero__layer ht-hero__layer--ui` | Mouse Track: **Direct**, speed **2** (desktop only). Rise-in and gentle float are custom CSS | ≥768px: the cards float over the art (absolute). Below 768px: chat card and pill hidden, status card sits under the art. Chat card and pill are `aria-hidden`; the status list is real text for screen readers |

---

## S02 — "Start where your problem is" icon tiles (§4.4) · background ink

**Replaces:** nothing; this is new. It continues the hero's ink background so the hero and tiles read as one band.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed), padding 0 top / 48 bottom, background classic `#1A1E47` | — | — | `ht-section ht-start` | — | Bottom padding 32 on mobile |
| → Heading | Heading | "Start where your problem is", tag **`h2`** (styled small), centred | `ht-label` | Fade In Up, 0 | White 64% on ink |
| → Container (row, no wrap, gap 12) | — | — | `ht-tiles` | — | ≥1025px: 7 equal columns. Below: 156px tiles scroll sideways with no visible scrollbar (custom CSS) |
| → 7 × Icon Box | Icon Box | Icon position **Top**, alignment Left, Title HTML tag **`span`**, no description, Link set on the box. Icons (upload the SVGs from `assets/icons/`): shield-check · server · bot · database · map · activity · layers. Titles and links: Sovereign AI `/sovereign-ai/` · AI in a Box `/ai-in-the-box/` · Agentic AI applications `/agentic-ai/` · Enterprise data platforms `/bi-data-warehousing/` · AI consulting & roadmap `/ai-consulting/` · Managed AI operations `/managed-ai-operations/` · GIS & content management `/enterprise-content-management/` | `ht-tile` | Fade In Up, 0 / 100 / 200… within the row. Hover: lift 2px, amber border, icon tilts (custom CSS) | Icon squares cycle red, amber, navy by position (custom CSS). The whole tile is the click target (stretched link) |

---

## S03 — Social proof and partner logos (§4.5) · white

**Replaces:** the old partner logo slider (Owl Carousel).

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (full width), padding 48/0 | — | — | `ht-section` | — | — |
| → Heading | Heading | "Trusted by banks, ministries and energy operators across Qatar, the GCC and India", tag `h2`, 20px / 700, Slate, centred, max-width 760 | `ht-h2-small` | Fade In Up, 0 | 18px mobile |
| → Image Carousel | Image Carousel | All 19 existing logos (`/wp-content/uploads/2022/03/*-logo-300x120.png`). Slides to show 6 / 4 / 2, Slides to scroll 1, **Autoplay on, speed 3000ms, Infinite loop on, Pause on hover on**, Navigation none, Transition 400ms, Image stretch off. Alt text per `index.html`. | `ht-logos` | none | Greyscale 60% → colour on hover from custom CSS; logos fit inside 160 × 56 without stretching |

---

## S04 — AI in a Box (§4.6) · background navy

**Replaces:** the old "Our Products" block and its purple neon skyline image (that block is removed entirely).

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed, 1200px) → 2 child containers 55/45 | — | Background `#252A61`, padding 96/24 | `ht-section ht-bg-navy ht-aibox` | — | Stack to 1 col < 1025px, media first |
| Left → Heading | Heading | "Flagship product", tag **`p`**, 13px, 700, `+0.12em`, `#FFAC00` | `ht-eyebrow` | Fade In Up, delay 0 | 12px mobile |
| Left → Heading | Heading | "AI in a Box: your private AI stack, installed and running inside your own data centre", `h2`, white | `ht-h2` | Fade In Up, delay 100 | — |
| Left → Text Editor | Text Editor | Body copy, 18px/1.7, `rgba(255,255,255,.82)` | `ht-lead` | Fade In Up, delay 200 | 16px mobile |
| Left → Icon List | Icon List | 6 items, layout default, icon = Lucide `check` SVG upload, amber; text 16px white | `ht-ticks` | Fade In Up, delay 300 | 2 columns from 768px, 1 column mobile (custom CSS grid) |
| Left → Button | Button | "See what ships in the box →" → `/ai-in-the-box/`, solid `#C1262A`, 2px radius, 12/28 padding | `ht-btn-primary` | Fade In Up, delay 400 | Full width mobile |
| Right → Image (or Lottie) | Image / Lottie | 1080×1080 WebP, 12px radius, alt "AI in a Box server rack installed in a customer data centre". Lottie: trigger On Viewport, loop on. | `ht-aibox-media` | Mouse Effects → **3D Tilt**, speed 1 | Tilt disabled below 1025px (custom CSS) |

The brief's example used `h4` for the eyebrow. That puts an h4 before the h2 and skips heading levels, so every eyebrow uses tag `p`.

---

## S05 — The HyperThink difference (§4.7) · background mist

**Replaces:** the old enterprise-AI feature content and its glossy 3D isometric illustrations.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | Background `#F5F6FA` | `ht-section ht-bg-mist` | — | — |
| → Heading | Heading | "Why HyperThink", tag `p` | `ht-eyebrow` | Fade In Up, 0 | — |
| → Heading | Heading | "The HyperThink difference", tag `h2` | `ht-h2` | Fade In Up, 100 | — |
| → Tabs | **Tabs** (Nested Tabs) | 5 tabs, labels from `COPY-DECK.md`. Direction horizontal, justify stretch. Tab 1 active by default. **Responsive Settings → Breakpoint: Mobile** (becomes an accordion at 767px). Each tab content = container, row, 5/6 split: Heading `h3` + Text Editor (2 sentences) on the left, Image 960×640 WebP on the right. | `ht-tabs` | Fade In Up, 200 (whole widget, once) | Accordion on mobile; image stacks under copy. **Legacy Tabs fallback:** if the site still shows the old Tabs widget, paste each panel as HTML: `<div class="ht-tab-panel"><div><h3>…</h3><p>…</p></div><img …></div>` |

Tab image alt texts are in `index.html`.

---

## S06 — Enterprise AI services, 9 cards (§4.8) · white

**Replaces:** the old "Enterprise Services" icon list and its 2D icon set.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | — | `ht-section` | — | — |
| → Heading ×2 + Text Editor | Heading / Text Editor | "What we do" (`p`, `ht-eyebrow`) · "Enterprise AI services, end to end" (`h2`, `ht-h2`) · sub (`ht-lead`, Navy soft) | as listed | Fade In Up 0 / 100 / 200 | — |
| → Container (**Grid**, 3 columns, gap 24) | — | Grid: Columns 3 / 2 / 1, rows auto | — | — | 3 → 2 → 1. Never 4 across. |
| → 9 × Container (column, padding 24, align stretch) | — | — | `ht-card` | Fade In Up, delay 0 / 100 / 200 by column (repeat per row) | Equal heights come from the Grid; "Explore" sits at the bottom through `margin-top:auto` |
| card → Icon | Icon | Uploaded SVG from `assets/icons/` (1.5px stroke, no background shape), size 32 | `ht-card-icon` | — | Stroke turns red on card hover |
| card → Heading | Heading | Card title, tag `h3`. New cards add `<span class="ht-new">New</span>` in the title (Sovereign AI, AI in a Box, AI & Data Services). | `ht-card-title` | — | — |
| card → Text Editor | Text Editor | One-line description | `ht-card-desc` | — | — |
| card → Heading (link) | Heading | `Explore<span class="ht-sr-only"> Sovereign AI</span> <span aria-hidden="true">→</span>`, tag `p`, link per card | `ht-card-link` | — | The link stretches over the whole card; the hidden text gives screen readers a descriptive anchor |

Card links: `/sovereign-ai/`, `/ai-in-the-box/`, `/ai-data-services/`, `/bi-data-warehousing/`, `/enterprise-applications/`,
`/enterprise-content-management/`, `/it-infrastructure-services/`, `/product-development/`, `/testing-services/`.
Icons: shield-check, server, workflow, bar-chart, layout-grid, files, cloud-cog, code, clipboard-check.

---

## S07 — Proof band (§4.9) · background navy

**Replaces:** nothing; new. Do not add any figure that is not in `COPY-DECK.md`.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | Background `#252A61` | `ht-section ht-bg-navy` | — | — |
| → Heading | Heading | "HyperThink Systems in numbers", tag `h2` | `ht-sr-only` | — | Visually hidden; gives the section a heading |
| → Container (Grid 4 / 2 / 2, gap 48 / 32) | — | — | — | — | 4 → 2 → 2 |
| → Counter ×3 | Counter | (a) 0 → **2**, title "Deloitte Technology Fast 50 awards" · (b) 0 → **19**, suffix "+", title "Technology and platform partners" · (c) 0 → **2**, title "Delivery hubs — Doha and Bangalore". **Duration 2000ms**, thousand separator off. | `ht-stat` | Fade In Up, 0 / 100 / 200 | — |
| → Container (4th tile) → Heading + Text Editor | Heading / Text Editor | `<mark class="ht-placeholder">[VERIFY]</mark>` and `<mark class="ht-placeholder">[Enterprise clients served — client to confirm]</mark>`. **Not a Counter** until the client confirms a number. | `ht-stat` | Fade In Up, 300 | — |
| → Text Editor | Text Editor | `Figures as at <mark class="ht-placeholder">[MONTH YEAR]</mark>. Awards: Deloitte Technology Fast 50.` | `ht-stats-caption` | — | — |

---

## S08 — Industries (§4.10) · white

**Replaces:** the old industry tiles. **Retail is removed.**

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | — | `ht-section` | — | — |
| → Heading ×2 | Heading | "Where we work" (`p`, `ht-eyebrow`) · "AI for the industries that cannot export their data" (`h2`, `ht-h2`) | as listed | Fade In Up 0 / 100 | — |
| → Container (Grid 3 / 2 / 1, gap 24) | — | — | — | — | — |
| → 6 × Container (column, padding 0) | — | — | `ht-card ht-card--media` | Fade In Up by column 0 / 100 / 200 | — |
| card → Image | Image | 800×500 (or 1200×750 HD) JPG/WebP from `assets/img/`, lazy, descriptive `alt` text | `ht-duotone` | — | Full-colour HD photo frame with subtle 1.03× zoom on card hover |
| card → Container (padding 24) → Heading `h3` + Text Editor + link Heading | Heading / Text Editor | As S06 card | `ht-card-title` / `ht-card-desc` / `ht-card-link` | — | — |

Links: `/bfsi/`, `/government/`, `/manufacturing/`, `/oil-gas/`, `/telecom/`, `/smart-city/` (existing live URLs).

---

## S09 — Consulting (§4.11) · background mist

**Replaces:** the old "Consulting Services" list. **Smart City Consulting and ESG Consulting are removed.**

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | Background mist | `ht-section ht-bg-mist` | — | — |
| → Heading ×2 | Heading | "How we start" · "Consulting that gets AI out of the pilot stage" | `ht-eyebrow` / `ht-h2` | Fade In Up 0 / 100 | — |
| → Container (Grid **4 / 2 / 1**) → 4 × card | as S06 | AI Consulting (`ht-new`) `/ai-consulting/` · Digital Transformation `/digital-transformation/` · Innovation Labs `/innovation-labs/` · Startup Incubation `/startup-incubation/`. Icons: map, route, flask, rocket. | `ht-card` | Fade In Up 0 / 100 / 200 / 300 | 4 → 2 → 1 |

---

## S10 — Technology Services (§4.12) · white

**Replaces:** the old Technology Services tiles. **Blockchain and Mobility are removed.**

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | — | `ht-section` | — | — |
| → Heading ×2 | Heading | "Technology we build on" · "Deep tech, in production" | `ht-eyebrow` / `ht-h2` | Fade In Up 0 / 100 | — |
| → Container (Grid 3 / 2 / 1) → 3 × card | as S06 | Artificial Intelligence `/artificial-intelligence/` (icon brain-circuit) · Internet of Things `/iot-innovation-labs/` (radio-tower) · Robotic Process Automation `/rpa/` (bot) | `ht-card` | Fade In Up 0 / 100 / 200 | — |
| AI card → Container (row, wrap, gap 8) → 4 × Button | Button | Agentic AI `/agentic-ai/` · Generative AI `/generative-ai/` · Vision AI `/vision-ai/` · AI use cases `/ai-use-cases/` | `ht-card-tags` on the row | — | These sit above the card's stretched link (z-index 1) so each one stays clickable |

---

## S11 — Popular news (§4.13) · white

**Replaces:** the old "Popular News" stack **and the Career section below it, including the Apply Now
modal with the Gender and CV Upload fields.** Those fields belong only on `/careers/`.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) | — | — | `ht-section` | — | — |
| → Container (row, space-between, align end) | — | — | — | — | Wraps on mobile |
| → Heading ×2 | Heading | "Latest" (`p`, `ht-eyebrow`) · "Popular news" (`h2`, `ht-h2`) | as listed | Fade In Up 0 / 100 | — |
| → Heading (link) | Heading | "View all news →" → `/news-and-events/` | `ht-text-link` | — | — |
| → Posts | Posts (Pro) | Skin **Cards**, Columns 3 / 2 / 1, Posts per page **3**, Query: Manual selection → Deloitte Fast 50 post, GITEX Global 2025, Project Qatar 2025. Show: image (ratio 0.62), title (`h3`), read more "Read the story →". Hide excerpt, date, author, badge, avatar. | `ht-news` | Fade In Up 0 | The two other posts (AI Summit AI Hackathon, Qatar Entrepreneurship Awards 2024) are reached through "View all news" |

---

## S12 — Closing call to action (§4.14) · background ink

**Replaces:** nothing; new.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed, content max 860, centred) | — | Background `#1A1E47` | `ht-section ht-bg-ink` | — | — |
| → Heading | Heading | "Stop running AI pilots.<br> Start running AI in production.", `h2`, white, centred | `ht-h2` | Fade In Up 0 | — |
| → Text Editor | Text Editor | Sub copy, centred | `ht-lead` | Fade In Up 100 | — |
| → Container (row, centre, gap 16) → 2 × Button | Button | "Book a discovery call" → `/contact-us/` (`ht-btn-primary`) · "Download the Sovereign AI brief" → **[ASSET TO BE SUPPLIED]** (`ht-btn-outline-light ht-btn-disabled` until the PDF exists) | as listed | Fade In Up 200 | Full-width stacked buttons on mobile |

---

## G-C — Footer (§4.15)

**Delete first:** the theme footer's company description ("Think Technology, Build Tomorrow — HyperThink Systems is a
global digital transformation…") and the duplicate "Copyright © 2024" line. Keep the newsletter integration the site uses today.

| Container structure | Elementor widget | Key settings | CSS Class | Motion | Responsive notes |
|---|---|---|---|---|---|
| Container (boxed) → Grid 4 columns (1.6 / 1 / 1.2 / 1.4) | — | Background Navy, padding 64 top | `ht-footer` | — | 2 columns on tablet, 1 on mobile |
| col 1 → Image | Image | **White** logo SVG (`assets/logo-white.svg`, fills changed in the file, not a CSS filter), width 180 | — | — | — |
| col 1 → Text Editor | Text Editor | New footer description (see `COPY-DECK.md`) | — | — | — |
| col 1 → Social Icons | Social Icons | LinkedIn, X, Facebook, Instagram (URLs in `index.html`), shape square, size 20 | — | — | 44px targets |
| col 2 → Heading + Icon List | Heading (`h2`) / Icon List (no icons) | "Quick links": Home, About us, Consulting, Products, Careers, Contact us | `ht-footer-heading` | — | — |
| col 3 → Heading + Icon List | Heading / Icon List | "Contact us": +974 4465 4622 (`tel:`), info@hyperthinksys.com (`mailto:`), Al Reem Tower, Office No. 12, 3rd Floor, West Bay, Doha, Qatar | `ht-footer-heading` | — | — |
| col 4 → Heading + Text + Form | Heading / Text Editor / Form (Pro) | "Newsletter", "News, events and product updates. No spam.", one Email field (label hidden, placeholder "Work email") + "Subscribe" button | `ht-footer-heading` / `ht-btn-primary` | — | Field and button stack on mobile |
| Bottom → Text Editor | Text Editor | `© 2026 HyperThink Systems. All Rights Reserved.` (one line only) | `ht-footer-legal` | — | — |

---

## main.js behaviour → Elementor equivalent

`js/main.js` exists only so the static prototype works. None of it ships to WordPress.

| Prototype behaviour | Elementor feature that replaces it |
|---|---|
| Announcement dismiss (once per session) | Popup → close button + Advanced Rules "show up to 1 time per session" |
| Header shrink after 100px | Sticky: Top, Effects Offset 100 (`.elementor-sticky--effects`) |
| Mega menu: hover / click / Escape | Menu widget (Pro), Dropdown content "Custom", Open on Hover / Click |
| Mobile drawer with accordion and pinned Contact Us | Menu widget mobile dropdown (Full Width, breakpoint Tablet Extra) + Button |
| Tabs ↔ accordion | Tabs (Nested Tabs), Responsive Breakpoint: Mobile |
| Logo marquee, 3s per step, pause on hover | Image Carousel, Autoplay 3000ms, Infinite, Pause on Hover |
| Hero pointer parallax (art and cards move at different depths, desktop only, off under reduced motion) | Motion Effects → Mouse Track on each hero HTML widget: art Opposite speed 1, cards Direct speed 2. Elementor already skips motion effects when reduced motion is requested |
| Tile row edge fade on mobile | Container overflow + `.ht-tiles` rules in `elementor-custom.css` |
| Fade In Up entrance, once, staggered within a row | Motion Effects → Entrance Animation: Fade In Up + Animation Delay |
| Counters, 2000ms | Counter widget, Duration 2000 |

---

## Not allowed in this build

GSAP, ScrollTrigger, Locomotive Scroll, Lenis, three.js, WebGL, canvas particle effects, scroll-jacking or pinned
scroll stories, cursor followers, SplitType or per-character text animation, anything that needs `npm` or a build
step, and autoplaying video with sound. If a request needs one of these, simplify the design instead.
