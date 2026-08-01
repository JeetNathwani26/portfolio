# Shared Profile Image Transition (Hero → About)

## Objective

Create a premium shared element transition where the profile image smoothly moves from the Hero section into the About section as the user scrolls. The animation should feel polished and intentional, similar to premium websites like Apple, Linear, Vercel, or Stripe.

---

## Core Concept

Instead of rendering two separate images, use **one shared profile image** that morphs between the Hero and About sections using **Framer Motion's `layoutId`**.

The animation should create the illusion that it is the same image traveling through the page.

---

## Tech Stack

- React
- Framer Motion
- Intersection Observer
- Tailwind CSS
- (Optional) Lenis for smooth scrolling

Do **NOT** use GSAP.

---

## Animation Flow

### Hero State

- Display the profile image at its normal size.
- The image remains fixed in the Hero layout.
- Add a soft floating animation.
- Add a subtle glow behind the image.

---

### Scroll Begins

As the user starts scrolling:

- The Hero text scrolls normally.
- The image remains visible.
- Begin transforming the image.

Animation:

- Scale from **1 → 0.8**
- Move upward
- Move toward the right side
- Add a stronger purple glow
- Rotate only **2°** maximum (optional)

The movement should feel smooth and natural.

---

### About Section Appears

When the About section reaches approximately **35–40% of the viewport**:

Animate the shared image into the About image container.

The image should:

- Snap perfectly into the circular frame
- Resize automatically
- Match the border radius
- Keep the animation continuous
- Never disappear during the transition

---

### Final State

Once the image reaches the About section:

Animate the following in sequence:

1. Circle glow appears
2. PHP badge
3. Laravel badge
4. React badge
5. Docker badge
6. API badge

Each badge should have:

- Fade In
- Slide Up
- Small scale animation

Delay each badge by around **0.1 seconds**.

---

## Timing

Hero Image

Duration:

0.7 seconds

Ease:

easeInOut

---

Badges

Fade:

0.4s

Delay:

0.1s each

---

Circle Glow

Scale

0.9 → 1

Opacity

0 → 1

Duration

0.5s

---

## Motion Guidelines

The animation should feel:

- Premium
- Smooth
- Natural
- Elegant

Avoid:

❌ Fast movement

❌ Sudden jumps

❌ Large rotations

❌ Overshooting

❌ Bouncing

---

## Framer Motion Requirements

Use the exact same:

```jsx
layoutId="profile-image"
```

for both Hero and About images.

Example

```jsx
<motion.img
    layoutId="profile-image"
    src="/images/profile.png"
    alt="Jeet Nathwani"
/>
```

Framer Motion should automatically animate the transition.

---

## Scroll Detection

Use:

IntersectionObserver

or

Framer Motion

```jsx
useInView()
```

Trigger the About animation when the About section becomes visible.

---

## Hero Animation

While the Hero section is visible:

- Gentle floating animation
- Very subtle vertical movement
- Soft breathing glow

Example

```text
Up 6px

↓

Down 6px
```

Repeat infinitely.

---

## About Animation

When the image lands:

- Purple glow expands
- Circular border becomes visible
- Tech badges animate one by one
- Counter cards fade upward

---

## Performance

The animation must:

- Use GPU transforms
- Animate only transform and opacity
- Maintain 60 FPS
- Be responsive
- Respect `prefers-reduced-motion`

---

## Responsive Behaviour

Desktop

Full transition.

Tablet

Slightly smaller movement.

Mobile

Skip the traveling animation.

Simply fade between Hero and About images.

---

## Visual Style

Glow

- Purple (#6366F1)
- Blue (#8B5CF6)

Shadow

Soft

Blur

Large

Border

2–3px gradient

Background

Transparent

---

## Expected User Experience

Hero

```
👨‍💻
Jeet Nathwani
Backend Developer
```

↓

User scrolls

↓

Image begins moving upward

↓

Image scales slightly

↓

Image moves toward About section

↓

Image snaps into circular frame

↓

Glow expands

↓

Laravel badge appears

↓

React badge appears

↓

PHP badge appears

↓

Docker badge appears

↓

API badge appears

↓

About section is fully visible.

---

## Final Goal

The entire transition should feel like a single continuous motion where the user's profile image naturally travels from the Hero section into the About section. The animation should be subtle, elegant, and polished, enhancing the storytelling of the portfolio without distracting from the content.