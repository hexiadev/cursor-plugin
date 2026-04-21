# Hexia Cursor Plugin

Hexia Workspace for Cursor is a lightweight plugin bundle that connects Cursor to the public Hexia MCP server and gives the assistant one focused operational skill for working through shared state.

## What is included

- `.cursor-plugin/plugin.json` for Cursor plugin metadata
- `mcp.json` pointing at the public Hexia MCP endpoint
- `skills/use-hexia-workspace/SKILL.md` for the in-client workflow skill
- `assets/logo.svg` for plugin branding
- `scripts/validate-template.mjs` for a local structure and manifest sanity check

## Repository layout

```text
.
├── .cursor-plugin/plugin.json
├── assets/logo.svg
├── mcp.json
├── scripts/validate-template.mjs
└── skills/use-hexia-workspace/SKILL.md
```

## Validation

Run the local validation script before publishing or opening a review:

```bash
node scripts/validate-template.mjs
```

The script checks:

- required manifest fields like `displayName`, `license`, and `logo`
- referenced files exist
- `mcp.json` points at the public Hexia MCP endpoint
- the packaged skill file is present

## License

This repository is licensed under MIT. See [LICENSE](LICENSE).
