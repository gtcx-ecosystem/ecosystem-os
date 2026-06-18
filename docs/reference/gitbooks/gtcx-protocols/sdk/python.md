---
title: 'Python SDK — gtcx-sdk'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['sdk', 'python', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# Python SDK (`gtcx-sdk`)

Python client using **httpx** and **Pydantic v2**. JSON field names are camelCase at the wire (Pydantic `by_alias=True`).

## Install

```bash
pip install gtcx-sdk
```

Match the **minor** version to `@gtcx/sdk` `0.4.x` for release **v0.4.4**.

## Quick start

```python
import os
from gtcx import GTCXClient

client = GTCXClient(
    api_url=os.environ["GTCX_API_URL"],
    network_id=os.environ["GTCX_NETWORK_ID"],
    chain_id=os.environ["GTCX_CHAIN_ID"],
    api_key=os.environ["GTCX_API_KEY"],
)

proof = client.assemble_lot_proof(
    lot_id="lot:xx-gld-20260120-001",
    operator_did="did:gtcx:tp_producer_001",
)
print(proof.summary.all_valid)
```

## Parity with TypeScript

| TypeScript | Python |
| ---------- | ------ |
| `GTCXClient.fromNetwork('testnet')` | Construct with testnet URL constants from package |
| `client.tradepass.verify(cred)` | `client.tradepass.verify(credential)` |
| `client.assembleLotProof(...)` | `client.assemble_lot_proof(...)` |
| `GTCXError` | `GTCXError` with `code` + `status` |

## Testing

Use `httpx.MockTransport` in unit tests. See package `tests/` in the repository.

## Related

- [TypeScript SDK](typescript.md)
- [Getting started](../getting-started.md)
- [Verify a lot](../verify-a-lot.md)
