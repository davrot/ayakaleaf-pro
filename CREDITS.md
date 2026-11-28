<<<<<<< HEAD
# CREDITS

This repository contains code taken from other projects, in addition to the
[Overleaf Community Edition](https://github.com/overleaf/overleaf) code base
itself.

## `services/web/modules/project-inspection` (Project Inspection)

Ported verbatim from the Overleaf Community Edition fork
[`hnd0hng/overleaf-cep`](https://github.com/hnd0hng/overleaf-cep).

- Source repository: `git@github.com:hnd0hng/overleaf-cep.git`
- Branch: `feature/project_inspection`
- Copied at commit: `0170f62b5a1260ca366adedcaec2e7d3bc7ae82d` (2026-11-05)
- Author: hnd0hng <hiendohoang07@gmail.com>

### Upstream commits that produced the module (oldest → newest)

| Commit | Date | Subject |
| --- | --- | --- |
| `18f3b0266b` | 2026-09-21 | feat: add project inspection module |
| `0a87be18f2` | 2026-09-22 | fix(project-inspection): distinguish dependency tree toggles |
| `c8608aedef` | 2026-09-22 | feat(project-inspection): add dependency tree item icons |
| `b4ff9e545f` | 2026-09-22 | Improve project inspection dependency tree |
| `d373e616b6` | 2026-09-22 | Align project inspection issue icons |
| `cca6f16f49` | 2026-09-22 | Remove duplicate citation inspection section |
| `a81fbc0aab` | 2026-09-23 | fix(project-inspection): align panel typography and status styling |
| `8a89d86506` | 2026-09-23 | feat(project-inspection): improve analysis results and responsive UI |
| `c92f8df6e6` | 2026-09-23 | fix(project-inspection): distinguish bibliography include icon |
| `fe3e62facb` | 2026-09-24 | feat(project-inspection): enhance dependency tree analysis |
| `55b2793b0e` | 2026-09-24 | feat(project-inspection): improve issue visibility and grouping |
| `a0a3cb9160` | 2026-09-24 | style(project-inspection): brighten unused status color |
| `27d39d2bf8` | 2026-09-25 | Improve project inspection UI responsiveness |
| `70767d3249` | 2026-09-28 | Detect duplicate figure/table captions and fix post-rebase bugs |
| `23ede8963a` | 2026-09-29 | Fix project inspection frontend compatibility and scrolling |

The module was registered in this fork's
`services/web/config/settings.defaults.js` (`railEntries` and
`moduleImportSequence`). One adaptation was required for this fork:
`services/web/package.json` moved `@lezer/highlight` and `@lezer/lr` from
devDependencies to dependencies — the analysis worker runs the lezer parsers
at Node runtime, which yarn PnP in production mode only resolves for
dependencies (this matches the layout in the upstream repository).

Also note: the lezer parsers consumed by the module (`lezer-latex/latex.mjs`,
`lezer-bibtex/bibtex.mjs`) are generated artifacts created by
`yarn lezer-latex:generate` (already part of this fork's build).
=======
# Credits

Third-party code included in this fork (on top of ShareLaTeX/Overleaf CE,
itself licensed under GPL-3.0). Full license texts travel with the vendored
code; the entries below give the origin, license, and where it lives.

## TikZ editor (WYSIWYG `.tikz`/`.pgf` visual editor)

Shipped in `services/web/public/static/tikz-editor/` and driven by
`services/web/modules/tikz/`.

- **tikz-editor** — Dominik Peters
  <https://github.com/DominikPeters/tikz-editor> — **MIT**
  The WYSIWYG TikZ editor (v0.5.2), the application rendered inside the
  iframe.
- **tikz-editor-embed-mirror** — TeXlyre contributors
  <https://github.com/TeXlyre/tikz-editor-embed-mirror> — **MIT**
  The static, iframe-embeddable build (postMessage host protocol:
  `init` / `load` / `change` / `autosave` / `save` / `export` /
  `persistence-save`) installed from its v0.5.2 release.
- **TikzJax** — drgrice1 (`@drgrice1/tikzjax`, 1.0.0-beta24)
  <https://github.com/drgrice1/tikzjax> — **MIT**
  The browser TikZ rendering engine (vendored in
  `static/tikz-editor/tikzjax/`: `tikzjax.js`, `fonts.css`, glyph fonts),
  fully offline.
- **MathJax 4** — the MathJax Consortium
  <https://github.com/mathjax/MathJax> — **Apache-2.0**
  Offline TeX typesetting for editor content; the Cambria-Math font set
  (`static/mathjax-fonts/mathjax-newcm-font/`) and the
  `static/math-maps/` Unicode-to-TeX mappings come from the `mathjax`
  npm package (4.1.2).

License texts: `static/tikz-editor/LICENSE-MIT.txt` covers the tikz-editor
bundle; see the upstream repositories for the full MIT / Apache-2.0 texts.

## Draw.io (WYSIWYG `.drawio` diagram editor)

The diagram editor for `.drawio` files (module: `services/web/modules/drawio/`)
embeds a vendored draw.io application bundle:

| Component | Provenance | License |
|-----------|-----------|---------|
| draw.io core | [JGraph draw.io](https://github.com/jgraph/drawio), vendored from the official [viewer.diagrams.net](https://viewer.diagrams.net/) static build (v32.3.0) | MPL 2.0 (core) |
| jsPDF | [jsPDF](https://github.com/parallax/jsPDF) `^3.0.1` (npm — vector PDF conversion) | MIT |
| svg2pdf.js | [svg2pdf.js](https://github.com/yworks/svg2pdf.js) `^2.5.1` (npm — SVG→PDF operators) | Apache-2.0 |

Vendored at `services/web/public/static/drawio/` (20 MB) with its own
`PROVENANCE.txt`; served same-origin, offline, inside an isolated iframe
(same discipline as the tikz-editor bundle). The npm dependencies are
dynamically imported only by the file-tree "Convert to PDF/PNG" action so
they stay out of the main IDE bundle.

## Notes

- All of the above is vendored into the image and served same-origin;
  nothing is loaded from a CDN or any other origin at runtime.
- Host-side modifications to the vendored tikz-editor bundle (document
  lifecycle trimming, offline MathJax paths) are documented in
  `static/tikz-editor/HOST-PATCHES.md`; the patching instructions there
  must be re-applied after any re-vendoring.
- The file-tree **Export to PNG/SVG/PDF** feature generates its artifacts
  from the editor's rendered output with no additional third-party
  libraries (PNG via canvas, PDF via a small built-in writer).
>>>>>>> drawtikz/drawio-tikz-editor
