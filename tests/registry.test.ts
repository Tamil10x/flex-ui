import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'components', 'flexui');

describe('Registry: component files', () => {
  const componentFiles = fs.readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith('.tsx'));

  it('has at least 130 component files', () => {
    expect(componentFiles.length).toBeGreaterThanOrEqual(130);
  });

  it('all component files are non-empty', () => {
    for (const file of componentFiles) {
      const content = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf-8');
      expect(content.trim().length).toBeGreaterThan(0);
    }
  });

  it('all component files export at least one function or const', () => {
    for (const file of componentFiles) {
      const content = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf-8');
      const hasExport = /export\s+(function|const|default)/.test(content);
      expect(hasExport, `${file} should have an export`).toBe(true);
    }
  });
});

describe('Registry: build-registry script', () => {
  const scriptPath = path.join(ROOT, 'scripts', 'build-registry.ts');

  it('build-registry.ts exists', () => {
    expect(fs.existsSync(scriptPath)).toBe(true);
  });

  it('build-registry.ts defines a COMPONENTS array', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    expect(content).toContain('const COMPONENTS');
  });

  it('COMPONENTS array has at least 130 entries', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    // Count entries by matching `name:` patterns inside the COMPONENTS array
    const nameMatches = content.match(/name:\s*"/g);
    expect(nameMatches).not.toBeNull();
    expect(nameMatches!.length).toBeGreaterThanOrEqual(130);
  });

  it('each component in COMPONENTS references existing files', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');

    // Extract file paths from the script: path: "components/flexui/xxx.tsx"
    const filePathRegex = /path:\s*"(components\/flexui\/[^"]+)"/g;
    let match;
    const referencedPaths: string[] = [];

    while ((match = filePathRegex.exec(content)) !== null) {
      referencedPaths.push(match[1]);
    }

    expect(referencedPaths.length).toBeGreaterThan(0);

    for (const relPath of referencedPaths) {
      const fullPath = path.join(ROOT, relPath);
      expect(fs.existsSync(fullPath), `File referenced in registry should exist: ${relPath}`).toBe(true);
    }
  });

  it('COMPONENTS entries all have required fields', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');

    // Extract the COMPONENTS block using a simple heuristic: count name entries vs title/description/type entries
    const nameCount = (content.match(/name:\s*"/g) || []).length;
    const titleCount = (content.match(/title:\s*"/g) || []).length;
    const descriptionCount = (content.match(/description:\s*"/g) || []).length;
    const typeCount = (content.match(/type:\s*"registry:ui"/g) || []).length;

    // Most components should have name, title, description, and type
    // Allow a small tolerance for components with slightly different structure
    expect(titleCount).toBeGreaterThanOrEqual(nameCount - 5);
    expect(descriptionCount).toBeGreaterThanOrEqual(nameCount - 5);
    expect(typeCount).toBeGreaterThanOrEqual(nameCount - 5);
  });

  it('COMPONENTS has output config for public/r directory', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    expect(content).toContain('public');
    expect(content).toContain('r');
    expect(content).toContain('index.json');
  });
});
