---
name: skill-oscuro-dramatico
description: Aplica el tema "Oscuro Dramático" - fondo negro con superficies azules y acento naranja. Usa para hero sections, portfolios, dark mode dashboards.
metadata:
  author: plastimet
  version: "1.0.0"
---

# Skill — Tema Oscuro Dramático

Usa el siguiente sistema de colores para construir la interfaz. Cada color tiene un rol fijo; no los intercambies.

## Paleta

| Variable CSS | Hex | Rol |
|--------------|-----|-----|
| --jet-black | #293241 | Fondo principal de secciones y páginas |
| --light-cyan | #e0fbfc | Texto de títulos y headings |
| --powder-blue | #98c1d9 | Texto de cuerpo, párrafos y descripciones |
| --burnt-peach | #ee6c4d | Acento: botones primarios, badges, tags, íconos destacados, hover states |
| --dusk-blue | #3d5a80 | Fondo de tarjetas, modales, navbars, superficies elevadas sobre el fondo principal |

## Reglas de uso

### Fondo
- Usa `--jet-black` como color de fondo de toda la página o sección.
- Usa `--dusk-blue` para elementos que "flotan" sobre ese fondo: cards, sidebars, headers, tooltips, modales.

### Texto
- Títulos (h1, h2, h3): siempre `--light-cyan`. Transmite frescura y contraste sobre el negro.
- Cuerpo de texto, párrafos, labels, metadata: `--powder-blue`. Más suave que el cian, descansa mejor en lectura larga.
- Texto sobre botones o badges de acento: blanco puro `#ffffff`.

### Acento
- `--burnt-peach` se reserva **únicamente** para el elemento de mayor jerarquía de acción o atención en pantalla: CTA principal, botón primario, badge de notificación, barra de progreso, ícono de alerta.
- No lo uses en más de 1–2 elementos por pantalla. Su poder viene de la escasez.
- En hover de links secundarios también puede aparecer brevemente.

### Bordes y separadores
- Usa `--dusk-blue` con opacidad reducida (ej. `rgba(61, 90, 128, 0.4)`) para líneas divisorias y bordes sutiles.

## Cuándo usar este tema

- Hero sections de alto impacto
- Landing pages o portfolios con personalidad fuerte
- Dashboards con modo oscuro
- Pantallas de onboarding o splash
- Cualquier sección que deba comunicar seriedad + energía

## Ejemplo de jerarquía visual aplicada

```
[Fondo jet-black]
  ├── Card con fondo dusk-blue
  │     ├── Título en light-cyan
  │     ├── Descripción en powder-blue
  │     └── Botón CTA en burnt-peach (texto blanco)
  └── Footer con fondo dusk-blue
        └── Links en powder-blue / hover en burnt-peach
```

## Tono general

Oscuro, sofisticado, con tensión controlada. El burnt-peach rompe la frialdad azul con calor justo donde el usuario necesita actuar.
