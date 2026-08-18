# Decisiones técnicas

## Estado actual

La aplicación usa HTML, CSS y JavaScript nativo con módulos ES. No requiere dependencias de frontend.

```txt
index.html          documento principal
server.mjs         servidor HTTP local para desarrollo
src/app.js         estado, reglas, render e interacciones
src/styles.css     estilos responsive
public/            recursos visuales
context/           memoria del proyecto
```

Comandos disponibles:

```bash
npm run dev
npm run build
```

`npm run build` valida actualmente la sintaxis de `src/app.js`; todavía no produce un bundle de distribución.

## Decisiones vigentes

### Sin framework por ahora

El prototipo es pequeño y puede funcionar sin instalar dependencias. Esto facilita abrirlo y desarrollarlo localmente. La decisión debe revisarse si aparecen persistencia, muchas pantallas, tests complejos o estado compartido difícil de mantener.

### Estado sólo en memoria

Los participantes, el formato y el sorteo viven en un objeto JavaScript. Al recargar la página se pierden. El historial visible contiene datos de demostración y aún no representa torneos guardados.

### Render del lado del cliente

`src/app.js` genera las vistas mediante plantillas HTML y maneja acciones con delegación de eventos sobre `#root`.

### Recursos

El fondo principal está versionado en `public/table-bg.png`. No debe depender de una ruta externa o temporal.

## Decisiones pendientes

- Persistencia local con `localStorage` o almacenamiento más robusto.
- Modelo de torneo, partido, ronda, puntaje y ganador.
- Necesidad real de migrar a TypeScript o un framework.
- Estrategia de pruebas para las reglas de torneo.
- Despliegue y dominio público.

## Criterio de evolución

No migrar de stack por anticipación. Si se decide una migración, documentar el problema que resuelve, alternativas consideradas y consecuencias.

