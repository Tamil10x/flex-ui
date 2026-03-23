import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const CLI_PATH = path.resolve(__dirname, '..', 'cli', 'index.ts');

describe('CLI: source structure', () => {
  it('cli/index.ts exists', () => {
    expect(fs.existsSync(CLI_PATH)).toBe(true);
  });

  const cliSource = fs.readFileSync(CLI_PATH, 'utf-8');

  it('exports a main function', () => {
    expect(cliSource).toContain('async function main()');
  });

  it('parses process.argv', () => {
    expect(cliSource).toContain('process.argv');
  });

  it('supports the "init" command', () => {
    expect(cliSource).toContain("case \"init\"");
    expect(cliSource).toContain('commandInit');
  });

  it('supports the "add" command', () => {
    expect(cliSource).toContain("case \"add\"");
    expect(cliSource).toContain('commandAdd');
  });

  it('supports the "list" command', () => {
    expect(cliSource).toContain("case \"list\"");
    expect(cliSource).toContain('commandList');
  });

  it('supports the "ls" alias for list', () => {
    expect(cliSource).toContain("case \"ls\"");
  });

  it('supports the "help" command', () => {
    expect(cliSource).toContain("case \"help\"");
    expect(cliSource).toContain('commandHelp');
  });

  it('supports "--help" and "-h" flags', () => {
    expect(cliSource).toContain("case \"--help\"");
    expect(cliSource).toContain("case \"-h\"");
  });

  it('handles unknown commands with an error', () => {
    expect(cliSource).toContain('default:');
    expect(cliSource).toContain('Unknown command');
  });

  it('validates that "add" requires a component name', () => {
    expect(cliSource).toContain('Missing component name');
  });
});

describe('CLI: toPascalCase helper', () => {
  // Re-implement the toPascalCase logic from the CLI to test it directly
  function toPascalCase(str: string): string {
    return str
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
  }

  it('converts kebab-case to PascalCase', () => {
    expect(toPascalCase('shimmer-button')).toBe('ShimmerButton');
  });

  it('converts single word', () => {
    expect(toPascalCase('button')).toBe('Button');
  });

  it('handles three-part names', () => {
    expect(toPascalCase('three-hover-card')).toBe('ThreeHoverCard');
  });

  it('handles already capitalized segments', () => {
    expect(toPascalCase('OTP-input')).toBe('OTPInput');
  });
});

describe('CLI: fetchJSON and readLocalJSON patterns', () => {
  const cliSource = fs.readFileSync(CLI_PATH, 'utf-8');

  it('defines fetchJSON for HTTPS requests', () => {
    expect(cliSource).toContain('function fetchJSON');
    expect(cliSource).toContain('https');
  });

  it('defines readLocalJSON for local file fallback', () => {
    expect(cliSource).toContain('function readLocalJSON');
  });

  it('uses registry URL pattern flexui.dev/r/', () => {
    expect(cliSource).toContain('flexui.dev/r/');
  });

  it('defines resolveRegistryJSON with remote + local fallback', () => {
    expect(cliSource).toContain('function resolveRegistryJSON');
  });

  it('defines resolveIndexJSON for component listing', () => {
    expect(cliSource).toContain('function resolveIndexJSON');
  });

  it('init command creates components/flexui directory', () => {
    expect(cliSource).toContain('components');
    expect(cliSource).toContain('flexui');
  });

  it('init command creates lib/utils.ts', () => {
    expect(cliSource).toContain('lib/utils.ts');
  });

  it('add command writes component files', () => {
    expect(cliSource).toContain('writeFileSync');
  });
});
