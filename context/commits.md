# Convenciones de commits

Usar Conventional Commits con descripción en inglés:

```txt
type(scope): description
```

Ejemplos:

```txt
feat(tournament): add participant registration flow
fix(groups): keep at least two players in each group
style(home): improve mobile hero layout
docs(context): add project memory
```

## Types

- `feat`: nueva funcionalidad visible.
- `fix`: corrección de un error.
- `refactor`: cambio interno sin alterar el comportamiento esperado.
- `perf`: mejora de rendimiento.
- `docs`: documentación.
- `style`: cambios visuales o de formato sin lógica nueva.
- `test`: creación o ajuste de pruebas.
- `build`: build, dependencias o tooling.
- `ci`: integración y despliegue automáticos.
- `chore`: mantenimiento que no encaja en los anteriores.

## Scopes sugeridos

- `home`
- `tournament`
- `participants`
- `formats`
- `groups`
- `bracket`
- `league`
- `history`
- `audio`
- `ui`
- `assets`
- `server`
- `context`
- `deps`

## Reglas

- Escribir la descripción en inglés, minúscula y modo imperativo.
- No terminar con punto.
- Mantener la primera línea en un máximo de 72 caracteres.
- Evitar mensajes genéricos como `update`, `changes`, `wip` o `fix stuff`.
- Separar cambios no relacionados en commits distintos.
- Usar `!` y un cuerpo con `BREAKING CHANGE:` cuando el cambio rompa compatibilidad.

