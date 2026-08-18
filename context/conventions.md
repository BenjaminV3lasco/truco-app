# Convenciones de código

Estas reglas describen el proyecto actual. Deben cambiar si el stack cambia.

## Idioma

- Código, identificadores, nombres de archivos y commits: inglés.
- Textos visibles para el usuario y documentación de producto: español.
- Los términos propios del juego pueden conservarse en español: `truco`, `envido`, `flor`.

## JavaScript

- Variables y funciones en `camelCase`.
- Constantes globales conceptuales en `UPPER_SNAKE_CASE` cuando sean inmutables.
- Funciones pequeñas con una responsabilidad clara.
- Evitar estado global adicional; el estado de la interfaz se concentra actualmente en `state`.
- Escapar cualquier valor ingresado por usuarios antes de insertarlo en plantillas HTML.
- No agregar dependencias para resolver algo pequeño que el navegador ya soporta.

## CSS

- Clases en `kebab-case`.
- Reutilizar clases de componentes y variables antes de duplicar valores.
- Mantener estados visibles para `hover`, `focus` y `disabled`.
- Verificar cada flujo en viewport móvil y de escritorio.

## Archivos futuros

Preferir nombres descriptivos en `kebab-case`:

```txt
tournament-rules.js
group-draw.js
local-storage.js
```

Si el proyecto migra a componentes, usar `PascalCase` para los componentes y documentar la nueva estructura antes de aplicarla de forma general.

## Cambios

- Mantener cambios pequeños y enfocados.
- No modificar archivos no relacionados.
- Actualizar el contexto cuando cambien el producto, las reglas o la arquitectura.
- Verificar como mínimo `npm run build` antes de cerrar un cambio.

