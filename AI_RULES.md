# AI Development Rules

## 1. Repository First

Never assume existing code.

Always inspect the current repository before modifying existing files.

## 2. Existing Code

Never recreate an existing file from memory.

Read the actual file first.

## 3. Dependencies

Before changing a class/interface/type, inspect its consumers.

## 4. Phase Handoff

Handoff files describe intended project state.
They are not authoritative over the actual repository.

## 5. Conflict

If handoff and repository differ:

Repository > Handoff

Report the discrepancy.

## 6. No Guessing

If required information cannot be verified:
STOP and retrieve the information.

Do not generate speculative code.

## 7. Implementation

Before coding, identify:

- files to create
- files to modify
- dependencies affected
- existing APIs/types involved
