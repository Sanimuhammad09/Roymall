---
name: Roymall Luxury
colors:
  surface: '#faf8fd'
  surface-dim: '#dbd9dd'
  surface-bright: '#faf8fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f7'
  surface-container: '#efedf1'
  surface-container-high: '#e9e7ec'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1b1b1f'
  on-surface-variant: '#44474f'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f4'
  outline: '#75777f'
  outline-variant: '#c5c6d0'
  surface-tint: '#495e8a'
  primary: '#00020a'
  on-primary: '#ffffff'
  primary-container: '#001b44'
  on-primary-container: '#7084b3'
  inverse-primary: '#b1c6f9'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#080100'
  on-tertiary: '#ffffff'
  tertiary-container: '#381000'
  on-tertiary-container: '#b67558'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b1c6f9'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#314671'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#6d3920'
  background: '#faf8fd'
  on-background: '#1b1b1f'
  surface-variant: '#e3e2e6'
  metallic-gold: '#D4AF37'
  regal-navy: '#001B44'
  soft-cream: '#F9F8F3'
  deep-onyx: '#121212'
  muted-gold: '#B0922E'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  price-lg:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
spacing:
  section-gap: 120px
  grid-gutter: 32px
  container-margin: 64px
  component-stack: 16px
  mobile-margin: 20px
---

## Brand & Style

This design system is crafted for an upscale audience that values exclusivity, craftsmanship, and the sensory allure of high-end perfumery. The brand personality is **Elegant, Premium, and Sophisticated**, positioning the product as a luxury lifestyle choice rather than a mere commodity.

The chosen design style is **Minimalism with High-Contrast Boldness**. It utilizes expansive whitespace (negative space) to create a "gallery-like" experience for the products. By stripping away non-essential UI elements, we elevate the visual weight of the photography and the regal color palette. The aesthetic draws from high-fashion editorial layouts, prioritizing balance and refined details like hairline borders and classic typography to establish an authoritative yet inviting presence.

## Colors

The palette is anchored by the heritage pairing of **Deep Navy Blue** and **Metallic Gold**, evoking a sense of prestige and timelessness.

- **Primary (Regal Navy):** Used for navigation backgrounds, primary headings, and high-impact UI containers to provide a stable, luxurious foundation.
- **Secondary (Metallic Gold):** Reserved for moments of excellence—calls to action, price highlights, and decorative accents like hairlines and icon fills.
- **Neutral (Surface & Text):** The system primarily uses a crisp white or "Soft Cream" for backgrounds to maximize the "breathability" of the layout. Text is rendered in Deep Onyx for maximum legibility against the light surfaces.
- **Functional States:** Success and error states should be handled through subtle tonal shifts or refined iconography rather than loud, disruptive colors to maintain the premium atmosphere.

## Typography

The typography system relies on a high-contrast pairing between a classical serif and a modern geometric sans-serif.

- **Headlines:** *Playfair Display* is used for all major headings and product titles. Its high stroke contrast and elegant serifs communicate fashion-forward luxury. Use larger sizes with tighter letter spacing for display titles.
- **Body & Interface:** *Manrope* provides a clean, neutral counterpoint. It ensures that functional information (descriptions, checkout details, navigation) is highly legible and modern. 
- **Labels & CTAs:** Navigation items and buttons use *Manrope* in uppercase with generous letter spacing (10%) to create a "spaced-out" look associated with high-end boutiques.

## Layout & Spacing

This design system employs a **Fixed Grid** model to maintain a sense of curated order and deliberate composition. 

- **Grid:** A 12-column desktop grid with a max-width of 1440px. Gutters are intentionally wide (32px) to prevent the UI from feeling cluttered.
- **Rhythm:** We prioritize "Macro-whitespace." Section gaps are significant (120px+) to allow the user's eye to reset between different fragrance collections.
- **Mobile Adaption:** On mobile, the 12 columns collapse to 4, and margins reduce to 20px. Product grids reflow from 4 columns to 1 or 2, ensuring that product imagery remains the focus and doesn't become too small to appreciate.

## Elevation & Depth

Depth in this system is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Flat Sophistication:** Most surfaces are flat. Depth is suggested by placing Navy containers over Cream backgrounds.
- **Hairline Borders:** Use 1px solid borders in #D4AF37 (Gold) or a very light grey (#E0E0E0) to define card boundaries and input fields. This provides structure without the "bulk" of shadows.
- **Interactive Depth:** Only the most critical interactive elements (like the "Shopping Bag" drawer or "Quick View" modals) utilize a very subtle, extra-diffused ambient shadow to lift them from the primary surface.

## Shapes

The shape language is **Sharp (0px)**. 

To maintain a "high-fashion" and architectural feel, all buttons, input fields, and product cards utilize 90-degree corners. This sharpness communicates precision, luxury, and a "no-nonsense" premium quality. Rounded corners are strictly avoided as they lean towards a "friendly/consumer" aesthetic, whereas sharp corners feel "editorial/exclusive."

## Components

- **Hero Section:** Full-bleed or high-margin imagery with centered `display-lg` typography. Use a Navy background with Gold text for maximum brand impact.
- **Product Cards:** Minimalist design with no outer border by default. Imagery should be on a Soft Cream or White background. Product titles appear in `headline-md` below the image, followed by the price in `price-lg`.
- **Buttons:**
    - *Primary:* Solid Navy background, Gold uppercase text, no rounded corners.
    - *Secondary/Ghost:* Gold hairline border, Gold uppercase text.
- **Input Fields:** Bottom-border only or very thin 1px full borders. Labels should be small and uppercase (`label-md`).
- **Promotional Banners:** Use "Thematic Pairs"—a high-quality lifestyle image on one side and a solid Navy block with Gold serif typography on the other.
- **Navigation:** A minimal top bar with centered logo. Icons (Search, Bag, Account) should be thin-stroke (1px) and rendered in Navy or Gold.