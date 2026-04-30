# Keyboard-Driven Linked-Tree Navigation (Power-User Workflow)

This document defines a keyboard-first navigation model for a **linked tree** (hierarchical nodes that may also cross-link to related nodes), designed for LinkX-style interfaces where users rapidly traverse, open, and inspect nodes without leaving the keyboard.

## Goals

- Keep hands on keyboard for the full browse → inspect → open loop.
- Support both strict parent/child traversal and cross-link jumping.
- Preserve accessibility semantics (`aria-activedescendant`, roving focus, visible focus).
- Integrate cleanly with existing `LinkXPage` and `Terminal` command patterns.

## Interaction model

### Concepts

- **Active node**: currently selected tree node.
- **Expanded state**: whether a branch node's children are visible.
- **Peek mode**: temporary overlay/details for active node.
- **Link ring**: ordered set of cross-links for the active node.
- **Quick open buffer**: incremental fuzzy query for node IDs/titles.

### Navigation principles

1. **Arrow keys stay structural**
   - Up/Down walk visible siblings in reading order.
   - Left collapses or moves to parent.
   - Right expands or moves to first child.
2. **Cross-links are explicit**
   - `[` / `]` cycle related/cross-linked nodes.
3. **Actions are mnemonic**
   - `o` open, `p` peek, `f` focus/search, `?` help.
4. **Mode-less by default**
   - Most commands are single-key actions.
   - `Ctrl/Cmd+K` enters quick-open mode only when needed.

## Shortcut map

| Key | Scope | Action |
| --- | --- | --- |
| `↑` / `k` | Tree focused | Move to previous visible node |
| `↓` / `j` | Tree focused | Move to next visible node |
| `←` / `h` | Tree focused | Collapse current branch; if already collapsed, move to parent |
| `→` / `l` | Tree focused | Expand current branch; if already expanded, move to first child |
| `Home` | Tree focused | Jump to first visible node |
| `End` | Tree focused | Jump to last visible node |
| `PageUp` / `PageDown` | Tree focused | Jump by viewport chunk |
| `Enter` | Tree focused | Open active node primary link (new tab for external) |
| `o` | Tree focused | Open active node in current context (router push / modal) |
| `Shift+Enter` | Tree focused | Open active node in background/new tab |
| `Space` | Tree focused | Toggle expand/collapse on active node |
| `a` | Tree focused | Expand all descendants of active node |
| `A` (`Shift+a`) | Tree focused | Collapse all descendants of active node |
| `[` / `]` | Tree focused | Cycle previous/next related cross-link |
| `g g` | Tree focused | Jump to tree root |
| `g n` | Tree focused | Jump to next unread/new node (if metadata exists) |
| `p` | Tree focused | Toggle peek panel for active node |
| `Ctrl/Cmd+K` | Global | Open quick-open palette (search node by title/id/tag) |
| `/` | Tree focused | Focus in-tree filter input |
| `Esc` | Global | Close peek/palette; clear transient mode; preserve active node |
| `?` | Global | Show shortcut overlay |

## Implementation hooks (drop-in architecture)

## 1) Data contract for tree nodes

```ts
type TreeNode = {
  id: string;
  title: string;
  href?: string;
  children?: string[]; // child node IDs
  parentId?: string | null;
  relatedIds?: string[]; // cross-links
  meta?: {
    unread?: boolean;
    tags?: string[];
  };
};
```

Store nodes in an ID map for O(1) lookups and a derived `visibleNodeIds` array.

## 2) Keyboard controller hook

Add a dedicated hook:

- **File:** `src/hooks/useLinkedTreeNavigation.js`
- **Responsibility:** parse key chords and emit semantic actions.

Suggested API:

```ts
const {
  activeId,
  visibleNodeIds,
  expandedIds,
  quickOpen,
  keymap,
  onTreeKeyDown,
  setActiveId,
  toggleExpanded,
  openActive,
} = useLinkedTreeNavigation({
  nodesById,
  rootIds,
  initialActiveId,
  onOpen,
  onPeek,
  onHelp,
});
```

## 3) Keymap registry

Centralize shortcuts in a registry object so docs/tests/UI stay in sync:

```ts
const LINKED_TREE_SHORTCUTS = [
  { key: "ArrowUp|k", action: "movePrev" },
  { key: "ArrowDown|j", action: "moveNext" },
  // ...
];
```

Benefits:

- renderable for `?` overlay,
- testable without DOM,
- future remapping support.

## 4) UI wiring points in current codebase

Primary integration target is `src/components/LinkXPage.jsx`:

- replace link-list-only up/down logic (`onLinkKeyDown`) with tree-aware handler,
- keep refs (`linkRefs`) for roving tab stop or switch to `aria-activedescendant`,
- preserve existing `Enter` behavior and analytics (`trackOutbound`),
- reserve `Esc` priority for terminal/dialog close, then tree mode cleanup.

Optional terminal integration (`src/components/Terminal/commands.js`):

- add `tree` command namespace:
  - `tree keys` → print shortcut map,
  - `tree focus <id>` → focus node by ID,
  - `tree open <id>` → open node programmatically.

## 5) Accessibility hooks

- Tree container: `role="tree"`, `aria-label="Linked tree navigation"`.
- Nodes: `role="treeitem"` with `aria-level`, `aria-expanded` (branches), `aria-current` (active).
- Child groups: `role="group"`.
- Use **roving tabindex** (single `tabIndex=0` on active, `-1` elsewhere), or `aria-activedescendant`.
- Announce active-node changes in a polite live region for screen-reader context.

## 6) Telemetry hooks

Track power-user behavior without PII:

- `tree_nav_move` (direction + source key),
- `tree_nav_open` (node id + method keyboard/mouse),
- `tree_nav_jump` (root/unread/quick-open),
- `tree_nav_help_open`.

Implementation: re-use existing analytics style from `src/lib/analytics.js`.

## Test plan

1. **Unit (hook-level)**
   - key parsing (`g g`, `g n`, `Ctrl/Cmd+K`),
   - traversal boundaries,
   - expand/collapse semantics,
   - related link cycling.
2. **Component**
   - `role="tree"` semantics and correct aria attributes.
   - active node remains stable across expand/collapse.
3. **E2E (Playwright)**
   - keyboard-only path from page load to opening a deep child link.
   - shortcut overlay toggling with `?`.
   - `Esc` precedence (peek/palette close before terminal close unless terminal is active).

## Rollout strategy

1. Ship keymap registry + read-only shortcut overlay (`?`).
2. Introduce tree controller hook behind feature flag.
3. Migrate existing flat links into tree adapter (`links.json` -> tree model).
4. Add terminal `tree` commands for discoverability/debugging.
5. Remove legacy `onLinkKeyDown` once parity is validated.
