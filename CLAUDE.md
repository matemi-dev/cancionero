# Cancionero pal' fogón — app

App web instalable en el celular (PWA, funciona sin internet) con el cancionero de folklore de Mateo:
acordes sobre la letra, cada canción abre en **su tono** y se puede transportar con − / +.

## Reglas
- **Nunca modificar ni sobrescribir** los originales en `..\` (`Cancionero de folcklore.pdf`, el `.indd`, etc.).
  Son la fuente; todo lo nuevo va en esta carpeta.
- Sin dependencias ni build: HTML + CSS + JS puros. En la compu no hay Python ni Node.
- Textos de la app y comentarios en español rioplatense.

## Estética (elegida por Mateo: "opción B")
Fraunces light (serif, títulos y letra) + JetBrains Mono (acordes, números, etiquetas en mayúsculas),
papel crema `#ece7dc`, tinta `#262320`, acento terracota `#a0452a` (oscuro: `#1b1917` / `#e0835c`).
Lista estilo tracklist (`01 Título ··· tono`) con filetes finos; pie con línea de progreso y botón redondo.
Las fuentes vienen de Google Fonts y el service worker las guarda para usar sin señal.

## Archivos
- `canciones.js` — las canciones. Cada una: `titulo`, `ritmo`, `tono` (en el que está escrita la letra),
  `miTono` (en el que la canta Mateo; la app abre ahí). Letra con acordes ENCIMA de la letra;
  `Etiqueta: acordes` = acordes sueltos; línea TODA EN MAYÚSCULAS = sección; `(bis)` = nota.
- `app.js` — lista, búsqueda, filtros por ritmo, transporte, tamaño de letra, autoscroll, wake lock.
  Los acordes se pegan al inicio de la palabra de abajo (no se cortan palabras al saltar de renglón).
- `sw.js` — offline (red primero, copia guardada si no hay señal o tarda >3 s). Si se agrega un archivo, sumarlo a `ARCHIVOS`.
- `.claude/servidor.ps1` + `.claude/launch.json` — vista previa local en http://localhost:8765.

## Estado (11/10/2026)
- 23 canciones pasadas del PDF (la *Zamba de amor en vuelo* repetida quedó una sola).
- Tonos definidos por Mateo: **Entra a mi pago sin golpear → Am** (intro E7 Am, "Fue mucho mi penar" en F);
  **Al jardín de la república → Dm**; **El olvidado → Em**.
  El resto todavía en el tono del PDF (`miTono` = `tono`), falta que Mateo pase los suyos.
- Corregidos errores de tipeo del PDF. Para confirmar con Mateo: en *Perfume de carnaval*,
  "y de mi amor verdadero" terminaba en G en el PDF; se puso Bm.
- La ubicación de acordes se sacó del PDF; puede haber alguno corrido.

## Pendiente
- Tonos de las demás canciones y canciones nuevas para agregar.
- Publicar para instalar en el celu (opción propuesta: GitHub Pages). Falta saber Android/iPhone y si tiene cuenta de GitHub.
- Más adelante: versión imprimible (A4 o librito A5) desde los mismos datos.
