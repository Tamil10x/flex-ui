import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn() utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles empty strings', () => {
    expect(cn('', 'bar')).toBe('bar');
  });

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
  });

  it('resolves conflicting Tailwind classes (last wins)', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('resolves conflicting Tailwind color classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles array inputs via clsx', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('handles object inputs via clsx', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('merges conflicting Tailwind margin classes', () => {
    expect(cn('mt-2', 'mt-4')).toBe('mt-4');
  });

  it('preserves non-conflicting Tailwind classes', () => {
    expect(cn('mt-2', 'mb-4')).toBe('mt-2 mb-4');
  });

  it('handles deeply nested arrays', () => {
    expect(cn(['a', ['b', ['c']]])).toBe('a b c');
  });

  it('handles mixed object and string inputs', () => {
    expect(cn('base', { active: true, disabled: false }, 'extra')).toBe('base active extra');
  });

  it('handles boolean false values gracefully', () => {
    expect(cn(false, 'valid', false)).toBe('valid');
  });

  it('handles number zero as falsy', () => {
    expect(cn(0 as any, 'valid')).toBe('valid');
  });

  it('merges conflicting Tailwind flex and grid classes', () => {
    expect(cn('flex', 'grid')).toBe('grid');
  });

  it('merges conflicting Tailwind font-size classes', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('handles responsive prefixes independently', () => {
    const result = cn('p-2', 'md:p-4', 'lg:p-6');
    expect(result).toContain('p-2');
    expect(result).toContain('md:p-4');
    expect(result).toContain('lg:p-6');
  });
});
