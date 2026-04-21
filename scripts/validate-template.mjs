import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');
const manifestPath = resolve(repoRoot, '.cursor-plugin/plugin.json');
const mcpPath = resolve(repoRoot, 'mcp.json');
const skillPath = resolve(repoRoot, 'skills/use-hexia-workspace/SKILL.md');

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

const manifest = readJson(manifestPath);
const mcp = readJson(mcpPath);

expect(existsSync(manifestPath), 'Missing .cursor-plugin/plugin.json');
expect(existsSync(mcpPath), 'Missing mcp.json');
expect(existsSync(skillPath), 'Missing skills/use-hexia-workspace/SKILL.md');

expect(manifest.name === 'hexia-workspace', 'plugin.json must keep name "hexia-workspace"');
expect(typeof manifest.displayName === 'string' && manifest.displayName.length > 0, 'plugin.json is missing displayName');
expect(typeof manifest.version === 'string' && manifest.version.length > 0, 'plugin.json is missing version');
expect(typeof manifest.description === 'string' && manifest.description.length > 0, 'plugin.json is missing description');
expect(manifest.license === 'MIT', 'plugin.json must declare license "MIT"');
expect(manifest.logo === 'assets/logo.svg', 'plugin.json must reference logo "assets/logo.svg"');
expect(manifest.skills === './skills/', 'plugin.json must reference "./skills/"');
expect(manifest.mcpServers === './mcp.json', 'plugin.json must reference "./mcp.json"');
expect(existsSync(resolve(repoRoot, manifest.logo)), `Missing logo file at ${manifest.logo}`);

const server = mcp?.mcpServers?.['hexia-workspace'];
expect(Boolean(server), 'mcp.json must define mcpServers.hexia-workspace');
expect(server?.type === 'http', 'mcp.json must use HTTP transport');
expect(server?.url === 'https://api.hexia.dev/mcp/message', 'mcp.json must point to the public Hexia MCP endpoint');

if (failures.length > 0) {
  console.error('Template validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Template validation passed.');
