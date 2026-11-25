## 2026-09-28 - Explicit Form Control Associations in Brutalist Designs
**Learning:** Stylized form inputs with implicit or unlinked labels fail screen reader accessibility audits. Explicitly linking labels with `htmlFor` and `id` and adding visual loading/success states maintains the design's stylistic vibe while guaranteeing screen reader accessibility and clear user feedback.
**Action:** Always verify `htmlFor` and `id` pairing on inputs, add explicit `aria-label`s on icon-only links, and handle loading/success states for form actions.
