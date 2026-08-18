# Producto

## Nombre de trabajo

**Truco de Barrio**.

## Objetivo

Crear una app web simple para organizar torneos de truco argentino entre amigos. Debe reducir el trabajo de anotar participantes, elegir un formato y realizar sorteos, sin perder la identidad social e informal de una noche de truco.

## Usuarios

Grupos de amigos que comparten un dispositivo para preparar y seguir un torneo presencial.

## Principios

- Empezar un torneo debe ser rápido y entendible sin explicación.
- La ambientación debe sentirse argentina y vinculada al truco, sin dificultar la lectura.
- Las reglas y restricciones deben explicarse en el momento en que afectan una decisión.
- La app debe funcionar bien en celular y escritorio.
- La complejidad técnica debe crecer sólo cuando una necesidad real lo justifique.

## Alcance inicial

1. Pantalla de inicio con acceso a crear torneo e historial.
   También ofrece un anotador libre, independiente de un torneo.
2. Alta y eliminación de participantes por nombre o apodo.
3. Elección entre Liga, Fase de grupos y Eliminatoria directa.
4. Bloqueo de la eliminatoria directa cuando la cantidad de jugadores es impar.
5. Sorteo aleatorio de grupos con un mínimo de dos integrantes.
6. Vista inicial de grupos, cruces o posiciones de liga.

## Visión funcional

La aplicación debe acompañar el torneo completo, no solamente realizar el sorteo:

1. Configurar modalidad, participantes o equipos y puntaje objetivo.
2. Elegir y configurar el formato de competencia.
3. Sortear grupos, calendario o llave.
4. Usar un anotador dentro de cada partido.
5. Calcular tablas, clasificados y cruces automáticamente.
6. Pausar y reanudar torneos en curso.
7. Finalizar el torneo y conservar una vista histórica de sólo lectura.

La competencia toma como referencia el funcionamiento de los torneos de fútbol: tres puntos por victoria, diferencia de puntos, tablas de posiciones y llaves eliminatorias.

## Restricciones generales

- Se admiten entre 2 y 48 jugadores físicos.
- Las modalidades admitidas son 1 contra 1, 2 contra 2 y 3 contra 3.
- El formato competitivo es independiente de la modalidad de juego.
- En una fase de grupos o liga con playoffs nunca pueden clasificar todos los participantes o equipos; la cantidad de clasificados debe ser menor al total y permitir una llave eliminatoria válida.
- Al completarse la fase regular se genera automáticamente la llave de playoffs cuando corresponda. Al terminar la última fecha de una liga sin playoffs o la final de cualquier llave, se proclama al campeón y el torneo completo pasa al historial de solo lectura.
- Durante los playoffs posteriores a una fase de grupos se puede alternar entre la llave actual y los resultados finales de los grupos, sin permitir su edición.
- El historial muestra primero un resumen por torneo —campeón, modalidad, formato y fecha— y abre el detalle completo de participantes y resultados al seleccionar uno. Todo el contenido histórico es de solo lectura.
- Los partidos se configuran a 15 o 30 puntos.
- El detalle y las decisiones pendientes están en `tournament-rules.md`.

## Fuera del alcance por ahora

- Cuentas de usuario, sincronización entre dispositivos o juego en línea.
- Reproducir música real; el control actual es sólo visual.
- Edición de torneos ya finalizados.
