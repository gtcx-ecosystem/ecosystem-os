# BaselineOS Pitfalls

## Known Pitfalls

- Do not treat `.baseline/config.json` alone as full agent context; agents need `.baseline/definition.json`.
- Do not hand-copy audit prompts across repos; use `baseline audit <command>` so the prompt/output contract stays canonical.
- Do not commit secrets or local runtime databases.
