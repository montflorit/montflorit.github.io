# 2. Mapa de la riera de Sant Cugat

Fecha: 2026-10-14 · Estado: aceptado

## Contexto

Juanjo preguntó dónde nace la riera de Sant Cugat y pidió un mapa con el
recorrido, completo también bajo Sant Cugat, donde la riera se cubrió.

## Decisión

- **Nacimiento: la font del Rabassalet**, según la Gran Enciclopèdia
  Catalana («nascuda a la font del Rabassalet»). La ficha 08205-933 del
  Inventari del Patrimoni Cultural de la Diputació (revisada el 21-02-2025)
  dice que está seca. El agua sigue, según OpenStreetMap, por un torrente sin
  nombre, el torrent de Can Cortès y las rieras de Can Vilallonga y de Can
  Trabal.
- **Tramos a cielo abierto: OpenStreetMap.** Seguidos aguas abajo con la API
  de OpenStreetMap (vía a vía, por el sentido del cauce). Contrastados con el
  mapa 1:5.000 de 1987 en lo que cubre la hoja: la riera de Can Trabal se
  aparta 14 m de mediana (31 m como máximo) y la riera desde la Pollancreda,
  23 m (27 m).
- **Tramo cubierto de Sant Cugat** (unos 1,7 km), en dos partes:
  - Desde la Rambla del Celler hasta la Pollancreda: el cauce del *Mapa
    topogràfic de Catalunya 1:5.000*, hoja 287-122 «Sant Cugat del Vallès»
    (ICC, vuelo de mayo de 1987, CC BY 4.0, Cartoteca Digital del ICGC),
    cuando aún iba abierto. La hoja se ajustó a las coordenadas actuales
    pasando de ED50 a WGS84 con un cambio de datum de tres parámetros
    (−87, −98, −121 m); comprobado superponiéndola a la ortofoto de 1970-1977,
    donde coinciden la curva de la rambla y las calles.
  - Desde el golf hasta la Rambla del Celler, donde en 1987 ya estaba
    cubierto: **reconstruido** sobre la ortofoto de 1970-1977 del ICGC, donde
    aún se ve el cauce con vegetación, y las cotas de la hoja de 1987, que
    bajan sobre ese recorrido (122, 119,3, 116,9, 116,2 y 114,4 m). Pasa a
    unos 30 m del pollancre de «l'antiga riera de Can Mora» del inventario de
    la Diputació (ficha 08205-761). Juanjo corrigió a mano el trazado sobre
    las ortofotos con el editor (ADR 0003). Se marca como aproximado.
  - Descartado: el eje de la Base topogràfica 1:5.000 del ICGC para tramos
    cubiertos. Es esquemático; Juanjo vio en la ortofoto que no coincidía con
    el recorrido real.
- **Fechas de la cobertura**: 1978, 1981 y desde 1995, según el nomenclátor
  del Ajuntament de Sant Cugat («Rambla del Celler»).
- **Fondo por defecto: OpenStreetMap** (Juanjo lo pidió); también el mapa
  estándar y el topográfico del ICGC, la ortofoto actual y las de 1945-1946,
  1956-1957 y 1970-1977, y por encima el mapa de 1987.
- **Límites de Montflorit**: los de Temps a Montflorit.
- **Zoom**: hasta el nivel 21; la rueda, suave (Juanjo: «los saltos son
  demasiado grandes»). Por encima del 19, las teselas de OpenStreetMap y del
  ICGC se amplían sin más detalle; las ortofotos antiguas sí ganan detalle.
- **Pantalla completa** (Juanjo: «quiero que el mapa pueda verse a pantalla
  completa»): botón bajo el zoom. Donde el navegador lo permite (ordenador,
  Android), la pantalla completa del sistema; en el iPhone, que solo la da a
  los vídeos, el mapa ocupa toda la ventana. Esc o el mismo botón salen.
- **Menú de un punto** con el botón derecho o manteniendo el dedo (Juanjo:
  «pueden salir varias opciones como copiar coordenadas o abrir en google
  maps? puedes añadir más funcionalidades»): las coordenadas, a qué distancia
  pasa la riera (y si allí va cubierta), copiar las coordenadas, compartir un
  enlace al punto (menú de compartir del dispositivo; si no hay, se copia) y
  abrirlo en Google Maps, OpenStreetMap o el visor del ICGC. Con el teclado,
  la tecla de menú o Mayús+F10 lo abren en el centro del mapa. Un enlace
  `riera/#punt=lat,lon` abre el mapa centrado en el punto, marcado. Son enlaces
  que sigue quien quiere: el mapa no pide nada a esos servicios.
- **Leyenda debajo del mapa**, en HTML: en el móvil no tapa el mapa y se lee
  sin depender del color (cada estado tiene su trazo).
- **Leaflet servido desde la propia web**, no desde un CDN.

## Riesgos

- El tramo reconstruido es aproximado: solo lo confirmarían los proyectos de
  las obras de cobertura, en el Arxiu Municipal de Sant Cugat.
- Si OpenStreetMap o el ICGC cambian sus servicios, un fondo dejaría de verse;
  el trazado se sigue viendo con los demás.
- El servidor de teselas de OpenStreetMap admite un uso ligero como este, sin
  garantía de servicio.
