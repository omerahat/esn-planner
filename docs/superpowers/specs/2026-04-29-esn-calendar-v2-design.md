# ESN Event Planner V2 - Design Specification

## Overview
This document outlines the design and architectural updates for the ESN Event Planner. The goal is to evolve the proof-of-concept into a shareable, branded, and more functional calendar tool for ESN chapters.

## Bug Fixes
- **PNG Export Issue:** Debug and fix the `html2canvas` export functionality. Ensure the target reference is correctly captured and all assets (fonts, images) are rendered properly in the exported PNG.

## 1. Data Architecture & Sharing (URL State)
- **Current State:** Data resides solely in `localStorage`.
- **New Flow:**
  - Data will **continue to be persisted locally** in `localStorage` as the primary data store.
  - A "Share Link" button will be added to the header.
  - On click, the current application state (Events, Members, Date Ranges) will be serialized to JSON, compressed using `lz-string`, and appended to the URL as a query parameter (e.g., `?data=compressed_string`).
  - Upon initialization, the app will check for the `data` parameter in the URL. If present, it will decompress it, decode the JSON, and override the local state, effectively loading the shared calendar.
  - A **"Reset Calendar"** button will be added. When clicked (after a confirmation prompt), it will clear the `localStorage` and reset the application state to empty, allowing the user to start over.

## 2. Event Management Updates
- **All-Day Events:** The "Time" field will be completely removed from the data model and UI. All events will be treated as all-day blocks.
- **Categories & Emojis:**
  - Events will support 4 predefined categories (names to be defined later, placeholder names will be used initially).
  - Each category will have a distinct emoji and color.
  - The selected emoji will be prepended to the event title on the calendar card.
- **CRUD Operations:** The event modal will be updated to include a "Delete" button for existing events, allowing full management (Create, Read, Update, Delete).

## 3. Special Date Ranges
- **UI Addition:** A new form section will be added below the calendar grid.
- **Fields:** Start Date, End Date, Description, and Color Selection.
- **Rendering:** These ranges will be rendered visually on the calendar grid as horizontal, colored bars spanning across the days included in the range. The description will be displayed inside or alongside the bar.

## 4. Member Profiles & Statuses
- **Status Field:** Members will have a new `status` field.
  - Roles: "Yönetim Kurulu", "Denetim Kurulu", "YK Destek", "Üye", "Aday Üye".
  - These statuses will be displayed under the member's name in the right-hand sidebar.
- **Avataring System:**
  - The app will attempt to load a user's photo from the local public directory: `public/avatars/{kebab-case-name}.jpg` or `.png`.
  - Fallback: If the image fails to load, it will fall back to `public/avatars/default.png`.
  - Avatars will be displayed as circular (`rounded-full`) images.

## 5. Branding, Typography & Colors
- **Logo:** The ESN logo will be added to the top-left corner of the header.
- **Typography:**
  - Headings: **Kelson Sans**
  - Body: **Lato**
  - (These will be imported via Google Fonts or local assets and configured in Tailwind).
- **Color Palette Update:** The `tailwind.config.js` will be updated to reflect the exact brand colors:
  - Navy: `#2e3192`
  - Blue: `#00aeef`
  - Green: `#7ac143`
  - Orange: `#f47b20`
  - Pink: `#ae008c`

## 6. Implementation Scope
This design is well-isolated. The state management (`usePlannerState`) will be expanded to handle the new categories, date ranges, and URL parsing. The UI components will be adjusted to reflect the new layout and styling requirements. No backend is required.
