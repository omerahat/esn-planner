---
name: Unity & Exchange
colors:
  surface: '#fcf8ff'
  surface-dim: '#d7d7ff'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#eeecff'
  surface-container-high: '#e7e6ff'
  surface-container-highest: '#e1e0ff'
  on-surface: '#04006d'
  on-surface-variant: '#3e4850'
  inverse-surface: '#1e2084'
  inverse-on-surface: '#f1efff'
  outline: '#6e7881'
  outline-variant: '#bdc8d1'
  surface-tint: '#00658d'
  primary: '#00658d'
  on-primary: '#ffffff'
  primary-container: '#00aeef'
  on-primary-container: '#003e58'
  inverse-primary: '#82cfff'
  secondary: '#b30069'
  on-secondary: '#ffffff'
  secondary-container: '#e00085'
  on-secondary-container: '#fffbff'
  tertiary: '#994700'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc8127'
  on-tertiary-container: '#602a00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6e7ff'
  primary-fixed-dim: '#82cfff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6b'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cc'
  on-secondary-fixed: '#3e0021'
  on-secondary-fixed-variant: '#8d0051'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68b'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#753400'
  background: '#fcf8ff'
  on-background: '#04006d'
  surface-variant: '#e1e0ff'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built to reflect the spirit of international student exchange: energetic, inclusive, and highly organized. The brand personality is **vibrant and collaborative**, leaning on a **Corporate Modern** style infused with playful color accents. 

The aesthetic prioritizes clarity and ease of use to facilitate community management while maintaining a youthful edge. It utilizes a "White Canvas" approach, where the white background provides a clean, professional foundation, allowing the signature ESN palette to guide the user's eye toward interactive and celebratory elements. The emotional response should be one of reliability and excitement—a digital home for students navigating new cultures and administrative tasks.

## Colors

The color palette is derived directly from the official ESN identity, using high-fidelity chromatic brand colors. 

- **Primary (Cyan):** Used for primary actions, links, and main navigation elements. It represents the "clean" and "modern" aspect of the brand.
- **Secondary (Magenta):** Reserved for highlights, notifications, and secondary call-to-actions to add vibrancy.
- **Tertiary (Orange) & Quaternary (Green):** Used for semantic categorization, progress indicators, and community-tagging systems.
- **Neutral (Deep Blue):** Utilized for primary text and high-contrast iconography to ensure legibility and a "professional" feel.
- **Background:** A pure white background is mandatory to maintain the "clean" and "organized" aesthetic, ensuring the vibrant palette doesn't become overwhelming.

## Typography

The typography uses **Plus Jakarta Sans** to bridge the gap between "professional" and "friendly." Its modern, slightly rounded geometric forms provide a welcoming atmosphere without sacrificing the structural integrity required for a management tool.

Headlines are set with tight tracking and heavy weights to create clear information hierarchy. Body text is optimized for readability with generous line heights. Labels and small metadata use a semi-bold weight and increased letter spacing to ensure they remain legible when used within densly packed UI components like dashboards and tables.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop environments to maintain organization, transitioning to a fluid model for mobile. 

- **Grid System:** A 12-column grid with a 24px gutter. Content is generally housed in a centered container with a maximum width of 1280px.
- **Spacing Rhythm:** An 8px linear scale is used to define relationships between elements. 
- **Information Density:** Medium density. Sufficient whitespace is preserved to maintain the "clean" aesthetic, but components are grouped logically to assist in community management tasks.

## Elevation & Depth

To maintain a "modern" and "organized" look, this design system avoids heavy shadows. Instead, it utilizes **Tonal Layers** and **Low-contrast Outlines**.

- **Surface Levels:** The primary background is white. Secondary containers (like sidebars or cards) use a very light grey or a subtle tint of the primary cyan at 5% opacity.
- **Depth:** Elevation is conveyed through a 1px border (#E2E8F0) and, where necessary, a "Soft Ambient Shadow"—a very diffused, low-opacity (8%) shadow with a subtle blue tint to prevent a muddy look.
- **Interactive States:** Hovering over cards or buttons results in a slight upward shift (transform: translateY(-2px)) and a subtle increase in shadow spread, providing tactile feedback.

## Shapes

The shape language is consistently **Rounded**, reflecting a friendly and approachable community vibe. 

- **Standard Radius:** 0.5rem (8px) for buttons, input fields, and small cards.
- **Large Radius:** 1rem (16px) for main content containers and modal windows.
- **Pill Shapes:** Used exclusively for tags, chips, and status indicators to differentiate them from actionable buttons.

## Components

- **Buttons:** Primary buttons are solid Cyan with white text. Secondary buttons use a Cyan outline. Tertiary buttons (ghost) use the Secondary Magenta for "high-energy" actions like "Join" or "Apply."
- **Chips/Tags:** Used for categorizing events or student interests. Each chip should utilize one of the four brand colors (Cyan, Magenta, Orange, Green) with a 10% opacity background and a 100% opacity text color for high legibility.
- **Cards:** Cards feature a 1px neutral border, 16px padding, and 16px corner radius. They are the primary vehicle for displaying events and student profiles.
- **Input Fields:** Clean, white backgrounds with an 8px radius and a 1px light grey border. Upon focus, the border transitions to a 2px Cyan outline.
- **Checkboxes & Radios:** Use the Primary Cyan for the checked state. They should be large enough to be easily "tappable," emphasizing the student-friendly, mobile-first nature of the network.
- **Navigation:** A top-bar navigation for global links and a left-hand sidebar for specific community management tools (e.g., Member List, Event Calendar, Messaging).