# Popup UI Refactor — Modern Card Style

## Context

The extension's toolbar popup (`src/App.vue` + child components) currently renders four unrelated controls in a flat list with inconsistent row widths (some `80%`, a fixed `240px` select forcing `body { min-width: 500px }`), oversized `30px` info icons beside every switch, and a red `*` hack injected via `::before` to mark the book selector as required. There is no header/branding and no grouping, so the relationship between "select a vocabulary book" → "enable collection" → "review" is invisible, and the "Collect words" toggle stays hidden (`v-if="bookId"`) until a book is picked with no hint that it is needed.

Goal: make the popup **concise and easier to operate** using a **modern card style** — soft-shadowed, rounded panels that group related controls, tighten spacing, shrink visual noise, and make the collect→review flow discoverable. Scope is the **toolbar popup only** (no content-script overlays).

## Approach

Reorganize `App.vue` into a header + two feature cards. Keep all child components' logic intact; only adjust their markup/styles to fit cards. Reuse the existing `$primary-color` (#1ABC9C) accent and existing i18n keys — add no new language keys except optionally reusing `add_vocabulary.emptyBook` for the empty-book hint.

### Layout

```
.app-home  (width ~380px)
  header.app-header        → logo.png (24px) + app name
  section.feature-card     → Subtitle masker card
      <SubtitleMaskerSwitch/>      (label + switch + info, full width)
  section.feature-card     → Word collection card
      row.collect-to        → label "将词汇收集到" + el-select(flex:1) + required dot + Info
      hr.card-divider       (shown when bookId set)
      <CollectWordsSwitch v-if="bookId"/>   (label "词汇收集" + switch + info)
      p.empty-hint  v-else   → reuses i18n `add_vocabulary.emptyBook`
      hr.card-divider
      row.review            → <ReviewPageVocabulary/> (full-width button + info)
```

### Key changes per file

- **`src/App.vue`** — wrap markup in header + cards; replace the red `*` `::before` hack with an inline required dot (`<span class="req-dot"/>`); make `el-select` flex:1 instead of fixed `240px`; render an empty-book hint when `!bookId`; add card/layout styles in `<style lang="scss">`. Override the global `body { min-width: 500px }` here with `html, body { min-width: 360px }` (loaded after `theme/index.scss`, so it wins by source order) so the popup can shrink without editing the shared `reset.css`.
- **`src/components/subtitle-masker-switch.vue`** & **`src/components/collect-words-switch.vue`** — change root row `width: 80%` → `100%`; reduce `Info` icon from `30px` → `16px`; keep label/switch/info layout. No logic changes.
- **`src/components/review-page-vocabulary.vue`** — change `width: 80%` → `100%`; make the button full-width (`flex: 1`) so it reads as the card's primary action; reduce `Info` icon `30px` → `16px`.
- **`src/icon/info.vue`** — no change (size already driven by `width`/`height` props).
- **`src/theme/variables.scss`** — optionally add card tokens (`$card-radius`, `$card-shadow`, `$card-border`). Inline values in `App.vue` are acceptable to keep the change localized; only add tokens if reused.

### Card visual spec
- Background `#fff`, `border: 1px solid #eef0f3`, `border-radius: 10px`, `box-shadow: 0 1px 3px rgba(0,0,0,.06)`, `padding: 12px 14px`, `margin-bottom: 12px`.
- Header row inside `.app-header`: logo (24px) + title (`font-weight: 600`, `15px`), bottom border omitted.
- `.card-divider`: `border: 0; border-top: 1px solid #f0f2f5; margin: 10px 0`.
- `.req-dot`: `color: #f56c6c; margin-left: 4px` — replaces the `*::before` hack.
- `.empty-hint`: `color: #909399; font-size: 12px; padding: 4px 0`.
- Hover: `.feature-card:hover { border-color: rgba($primary-color, .4) }` for affordance.

### Behavior preserved
- `v-if="bookId"` on `CollectWordsSwitch` stays (collecting still requires a book); the new `.empty-hint` just makes the dependency visible.
- `el-select @change` still persists `bookId` to `chrome.storage.sync`.
- `Cmd/Ctrl+Z` shortcut in `collect-words-switch.vue` untouched.

## Files to modify
- `src/App.vue`
- `src/components/subtitle-masker-switch.vue`
- `src/components/collect-words-switch.vue`
- `src/components/review-page-vocabulary.vue`
- `src/theme/variables.scss` (only if adding card tokens)

## Verification
1. `npm run dev` (vite on port 3001) — load `dist/` (or the crx HMR popup) in Chrome via `chrome://extensions` → load unpacked → point at the dev build.
2. Open the toolbar popup and confirm:
   - Header shows logo + app name.
   - Two cards render with rounded corners + soft shadow.
   - Popup width ≈ 380px (not 500px).
   - Info icons are small (~16px), no 30px noise.
   - Required marker on the book selector is a small red dot, not a stray `*`.
   - With no book selected: the word-collection card shows the muted empty-book hint and no collect switch.
   - Select a book → collect switch appears; review button is full-width below.
3. Toggle subtitle masker and collect switch — confirm messages still fire to the active tab (existing behavior).
4. `npm run build` (`vue-tsc -b && vite build`) — must typecheck and build clean.
