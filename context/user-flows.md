# Flujos de usuario

## Crear un torneo

1. Elegir `Crear torneo`.
2. Ingresar nombre opcional del torneo.
3. Elegir modalidad: 1v1, 2v2 o 3v3.
4. Cargar entre 2 y 48 jugadores respetando la divisibilidad de la modalidad.
5. Elegir equipos sorteados —opción recomendada— o armarlos manualmente.
6. Elegir puntaje objetivo: 15 o 30.
7. Elegir formato: Liga, Fase de Grupos o Eliminación Directa.
8. Completar la configuración específica del formato.
9. Revisar el resumen y confirmar el sorteo.

## Configurar Fase de Grupos

1. La app calcula distribuciones válidas con grupos de al menos dos y diferencia máxima de uno.
2. La app recomienda una distribución.
3. El usuario confirma la recomendación o elige otra opción válida.
4. El usuario define cuántos clasifican a eliminación.
5. La app valida que la cantidad permita una llave.
6. Se sortean grupos y se genera el calendario de partidos.

## Configurar Liga

1. Elegir entre playoffs o campeón por tabla.
2. Si hay playoff, elegir una cantidad válida de clasificados.
3. Generar el calendario de todos contra todos.

## Configurar Eliminación Directa

1. Calcular la llave y los `byes` necesarios.
2. Sortear posiciones.
3. Mostrar la llave antes de comenzar.

## Jugar un partido

1. Tocar un partido programado.
2. Abrir el anotador con participantes y marcador en cero.
3. Tocar el lado izquierdo o derecho para sumar un punto al participante correspondiente.
4. Permitir deshacer el último punto.
5. Mostrar y reiniciar un contador de 20 segundos con cada modificación.
6. Cerrar automáticamente la mano al llegar a cero o manualmente si el usuario lo solicita.
7. En 3v3, calcular y anunciar si la próxima mano es redonda o Puntas.
8. Al alcanzar el objetivo, pedir confirmación del resultado.
9. Marcar el partido como completado.
10. Recalcular tabla o avanzar al ganador según la etapa.

## Resolver un empate de tabla

1. Detectar si el empate en puntos y diferencia afecta una posición relevante.
2. Crear un partido de desempate a 15 puntos.
3. Jugarlo con el mismo anotador.
4. Usar al ganador para resolver la posición sin modificar la tabla original.

## Registrar un abandono

1. Marcar que un participante se retira.
2. Confirmar la acción porque afecta el torneo.
3. En Eliminación Directa, otorgar la victoria al rival por `walkover`.
4. Mostrar el abandono en la llave y el historial sin un marcador ficticio.

## Pausar y reanudar

1. El usuario elige pausar el torneo.
2. La app guarda configuración, equipos, partidos, resultados y estado actual.
3. El torneo aparece entre los torneos en curso, no en el historial final.
4. Al reanudar, se abre la misma etapa y marcador guardados.

## Finalizar

1. El último partido determina al campeón o la tabla lo define, según el formato.
2. La app muestra un resumen y solicita confirmación.
3. El torneo pasa a `completed`.
4. El historial conserva una copia de sólo lectura.

## Consultar historial

1. Elegir `Historial`.
2. Ver únicamente torneos completados.
3. Abrir un torneo para consultar resultados, tablas y llave.
4. Mostrar al campeón destacado en dorado.
5. No ofrecer acciones de edición.
