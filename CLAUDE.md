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
  **Al jardín de la república → Dm**; **El olvidado → Em**; **Santiago, chango moreno → E** (escrita en G, la pasó Mateo);
  **La simple → F#m**; **Cachito → E**; **Tía Rosa → A** (Mateo la piensa "en C" porque la estrofa arranca en C:
  se cargó `tono: "C"` → `miTono: "A"`, o sea 3 semitonos abajo; confirmar si quería subirla a A desde G).
- Más tonos de Mateo: Bohemio guitarrero → F#m, Dejame que me vaya → F#m, Alma de rezabaile → Dm,
  Balderrama → Am (se agregó la repetición final a las estrofas que no la tenían), Chacarera para mi vuelta → Em,
  La sachapera → A (se agregó intro A E7).
- Nueva: *El monte qué lindo está* (chacarera, escrita en C → miTono B, intro F# B al principio y entre estrofas,
  sin signos de exclamación). El autoscroll arranca en velocidad 2.
- Nueva: *Gato del festival* (ritmo Gato, Em; la segunda parte usa los mismos acordes que la primera).
  Para confirmar: "polvaredal" (¿polvareda?).
- En la portada dice "creado por MATEO MISSIO". Cada canción tiene buscador (lupa) para saltar a otra.
  El resto todavía en el tono del PDF (`miTono` = `tono`), falta que Mateo pase los suyos.
- Corregidos errores de tipeo del PDF. Para confirmar con Mateo: en *Perfume de carnaval*,
  "y de mi amor verdadero" terminaba en G en el PDF; se puso Bm.
- La ubicación de acordes se sacó del PDF; puede haber alguno corrido.

## Publicación
- Repo público `matemi-dev/cancionero` (rama `main`), publicado con GitHub Pages en
  https://matemi-dev.github.io/cancionero/
- Para actualizar: commit + `git push` (la sesión de GitHub ya está guardada en la compu). Pages tarda 1–2 min.
- Mateo prefiere que le **confirme qué voy a hacer antes de acciones públicas o irreversibles**.
  Crear repos por API lo bloquea el permiso de Claude Code: eso lo hace Mateo en github.com.

## Pendiente
- Tonos de las demás canciones y canciones nuevas para agregar.
- Más adelante: versión imprimible (A4 o librito A5) desde los mismos datos.
