# BaselineOS Patterns

## Confirmed Patterns

- Use `.baseline/definition.json` as the canonical agent-readable baseline.
- Use `.baseline/config.json` for CLI/runtime initialization metadata.
- Use `baseline.config.json` as the no-code runtime config so `baseline status` works after `baseline init`.
- Route audits through `baseline audit <command>`; BaselineOS prints the canonical `gtcx-docs` prompt and output contract.
