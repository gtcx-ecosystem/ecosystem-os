---
title: 'Rails to NestJS Migration Decision'
status: 'current'
date: '2026-05-26'
---

# Rails to NestJS Migration Decision

## Purpose

Document the rationale and criteria for any migration from Rails to NestJS.

## Decision Drivers

- Type safety and modular services
- Integration with TypeScript protocol packages
- Long‑term maintainability and team skill alignment

## Risks

- Migration cost and delivery delay
- Loss of Rails ecosystem speed
- Dual‑stack complexity during transition

## Decision Rule

Migrate only if:

- Protocol integration requires TypeScript parity, and
- The team can support NestJS without slowing delivery.
