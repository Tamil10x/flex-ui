import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ShimmerButton } from '@/components/flexui/shimmer-button';
import { GlowButton } from '@/components/flexui/glow-button';
import { GradientText } from '@/components/flexui/gradient-text';
import { TypewriterText } from '@/components/flexui/typewriter-text';
import { SpotlightCard } from '@/components/flexui/spotlight-card';
import { NeonGlowCard } from '@/components/flexui/neon-glow-card';
import { NumberTicker } from '@/components/flexui/number-ticker';
import { Badge } from '@/components/flexui/badge';
import { Avatar } from '@/components/flexui/avatar';
import { Skeleton } from '@/components/flexui/skeleton';
import { Switch } from '@/components/flexui/switch';
import { ProgressBar } from '@/components/flexui/progress-bar';
import { Kbd } from '@/components/flexui/kbd';
import { Divider } from '@/components/flexui/divider';
import { Breadcrumb } from '@/components/flexui/breadcrumb';
import { EmptyState } from '@/components/flexui/empty-state';
import { Timeline } from '@/components/flexui/timeline';
import { Accordion } from '@/components/flexui/accordion';
import { Tooltip } from '@/components/flexui/tooltip';
import { RotatingText } from '@/components/flexui/rotating-text';

describe('Component Smoke Tests', () => {
  it('ShimmerButton renders', () => {
    const { container } = render(<ShimmerButton>Test</ShimmerButton>);
    expect(container).toBeTruthy();
  });

  it('GlowButton renders', () => {
    const { container } = render(<GlowButton>Test</GlowButton>);
    expect(container).toBeTruthy();
  });

  it('GradientText renders', () => {
    const { container } = render(<GradientText>Hello</GradientText>);
    expect(container).toBeTruthy();
  });

  it('TypewriterText renders', () => {
    const { container } = render(<TypewriterText words={['Hello', 'World']} />);
    expect(container).toBeTruthy();
  });

  it('SpotlightCard renders', () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);
    expect(container).toBeTruthy();
  });

  it('NeonGlowCard renders', () => {
    const { container } = render(<NeonGlowCard>Content</NeonGlowCard>);
    expect(container).toBeTruthy();
  });

  it('NumberTicker renders', () => {
    const { container } = render(<NumberTicker value={42} />);
    expect(container).toBeTruthy();
  });

  it('Badge renders', () => {
    const { container } = render(<Badge>Label</Badge>);
    expect(container).toBeTruthy();
  });

  it('Avatar renders', () => {
    const { container } = render(<Avatar name="John Doe" />);
    expect(container).toBeTruthy();
  });

  it('Skeleton renders', () => {
    const { container } = render(<Skeleton />);
    expect(container).toBeTruthy();
  });

  it('Switch renders', () => {
    const { container } = render(<Switch checked={false} onChange={() => {}} />);
    expect(container).toBeTruthy();
  });

  it('ProgressBar renders', () => {
    const { container } = render(<ProgressBar value={50} />);
    expect(container).toBeTruthy();
  });

  it('Kbd renders', () => {
    const { container } = render(<Kbd>Ctrl+C</Kbd>);
    expect(container).toBeTruthy();
  });

  it('Divider renders', () => {
    const { container } = render(<Divider />);
    expect(container).toBeTruthy();
  });

  it('Breadcrumb renders', () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Page' }]} />
    );
    expect(container).toBeTruthy();
  });

  it('EmptyState renders', () => {
    const { container } = render(
      <EmptyState title="No results" description="Try a different search." />
    );
    expect(container).toBeTruthy();
  });

  it('Timeline renders', () => {
    const { container } = render(
      <Timeline items={[{ title: 'Step 1', description: 'First step' }]} />
    );
    expect(container).toBeTruthy();
  });

  it('Accordion renders', () => {
    const { container } = render(
      <Accordion items={[{ title: 'Section 1', content: 'Content 1' }]} />
    );
    expect(container).toBeTruthy();
  });

  it('Tooltip renders', () => {
    const { container } = render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(container).toBeTruthy();
  });

  it('RotatingText renders', () => {
    const { container } = render(<RotatingText words={['Hello', 'World']} />);
    expect(container).toBeTruthy();
  });
});
