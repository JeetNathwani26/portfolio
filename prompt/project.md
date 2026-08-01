# Enhance the Project Cards in `Project.jsx`

## Objective

Redesign **only the project cards** in `Project.jsx` to make them feel premium, modern, and interactive. Do **not** change the overall section layout, spacing, typography, or heading. Focus only on improving the card design and adding elegant animations.

---

## Background Design

Replace the plain white card background with a modern premium design.

### Background Style

Use one of the following:

- Glassmorphism effect with backdrop blur
- Soft gradient background (purple → indigo → blue)
- Subtle mesh gradient
- Frosted glass appearance
- Very light animated gradient

Example colors:

- #6366F1
- #8B5CF6
- #3B82F6

Keep the background subtle and readable.

---

## Animated Card Background

Each card should have a unique animated background.

Examples:

- Animated gradient flowing slowly
- Floating glowing blobs
- Moving light sweep
- Soft shimmer effect
- Animated mesh gradient

Animation duration:

15–20 seconds

Infinite loop

Very smooth.

---

## Hover Animation

When the user hovers over a card:

- Lift the card by 10–12px
- Scale to 1.02
- Increase shadow
- Add a soft purple glow
- Animate the border
- Slightly zoom the project image
- Reveal additional information

Animation should feel premium and responsive.

---

## Border Effect

Instead of a static border:

Create an animated gradient border.

Ideas:

- Rotating gradient border
- Glow border
- Neon outline
- Animated light traveling around the border

Border animation should remain subtle.

---

## Mouse Interaction

Cards should slightly tilt based on cursor position.

Maximum rotation:

- rotateX(4deg)
- rotateY(4deg)

Smoothly return to the original position when the cursor leaves.

---

## Project Image Animation

The project image should:

- Zoom slightly on hover
- Move upward by a few pixels
- Apply a soft overlay
- Display action buttons with a fade-in animation

---

## Floating Decorations

Add subtle floating decorative elements inside each card.

Examples:

- Small glowing circles
- Floating dots
- Tiny geometric shapes
- Animated SVG icons

Opacity should remain below 10%.

---

## Technology Badges

Display technology badges as modern chips.

Examples:

- Laravel
- React
- PHP
- Docker
- MySQL

Hovering over a badge should:

- Scale slightly
- Glow
- Change background color

---

## Card Entrance Animation

When the Projects section enters the viewport:

Each card should:

- Fade in
- Slide upward
- Scale from 0.95 to 1
- Animate with staggered timing

Example delays:

Card 1 → 0.1s

Card 2 → 0.2s

Card 3 → 0.3s

---

## Buttons

Buttons should include:

- Live Demo
- GitHub
- View Details

Hover animation:

- Arrow slides
- Background glow
- Ripple effect
- Icon animation

---

## Lighting Effect

Add a subtle radial glow that follows the mouse while hovering over the card.

The glow should:

- Stay inside the card
- Be very soft
- Match the portfolio's purple theme

---

## Performance

Use:

- Framer Motion
- CSS transforms
- GPU-accelerated animations
- Intersection Observer

Avoid heavy canvas animations.

---

## Responsive Design

Animations should work smoothly on:

- Desktop
- Tablet
- Mobile

Reduce animation complexity on smaller screens.

---

## Important

- Do **not** redesign the Projects section layout.
- Do **not** change the section heading.
- Do **not** modify spacing or typography.
- Only redesign and animate the project cards.
- Maintain consistency with the existing purple/indigo portfolio theme.
- The final result should feel like a premium portfolio similar to Linear, Vercel, or Framer.