# Reglas del torneo

Este documento describe el comportamiento esperado del dominio. Cuando una regla todavía no está cerrada se marca como **pendiente** y no debe asumirse al implementarla.

## 1. Conceptos

- **Jugador:** persona física que participa.
- **Equipo:** unidad que disputa un partido; contiene uno, dos o tres jugadores según la modalidad.
- **Participante competitivo:** equipo o jugador individual que ocupa una posición en un grupo, calendario o llave.
- **Partido:** enfrentamiento entre dos participantes competitivos.
- **Torneo:** competencia completa con configuración, participantes, etapas y partidos.

Separar jugador de equipo permite usar las mismas reglas de Liga, Grupos y Eliminación sin importar si se juega 1v1, 2v2 o 3v3.

## 2. Modalidades

Antes de cargar o armar el torneo se elige una modalidad:

| Modalidad | Integrantes por equipo | Jugadores mínimos para un partido |
| --- | ---: | ---: |
| Individual | 1 | 2 |
| Parejas | 2 | 4 |
| Tríos | 3 | 6 |

La modalidad no modifica las reglas del formato competitivo. Sí modifica:

- cómo se forman los equipos;
- cuántos jugadores físicos se necesitan;
- cómo se muestran los nombres;
- la disponibilidad de Puntas, exclusiva de 3v3.

El torneo acepta hasta 48 jugadores físicos. La cantidad cargada debe ser divisible por los integrantes de cada equipo, salvo que se defina un mecanismo de suplentes.

Los equipos pueden cargarse armados por el usuario o sortearse automáticamente desde la lista de jugadores. El sorteo es la opción recomendada y debe aparecer primero, pero ambas alternativas están disponibles.

## 3. Puntaje de partido

Cada torneo elige un puntaje objetivo:

- 15 puntos; o
- 30 puntos.

Un partido termina cuando un participante alcanza el objetivo. No se admiten empates como resultado final.

Cada partido tendrá un anotador accesible desde su tarjeta. El anotador debe mostrar como mínimo:

- participantes y sus integrantes;
- marcador actual;
- objetivo del partido;
- estado del partido;
- indicación de la ronda actual cuando corresponda;
- acción para corregir puntos antes de confirmar el resultado.

El marcador se registra tocando el lado de cada participante. Cada toque suma un punto a ese lado; no se ingresa directamente un resultado final. Para corregir errores, el anotador debe permitir deshacer el último punto. Cada modificación reinicia el temporizador de la mano.

### Detección del final de una mano

- Una mano comienza con el primer punto registrado después del cierre de la anterior.
- Termina automáticamente después de 20 segundos sin tocar el anotador.
- Cada punto agregado o deshecho reinicia el contador.
- El cambio entre ronda redonda y Puntas se evalúa al cerrar la mano, nunca inmediatamente después de un toque.
- La interfaz debe mostrar el tiempo restante.
- También debe permitir cerrar la mano manualmente para no obligar a esperar 20 segundos.

## 4. Puntas en modalidad 3v3

Puntas sólo aplica a partidos 3v3.

1. El partido comienza con manos `redonda`.
2. Cuando al cerrar una mano al menos un equipo tiene más de 5 puntos, la mano siguiente es `puntas`.
3. Desde entonces se alternan manos `redonda` y `puntas`.
4. La app anuncia el tipo de la próxima mano sólo después de cerrar la actual.
5. La alternancia se mantiene hasta que algún equipo alcanza 24 puntos.
6. Desde 24 puntos en adelante, las manos restantes son `redonda` hasta terminar el partido.

```text
puntas -> redonda -> puntas -> redonda -> ... -> 24 -> redonda
```

El cierre de mano por 20 segundos de inactividad evita recomendar Puntas mientras todavía se registran puntos de la mano actual.

## 5. Fase de Grupos

### Distribución

- Cada grupo debe tener al menos dos participantes competitivos.
- Entre el grupo más grande y el más pequeño puede haber como máximo un participante de diferencia.
- La app debe recomendar una distribución conveniente según la cantidad total.
- El usuario puede elegir entre todas las distribuciones válidas calculadas por la app.
- Ejemplos confirmados: 10 participantes pueden formar 5 grupos de 2; 9 pueden formar 3 grupos de 3.

La recomendación debe priorizar grupos equilibrados y una combinación compatible con la cantidad de clasificados elegida. Las demás distribuciones válidas permanecen disponibles.

### Tabla

Por cada partido de grupo:

- victoria: 3 puntos de tabla;
- derrota: 0 puntos de tabla;
- no hay empate.

La diferencia de puntos se calcula así:

```text
diferencia = puntos a favor - puntos en contra
```

Ejemplo: un resultado 30–17 produce `+13` para el ganador y `-13` para el perdedor.

Orden confirmado de la tabla:

1. Puntos de tabla.
2. Diferencia de puntos.

Si dos participantes continúan igualados en puntos de tabla y diferencia de puntos para una posición relevante, disputan un partido adicional a 15 puntos. Este desempate no agrega puntos ni diferencia a la tabla original. Si el empate no afecta clasificación, campeonato o siembra, no es obligatorio jugarlo.

**Pendiente:** definir cómo se resuelve un empate total entre tres o más participantes.

### Clasificación

Antes del sorteo se define cuántos participantes avanzan a la etapa eliminatoria. Para construir una llave completa sin pases libres, el total de clasificados debe ser una potencia de dos:

```text
2, 4, 8, 16 o 32
```

Una cantidad simplemente par, como 6 o 10, no alcanza para formar una llave tradicional completa.

## 6. Liga

Todos los participantes compiten en una tabla común. La puntuación y la diferencia de puntos son las mismas que en grupos.

Antes de comenzar, el usuario elige entre:

- **Campeón por tabla:** gana quien termina primero después de los desempates necesarios.
- **Playoffs:** una cantidad configurada de participantes pasa a Eliminación Directa. Debe ser una potencia de dos y no puede superar el total.

**Pendiente:** definir si todos juegan una vez contra todos o puede haber ida y vuelta.

## 7. Eliminación Directa

La llave usa rondas deportivas tradicionales:

- 2 participantes: Final.
- 4 participantes: Semifinales.
- 8 participantes: Cuartos de final.
- 16 participantes: Octavos de final.
- 32 participantes: Dieciseisavos de final.

El ganador de cada partido avanza y el perdedor queda eliminado.

Cuando la cantidad inicial no es una potencia de dos, se permiten pases libres (`byes`). La app los asigna para que la ronda siguiente tenga una cantidad válida. Un participante con `bye` avanza sin registrar un partido jugado.

### Abandono

Si un participante se retira después de comenzar:

- el partido se cierra como victoria del rival por abandono (`walkover`);
- el rival avanza en una etapa eliminatoria;
- no se inventa un marcador;
- el abandono queda visible en el historial.

**Pendiente:** decidir cómo afecta un abandono a partidos ya disputados, partidos futuros y tablas de Liga o Grupos.

## 8. Cruces después de grupos

Los cruces deben premiar la posición obtenida y evitar, cuando sea posible, enfrentar inmediatamente a participantes del mismo grupo.

Regla confirmada para dos grupos con igual cantidad de clasificados:

```text
1.º Grupo A vs último clasificado Grupo B
2.º Grupo A vs penúltimo clasificado Grupo B
...
1.º Grupo B vs último clasificado Grupo A
```

Para tres o más grupos hace falta definir un algoritmo de siembra general.

**Pendiente:** definir si se usa ranking global, sorteo condicionado o una matriz fija para torneos con más de dos grupos.

## 9. Estados del torneo

Un torneo puede estar:

- `draft`: configuración incompleta;
- `ready`: configuración y sorteo confirmados;
- `in_progress`: al menos un partido iniciado;
- `paused`: guardado para continuar después;
- `completed`: campeón confirmado y sólo lectura.

Un torneo finalizado no permite editar resultados.

## 10. Historial

El historial muestra únicamente torneos finalizados. El detalle debe incluir:

- configuración y modalidad;
- participantes y equipos;
- resultados de todos los partidos;
- tablas de Liga o Grupos;
- llave eliminatoria completa cuando exista;
- campeón destacado en dorado.
