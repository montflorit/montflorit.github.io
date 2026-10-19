# 4. Estado del mapa en el enlace

Fecha: 2026-10-19 · Estado: aceptado

## Contexto

Juanjo preguntó si el mapa de la riera admitía parámetros para abrirlo en una
posición, con una ortofoto determinada o con los afluentes, y pidió que los
tuviera y que un botón de compartir enviara el estado actual del mapa. Hasta
ahora solo había `#punt=lat,lon`, del menú de un punto (ADR 0002).

## Decisión

- **El estado va en el fragmento de la dirección** (`riera/#…`), con la forma
  `clave=valor` separada por `&`. No se envía al servidor, funciona igual en la
  página catalana y en la castellana, y no recarga la página al cambiarlo.
  - `mapa=zoom/lat/lon`: la vista, como en OpenStreetMap (zoom con un decimal,
    coordenadas con cinco).
  - `fons=osm|carrers|topo|orto`: el fondo.
  - `any=1946|1956|1970-77|1983-89|1994-97|2000-03|2010|actual`: la ortofoto de
    la regleta; sin `fons`, ya implica la ortofoto.
  - `capes=barri,gorgs,afluents,xarxa,inundable10,inundable100,inundable500`:
    las capas activas, exactamente esas; `capes=` vacío, ninguna. Sin el
    parámetro, las de siempre: solo los límites del barrio (desde la 1.4.0, el
    torrent dels Gorgs ya no sale al abrir el mapa; Juanjo: «por defecto no se
    mostrará el torrent dels gorgs y sus afluentes»). La riera y los
    puntos de referencia no son opcionales; los nacimientos del torrent dels
    Gorgs y del de Can Domènec van con su capa.
  - `dibuixos=0`: el dibujo oculto con el botón del ojo.
  - `punt=lat,lon`: el punto marcado.
- **Cada parámetro es opcional**: lo que falta queda como al abrir el mapa sin
  nada. Los enlaces anteriores (`#punt=lat,lon`) siguen funcionando igual.
- **El enlace compartido lleva siempre el fondo y las capas**, también si son
  las de por defecto, para que se vea lo mismo aunque un día cambie lo que sale
  al abrir el mapa.
- **Botón de compartir** en el mapa, bajo el del ojo (icono `share-2` de
  Lucide): abre el menú de compartir del dispositivo con el mensaje entero
  («Mapa de la riera de Sant Cugat», con el año de la ortofoto si es el fondo)
  y el enlace; donde no hay menú (Firefox y Chrome de escritorio en Linux), el
  mensaje se copia solo y sale «Enlace copiado» junto al botón.
- **Botón para restablecer** (Juanjo: «añade un botón para devolverlo todo a
  su posicion original»), bajo el de compartir (icono `rotate-ccw` de Lucide):
  vuelve a la vista, el fondo, la ortofoto actual y las capas de al abrir el
  mapa sin nada, muestra el dibujo, quita el punto marcado y borra el fragmento
  de la dirección, para que al recargar no vuelva el estado anterior. La
  pantalla completa no cambia: es la forma de ver la página, no el mapa.
- **El enlace de un punto** (menú del botón derecho) lleva también el fondo,
  la ortofoto y las capas que se ven; el mapa se abre centrado en el punto.
- Si se cambia el fragmento sin recargar (pegar otro enlace en la misma
  pestaña), el mapa se pone como dice.

## Alternativas descartadas

- **Parámetros de consulta (`?fons=…`)**: GitHub Pages los admite, pero cambiar
  uno recarga la página, y el fragmento ya se usaba para el punto.
- **Actualizar la dirección mientras se mueve el mapa**, como OpenStreetMap: no
  se pidió; queda como posible mejora.

## Validación

19-10-2026, con Playwright en Chromium, Firefox y WebKit, sobre el servidor
local: sin parámetros, con el `#punt=` antiguo, con todos los parámetros, con
`any` solo, con `capes=` vacío y `dibuixos=0`, y con valores erróneos (se
ignoran sin errores). El enlace del botón de compartir, abierto de nuevo, deja
el mapa igual (vista, fondo, ortofoto, capas y dibujo); cambiar el fragmento
sin recargar también se aplica. Restablecer deja el mapa igual que al abrirlo
sin nada, también tras recargar. `probar-web` en escritorio, móvil y tableta,
temas claro y oscuro, y axe-core (WCAG 2.1 AA) sin fallos. El menú de compartir
del dispositivo no se ha probado en un móvil real.
