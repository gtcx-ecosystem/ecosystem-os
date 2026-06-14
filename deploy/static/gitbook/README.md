# GitBook static publish surface (PW-1-05)

Fleet documentation deploy path for **ecosystem-os** — GitHub → GitBook sync (no container apply).

| Artifact | Path |
| -------- | ---- |
| Publish guide | [`docs/gitbook/PUBLISH.md`](../../../docs/gitbook/PUBLISH.md) |
| Publish register | [`pm/publish-register.json`](../../../pm/publish-register.json) |
| Ecosystem library root | `docs/gitbook/ecosystem/` |
| Product mirrors | `docs/reference/gitbooks/` |

## Dry-run verification (owner repo)

```bash
test -f docs/gitbook/PUBLISH.md
test -f pm/publish-register.json
test -d docs/gitbook/ecosystem
```

Production cutover is **Class A** — GitBook space wiring + operator sign-off; bridge-os records PW-1-05 witness only.
