# Lumio Official Website Design

Date: 2026-06-03
Status: Approved for implementation planning

## Goal

Build a fast, deployable official website for Lumio, an early-stage independent game company in the United States. The site should look polished enough for partners, players, creators, and potential investors, while staying honest about Lumio's startup-stage status.

## Positioning

Lumio is a founder-led independent game company based in the US. It builds original game worlds, explores publishing opportunities, and grows through practical collaboration with players, creators, developers, and partners.

The site must not imply that Lumio is a large publisher or claim shipped games that do not exist. It should use startup-friendly language such as "building," "prototype," "upcoming," "partner," "community," and "global publishing mindset."

## Visual Direction

Use the selected Direction A: a bright glassmorphism game-publishing layout inspired by the reference image.

Key traits:

- Large left hero panel with blue, cyan, and soft mint gradients.
- Right-side service cards with colorful illustrated panels.
- Rounded glass cards, soft shadows, clean white navigation, and playful game-like shapes.
- Pixel blocks, cubes, coins, hearts, or controller-inspired motifs created with CSS/SVG, not heavy image assets.
- Premium but lightweight style that loads quickly on desktop and mobile.

## Site Structure

Build a single-page MVP with anchor navigation:

- Home: hero, positioning, and primary calls to action.
- Services: strategy, localization, player growth, monetization, live ops, and partnerships.
- Games: original IP and upcoming/prototype game directions without fake release claims.
- Publishing: Lumio's publishing approach, market strategy, and global mindset.
- About: early-stage independent US company story.
- Contact: email/contact call to action and update subscription form.

## Content Requirements

Use English as the default language and include a Chinese language toggle. The toggle can switch all visible copy through a small local translation object; no backend is required.

Content should feel filled-in and credible. It should include:

- A clear hero statement: "Original games, global players."
- A company positioning badge: "Independent Game Company · United States."
- An honest startup note: Lumio is small, early-stage, and actively building.
- Service cards for Original IP, Publishing Strategy, Player Growth, Localization, Live Operations, and Partnerships.
- Sections for upcoming game concepts and publishing capabilities.
- Calls to action for exploring services, contacting the team, and subscribing for updates.
- Contact email: `support@lumio.games`.

## Technical Approach

Use Vite + React for speed, simple deployment, and easy bilingual state management.

Recommended files:

- `package.json`: scripts for `dev`, `build`, and `preview`.
- `index.html`: app mount and metadata.
- `src/main.jsx`: React entry point.
- `src/App.jsx`: page sections, language state, and content data.
- `src/styles.css`: responsive visual system and animations.
- `README.md`: local development and Zeabur deployment notes.

Keep the app fully static. Do not add a database, CMS, authentication, or server API. The subscribe form can use a `mailto:support@lumio.games` fallback or a non-persistent demo state until Lumio connects a real email service.

## Deployment

Target Zeabur with a standard Node build:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

The final site should also work locally with `npm run dev` and build successfully with `npm run build`.

## Testing And Verification

Verify before completion:

- `npm install` succeeds.
- `npm run build` succeeds.
- The generated site is responsive for desktop and mobile widths.
- Language toggle changes key visible content.
- Navigation anchors scroll to the correct sections.
- No fake claims about shipped products, revenue, users, or partners appear in the copy.

## Out Of Scope

Do not build these in the MVP:

- Backend subscription storage.
- CMS editing.
- User accounts.
- Real game detail pages.
- Analytics dashboards.
- Payment, investor portals, or job application flows.
