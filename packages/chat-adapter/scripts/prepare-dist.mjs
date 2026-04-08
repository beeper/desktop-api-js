import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.join(__dirname, '..');
const distDir = path.join(packageDir, 'dist');
const packageJsonPath = path.join(packageDir, 'package.json');

if (!existsSync(distDir)) {
  throw new Error(`Expected dist directory at ${distDir}`);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const mapPath = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(/^\.\/dist\//, './');
};

const mapExports = (value) => {
  if (typeof value === 'string') return mapPath(value);
  if (Array.isArray(value)) return value.map(mapExports);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, mapExports(inner)]));
  }
  return value;
};

const publishPackage = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  type: packageJson.type,
  main: mapPath(packageJson.main),
  module: mapPath(packageJson.module),
  types: mapPath(packageJson.types),
  exports: mapExports(packageJson.exports),
  author: packageJson.author,
  repository: packageJson.repository,
  homepage: packageJson.homepage,
  bugs: packageJson.bugs,
  publishConfig: packageJson.publishConfig,
  keywords: packageJson.keywords,
  license: packageJson.license,
  dependencies: packageJson.dependencies,
};

writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(publishPackage, null, 2) + '\n');

mkdirSync(path.join(distDir, 'examples', 'logger'), { recursive: true });
cpSync(path.join(packageDir, 'README.md'), path.join(distDir, 'README.md'));
cpSync(path.join(packageDir, 'examples', 'logger', 'index.mjs'), path.join(distDir, 'examples', 'logger', 'index.mjs'));
cpSync(path.join(packageDir, '..', '..', 'LICENSE'), path.join(distDir, 'LICENSE'));
