---
name: skill-azul-institucional
description: Aplica el tema "Azul Institucional con Chispa" - paleta corporativa azul con acento naranja. Usa para sitios corporativos, dashboards, apps de salud/finanzas/educación.
metadata:
  author: plastimet
  version: "1.0.0"
---

# Skill — Tema Azul Institucional con Chispa

Usa el siguiente sistema de colores para construir la interfaz. Cada color tiene un rol fijo; no los intercambies.

## Paleta

| Variable CSS | Hex | Rol |
|--------------|-----|-----|
| --dusk-blue | #3d5a80 | Fondo principal de secciones, headers, navbars |
| --light-cyan | #e0fbfc | Fondo de tarjetas, modales y áreas de contenido (superficie clara) |
| --powder-blue | #98c1d9 | Texto secundario, subtítulos, labels, íconos decorativos |
| --burnt-peach | #ee6c4d | Acento: botones primarios, badges, notificaciones, hover states |
| --jet-black | #293241 | Texto principal sobre fondos claros (headings, body sobre light-cyan) |

## Reglas de uso

### Fondo
- Usa `--dusk-blue` como fondo de la sección, navbar, sidebar o hero. Transmite autoridad y profesionalismo.
- Usa `--light-cyan` para las "zonas de trabajo": cards, paneles de contenido, formularios, áreas donde el usuario lee o interactúa. Aporta aire y claridad sin romper la armonía azul.

### Texto
- Texto sobre `--dusk-blue` (fondo oscuro): usa blanco `#ffffff` para títulos y `--powder-blue` para subtítulos o texto secundario.
- Texto sobre `--light-cyan` (fondo claro): usa `--jet-black` para máximo contraste en headings y cuerpo de texto.
- Evita usar `--burnt-peach` como color de texto corrido; solo para labels muy cortos o íconos.

### Acento
- `--burnt-peach` es la "chispa": el único color cálido en una paleta fría. Úsalo para el botón de acción principal, el indicador activo en navegación, el badge de estado o el ícono de énfasis.
- Máximo 1–2 apariciones por pantalla. Si aparece demasiado, pierde su efecto de llamada a la atención.
- En hover sobre `--dusk-blue` puede usarse como highlight de link o ítem de menú.

### Bordes y separadores
- Líneas sobre `--dusk-blue`: `--powder-blue` con opacidad baja (`rgba(152, 193, 217, 0.25)`).
- Líneas sobre `--light-cyan`: `--powder-blue` sólido o `--dusk-blue` con opacidad media.

## Cuándo usar este tema

- Sitios corporativos, institucionales o SaaS
- Paneles de administración y dashboards de datos
- Aplicaciones de salud, finanzas, educación o gobierno
- Cualquier producto que necesite proyectar confianza sin parecer aburrido

## Ejemplo de jerarquía visual aplicada

```
[Navbar con fondo dusk-blue]
  ├── Logo y links en blanco
  └── Botón CTA en burnt-peach (texto blanco)

[Hero con fondo dusk-blue]
  ├── Título grande en blanco
  ├── Subtítulo en powder-blue
  └── Botón primario en burnt-peach

[Sección de contenido con fondo light-cyan]
  ├── Card con fondo blanco o light-cyan
  │     ├── Título en jet-black
  │     ├── Descripción en jet-black (opacidad 0.75)
  │     └── Link/acción en burnt-peach
  └── Footer con fondo dusk-blue
        └── Texto en powder-blue
```

## Tono general

Serio y confiable como base, pero con personalidad. El `--burnt-peach` evita que la paleta caiga en lo genérico bancario; añade calidez humana en exactamente el punto donde el usuario toma una decisión.
