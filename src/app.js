const icons = { crown:'♛', plus:'＋', history:'↺', back:'←', users:'♣', shield:'♠', trophy:'♛', league:'♜', groups:'♣', knockout:'⚡', check:'✓', next:'›', close:'×', music:'♫' };
const formats = [
  { id:'liga', title:'Liga', icon:'league', note:'Todos contra todos', desc:'Cada equipo se enfrenta al resto y suma puntos en la tabla.' },
  { id:'grupos', title:'Fase de grupos', icon:'groups', note:'Grupos de 2 o más', desc:'Sorteamos grupos equilibrados para luego clasificar a los mejores.' },
  { id:'eliminatoria', title:'Eliminación directa', icon:'knockout', note:'Llave y cruces', desc:'Partidos a todo o nada hasta coronar al campeón.' }
];
const modes = [
  { id:'one', title:'1 vs 1', name:'Individual', desc:'2 jugadores como mínimo' },
  { id:'two', title:'2 vs 2', name:'Parejas', desc:'Equipos de 2 jugadores' },
  { id:'three', title:'3 vs 3', name:'Tríos', desc:'Equipos de 3 · incluye Puntas' }
];
const history = [{name:'Copa del Asado',date:'12 jul 2026',players:8,winner:'Nico'},{name:'Torneo del Viernes',date:'28 jun 2026',players:6,winner:'La Negra'}];
const state = { screen:'home', step:1, names:[''], mode:'', format:'', groups:[], music:false, score:{ us:0, them:0, target:30 } };
const root = document.querySelector('#root');
const esc = value => value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const players = () => state.names.map(n=>n.trim()).filter(Boolean);
const button = (type, content, cls='') => `<button data-action="${type}" class="${cls}">${content}</button>`;

function header(){ return `<header class="topbar">${button('home',`<span class="brand-mark">${icons.crown}</span><span><strong>TRUCO</strong><small>DE BARRIO</small></span>`,'brand')}${button('music',`${icons.music}<span>${state.music?'Chamamé sonando':'Ambientación'}</span>`,`sound-btn ${state.music?'active':''}`)}</header>`; }
function home(){ return `<section class="hero"><div class="eyebrow"><span></span> LA MESA ESTÁ SERVIDA <span></span></div><h1>Donde hay amigos,<br>hay <em>revancha.</em></h1><p>Armá el torneo, repartí las cartas y que hable la mesa.</p><div class="home-actions">${button('create',`${icons.plus} Crear torneo ${icons.next}`,'primary huge')}${button('scoreboard','Anotador','secondary huge')}${button('history',`${icons.history} Ver historial`,'secondary huge')}</div><div class="table-rule"><span>♠</span><span>03</span><span>♥</span><span>06</span><span>♣</span></div></section>`; }
function steps(){ return `<div class="steps">${[['1','Modalidad'],['2','Jugadores'],['3','Formato'],['4','Sorteo']].map(([n,l],i)=>`<div class="step ${state.step>=+n?'on':''}"><span>${state.step>+n?icons.check:n}</span><small>${l}</small></div>${i<3?`<div class="line ${state.step>+n?'on':''}"></div>`:''}`).join('')}</div>`; }
function heading(icon, kicker, title, subtitle){ return `<div class="panel-heading"><span class="section-icon">${icons[icon]}</span><div><p>${kicker}</p><h2>${title}</h2><span>${subtitle}</span></div></div>`; }
function modePicker(){ return `<div class="panel wide-panel">${heading('users','PASO 1 DE 4','Elegí la modalidad','El formato del torneo se elige después.')}<div class="mode-grid">${modes.map(m=>`<button data-mode="${m.id}" class="mode-card ${state.mode===m.id?'selected':''}"><span class="mode-number">${m.title}</span><b>${m.name}</b><small>${m.desc}</small><span class="radio">${state.mode===m.id?'<span></span>':''}</span></button>`).join('')}</div><div class="panel-footer"><button data-action="mode-next" class="primary" ${!state.mode?'disabled':''}>Cargar jugadores ${icons.next}</button></div></div>`; }
function participants(){
  const count=players().length, size={one:1,two:2,three:3}[state.mode], min=size*2;
  const valid=count>=min&&count<=48&&count%size===0;
  const help=count<min?`Necesitás al menos ${min} jugadores para esta modalidad.`:count%size?`La cantidad debe ser múltiplo de ${size} para formar los equipos.`:count>48?'El máximo es de 48 jugadores.':'';
  return `<div class="panel">${heading('users','PASO 2 DE 4','¿Quiénes juegan?','Sumá a todos los participantes de esta noche.')}<div class="roster-head"><b>PARTICIPANTES</b><span>${count} ${count===1?'jugador':'jugadores'}</span></div><div class="name-list">${state.names.map((n,i)=>`<div class="name-row"><span>${String(i+1).padStart(2,'0')}</span><input data-name="${i}" value="${esc(n)}" placeholder="Nombre o apodo"><button data-remove="${i}" aria-label="Eliminar">${icons.close}</button></div>`).join('')}</div>${button('add',`${icons.plus} Agregar participante`,'add-player')}${!valid?`<p class="helper">${help}</p>`:''}<div class="panel-footer"><button data-action="players-next" class="primary" ${!valid?'disabled':''}>Elegir formato ${icons.next}</button></div></div>`;
}
function formatPicker(){ const count=players().length; return `<div class="panel wide-panel">${heading('shield',`PASO 3 DE 4 · ${count} JUGADORES`,'Elegí cómo se juega','Cada formato tiene su propia mística.')}<div class="format-grid">${formats.map(f=>`<button data-format="${f.id}" class="format-card ${state.format===f.id?'selected':''}"><span class="format-icon">${icons[f.icon]}</span><span class="format-title">${f.title}</span><span class="format-note">${f.note}</span><span class="format-desc">${f.desc}</span><span class="radio">${state.format===f.id?'<span></span>':''}</span></button>`).join('')}</div><div class="panel-footer"><button data-action="confirm" class="primary" ${!state.format?'disabled':''}>${state.format==='grupos'?'Realizar sorteo':'Confirmar formato'} ${icons.next}</button></div></div>`; }
function draw(){ const list=[...players()].sort(()=>Math.random()-.5), count=Math.floor(list.length/2); state.groups=Array.from({length:count},()=>[]); list.forEach((p,i)=>state.groups[i%count].push(p)); }
function cards(items,prefix){ return `<div class="groups-grid">${items.map((group,i)=>`<article class="group"><header>${prefix} ${prefix==='GRUPO'?String.fromCharCode(65+i):i+1}</header>${group.map((p,j)=>`<div><span>${j+1}</span><b>${esc(p)}</b></div>`).join('')}</article>`).join('')}</div>`; }
function result(){ const ps=players(), label=formats.find(f=>f.id===state.format).title, mode=modes.find(m=>m.id===state.mode).title; let body=''; if(state.format==='grupos') body=cards(state.groups,'GRUPO'); if(state.format==='eliminatoria'){const pairs=[];ps.forEach((p,i)=>i%2===0?pairs.push([p]):pairs.at(-1).push(p));body=cards(pairs,'CRUCE');} if(state.format==='liga') body=`<div class="league-list">${ps.map((p,i)=>`<div><span>${i+1}</span><b>${esc(p)}</b><small>0 PTS</small></div>`).join('')}</div>`; return `<div class="panel wide-panel result-panel"><div class="result-badge">${icons.trophy}</div><p class="result-kicker">TORNEO LISTO · ${mode}</p><h2>${label}</h2><p class="result-copy">${state.format==='grupos'?`El sorteo armó ${state.groups.length} grupos para ${ps.length} jugadores.`:`Formato confirmado para ${ps.length} jugadores.`}</p>${body}<div class="finish-actions">${state.format==='grupos'?button('redraw','Volver a sortear','secondary'):''}${button('home',`Guardar torneo ${icons.check}`,'primary')}</div></div>`; }
function flow(){ return `<section class="flow-wrap">${button('back',`${icons.back} Volver`,'back')}${steps()}${state.step===1?modePicker():state.step===2?participants():state.step===3?formatPicker():result()}</section>`; }

function tallyGroup(value){ const marks=['top','right','bottom','left','slash']; return `<span class="tally-group">${marks.slice(0,value).map(mark=>`<i class="${mark}"></i>`).join('')}</span>`; }
function tally(score){ let left=score, html=''; while(left>0){const amount=Math.min(left,5);html+=tallyGroup(amount);left-=amount;} return html||'<span class="empty-score">Tocá para empezar</span>'; }
function scoreboard(){ const {us,them,target}=state.score; return `<section class="scoreboard-wrap"><div class="scoreboard-top">${button('home',`${icons.back} Volver`,'back')}<div class="target-switch"><span>PARTIDA A</span><button data-target="15" class="${target===15?'active':''}">15</button><button data-target="30" class="${target===30?'active':''}">30</button></div></div><div class="scoreboard"><header><span>ANOTADOR LIBRE</span><strong>Primero en llegar a ${target}</strong></header><div class="score-sides"><button class="score-side us" data-score="us" aria-label="Sumar un punto a Nosotros"><span class="side-label">Nos</span><strong>${us}</strong><div class="tallies">${tally(us)}</div><small>TOCÁ PARA SUMAR</small></button><div class="score-divider"><span>${target}</span><i></i></div><button class="score-side them" data-score="them" aria-label="Sumar un punto a Ellos"><span class="side-label">Ellos</span><strong>${them}</strong><div class="tallies">${tally(them)}</div><small>TOCÁ PARA SUMAR</small></button></div><footer><button data-minus="us" aria-label="Restar punto a Nosotros">− Nos</button>${button('reset-score','Nueva partida','reset-score')}<button data-minus="them" aria-label="Restar punto a Ellos">Ellos −</button></footer></div></section>`; }
function historyView(){ return `<section class="flow-wrap">${button('home',`${icons.back} Volver al inicio`,'back')}<div class="panel history-panel">${heading('history','MEMORIAS DE LA MESA','Historial','Las glorias y derrotas que no se olvidan.')}<div class="history-list">${history.map(h=>`<article><div class="history-cup">${icons.trophy}</div><div><h3>${h.name}</h3><p>${h.date} · ${h.players} jugadores</p></div><div class="winner"><small>CAMPEÓN</small><b>${h.winner}</b></div></article>`).join('')}</div><p class="demo-note">Historial de muestra — los próximos torneos aparecerán acá.</p></div></section>`; }
function render(){ root.innerHTML=`<main class="app-shell"><div class="backdrop"></div>${header()}${state.screen==='home'?home():state.screen==='create'?flow():state.screen==='scoreboard'?scoreboard():historyView()}</main>`; }
function goHome(){ Object.assign(state,{screen:'home',step:1,mode:'',format:'',groups:[]}); render(); }

root.addEventListener('input',e=>{ if(e.target.dataset.name!==undefined) state.names[+e.target.dataset.name]=e.target.value; });
root.addEventListener('keydown',e=>{ if(e.target.dataset.name!==undefined&&e.key==='Enter'){state.names.push('');render();setTimeout(()=>document.querySelector('.name-row:last-child input')?.focus());} });
root.addEventListener('click',e=>{
  const remove=e.target.closest('[data-remove]'), format=e.target.closest('[data-format]'), mode=e.target.closest('[data-mode]'), score=e.target.closest('[data-score]'), minus=e.target.closest('[data-minus]'), target=e.target.closest('[data-target]'), action=e.target.closest('[data-action]')?.dataset.action;
  if(remove){state.names.splice(+remove.dataset.remove,1);if(!state.names.length)state.names=[''];render();return;}
  if(format){state.format=format.dataset.format;render();return;}
  if(mode){state.mode=mode.dataset.mode;render();return;}
  if(score){const side=score.dataset.score;if(state.score[side]<state.score.target)state.score[side]++;render();return;}
  if(minus){const side=minus.dataset.minus;state.score[side]=Math.max(0,state.score[side]-1);render();return;}
  if(target){state.score.target=+target.dataset.target;state.score.us=Math.min(state.score.us,state.score.target);state.score.them=Math.min(state.score.them,state.score.target);render();return;}
  if(action==='home')goHome();
  if(action==='music'){state.music=!state.music;render();}
  if(action==='create'){state.screen='create';render();}
  if(action==='scoreboard'){state.screen='scoreboard';render();}
  if(action==='history'){state.screen='history';render();}
  if(action==='add'&&state.names.length<48){state.names.push('');render();setTimeout(()=>document.querySelector('.name-row:last-child input')?.focus());}
  if(action==='back'){if(state.step===1)goHome();else{state.step--;render();}}
  if(action==='mode-next'&&state.mode){state.step=2;render();}
  if(action==='players-next'){state.step=3;render();}
  if(action==='confirm'&&state.format){if(state.format==='grupos')draw();state.step=4;render();}
  if(action==='redraw'){draw();render();}
  if(action==='reset-score'){state.score.us=0;state.score.them=0;render();}
});
render();
