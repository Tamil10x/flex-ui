import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// ── Buttons ──────────────────────────────────────────────────────────────────
import { ShimmerButton } from '@/components/flexui/shimmer-button';
import { GlowButton } from '@/components/flexui/glow-button';
import { PulseButton } from '@/components/flexui/pulse-button';
import { GradientBorderButton } from '@/components/flexui/gradient-border-button';
import { RippleButton } from '@/components/flexui/ripple-button';
import { ConfettiButton } from '@/components/flexui/confetti-button';

// ── Cards ────────────────────────────────────────────────────────────────────
import { SpotlightCard } from '@/components/flexui/spotlight-card';
import { NeonGlowCard } from '@/components/flexui/neon-glow-card';
import { HoverCard } from '@/components/flexui/hover-card';
import { WobbleCard } from '@/components/flexui/wobble-card';
import { RevealCard } from '@/components/flexui/reveal-card';
import { MagneticCard } from '@/components/flexui/magnetic-card';

// ── Text ─────────────────────────────────────────────────────────────────────
import { GradientText } from '@/components/flexui/gradient-text';
import { TypewriterText } from '@/components/flexui/typewriter-text';
import { GlowText } from '@/components/flexui/glow-text';
import { RotatingText } from '@/components/flexui/rotating-text';
import { ChromaticText } from '@/components/flexui/chromatic-text';
import { BlurText } from '@/components/flexui/blur-text';
import { SplitText } from '@/components/flexui/split-text';

// ── Data Viz ─────────────────────────────────────────────────────────────────
import { NumberTicker } from '@/components/flexui/number-ticker';
import { ProgressBar } from '@/components/flexui/progress-bar';
import { ProgressRing } from '@/components/flexui/progress-ring';
import { SparklineChart } from '@/components/flexui/sparkline-chart';
import { Rating } from '@/components/flexui/rating';
import { StatCard } from '@/components/flexui/stat-card';

// ── Layout / UI ──────────────────────────────────────────────────────────────
import { Badge } from '@/components/flexui/badge';
import { Avatar } from '@/components/flexui/avatar';
import { Skeleton } from '@/components/flexui/skeleton';
import { Switch } from '@/components/flexui/switch';
import { Kbd } from '@/components/flexui/kbd';
import { Divider } from '@/components/flexui/divider';
import { Breadcrumb } from '@/components/flexui/breadcrumb';
import { EmptyState } from '@/components/flexui/empty-state';
import { Timeline } from '@/components/flexui/timeline';
import { Accordion } from '@/components/flexui/accordion';
import { Tooltip } from '@/components/flexui/tooltip';
import { Stepper } from '@/components/flexui/stepper';
import { CodeInline } from '@/components/flexui/code-inline';
import { Marquee } from '@/components/flexui/marquee';
import { DotPattern } from '@/components/flexui/dot-pattern';
import { GridPattern } from '@/components/flexui/grid-pattern';
import { PhoneFrame } from '@/components/flexui/phone-frame';
import { BrowserFrame } from '@/components/flexui/browser-frame';

// ═══════════════════════════════════════════════════════════════════════════════
// BUTTON COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('Button Components', () => {
  it('ShimmerButton renders with children', () => {
    const { container } = render(<ShimmerButton>Click Me</ShimmerButton>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Click Me');
  });

  it('GlowButton renders with children', () => {
    const { container } = render(<GlowButton>Glow</GlowButton>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Glow');
  });

  it('PulseButton renders with children', () => {
    const { container } = render(<PulseButton>Pulse</PulseButton>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Pulse');
  });

  it('GradientBorderButton renders with children', () => {
    const { container } = render(<GradientBorderButton>Gradient</GradientBorderButton>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Gradient');
  });

  it('RippleButton renders with children', () => {
    const { container } = render(<RippleButton>Ripple</RippleButton>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Ripple');
  });

  it('ConfettiButton renders with children', () => {
    const { container } = render(<ConfettiButton>Party</ConfettiButton>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Party');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CARD COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('Card Components', () => {
  it('SpotlightCard renders with children', () => {
    const { container } = render(<SpotlightCard>Card Content</SpotlightCard>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Card Content');
  });

  it('NeonGlowCard renders with children', () => {
    const { container } = render(<NeonGlowCard>Neon</NeonGlowCard>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Neon');
  });

  it('HoverCard renders with children', () => {
    const { container } = render(<HoverCard>Hoverable</HoverCard>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Hoverable');
  });

  it('WobbleCard renders with children', () => {
    const { container } = render(<WobbleCard>Wobbly</WobbleCard>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Wobbly');
  });

  it('RevealCard renders with title and children', () => {
    const { container } = render(<RevealCard title="Title">Inner</RevealCard>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Inner');
  });

  it('MagneticCard renders with children', () => {
    const { container } = render(<MagneticCard>Magnetic</MagneticCard>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Magnetic');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEXT / ANIMATION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('Text Components', () => {
  it('GradientText renders with children', () => {
    const { container } = render(<GradientText>Hello</GradientText>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Hello');
  });

  it('TypewriterText renders with words array', () => {
    const { container } = render(<TypewriterText words={['Hello', 'World']} />);
    expect(container).toBeTruthy();
  });

  it('GlowText renders with children', () => {
    const { container } = render(<GlowText>Glowing</GlowText>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Glowing');
  });

  it('RotatingText renders with words array', () => {
    const { container } = render(<RotatingText words={['One', 'Two', 'Three']} />);
    expect(container).toBeTruthy();
  });

  it('ChromaticText renders with text prop', () => {
    const { container } = render(<ChromaticText text="Chromatic" />);
    expect(container).toBeTruthy();
  });

  it('BlurText renders with text prop', () => {
    const { container } = render(<BlurText text="Blurry" />);
    expect(container).toBeTruthy();
  });

  it('SplitText renders with text prop', () => {
    const { container } = render(<SplitText text="Split Me" />);
    expect(container).toBeTruthy();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// DATA VIZ COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('Data Visualization Components', () => {
  it('NumberTicker renders with value', () => {
    const { container } = render(<NumberTicker value={42} />);
    expect(container).toBeTruthy();
  });

  it('ProgressBar renders with value', () => {
    const { container } = render(<ProgressBar value={75} />);
    expect(container).toBeTruthy();
  });

  it('ProgressRing renders with value', () => {
    const { container } = render(<ProgressRing value={60} />);
    expect(container).toBeTruthy();
    // Should render an SVG
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('SparklineChart renders with data', () => {
    const { container } = render(<SparklineChart data={[10, 20, 15, 30, 25]} />);
    expect(container).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('Rating renders with value', () => {
    const { container } = render(<Rating value={3} />);
    expect(container).toBeTruthy();
    // Should render 5 star SVGs by default
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(5);
  });

  it('Rating renders with custom max', () => {
    const { container } = render(<Rating value={2} max={10} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(10);
  });

  it('StatCard renders with label and value', () => {
    const { container } = render(<StatCard label="Revenue" value="$1.2M" />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Revenue');
    expect(container.textContent).toContain('$1.2M');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT / UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('Layout & UI Components', () => {
  it('Badge renders with children', () => {
    const { container } = render(<Badge>New</Badge>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('New');
  });

  it('Badge renders with variant', () => {
    const { container } = render(<Badge variant="success">Active</Badge>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Active');
  });

  it('Avatar renders with name', () => {
    const { container } = render(<Avatar name="John Doe" />);
    expect(container).toBeTruthy();
  });

  it('Skeleton renders without props', () => {
    const { container } = render(<Skeleton />);
    expect(container).toBeTruthy();
  });

  it('Switch renders with checked state', () => {
    const { container } = render(<Switch checked={false} onChange={() => {}} />);
    expect(container).toBeTruthy();
  });

  it('Kbd renders with children', () => {
    const { container } = render(<Kbd>Ctrl+C</Kbd>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Ctrl+C');
  });

  it('Divider renders without props', () => {
    const { container } = render(<Divider />);
    expect(container).toBeTruthy();
  });

  it('Divider renders with label', () => {
    const { container } = render(<Divider label="OR" />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('OR');
  });

  it('Breadcrumb renders with items', () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Page' }]} />
    );
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Home');
    expect(container.textContent).toContain('Page');
  });

  it('EmptyState renders with title and description', () => {
    const { container } = render(
      <EmptyState title="No results" description="Try a different search." />
    );
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('No results');
  });

  it('Timeline renders with items', () => {
    const { container } = render(
      <Timeline items={[{ title: 'Step 1', description: 'First step' }]} />
    );
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Step 1');
  });

  it('Accordion renders with items', () => {
    const { container } = render(
      <Accordion items={[{ title: 'Section 1', content: 'Content 1' }]} />
    );
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Section 1');
  });

  it('Tooltip renders with trigger and content', () => {
    const { container } = render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Hover me');
  });

  it('Stepper renders with steps and currentStep', () => {
    const steps = [
      { label: 'Step 1', description: 'First' },
      { label: 'Step 2', description: 'Second' },
      { label: 'Step 3', description: 'Third' },
    ];
    const { container } = render(<Stepper steps={steps} currentStep={1} />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Step 1');
    expect(container.textContent).toContain('Step 2');
  });

  it('CodeInline renders with children', () => {
    const { container } = render(<CodeInline>const x = 1</CodeInline>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('const x = 1');
    expect(container.querySelector('code')).toBeTruthy();
  });

  it('Marquee renders with children', () => {
    const { container } = render(<Marquee><span>Item 1</span><span>Item 2</span></Marquee>);
    expect(container).toBeTruthy();
  });

  it('DotPattern renders without props', () => {
    const { container } = render(<DotPattern />);
    expect(container).toBeTruthy();
  });

  it('GridPattern renders without props', () => {
    const { container } = render(<GridPattern />);
    expect(container).toBeTruthy();
  });

  it('PhoneFrame renders with children', () => {
    const { container } = render(<PhoneFrame><div>App Content</div></PhoneFrame>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('App Content');
  });

  it('BrowserFrame renders with children', () => {
    const { container } = render(<BrowserFrame><div>Page Content</div></BrowserFrame>);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Page Content');
  });
});
