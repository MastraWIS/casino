# Design System Rules — TPP Library 2.0

Fuentes:

1. **Figma MCP** — librería **📘 TPP Library 2.0** (`lk-90f87054b8...`) del archivo
   [jyUV9B2iWFfQq9LdIIxf3V](https://www.figma.com/design/jyUV9B2iWFfQq9LdIIxf3V/), página
   "❖ Components Strategies", frame "Colours" (`1208:484239`) → capa de **primitivos** (rampas de color crudas).
2. **Variables de Figma exportadas** — `Brands & Themes/TPP.tokens.json` (modo `"TPP"` de la colección
   "Design System 2.0", formato W3C DTCG / Tokens Studio) → capa **semántica**: tokens de marca, tipografía
   completa y tokens de componente, todos con alias hacia los primitivos de (1).

Este documento combina ambas capas. La capa semántica (2) es la que deberían consumir los componentes;
la capa de primitivos (1) es la paleta base de la que se derivan. Última actualización: 2026-08-06.

## 1. Color tokens — primitivos (`Colours Palettes`)

Rampas base de marca, referenciadas por alias desde los tokens semánticos.

| Token | Hex |
|---|---|
| TPP Green/50 | `#F1FDFD` |
| TPP Green/100 | `#E3FDFB` |
| TPP Green/200 | `#78ECE3` |
| TPP Green/300 | `#29D1C4` |
| TPP Green/400 | `#009F93` |
| TPP Green/500 | `#0C7977` |
| TPP Green/600 | `#1A6368` |
| TPP Green/700 | `#21585E` |
| TPP Green/800 | `#1D4044` |
| TPP Green/900 | `#112827` |
| TPP Blue/50 | `#8FCAEF` |
| TPP Blue/100 | `#65ACD8` |
| TPP Blue/200 | `#4891BE` |
| TPP Blue/300 | `#3A7CA5` |
| TPP Blue/400 | `#357196` |
| TPP Blue/500 | `#335B7A` |
| TPP Blue/600 | `#2F4F69` |
| TPP Blue/700 | `#284256` |
| TPP Blue/800 | `#203342` |
| TPP Blue/900 | `#182630` |
| White/900 | `#FFFFFF` |
| Dark/900 | `#171717` |

(50/100 de TPP Green corregidos respecto a la extracción anterior: el valor autoritativo es el de la
variable publicada, no la etiqueta impresa en el frame de documentación, que estaba desactualizada.)

## 2. Color tokens — semánticos (marca "TPP", `🫟 Colours`)

Estos son los que deben usarse en componentes; cada uno resuelve a un primitivo de la tabla anterior.

**Brand**

| Token | Hex | Alias a primitivo |
|---|---|---|
| Brand.Primary.01 | `#29D1C4` | TPP Green/300 |
| Brand.Primary.02 | `#009F93` | TPP Green/400 |
| Brand.Primary.03 | `#21585E` | TPP Green/700 |
| Brand.Secondary.01 | `#3A7CA5` | TPP Blue/300 |
| Brand.Secondary.02 | `#335B7A` | TPP Blue/500 |
| Brand.Secondary.03 | `#203342` | TPP Blue/800 |

**Basic**

| Token | Hex |
|---|---|
| Basic.White | `#FFFFFF` |
| Basic.Dark | `#171717` |

**Neutrals** (escala Gray-Blue — es la que consumen realmente Buttons/Background, distinta de la escala
`Neutral/gray-*` plana documentada en la librería de estilos)

| Token | Hex |
|---|---|
| Neutrals.50 | `#F9FAFB` |
| Neutrals.100 | `#F3F4F6` |
| Neutrals.200 | `#E5E7EB` |
| Neutrals.300 | `#D1D5DB` |
| Neutrals.400 | `#9CA3AF` |
| Neutrals.500 | `#686F7D` |
| Neutrals.600 | `#4B5563` |
| Neutrals.700 | `#374151` |
| Neutrals.800 | `#1F2937` |
| Neutrals.900 | `#111827` |

**Tonal Palettes** (rampa completa TPP Green usada como escala tonal)

| Token | Hex |
|---|---|
| Tonal Palettes.50 | `#F1FDFD` |
| Tonal Palettes.100 | `#E3FDFB` |
| Tonal Palettes.200 | `#78ECE3` |
| Tonal Palettes.300 | `#29D1C4` |
| Tonal Palettes.400 | `#009F93` |
| Tonal Palettes.500 | `#0C7977` |
| Tonal Palettes.600 | `#1A6368` |
| Tonal Palettes.700 | `#21585E` |
| Tonal Palettes.800 | `#1D4044` |
| Tonal Palettes.900 | `#112827` |

**Functional** (cada uno con variante light/base/dark)

| Token | light | base | dark |
|---|---|---|---|
| Functional.Error | `#F4B0B2` | `#DC3545` | `#871C26` |
| Functional.Success | `#56DC95` | `#1CB564` | `#116E3D` |
| Functional.Warning | `#FFE197` | `#FFC53D` | `#B38C29` |
| Functional.Link | `#99BDFF` | `#2D6DFD` | `#1E3F73` |

**Background**

| Token | Valor |
|---|---|
| Background.bg-01 | `Neutrals.100` (`#F3F4F6`) |
| Background.bg-02 | `Neutrals.50` (`#F9FAFB`) |
| Background.bg-stroke-02 | `Neutrals.200` (`#E5E7EB`) |
| Background.modal-01 | `#203342` |
| Background."background (white)" | `Basic.White` (`#FFFFFF`) |
| Background.surface | `Neutrals.50` (`#F9FAFB`) |
| Background.surface-alternate | `Neutrals.200` (`#E5E7EB`) |
| Background.surface-alternate-darker | `Neutrals.300` (`#D1D5DB`) |
| Background.dark | `Brand.Secondary.03` (`#203342`) |
| Background."KF Hero" | `#253A4C` |

**Icons**

| Token | Hex |
|---|---|
| Icons."icon <p>" | `#203342` |
| Icons."icon dark" | `#203342` |
| Icons."icon grey" | `#6B7280` |

**Kickform** (colores específicos del módulo Kickform)

| Token | Valor |
|---|---|
| Kickform.chart-primary | `#009F93` |
| Kickform.chart-secondary | `#357196` |
| Kickform.chart-tertiary | `Neutrals.400` (`#9CA3AF`) |
| Kickform.background-primary | `#29D1C4` |
| Kickform.background-secondary | `Neutrals.200` (`#E5E7EB`) |
| Kickform.background-table-highlight | `#E3FDFB` |
| Kickform.Cards.bg-primary | `Basic.White` |
| Kickform.Cards.bg-secondary | `Neutrals.100` |
| Kickform.Cards.bg-tertiary | `Neutrals.50` |
| Kickform.Cards.stroke-primary | `Neutrals.300` |
| Kickform.Cards.stroke-secondary | `Neutrals.200` |
| Kickform.Neutrals.primary | `#1CB564` |
| Kickform.Neutrals.secondary | `#2D6DFD` |
| Kickform.Neutrals.tertiary | `#FFC53D` |
| Kickform.Neutrals.quaternary | `#DC3545` |

**Badge**

| Token | Valor |
|---|---|
| Badge.Primary | `Brand.Primary.01` (`#29D1C4`) |

## 3. Typography tokens

**Familias**

| Token | Valor |
|---|---|
| Family.Headers | `Poppins` |
| Family.body_text | `Nunito Sans` |

**Pesos** (`Typeface.Body text.*`)

| Token | Valor numérico |
|---|---|
| ExtraLight | 100 |
| Light | 300 |
| Regular | 500 |
| SemiBold | 600 |
| Bold | 700 |
| ExtraBold | 800 |
| Black | 900 |

Estilo de headers: `Black Italic` (peso 900). Botones CTA: `Extra Bold Italic`. Botón secundario: `Bold`.

**Escala de tamaño — Desktop** (`Size.desktop`)

| Token | px |
|---|---|
| H1 | 32 |
| H2 | 24 |
| H3 | 20 |
| H4 | 18 |
| body 18 | 18 |
| body 16 | 16 |
| body 14 | 14 |
| body 12 | 12 |
| body 10 | 10 |

**Escala de tamaño — Mobile** (`Size.mobile`)

| Token | px |
|---|---|
| H1 | 24 |
| H2 | 22 |
| H3 | 20 |
| H4 | 18 |
| body 18 | 18 |
| body 16 | 16 |
| body 14 | 14 |
| body 12 | 12 |
| body 10 | 10 |

**Line height** (`Line height.*`, px)

| Token | px |
|---|---|
| Header | 31 |
| body-18 | 28 |
| body-16 | 26 |
| body-14 | 24 |
| body-12 | 22 |
| body-10 | 14 |

**Letter spacing / Text spacing** (`Text spacing.*`)

| Token | Valor |
|---|---|
| Header | -0.5 |
| body-18 / body-16 / body-14 / body-12 / body-10 | 0 |

**Colores de texto semánticos** (`Colours.Brand.*` y `Colours.Header/Paragraph/*`)

| Token | Hex |
|---|---|
| Colours.Brand.primary | `#203342` |
| Colours.Brand.secondary | `#6B7280` |
| Colours.Brand.deactivated | `#E6E6E6` |
| Colours.Brand.inverted | `#FFFFFF` |
| Colours.Brand.hyperlink | `#009F93` |
| Colours.Brand.disabled | `#9CA3AF` |
| Colours.Header.H1/H2/H3/H4.primary | `#203342` |
| Colours.Paragraph."body <p>" / "body dark" / paragraph-primary | `#203342` |
| Colours.Paragraph."body grey" / paragraph-secondary | `#6B7280` |
| Colours.Paragraph.paragraph-inverted | `#FFFFFF` |
| Colours.Tabs Filter.default | `#0C7977` |
| Colours.KickForm Label.primary | `#009F93` |
| Colours.KickForm Label.secondary | `#357196` |
| Colours.KickForm Label.tertiary | `Neutrals.400` (`#9CA3AF`) |

## 4. Spacing / sizing tokens

Sí existe una escala de spacing con nombre: `spacing/0` a `spacing/13`, variables FLOAT en la librería
"🧠 Design System 2.0 - Multi-brand" (colección "Properties", scopes CORNER_RADIUS/WIDTH_HEIGHT/GAP/etc.).
No estaba en TPP Library 2.0 ni en el export `TPP.tokens.json`, por eso no apareció en la primera pasada.
Solo 2 de los 14 pasos tienen valor px confirmado (resuelto directamente del componente CTA button,
node `809:505258`):

| Token | px | Confirmado en |
|---|---|---|
| spacing/4 | 10 | padding vertical del botón CTA |
| spacing/5 | 16 | padding horizontal / gap del botón CTA |

Los pasos `spacing/0,1,2,3,6,7,8,9,10,11,12,13` existen como variable pero no tienen valor px confirmado
todavía — no los inventes; hay que resolverlos inspeccionando más componentes en Figma o pidiendo el
export de la colección "Properties".

**Button Height** (`🔘 Buttons.Height`)

| Token | px |
|---|---|
| Small | 32 |
| Regular | 40 |
| Large | 48 |

**Corner Radius** (`🔘 Buttons.*.Stroke.Corner Radius`)

| Token | px |
|---|---|
| CTA | 10 |
| Secondary | 8 |

Si el proyecto necesita una escala de spacing formal (padding/gap/margin), no existe todavía como token
publicado — habría que pedir al equipo de diseño que la agregue a la colección de Variables.

## Notas

- La sección `SWV Dark Blue` presente en el export de Variables corresponde a otra marca/tema, no a TPP;
  se excluye deliberadamente de este documento.
- Ante cualquier discrepancia entre el valor impreso como texto en un frame de documentación de Figma y
  el valor real de una variable/estilo publicado, prevalece el valor real de la variable/estilo (ya
  detectado al menos 3 veces en esta librería).
- No inventes nombres de token ni valores hex que no estén en este documento; si falta algo, vuelve a
  consultar Figma (MCP) o pide un nuevo export de Variables.
