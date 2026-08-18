# Modelo de datos inicial

El modelo es conceptual y no depende de React, React Native, una base de datos o el mecanismo de almacenamiento.

## Entidades

### Tournament

```ts
type Tournament = {
  id: string;
  name: string;
  status: 'draft' | 'ready' | 'in_progress' | 'paused' | 'completed';
  mode: 'one_vs_one' | 'two_vs_two' | 'three_vs_three';
  format: 'league' | 'groups' | 'knockout';
  targetScore: 15 | 30;
  teamCreation: 'manual' | 'random';
  leagueOutcome: 'standings' | 'playoffs' | null;
  playerIds: string[];
  teamIds: string[];
  stageIds: string[];
  championTeamId: string | null;
  createdAt: string;
  completedAt: string | null;
};
```

### Player

```ts
type Player = {
  id: string;
  displayName: string;
};
```

### Team

```ts
type Team = {
  id: string;
  name: string;
  playerIds: string[];
};
```

La cantidad de `playerIds` debe coincidir con la modalidad del torneo.

### Stage

```ts
type Stage = {
  id: string;
  type: 'league' | 'group' | 'knockout';
  name: string;
  order: number;
  status: 'pending' | 'in_progress' | 'completed';
  groupIds: string[];
  roundIds: string[];
};
```

Un torneo puede contener más de una etapa. Por ejemplo, grupos seguidos de eliminación.

### Group

```ts
type Group = {
  id: string;
  name: string;
  teamIds: string[];
  matchIds: string[];
};
```

### Round

```ts
type Round = {
  id: string;
  name: string;
  order: number;
  matchIds: string[];
};
```

### Match

```ts
type Match = {
  id: string;
  stageId: string;
  groupId: string | null;
  roundId: string | null;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'walkover';
  resolution: 'score' | 'walkover' | 'bye' | 'tiebreaker' | null;
  currentThreeVsThreeRound: 'round' | 'puntas' | null;
  currentHandId: string | null;
  winnerTeamId: string | null;
  startedAt: string | null;
  completedAt: string | null;
};
```

### Hand

Una mano permite determinar la alternancia de Puntas y conservar los cambios del anotador.

```ts
type Hand = {
  id: string;
  matchId: string;
  order: number;
  type: 'round' | 'puntas';
  homePoints: number;
  awayPoints: number;
  status: 'in_progress' | 'completed';
  lastInteractionAt: string;
  completedAt: string | null;
};
```

El temporizador se deriva de `lastInteractionAt`. Al restaurar un torneo pausado, no debe cerrarse una mano usando el tiempo durante el cual la app estuvo cerrada; el contador se reanuda al volver al anotador.

### Standing

`Standing` puede calcularse desde los partidos y no necesita persistirse inicialmente.

```ts
type Standing = {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  tablePoints: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDifference: number;
  position: number;
};
```

## Reglas estructurales

- La lógica de dominio trabaja con IDs y datos; no accede al DOM.
- Las tablas se derivan de partidos completados para evitar inconsistencias.
- Un resultado confirmado actualiza el avance de la llave mediante una función de dominio.
- El almacenamiento debe guardar el torneo completo de forma atómica.
- La interfaz web y una futura interfaz móvil deben consumir las mismas funciones puras.

## Funciones de dominio esperadas

```ts
validateTournamentConfiguration()
createTeams()
suggestGroupLayouts()
drawGroups()
generateRoundRobinMatches()
calculateStandings()
seedKnockoutStage()
generateKnockoutBracket()
recordMatchScore()
advanceKnockoutWinner()
getThreeVsThreeRoundState()
startHand()
addPoint()
undoLastPoint()
completeHand()
resolveWalkover()
completeTournament()
```
