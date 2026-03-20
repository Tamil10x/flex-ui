# FlexUI Component Library — AI Agent Skills

## Overview
FlexUI is a cinematic, animated React component library built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Components are copy-paste — installed via the shadcn CLI from a registry.

## Installation
- Registry URL: https://flexui.dev/r/index.json
- Install: `npx shadcn@latest add <component-name>` with registry flag
- All components live in `components/flexui/`
- Utility `cn()` is required from `@/lib/utils`

## Component Categories

### Text Animations
Components: TextReveal, TypewriterText, GradientText, FlipWords, WavyText, TextScramble, BlurText, SplitText, RotatingText, NumberTicker
- All support `className` prop for styling
- Most use `useInView` for scroll-triggered animation
- Import from `@/components/flexui/<name>`

### Background Effects
Components: AuroraBackground, ParticleField, GridPattern, DotPattern, BeamsBackground, StarsBackground, MeshGradient, WavyBackground
- All accept `children` — wrap content to add the background
- All use pure CSS animations (no Framer Motion) for performance
- Use `className` to set container dimensions

### Buttons
Components: MagneticButton, ShimmerButton, GlowButton, RippleButton, GradientBorderButton, ConfettiButton
- All accept `children`, `className`, `onClick`, `disabled`
- All use Framer Motion for hover/tap interactions

### Cards
Components: ThreeHoverCard, SpotlightCard, ExpandableCard, ReflectiveCard, MorphingCard
- SpotlightCard is the simplest — use it when you need a basic interactive card
- ExpandableCard needs Expandable/ExpandableTrigger/ExpandableCard wrapper pattern
- ThreeHoverCard uses an image with 3D tilt effect

### Scroll Effects
Components: ParallaxScroll, StickyScrollReveal, ScrollProgress, FadeOnScroll, ScrollCounter
- FadeOnScroll is the most versatile — wraps any content
- ScrollProgress is fixed-position — place at page root

### Layout
Components: FloatingPanel, AnimatedTabs, Marquee, Drawer, Toast, DockMenu, FloatingNavbar
- Toast requires ToastProvider wrapper at app root
- Drawer/FloatingPanel use portals — they render at document.body

### Inputs
Components: AnimatedInput, OTPInput
- AnimatedInput has floating label pattern
- OTPInput auto-focuses between boxes

### Cursor Effects
Components: FollowCursor, BlobCursor, SpotlightCursor
- All are fixed-position, pointer-events-none
- Place once at the page/layout root level

## Common Patterns

### Wrapping content with a background:
```tsx
<AuroraBackground className="min-h-screen">
  <div className="relative z-10">Your content here</div>
</AuroraBackground>
```

### Using text animations inline:
```tsx
<h1>Welcome to <GradientText>FlexUI</GradientText></h1>
```

### Toast notifications:
```tsx
// In layout:
<ToastProvider><App /></ToastProvider>

// In any component:
const { toast } = useToast();
toast("Success!", "success");
```

### OTP verification input:
```tsx
<OTPInput
  length={6}
  onComplete={(code) => verifyCode(code)}
  accentColor="#3b82f6"
/>
```

## Dependencies
- All components require: react, tailwindcss
- Animation components require: framer-motion
- WebGL components require: three, @react-three/fiber, @react-three/drei
- Utility: cn() from clsx + tailwind-merge

## Styling Conventions
- Dark theme: bg-zinc-950, text-white, border-white/[0.08]
- Glass-morphic: backdrop-blur-xl bg-zinc-950/80
- Borders: border border-white/[0.06] to border-white/[0.15] on hover
- Gradients: from-blue-400 to-cyan-400 (primary), from-violet-400 to-pink-400 (accent)
