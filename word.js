/* Sacar el texto de archivos de Word (.doc viejo y .docx), sin librerías */

// ---------- .docx: es un zip que adentro tiene word/document.xml ----------
async function textoDocx(buf) {
  const v = new DataView(buf);
  let fin = -1;                                   // "fin del directorio central" del zip
  for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--)
    if (v.getUint32(i, true) === 0x06054b50) { fin = i; break; }
  if (fin < 0) throw new Error("no es un .docx");
  let p = v.getUint32(fin + 16, true);
  for (let k = v.getUint16(fin + 10, true); k > 0; k--) {
    const metodo = v.getUint16(p + 10, true), tam = v.getUint32(p + 20, true);
    const lNombre = v.getUint16(p + 28, true), lExtra = v.getUint16(p + 30, true), lComent = v.getUint16(p + 32, true);
    const nombre = new TextDecoder().decode(new Uint8Array(buf, p + 46, lNombre));
    if (nombre === "word/document.xml") {
      const local = v.getUint32(p + 42, true);
      const ini = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
      let datos = new Uint8Array(buf, ini, tam);
      if (metodo === 8) {
        const flujo = new Blob([datos]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
        datos = new Uint8Array(await new Response(flujo).arrayBuffer());
      }
      return xmlATexto(new TextDecoder().decode(datos));
    }
    p += 46 + lNombre + lExtra + lComent;
  }
  throw new Error("el .docx no tiene texto");
}
function xmlATexto(xml) {
  const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const lineas = [];
  for (const par of doc.getElementsByTagNameNS(W, "p")) {
    let l = "";
    for (const el of par.getElementsByTagNameNS(W, "*")) {
      if (el.parentNode.localName !== "r") continue;          // (las tabulaciones de formato no cuentan)
      if (el.localName === "t") l += el.textContent;
      else if (el.localName === "tab") l += "\t";
      else if (el.localName === "br" || el.localName === "cr") l += "\n";
    }
    lineas.push(l);
  }
  return lineas.join("\n");
}

// ---------- .doc (Word 97–2003): archivo compuesto con el texto repartido en "piezas" ----------
function textoDoc(buf) {
  const v = new DataView(buf), u8 = new Uint8Array(buf);
  if (v.getUint32(0, true) !== 0xE011CFD0) throw new Error("no es un .doc");
  const tamSector = 1 << v.getUint16(30, true), tamMini = 1 << v.getUint16(32, true);
  const pos = (s) => (s + 1) * tamSector;

  // tabla de sectores (FAT)
  const difat = [];
  for (let i = 0; i < 109; i++) { const s = v.getInt32(76 + i * 4, true); if (s >= 0) difat.push(s); }
  for (let d = v.getInt32(68, true), n = v.getUint32(72, true); d >= 0 && n > 0; n--) {
    const porSector = tamSector / 4 - 1;
    for (let i = 0; i < porSector; i++) { const s = v.getInt32(pos(d) + i * 4, true); if (s >= 0) difat.push(s); }
    d = v.getInt32(pos(d) + porSector * 4, true);
  }
  const fat = [];
  for (const s of difat) for (let i = 0; i < tamSector / 4; i++) fat.push(v.getInt32(pos(s) + i * 4, true));

  const cadena = (ini, tabla) => { const r = []; for (let s = ini; s >= 0 && r.length <= tabla.length; s = tabla[s]) r.push(s); return r; };
  const juntar = (origen, sectores, tam, desde) => {
    const out = new Uint8Array(sectores.length * tam);
    sectores.forEach((s, i) => out.set(origen.subarray(desde(s), desde(s) + tam), i * tam));
    return out;
  };
  const enteros = (bytes) => { const dv = new DataView(bytes.buffer); const r = []; for (let i = 0; i + 4 <= bytes.length; i += 4) r.push(dv.getInt32(i, true)); return r; };

  // directorio: nombre → dónde empieza y cuánto mide cada flujo
  const dir = juntar(u8, cadena(v.getInt32(48, true), fat), tamSector, pos);
  const dv = new DataView(dir.buffer);
  const entradas = {};
  for (let o = 0; o + 128 <= dir.length; o += 128) {
    const largo = dv.getUint16(o + 64, true);
    if (largo < 2) continue;
    entradas[new TextDecoder("utf-16le").decode(dir.subarray(o, o + largo - 2))] =
      { ini: dv.getInt32(o + 116, true), tam: dv.getUint32(o + 120, true) };
  }
  const miniFlujo = juntar(u8, cadena(entradas["Root Entry"].ini, fat), tamSector, pos);
  const minifat = enteros(juntar(u8, cadena(v.getInt32(60, true), fat), tamSector, pos));
  const corte = v.getUint32(56, true);
  const flujo = (nombre) => {
    const e = entradas[nombre];
    if (!e) throw new Error("falta " + nombre);
    const datos = e.tam < corte ? juntar(miniFlujo, cadena(e.ini, minifat), tamMini, (s) => s * tamMini)
                                : juntar(u8, cadena(e.ini, fat), tamSector, pos);
    return datos.subarray(0, e.tam);
  };

  // FIB y tabla de piezas
  const wd = flujo("WordDocument");
  const wv = new DataView(wd.buffer);
  const tabla = flujo(wv.getUint16(0x0A, true) & 0x0200 ? "1Table" : "0Table");
  const tv = new DataView(tabla.buffer);
  const ccpTexto = wv.getUint32(76, true);
  let i = wv.getUint32(0x01A2, true);                         // fcClx
  while (tabla[i] === 1) i += 3 + tv.getUint16(i + 1, true);  // saltear formatos
  if (tabla[i] !== 2) throw new Error("no encontré el texto del .doc");
  const n = (tv.getUint32(i + 1, true) - 4) / 12;
  i += 5;
  let texto = "";
  for (let k = 0; k < n; k++) {
    const cp0 = tv.getUint32(i + k * 4, true), cp1 = tv.getUint32(i + (k + 1) * 4, true);
    let fc = tv.getUint32(i + (n + 1) * 4 + k * 8 + 2, true);
    const comprimido = fc & 0x40000000;
    fc &= 0x3FFFFFFF;
    texto += comprimido
      ? new TextDecoder("windows-1252").decode(wd.subarray(fc / 2, fc / 2 + (cp1 - cp0)))
      : new TextDecoder("utf-16le").decode(wd.subarray(fc, fc + 2 * (cp1 - cp0)));
  }
  return texto.slice(0, ccpTexto)
    .replace(/\x13[^\x14\x15]*\x14/g, "").replace(/\x13[^\x15]*\x15/g, "").replace(/\x15/g, "")   // campos
    .replace(/[\r\x0b\x0c]/g, "\n").replace(/\x07/g, "\t")
    .replace(/[\x00-\x08\x0e-\x1f]/g, "");
}
