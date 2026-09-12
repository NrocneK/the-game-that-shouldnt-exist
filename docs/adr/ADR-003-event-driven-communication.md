# ADR-003 — Event-Driven Communication

## Status
Accepted

## Decision
Use an EventBus for communication between independent systems.

## Examples
- `enemy:defeated`
- `quest:completed`
- `dialogue:completed`

## Reason
Systems should not depend directly on each other's internal implementation.

## Consequence
Features can be added with less modification to existing systems.
