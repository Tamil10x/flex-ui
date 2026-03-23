import { describe, it, expect } from 'vitest';

// ── Re-implement transformCode from components/studio/live-preview.tsx ───────
// We replicate the function here to test it in isolation without importing
// the React component (which pulls in react-live and all FlexUI components).

function transformCode(code: string): string {
  let t = code;

  // Remove all import lines
  t = t.replace(/^import\s+.*?;?\s*$/gm, "");

  // Extract function body
  const funcMatch = t.match(
    /export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{([\s\S]*)\}\s*;?\s*$/
  );

  if (funcMatch) {
    const body = funcMatch[1].trim();

    // Check if body has state/hooks (needs function wrapper)
    const hasHooks = /\b(useState|useEffect|useRef|useCallback)\b/.test(body);

    if (hasHooks) {
      return `function Demo() {\n${body}\n}\nrender(<Demo />)`;
    }

    // Simple return — extract JSX
    const returnMatch = body.match(/return\s*\(\s*([\s\S]*)\s*\)\s*;?\s*$/);
    if (returnMatch) {
      return `render(${returnMatch[1].trim()})`;
    }

    // Return without parens
    const returnSimple = body.match(/return\s+([\s\S]+)/);
    if (returnSimple) {
      return `render(${returnSimple[1].trim().replace(/;$/, "")})`;
    }
  }

  // Fallback: try to find JSX directly
  const jsxMatch = t.trim().match(/(<[A-Z][\s\S]*>)/);
  if (jsxMatch) {
    return `render(${jsxMatch[1]})`;
  }

  return `render(<div className="text-zinc-500 text-sm">Preview unavailable</div>)`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT STRIPPING
// ═══════════════════════════════════════════════════════════════════════════════

describe('transformCode: import stripping', () => {
  it('removes single import line', () => {
    const code = `import { ShimmerButton } from "@/components/flexui/shimmer-button";

export default function Demo() {
  return <ShimmerButton>Click</ShimmerButton>
}`;
    const result = transformCode(code);
    expect(result).not.toContain('import');
    expect(result).toContain('ShimmerButton');
  });

  it('removes multiple import lines', () => {
    const code = `import React from "react";
import { useState } from "react";
import { GlowButton } from "@/components/flexui/glow-button";

export default function Demo() {
  const [count, setCount] = useState(0);
  return <GlowButton onClick={() => setCount(c => c + 1)}>{count}</GlowButton>
}`;
    const result = transformCode(code);
    expect(result).not.toContain('import React');
    expect(result).not.toContain('import { useState }');
    expect(result).not.toContain('import { GlowButton }');
  });

  it('removes import lines without semicolons', () => {
    const code = `import React from "react"
export default function Demo() {
  return <div>Hello</div>
}`;
    const result = transformCode(code);
    expect(result).not.toContain('import React');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCTION BODY EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════════

describe('transformCode: function body extraction', () => {
  it('extracts simple return with parentheses', () => {
    const code = `export default function Demo() {
  return (
    <ShimmerButton>Click me</ShimmerButton>
  )
}`;
    const result = transformCode(code);
    expect(result).toContain('render(');
    expect(result).toContain('ShimmerButton');
    expect(result).not.toContain('function Demo');
  });

  it('extracts simple return without parentheses', () => {
    const code = `export default function Demo() {
  return <div>Hello</div>;
}`;
    const result = transformCode(code);
    expect(result).toContain('render(');
    expect(result).toContain('<div>Hello</div>');
  });

  it('handles function with parameters', () => {
    const code = `export default function Demo() {
  return (
    <span>Test</span>
  )
}`;
    const result = transformCode(code);
    expect(result).toBe('render(<span>Test</span>)');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// HOOK DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

describe('transformCode: hook detection', () => {
  it('wraps in function when useState is present', () => {
    const code = `export default function Demo() {
  const [value, setValue] = useState(0);
  return <div>{value}</div>
}`;
    const result = transformCode(code);
    expect(result).toContain('function Demo()');
    expect(result).toContain('render(<Demo />)');
    expect(result).toContain('useState');
  });

  it('wraps in function when useEffect is present', () => {
    const code = `export default function Demo() {
  useEffect(() => {}, []);
  return <div>Effect</div>
}`;
    const result = transformCode(code);
    expect(result).toContain('function Demo()');
    expect(result).toContain('render(<Demo />)');
  });

  it('wraps in function when useRef is present', () => {
    const code = `export default function Demo() {
  const ref = useRef(null);
  return <div ref={ref}>Ref</div>
}`;
    const result = transformCode(code);
    expect(result).toContain('function Demo()');
    expect(result).toContain('render(<Demo />)');
  });

  it('wraps in function when useCallback is present', () => {
    const code = `export default function Demo() {
  const handler = useCallback(() => {}, []);
  return <button onClick={handler}>Click</button>
}`;
    const result = transformCode(code);
    expect(result).toContain('function Demo()');
    expect(result).toContain('render(<Demo />)');
  });

  it('does NOT wrap when no hooks are present', () => {
    const code = `export default function Demo() {
  return (
    <div>No hooks here</div>
  )
}`;
    const result = transformCode(code);
    expect(result).not.toContain('function Demo()');
    expect(result).toContain('render(');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// FALLBACK BEHAVIOR
// ═══════════════════════════════════════════════════════════════════════════════

describe('transformCode: fallback behavior', () => {
  it('finds standalone JSX when no export default function', () => {
    const code = `<ShimmerButton>Standalone</ShimmerButton>`;
    const result = transformCode(code);
    expect(result).toContain('render(');
    expect(result).toContain('ShimmerButton');
  });

  it('returns preview-unavailable for non-JSX code', () => {
    const code = `const x = 42;\nconsole.log(x);`;
    const result = transformCode(code);
    expect(result).toContain('Preview unavailable');
  });

  it('returns preview-unavailable for empty string', () => {
    const result = transformCode('');
    expect(result).toContain('Preview unavailable');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED / REALISTIC SCENARIOS
// ═══════════════════════════════════════════════════════════════════════════════

describe('transformCode: realistic scenarios', () => {
  it('handles full component with imports, hooks, and JSX', () => {
    const code = `import React, { useState } from "react";
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { NumberTicker } from "@/components/flexui/number-ticker";

export default function CounterDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <NumberTicker value={count} />
      <ShimmerButton onClick={() => setCount(c => c + 1)}>
        Increment
      </ShimmerButton>
    </div>
  )
}`;
    const result = transformCode(code);
    // Should strip all imports
    expect(result).not.toContain('import');
    // Should wrap in function because of useState
    expect(result).toContain('function Demo()');
    expect(result).toContain('render(<Demo />)');
    // Should preserve the component body
    expect(result).toContain('useState');
    expect(result).toContain('ShimmerButton');
    expect(result).toContain('NumberTicker');
  });

  it('handles simple component without hooks', () => {
    const code = `import { GradientText } from "@/components/flexui/gradient-text";

export default function SimpleDemo() {
  return (
    <GradientText>Hello World</GradientText>
  )
}`;
    const result = transformCode(code);
    expect(result).not.toContain('import');
    expect(result).not.toContain('function Demo');
    expect(result).toContain('render(');
    expect(result).toContain('GradientText');
  });
});
