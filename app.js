/* Cancionero pal' fogón — lógica de la app */

// ---------- Notas y transporte ----------
const SOSTENIDOS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const BEMOLES    = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NOMBRE_MAYOR = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const NOMBRE_MENOR = ["Cm", "C#m", "Dm", "Ebm", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "Bbm", "Bm"];
const TONOS_CON_BEMOL = new Set(["F", "Bb", "Eb", "Ab", "Db", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"]);

function indiceNota(n) {
  let i = SOSTENIDOS.indexOf(n);
  if (i < 0) i = BEMOLES.indexOf(n);
  return i;
}
function parseTono(t) {
  const m = /^([A-G][#b]?)(m?)$/.exec(t.trim());
  return { raiz: indiceNota(m[1]), menor: m[2] === "m" };
}
function nombreTono(raiz, menor) {
  return (menor ? NOMBRE_MENOR : NOMBRE_MAYOR)[((raiz % 12) + 12) % 12];
}
function transportarTono(tono, semis) {
  const { raiz, menor } = parseTono(tono);
  return nombreTono(raiz + semis, menor);
}
function distancia(desde, hasta) {
  let d = ((parseTono(hasta).raiz - parseTono(desde).raiz) % 12 + 12) % 12;
  return d > 6 ? d - 12 : d;          // el camino más corto: entre -5 y +6
}

const RE_ACORDE = /^([A-G][#b]?)((?:[Mm]aj7|[Mm]aj9|[Mm]aj|M|min|m|dim|aug|sus2|sus4|sus|°|\+)?(?:\d{1,2}\+?)?(?:sus[24]|add\d{1,2}|[b#]\d{1,2})*(?:\((?:maj|add|sus|[b#])?\d{1,2}\))?)(?:\/([A-G][#b]?))?$/;
const RE_EXTRA  = /^(\(?[xX]\d+\)?|[-–·|/]|\.{3}|\(bis\))$/;

function transportarNota(n, semis, bemol) {
  const i = indiceNota(n);
  return (bemol ? BEMOLES : SOSTENIDOS)[((i + semis) % 12 + 12) % 12];
}
function transportarAcorde(tok, semis, bemol) {
  const m = RE_ACORDE.exec(tok);
  if (!m || semis % 12 === 0) return tok;   // en el tono escrito, el acorde va tal cual
  let s = transportarNota(m[1], semis, bemol) + m[2];
  if (m[3]) s += "/" + transportarNota(m[3], semis, bemol);
  return s;
}

const esAcorde = (t) => RE_ACORDE.test(t);
function esLineaAcordes(linea) {
  const toks = linea.trim().split(/\s+/).filter(Boolean);
  return toks.length > 0 && toks.some(esAcorde) && toks.every((t) => esAcorde(t) || RE_EXTRA.test(t));
}
const RE_NOMBRE_SECCION = /^(intro|verse|verso|estrofa|chorus|estribillo|coro|bridge|puente|solo|outro|final|pre-?chorus|riff|interludio)[\s\d]*:?$/i;
function esSeccion(linea) {
  const t = linea.trim();
  if (RE_NOMBRE_SECCION.test(t)) return true;
  return /[A-ZÁÉÍÓÚÑ]{3}/.test(t) && !/[a-záéíóúñ]/.test(t) && !esLineaAcordes(t);
}
function etiquetaConAcordes(linea) {
  const m = /^([^:]{2,45}):\s*(.+)$/.exec(linea.trim());
  return m && esLineaAcordes(m[2]) ? { etq: m[1], acordes: m[2] } : null;
}

// ---------- Dibujar una canción ----------
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function htmlAcordesSueltos(texto, semis, bemol) {
  return texto.trim().split(/\s+/).map((t) =>
    esAcorde(t) ? `<span class="c">${esc(transportarAcorde(t, semis, bemol))}</span>`
                : `<span class="c sep">${esc(t)}</span>`
  ).join("");
}

// Acordes encima de la letra: cada acorde se "pega" al comienzo de la palabra que tiene abajo
// (si caen varios sobre la misma palabra, van juntos). Así, cuando la línea no entra en el
// celular y salta de renglón, el acorde viaja con su palabra y nunca se parte una palabra.
function htmlLineaConAcordes(lineaAcordes, letra, semis, bemol) {
  const L = letra.length;
  const grupos = new Map();   // posición en la letra → acordes que van ahí
  for (const m of lineaAcordes.matchAll(/\S+/g)) {
    let i = m.index;
    if (i >= L) i = L;
    else if (/\s/.test(letra[i])) { while (i < L && /\s/.test(letra[i])) i++; }
    else { while (i > 0 && !/\s/.test(letra[i - 1])) i--; }
    const nombre = esAcorde(m[0]) ? transportarAcorde(m[0], semis, bemol) : m[0];
    if (!grupos.has(i)) grupos.set(i, []);
    grupos.get(i).push(nombre);
  }
  const posiciones = [...grupos.keys()].sort((a, b) => a - b);
  let html = esc(letra.slice(0, posiciones[0]));
  posiciones.forEach((p, k) => {
    const trozo = letra.slice(p, k + 1 < posiciones.length ? posiciones[k + 1] : L);
    const corte = trozo.search(/\s/);
    const palabra = corte < 0 ? trozo : trozo.slice(0, corte);
    const resto = corte < 0 ? "" : trozo.slice(corte);
    html += `<span class="seg"><span class="c">${esc(grupos.get(p).join(" "))}</span>` +
      `<span class="w">${palabra ? esc(palabra) : "​"}</span></span>` + esc(resto);
  });
  return html;
}

function htmlCancion(cancion, semis) {
  const tonoActual = transportarTono(cancion.tono, semis);
  const bemol = TONOS_CON_BEMOL.has(tonoActual);
  const lineas = cancion.letra.replace(/^\n+|\s+$/g, "").split("\n");
  let html = "";

  for (let i = 0; i < lineas.length; i++) {
    const l = lineas[i].replace(/\s+$/, "");
    const sig = lineas[i + 1] !== undefined ? lineas[i + 1].replace(/\s+$/, "") : "";

    if (!l.trim()) { html += `<div class="estrofa"></div>`; continue; }

    const lab = etiquetaConAcordes(l);
    if (lab) {
      html += `<p class="ln solo"><span class="etq">${esc(lab.etq)}</span>${htmlAcordesSueltos(lab.acordes, semis, bemol)}</p>`;
      continue;
    }
    if (esLineaAcordes(l)) {
      const sigEsLetra = sig.trim() && !esLineaAcordes(sig) && !esSeccion(sig) && !etiquetaConAcordes(sig);
      if (sigEsLetra) {
        html += `<p class="ln con-acordes">${htmlLineaConAcordes(l, sig, semis, bemol)}</p>`;
        i++;
      } else {
        html += `<p class="ln solo">${htmlAcordesSueltos(l, semis, bemol)}</p>`;
      }
      continue;
    }
    if (esSeccion(l)) { html += `<p class="seccion">${esc(l.trim().replace(/:$/, ""))}</p>`; continue; }
    if (/^\(.*\)$/.test(l.trim())) { html += `<p class="ln nota">${esc(l.trim())}</p>`; continue; }
    html += `<p class="ln">${esc(l)}</p>`;
  }
  return html;
}

// ---------- Estado y preferencias ----------
const guardar = (k, v) => { try { localStorage.setItem("cancionero." + k, JSON.stringify(v)); } catch (e) {} };
const leer = (k, def) => { try { const v = localStorage.getItem("cancionero." + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } };

const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sinAcentos = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// ---------- Los dos cancioneros ----------
// Folklore viene de canciones.js. Rock se carga desde archivos .txt y queda guardado en este dispositivo.
const RITMOS_ROCK = ["Rock en castellano", "Rock en inglés"];
function preparar(lista, modo) {
  return lista
    .map((c) => ({ ...c, modo, id: (modo === "rock" ? "rock/" : "") + slug(c.titulo), base: distancia(c.tono, c.miTono) }))
    .sort((a, b) => sinSignos(a.titulo).localeCompare(sinSignos(b.titulo), "es"))
    .map((c, i) => ({ ...c, num: String(i + 1).padStart(2, "0") }));
}
const sinSignos = (t) => t.replace(/^[¿¡"'(]+/, "");   // "¿Para quién…" se ordena en la P
const folklore = preparar(CANCIONES, "folklore");
let rock = preparar(leer("rock", []), "rock");
let modo = leer("modo", "folklore") === "rock" ? "rock" : "folklore";
let canciones = modo === "rock" ? rock : folklore;
document.documentElement.dataset.modo = modo;

let ritmoElegido = "Todos";
let actual = null;      // canción abierta
let semis = 0;          // transporte actual respecto de lo escrito
let tamLetra = leer("tamLetra", 18);

const $ = (id) => document.getElementById(id);

// ---------- Tema claro/oscuro ----------
function aplicarTema(t) {
  if (t) document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
  colorBarra();
}
// la barra del celular toma el color del papel (cambia con claro/oscuro y con folklore/rock)
function colorBarra() {
  document.querySelector('meta[name="theme-color"]').content =
    getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
}
aplicarTema(leer("tema", null));
$("btn-tema").onclick = () => {
  const ahoraOscuro = getComputedStyle(document.documentElement).colorScheme.includes("dark");
  const nuevo = ahoraOscuro ? "light" : "dark";
  guardar("tema", nuevo);
  aplicarTema(nuevo);
};

// ---------- Lista ----------
function dibujarRitmos() {
  const ritmos = modo === "rock" ? ["Todos", ...RITMOS_ROCK] :
    ["Todos", ...new Set(canciones.map((c) => c.ritmo))].sort((a, b) =>
      a === "Todos" ? -1 : b === "Todos" ? 1 : a.localeCompare(b, "es"));
  $("ritmos").innerHTML = ritmos.map((r) =>
    `<button class="chip" role="tab" aria-selected="${r === ritmoElegido}" data-r="${esc(r)}">${esc(r)}</button>`).join("");
}
$("ritmos").onclick = (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  ritmoElegido = b.dataset.r;
  dibujarRitmos();
  dibujarLista();
};

function buscar(texto, ritmo = "Todos") {
  const q = sinAcentos(texto.trim());
  const enTitulo = (c) => sinAcentos(c.titulo).includes(q);
  return canciones
    .filter((c) => (ritmo === "Todos" || c.ritmo === ritmo) &&
      (!q || sinAcentos(c.titulo + " " + c.ritmo + " " + c.letra).includes(q)))
    .sort((a, b) => (q ? enTitulo(b) - enTitulo(a) : 0));   // primero las que lo tienen en el título
}
const htmlFilas = (lista) => lista.map((c) => `
    <li><a href="#/${c.id}">
      <span class="num">${c.num}</span>
      <span class="nombre">${esc(c.titulo)}<small>${esc(c.ritmo)}</small></span>
      <span class="tono-b">${esc(c.miTono)}</span>
    </a></li>`).join("");

function dibujarLista() {
  const visibles = buscar($("buscar").value, ritmoElegido);
  $("lista").innerHTML = htmlFilas(visibles);
  $("vacio").hidden = visibles.length > 0 || canciones.length === 0;
}
$("buscar").oninput = dibujarLista;

function dibujarTodo() {
  $("cantidad").textContent = `${canciones.length} canciones`;
  dibujarRitmos();
  dibujarLista();
  $("lista").hidden = canciones.length === 0;
  $("cargar").hidden = modo !== "rock";
  $("cargar-vacio").hidden = canciones.length > 0;
}

// ---------- Selector Folklore / Rock ----------
function aplicarModo(m) {
  modo = m;
  guardar("modo", m);
  document.documentElement.dataset.modo = m;
  canciones = m === "rock" ? rock : folklore;
  ritmoElegido = m === "rock" ? RITMOS_ROCK[0] : "Todos";   // rock abre en "Rock en castellano"
  $("portada-sub").textContent = m === "rock" ? "de rock" : "pal' fogón";
  document.querySelectorAll(".modo").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.modo === m)));
  colorBarra();
  dibujarTodo();
}
document.querySelector(".modos").onclick = (e) => {
  const b = e.target.closest(".modo");
  if (b && b.dataset.modo !== modo) { $("buscar").value = ""; aplicarModo(b.dataset.modo); }
};

// ---------- Cargar canciones de rock desde .txt ----------
// Formato: acordes encima de la letra (como en los .txt de siempre). Si el primer renglón es
// "Artista - Canción" se usa como subtítulo. El tono sale del primer acorde y el idioma de la letra.
async function leerTexto(archivo) {
  const buf = await archivo.arrayBuffer();
  try { return new TextDecoder("utf-8", { fatal: true }).decode(buf); }
  catch (e) { return new TextDecoder("windows-1252").decode(buf); }   // los .txt viejos de Windows
}
function sinTabs(l) {
  let out = "";
  for (const ch of l) out += ch === "\t" ? " ".repeat(8 - (out.length % 8)) : ch;
  return out;
}
// Nombres bien escritos para los .txt de la carpeta CANCIONERO (clave = nombre del archivo, sin acentos)
const TITULOS_ROCK = {
  "alixia": "Canción de Alicia",
  "all-my-loving": "All My Loving",
  "ana-no-duerme": "Ana no duerme",
  "can-t-buy-me-love": "Can't Buy Me Love",
  "eiti-leda": "Eiti Leda",
  "esoy-parado-en-el-medio-de-la-vida": "Estoy parado en el medio de la vida",
  "fade-awey": "Fade Away",
  "half-the-world-away": "Half the World Away",
  "i-gotta-blues": "I Gotta Blues",
  "i-m-so-tired": "I'm So Tired",
  "la-coluina": "La colina de la vida",
  "la-colina": "La colina de la vida",
  "para-quie-n-canto-yo-entonces": "¿Para quién canto yo entonces?",
  "por-propvar-el-vio-i-el-agua-salada": "Por probar el vino y el agua salada",
  "promesas-sobre-el-videth": "Promesas sobre el bidet",
  "quizas-porque": "Quizás porque",
  "savoy-truffle": "Savoy Truffle",
  "shine-a-light": "Shine a Light",
  "todos-los-dias-un-poco": "Todos los días un poco",
  "us-and-them": "Us and Them",
  "no-te-animas-a-despegar": "No te animás a despegar",
  "como-mata-ek-viento-norte": "Como mata el viento norte",
  "para-quien-canto-yo-entonces": "¿Para quién canto yo entonces?",
};
const corregirTitulo = (t) => TITULOS_ROCK[slug(t)] || t;

const PAL_ES =/\b(que|de|el|la|los|las|y|un|una|se|por|con|mi|tu|es|del|para|como|pero|yo|nos)\b/g;
const PAL_EN = /\b(the|you|and|my|your|to|is|it|of|be|on|for|that|all|what|love|she|he|don't|can't|i'm)\b/g;

function armarCancion(nombreArchivo, texto) {
  let lineas = texto.replace(/\r\n?/g, "\n").split("\n").map((l) => sinTabs(l).replace(/\s+$/, ""));
  const i0 = lineas.findIndex((l) => l.trim());
  if (i0 < 0) return null;
  let sub = "";
  if (/\s[-–]\s/.test(lineas[i0]) && !esLineaAcordes(lineas[i0]) && !etiquetaConAcordes(lineas[i0])) {
    sub = lineas[i0].trim();
    lineas = lineas.slice(i0 + 1);
  }
  let tono = "C";
  for (const l of lineas) {
    const e = etiquetaConAcordes(l);
    const t = e ? e.acordes : esLineaAcordes(l) ? l : null;
    if (!t) continue;
    const m = RE_ACORDE.exec(t.trim().split(/\s+/).find(esAcorde));
    tono = m[1] + (/^m(?!aj)/.test(m[2]) ? "m" : "");
    break;
  }
  const soloLetra = lineas.filter((l) => l.trim() && !esLineaAcordes(l) && !etiquetaConAcordes(l)).join(" ").toLowerCase();
  const es = (soloLetra.match(PAL_ES) || []).length, en = (soloLetra.match(PAL_EN) || []).length;
  const nombre = nombreArchivo.replace(/\.(txt|docx?)$/i, "").trim();
  return {
    titulo: corregirTitulo(nombre.charAt(0).toUpperCase() + nombre.slice(1)),
    sub,
    ritmo: en > es ? "Rock en inglés" : "Rock en castellano",
    tono, miTono: tono,
    letra: lineas.join("\n").replace(/^\n+|\s+$/g, ""),
  };
}

function guardarRock(crudo) {
  guardar("rock", crudo);
  rock = preparar(crudo, "rock");
  if (modo === "rock") canciones = rock;
  dibujarTodo();
}
$("archivos").onchange = async (e) => {
  const archivos = [...e.target.files];
  e.target.value = "";
  const porId = new Map(leer("rock", []).map((c) => [slug(c.titulo), c]));
  let cargadas = 0;
  const salteados = [];
  for (const f of archivos) {
    const ext = (/\.(txt|docx?)$/i.exec(f.name) || [, ""])[1].toLowerCase();
    let c = null;
    try {
      const texto = ext === "txt" ? await leerTexto(f)
        : ext === "docx" ? await textoDocx(await f.arrayBuffer())
        : ext === "doc" ? textoDoc(await f.arrayBuffer()) : null;
      if (texto !== null) c = armarCancion(f.name, texto);
    } catch (err) {}
    if (!c) { salteados.push(f.name); continue; }
    porId.set(slug(c.titulo), c);
    cargadas++;
  }
  guardarRock([...porId.values()]);
  $("cargar-msj").hidden = false;
  $("cargar-msj").textContent = `Cargué ${cargadas} ${cargadas === 1 ? "canción" : "canciones"}.` +
    (salteados.length ? ` No pude leer: ${salteados.join(", ")} (van archivos .txt, .doc o .docx).` : "");
};

// Cambios a una canción de rock guardada (por ahora, el tono)
function cambiarRock(id, cambio) {
  const crudo = leer("rock", []);
  guardarRock(crudo.map((c) => ("rock/" + slug(c.titulo) === id ? { ...c, ...cambio } : c)));
}

// Buscador dentro de una canción: para saltar a otra sin volver a la lista
function abrirBuscador(abrir) {
  $("panel-buscar").hidden = !abrir;
  $("btn-buscar").setAttribute("aria-expanded", String(abrir));
  if (abrir) {
    $("buscar-en-cancion").value = "";
    dibujarResultados();
    $("buscar-en-cancion").focus();
  }
}
function dibujarResultados() {
  $("resultados").innerHTML = htmlFilas(buscar($("buscar-en-cancion").value).filter((c) => c !== actual));
}
$("btn-buscar").onclick = () => abrirBuscador($("panel-buscar").hidden);
$("buscar-en-cancion").oninput = dibujarResultados;
$("buscar-en-cancion").onkeydown = (e) => {
  if (e.key === "Escape") abrirBuscador(false);
  if (e.key === "Enter") { const a = $("resultados").querySelector("a"); if (a) location.hash = a.getAttribute("href"); }
};

// ---------- Vista de canción ----------
function dibujarCancion() {
  const tono = transportarTono(actual.tono, semis);
  $("tono-actual").textContent = tono;
  $("tono-reset").hidden = semis === actual.base;
  $("tono-guardar").hidden = actual.modo !== "rock" || semis === actual.base;
  $("c-letra").innerHTML = htmlCancion(actual, semis);
}
function pintarCabecera(c) {
  $("c-titulo").textContent = c.titulo;
  $("c-numero").textContent = `N° ${c.num}`;
  $("c-sub").textContent = c.sub || "";
  $("c-sub").hidden = !c.sub;
  $("c-ritmo").textContent = `${c.ritmo} — mi tono ${c.miTono}`;
}

// En rock se puede guardar el tono que elegiste (las de folklore se editan en canciones.js)
function refrescarActual() {
  actual = rock.find((x) => x.id === actual.id);
  pintarCabecera(actual);
  dibujarCancion();
}
$("tono-guardar").onclick = () => {
  cambiarRock(actual.id, { miTono: transportarTono(actual.tono, semis) });
  refrescarActual();
};
function cambiarTono(d) {
  semis += d;
  if (semis - actual.base > 11) semis -= 12;
  if (semis - actual.base < -11) semis += 12;
  dibujarCancion();
}
$("tono-mas").onclick = () => cambiarTono(1);
$("tono-menos").onclick = () => cambiarTono(-1);
$("tono-reset").onclick = () => { semis = actual.base; dibujarCancion(); };

function aplicarTamLetra() { document.documentElement.style.setProperty("--fs", tamLetra + "px"); }
aplicarTamLetra();
$("letra-mas").onclick = () => { tamLetra = Math.min(32, tamLetra + 2); guardar("tamLetra", tamLetra); aplicarTamLetra(); };
$("letra-menos").onclick = () => { tamLetra = Math.max(12, tamLetra - 2); guardar("tamLetra", tamLetra); aplicarTamLetra(); };

// Desplazamiento automático (para tocar sin manos)
let scrollActivo = false, ultimoT = 0, acumulado = 0;
function pasoScroll(t) {
  if (!scrollActivo) return;
  if (ultimoT) {
    acumulado += ((t - ultimoT) / 1000) * (+$("scroll-vel").value * 9);
    if (acumulado >= 1) {
      const px = Math.floor(acumulado);
      acumulado -= px;
      window.scrollBy(0, px);
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) return pararScroll();
    }
  }
  ultimoT = t;
  requestAnimationFrame(pasoScroll);
}
function pararScroll() {
  scrollActivo = false; ultimoT = 0;
  $("btn-scroll").setAttribute("aria-pressed", "false");
  $("scroll-vel").hidden = true;
}
$("btn-scroll").onclick = () => {
  if (scrollActivo) return pararScroll();
  scrollActivo = true;
  $("btn-scroll").setAttribute("aria-pressed", "true");
  $("scroll-vel").hidden = false;
  requestAnimationFrame(pasoScroll);
};

// Línea de progreso del pie: cuánto de la canción ya pasó
function actualizarProgreso() {
  if (!actual) return;
  const total = document.body.scrollHeight - window.innerHeight;
  $("progreso").style.width = (total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0) + "%";
}
window.addEventListener("scroll", actualizarProgreso, { passive: true });

// Que la pantalla no se apague mientras tocás
let candado = null;
async function mantenerPantalla(on) {
  try {
    if (on && "wakeLock" in navigator && !candado) {
      candado = await navigator.wakeLock.request("screen");
      candado.addEventListener("release", () => (candado = null));
    } else if (!on && candado) { await candado.release(); candado = null; }
  } catch (e) {}
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && actual) mantenerPantalla(true);
});

// ---------- Navegación (#/id-de-la-cancion) ----------
let scrollLista = 0;
function ruta() {
  const id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  const c = folklore.find((x) => x.id === id) || rock.find((x) => x.id === id);
  pararScroll();
  if (c) {
    if (!actual) scrollLista = window.scrollY;
    if (c.modo !== modo) aplicarModo(c.modo);   // un link a una canción de rock abre el modo rock
    actual = c;
    semis = c.base;                       // siempre arranca en TU tono
    pintarCabecera(c);
    abrirBuscador(false);
    dibujarCancion();
    actualizarProgreso();
    $("vista-lista").hidden = true;
    $("vista-cancion").hidden = false;
    document.title = c.titulo + " · Cancionero";
    window.scrollTo(0, 0);
    mantenerPantalla(true);
  } else {
    actual = null;
    $("vista-cancion").hidden = true;
    $("vista-lista").hidden = false;
    document.title = modo === "rock" ? "Cancionero de rock" : "Cancionero pal' fogón";
    window.scrollTo(0, scrollLista);
    mantenerPantalla(false);
  }
}
let vinoDeLista = false;   // si entraste desde la lista, "volver" es como el botón atrás del celu
$("btn-volver").onclick = () => (vinoDeLista ? history.back() : (location.hash = ""));
window.addEventListener("hashchange", () => { vinoDeLista = !actual; ruta(); });

// las que ya estaban cargadas con el nombre del archivo también se corrigen
{
  const crudo = leer("rock", []);
  if (crudo.some((c) => corregirTitulo(c.titulo) !== c.titulo))
    guardarRock(crudo.map((c) => ({ ...c, titulo: corregirTitulo(c.titulo) })));
}
aplicarModo(modo);
ruta();

// ---------- Funcionar sin internet ----------
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
