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

const RE_ACORDE = /^([A-G][#b]?)((?:maj7|maj9|maj|min|m|dim|aug|sus2|sus4|sus|°|\+)?(?:\d{1,2})?(?:sus[24]|add\d{1,2}|[b#]\d{1,2})*)(?:\/([A-G][#b]?))?$/;
const RE_EXTRA  = /^(\(?[xX]\d+\)?|[-–·|/]|\.{3}|\(bis\))$/;

function transportarNota(n, semis, bemol) {
  const i = indiceNota(n);
  return (bemol ? BEMOLES : SOSTENIDOS)[((i + semis) % 12 + 12) % 12];
}
function transportarAcorde(tok, semis, bemol) {
  const m = RE_ACORDE.exec(tok);
  if (!m) return tok;
  let s = transportarNota(m[1], semis, bemol) + m[2];
  if (m[3]) s += "/" + transportarNota(m[3], semis, bemol);
  return s;
}

const esAcorde = (t) => RE_ACORDE.test(t);
function esLineaAcordes(linea) {
  const toks = linea.trim().split(/\s+/).filter(Boolean);
  return toks.length > 0 && toks.some(esAcorde) && toks.every((t) => esAcorde(t) || RE_EXTRA.test(t));
}
function esSeccion(linea) {
  const t = linea.trim();
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

const canciones = CANCIONES
  .map((c) => ({ ...c, id: slug(c.titulo), base: distancia(c.tono, c.miTono) }))
  .sort((a, b) => a.titulo.localeCompare(b.titulo, "es"))
  .map((c, i) => ({ ...c, num: String(i + 1).padStart(2, "0") }));

let ritmoElegido = "Todos";
let actual = null;      // canción abierta
let semis = 0;          // transporte actual respecto de lo escrito
let tamLetra = leer("tamLetra", 18);

const $ = (id) => document.getElementById(id);

// ---------- Tema claro/oscuro ----------
function aplicarTema(t) {
  if (t) document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
  const oscuro = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.querySelector('meta[name="theme-color"]').content = oscuro ? "#1b1917" : "#ece7dc";
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
  const ritmos = ["Todos", ...new Set(canciones.map((c) => c.ritmo))].sort((a, b) =>
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

function dibujarLista() {
  const q = sinAcentos($("buscar").value.trim());
  const visibles = canciones.filter((c) =>
    (ritmoElegido === "Todos" || c.ritmo === ritmoElegido) &&
    (!q || sinAcentos(c.titulo + " " + c.ritmo + " " + c.letra).includes(q)));
  $("lista").innerHTML = visibles.map((c) => `
    <li><a href="#/${c.id}">
      <span class="num">${c.num}</span>
      <span class="nombre">${esc(c.titulo)}<small>${esc(c.ritmo)}</small></span>
      <span class="tono-b">${esc(c.miTono)}</span>
    </a></li>`).join("");
  $("vacio").hidden = visibles.length > 0;
}
$("buscar").oninput = dibujarLista;

// ---------- Vista de canción ----------
function dibujarCancion() {
  const tono = transportarTono(actual.tono, semis);
  $("tono-actual").textContent = tono;
  $("tono-reset").hidden = semis === actual.base;
  $("c-letra").innerHTML = htmlCancion(actual, semis);
}
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
  const c = canciones.find((x) => x.id === id);
  pararScroll();
  if (c) {
    if (!actual) scrollLista = window.scrollY;
    actual = c;
    semis = c.base;                       // siempre arranca en TU tono
    $("c-titulo").textContent = c.titulo;
    $("c-numero").textContent = `N° ${c.num} · ${c.ritmo}`;
    $("c-ritmo").textContent = `${c.ritmo} — mi tono ${c.miTono}`;
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
    document.title = "Cancionero pal' fogón";
    window.scrollTo(0, scrollLista);
    mantenerPantalla(false);
  }
}
let vinoDeLista = false;   // si entraste desde la lista, "volver" es como el botón atrás del celu
$("btn-volver").onclick = () => (vinoDeLista ? history.back() : (location.hash = ""));
window.addEventListener("hashchange", () => { vinoDeLista = !actual; ruta(); });

$("cantidad").textContent = `${canciones.length} canciones`;
dibujarRitmos();
dibujarLista();
ruta();

// ---------- Funcionar sin internet ----------
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
