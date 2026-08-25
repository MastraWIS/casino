# Figma vs. Producción — Discrepancias (thepunterspage.com)

Comparación token por token entre `tpp-design-system-rules.md` (Figma) y los valores reales extraídos de
**https://www.thepunterspage.com/** (custom properties CSS de producción + estilos computados de elementos
reales del DOM). Extraído: 2026-08-11.

Método: se leyeron las 608 CSS Custom Properties activas en la página (Bootstrap tokens `--bs-*`, tokens de
marca `--tpp-*`, del módulo de stats `--stats-*`/`--portal-stats-*`, presets de WordPress `--wp--preset--*`)
y se cruzaron con los valores computados reales (`getComputedStyle`) de: el botón "CLAIM BONUS" (CTA real),
H1, H2, un párrafo de artículo, un link inline y un botón secundario.

**Regla aplicada:** ante conflicto, gana producción — es lo que el usuario ve hoy. Esto ya está reflejado en
`tokens/tokens.prototype.css`.

---

## 1. Color

| # | Token Figma | Valor Figma | Valor real en producción | Veredicto |
|---|---|---|---|---|
| 1 | `Brand.Primary.01` (botón CTA, `CTA_button_tpp` en Figma) | `#29D1C4` (teal) | Botón real "CLAIM BONUS" → `background: #FDB833` (ámbar) | **CONFLICTO.** El componente CTA de Figma no representa el botón CTA real de producción. Prototipo usa `#FDB833`. |
| 2 | *(no existe token equivalente)* | — | Producción define **dos** ámbares distintos para CTA: `--bs-warning` / `--stats-sponsor-banner-popup-cta-background` = `#FFC53D` (= `Functional.Warning.base` de Figma, coincide) vs. el botón real renderizado = `#FDB833` vs. `--stats-button-more-background` = `#FCB835`. | **Inconsistencia interna de producción**, no solo vs. Figma: hay 3 ámbares distintos en uso (`#FFC53D`, `#FDB833`, `#FCB835`) para variantes de CTA. Documentado, no resuelto — hay que preguntar a desarrollo cuál es el canónico. |
| 3 | `Colours.Brand.primary` / `Header.primary` | `#203342` (un solo dark para texto y headings) | `--bs-heading-color` = `#13293D` (headings reales H1/H2) vs. `--bs-body-color` = `#203342` (párrafos reales) | **CONFLICTO.** Producción usa **dos** navys distintos: `#13293D` solo para headings, `#203342` para texto de cuerpo. Figma solo documenta uno. Prototipo separa `--tpp-color-text-primary` (`#203342`, sin cambio) de un nuevo `--tpp-color-heading` (`#13293D`, nuevo). |
| 4 | `Background.dark` / `Background.modal-01` | `#203342` | `--portal-stats-background-dark` / fallback de `--accent-color` = `#0F1D3E` | **CONFLICTO.** No visible en el home actual (módulo de stats/team pages), pero es el dark-bg real por defecto del sistema de stats. Prototipo usa `#0F1D3E` para este slot. |
| 5 | `Functional.Success.base` | `#1CB564` (verde) | `--bs-success` = `#29D1C4` (= el teal de `Brand.Primary.01`) | **CONFLICTO.** Producción no usa el verde de Figma para "success"; reutiliza el teal de marca. Prototipo usa `#29D1C4` para success. |
| 6 | `Functional.Link.base` | `#2D6DFD` (azul) | `--bs-link-color` real y color de link inline computado = `#009F93` (= `Colours.Brand.hyperlink` de Figma) | **CONFLICTO — y además inconsistencia interna en Figma**: Figma define dos tokens de "link" distintos (`Functional.Link` azul y `Colours.Brand.hyperlink` teal) que no coinciden entre sí. Producción usa el teal. Prototipo usa `#009F93` como color de link. |
| 7 | Naming `Brand.Primary` (verde) / `Brand.Secondary` (azul) | — | `--bs-primary` (Bootstrap) = `#335B7A` (el AZUL de Figma) · `--bs-secondary` = `#009F93` (el VERDE de Figma) | **Trampa de nombres, no de valor.** Los valores existen correctos en ambos lados, pero Bootstrap invierte qué color es "primary" vs "secondary" respecto a la nomenclatura de Figma. Si mapeas por nombre genérico primary/secondary sin mirar el hex, inviertes la marca. Documentado en el prototipo con comentario explícito. |
| 8 | Neutrals (`Neutrals.50…900`, escala Gray-Blue) | `#F9FAFB…#111827` | `--bs-gray-50…900` | **Coincide exactamente**, los 10 pasos. Sin cambios. |
| 9 | Neutrals (escala plana `Neutral/gray-*`, la de TPP Library 2.0 Styles) | `#F7F7F7…#333333` | `--stats-background-light` / `--stats-leagues-menu-wrapper-background` usan `#F7F7F7` como fallback; `--stats-leagues-submenu-button-inactive` usa `#E6E6E6` | **Ambas escalas coexisten en producción** — no es que una esté "muerta": el módulo de stats/KickForm usa por defecto la escala plana, el resto del sitio (Bootstrap) usa la Gray-Blue. Corrige lo que dije la vez pasada (asumí que solo Gray-Blue estaba en uso). |
| 10 | `Functional.Error.base` | `#DC3545` | `--bs-red` = `#DC3545` | Coincide. Sin cambios. |
| 11 | `Functional.Warning.base` | `#FFC53D` | `--bs-warning` / `--bs-yellow` = `#FFC53D` | Coincide (ver #2 para el matiz del botón real). |
| 12 | *(no existe en Figma)* | — | `--bs-info` = `#4BC3D3` | **Gap**: color "info" real en producción sin token equivalente en Figma. Añadido al prototipo como nuevo. |

## 2. Tipografía

| # | Token Figma | Valor Figma | Valor real en producción | Veredicto |
|---|---|---|---|---|
| 13 | `Family.Headers` / `Family.body_text` | `Poppins` / `Nunito Sans` | H1/H2 reales: `Poppins900italic` · body/botones: `Nunito Sans` | Coincide. Sin cambios. |
| 14 | `Typeface.Header` = "Black Italic" (900) | peso 900 | H1/H2 reales: `font-weight: 900`, `font-style: italic` | Coincide. Sin cambios. |
| 15 | `Size.desktop.H1` / `Size.mobile.H1` | `32px` / `24px` (pasos fijos) | H1 real renderizado (viewport de escritorio estándar): `25.995px` | **CONFLICTO.** No coincide con ninguno de los dos pasos fijos de Figma — producción usa una escala **fluida** (clamp/viewport-based), no los breakpoints discretos que documenta Figma. Mismo patrón en H2 (`22.725px` real vs. `24`/`22` en Figma). Prototipo no intenta fijar un H1 en px; deja anotado que hace falta una función `clamp()` si se quiere fidelidad real, no un valor estático. |
| 16 | *(sin token base-body en Figma; solo pasos `body 10–18`)* | — | `--bs-body-font-size` = `1.1rem` = `17.6px` (tamaño heredado por defecto del `<body>`) | **Gap/conflicto**: no es ninguno de los pasos de Figma (10/12/14/16/18). Ojo: el párrafo de artículo en sí sí mide `16px` exacto (coincide con `body-16`); es el tamaño heredado por defecto el que diverge. |
| 17 | `Line height.body-16` | `26px` | Párrafo real (`font-size:16px`) → `line-height: 22px` real | **CONFLICTO.** El line-height real de un texto de 16px coincide con el valor que Figma documenta para `body-12` (22px), no con el de `body-16` (26px) — están cruzados. |
| 18 | *(pesos definidos: 100/300/500/600/700/800/900, sin 400)* | — | Párrafo de artículo real: `font-weight: 400` | **Gap.** El peso "normal" del navegador (400) no existe como paso en la escala de pesos de Figma. |
| 19 | *(botón CTA sin line-height propio en Figma)* | — | Botón CTA real: `line-height: 16px` (compacto, sin leading extra) | Gap — Figma no documenta un line-height específico de botón; producción usa uno ajustado, no el de `body-16`. |

## 3. Spacing / Radius

| # | Token Figma | Valor Figma | Valor real en producción | Veredicto |
|---|---|---|---|---|
| 20 | `spacing/4` (padding vertical botón CTA, leído del componente Figma) | `10px` | Botón "CLAIM BONUS" real: `padding-top/bottom: 8px` | **CONFLICTO.** El botón real usa 8px de padding vertical, no 10px. |
| 21 | `spacing/5` (padding horizontal / gap botón CTA) | `16px` | Botón real: `padding-left/right: 16px`; `--wp--preset--spacing--40` = `1rem` = `16px`; `--default-grid-gap` = `16px` | Coincide en los tres. Sin cambios. |
| 22 | *(spacing/0,1,2,3,6-13 sin valor confirmado en Figma)* | sin resolver | Escala real de WordPress (`--wp--preset--spacing--20/30/50/60/70/80`) = `≈7px / ≈10.7px / 24px / 36px / ≈54px / ≈81px` | **Nueva escala encontrada solo en producción.** No proviene de Figma en absoluto — se usa en el prototipo como escala de spacing de trabajo ante la falta de datos de Figma. |
| 23 | `Buttons.CTA Corner Radius` | `10px` | Botón "CLAIM BONUS" real: `border-radius: 10px` | Coincide. Sin cambios. |
| 24 | `Buttons.Secondary Corner Radius` | `8px` | `--bs-btn-border-radius` = `8px` | Coincide. Sin cambios. |
| 25 | *(sin token de radius de card en Figma)* | — | `--bs-card-border-radius` = `10px`, `--stats-card-border-radius` = `16px` | Gap — dos radios de card reales en producción, ninguno documentado en Figma. |
| 26 | *(sin token de radius base en Figma)* | — | `--bs-border-radius` = `4px` (radius base de Bootstrap) | Gap, añadido al prototipo. |

---

## Resumen

- **8 conflictos de valor** directos Figma↔producción (color y tipografía), resueltos a favor de producción en el prototipo.
- **1 inconsistencia interna de Figma** (`Functional.Link` vs `Brand.hyperlink`), resuelta usando lo que producción realmente renderiza.
- **1 inconsistencia interna de producción** (3 ámbares de CTA distintos) — no resuelta, señalada para que el equipo de desarrollo confirme cuál es el canónico.
- **1 trampa de nomenclatura** (Bootstrap primary/secondary invertido vs. Figma) — documentada, no requiere cambio de valor.
- **~10 gaps**: tokens que existen en producción sin equivalente en Figma (radios de card, `info` color, escala de spacing completa, line-heights de componente, peso 400).
