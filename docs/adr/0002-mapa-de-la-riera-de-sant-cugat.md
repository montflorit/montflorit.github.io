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
- **Trazado: la red hidrográfica de la base topográfica 1:5.000 del ICGC**
  (cambio del 14-10-2026). Se lee de las teselas vectoriales del mapa estándar
  del ICGC (`mapa-base2/vt`, nivel 15, capa `waterway`, atributo
  `escala: 5m`), que traen el nombre de cada tramo y si va cubierto
  (`brunnel: tunnel`). El recorrido se sigue de la font del Rabassalet al
  Ripoll por el camino más corto de esa red; los trozos que la tesela corta se
  sueldan a menos de 1 m y los extremos sueltos se unen a menos de 25 m.
  Nombres del ICGC: torrent de Can Cortès, rieras de Can Bova, de Can
  Vilallonga, de Can Trabal y de Can Mòra, torrent de Saladrigues y riera de
  Sant Cugat.
  - Motivo (Juanjo): bajo Sant Cugat, la línea de puntos del callejero del
    ICGC «no coincide exactamente con la nuestra, parece que en algunos sitios
    debe haber sido desviada al ser soterrada»; y fuera de Sant Cugat, «el
    recorrido actual se ve como una mala aproximación». Comprobado sobre la
    ortofoto actual: la red del ICGC sigue los meandros del cauce; la de
    OpenStreetMap lo simplifica en rectas (hasta 36 m de diferencia en la riera
    de Can Bova).
  - Sustituye el trazado anterior: OpenStreetMap en los tramos abiertos y, bajo
    Sant Cugat, el cauce antiguo del mapa 1:5.000 de 1987 y una reconstrucción
    sobre las ortofotos de 1970-1977, corregida a mano por Juanjo. Aquello era
    el curso de antes de cubrirla; lo de ahora es el curso actual de la riera
    cubierta, que en algunos tramos se desvió (se aparta hasta 120 m del
    antiguo, en el paso por el torrent de Saladrigues). Antes se había probado
    el eje de la capa WMS `170_hidrografia_connexions_l`, que es esquemático;
    los datos vectoriales son los que dibuja el callejero.
  - **Dos huecos** de la red del ICGC, con OpenStreetMap: unos 570 m en
    Cerdanyola (entre las longitudes 2,143 y 2,149) y los últimos 128 m hasta
    el Ripoll. Por ellos el archivo es ODbL.
  - **Cubierta**: los tramos `tunnel` de 60 m o más. Los más cortos son pasos
    bajo un camino o una carretera y se dibujan abiertos. Bajo Sant Cugat van
    cubiertos unos 1,5 km (riera de Can Mòra, torrent de Saladrigues y riera de
    Sant Cugat); hay además dos tramos cubiertos en la cabecera (138 m del
    torrent de Can Cortès y 149 m de la riera de Can Vilallonga).
  - Las ortofotos antiguas se quedan como fondos: enseñan el cauce de antes de
    cubrirlo.
- **Tramo cubierto de Sant Cugat: la capa «Rieres i torrents» del Ajuntament**
  (cambio del 14-10-2026, aprobado por Juanjo: «sí, aplícalo todo»). Juanjo
  pidió investigar el alcantarillado porque la ACA y el ICGC no coincidían. El
  Geoportal municipal (`geociutat.santcugat.cat`) publica como GeoJSON abierto
  `ma_rieres_torrents` (con el tipo «Curs Fluvial Principal Soterrat») y la red
  de pluviales `clav_pluvials_xarxa` (con la sección de cada tubo).
  - El soterrado municipal (torrent de Can Trabal, que aquí se rotula riera de
    Can Mòra, y riera de Sant Cugat; 1,7 km) va sobre los colectores grandes:
    el 82 % a menos de 15 m de uno de 1,5 m o más (secciones de 2,5 m, 3×2 m y
    5×2 m); el del ICGC, el 40 %.
  - Coincide con el trazado que Juanjo corrigió a mano sobre las ortofotos
    (mediana 2 m, máximo 11 m): la riera se cubrió por su lecho de siempre.
    Sustituirlo por el del ICGC fue un error; la línea de puntos del ICGC en el
    centro es otro conducto, de colectores menores.
  - La red de la ACA es esquemática (1:50.000, de 2000): queda a 26 m de mediana
    del soterrado municipal. El texto del mapa lo dice así.
  - Licencia: la capa figura como pública en el Geoportal, sin licencia
    indicada; se cita como fuente.
- **Fuera la capa del mapa de 1987** (Juanjo: «quita la capa de 1987»): solo
  cubría el centro de Sant Cugat y las ortofotos antiguas ya enseñan el curso
  de antes; pesaba 1 MB.
- **Nombres y nombres alternativos** (Juanjo vio que OpenStreetMap llama riera
  de Can Trabal a lo que el mapa llama riera de Can Mòra y pidió revisar el
  resto). Comparados tramo a tramo el ICGC, el Ajuntament («Rieres i
  torrents»), OpenStreetMap y la ACA. Los del ICGC son los que da su buscador
  de topónimos (riera de Can Mòra junto al golf, riera de Can Trabal más
  arriba, torrent de Can Cortès, riera de Can Bova, riera de Can Vilallonga);
  no figuran torrent del Rabassalet, torrent de Can Bova, riera de Vilallonga
  ni torrent de Can Trabal. Se mantienen los del ICGC y cada tramo lleva en
  `altres` los que le dan las otras fuentes (en el 30 % o más del tramo), que
  salen en el texto emergente. La ACA llama riera de Sant Cugat a todo el curso
  desde la fuente.
- **Torrent dels Gorgs** (Juanjo: «quisiera también que marcases en el mapa el
  torrent dels Gorgs que creo que nace en la uab»): de la misma red del ICGC.
  Nace en Bellaterra, junto a la vía del tren y al campus de la UAB, al lado de
  Can Domènec (41,5056 N; 2,0933 E), como torrent de Can Miró; baja como
  torrent de Can Magrans y desemboca en la riera en Montflorit como torrent
  dels Gorgs (topónimo del ICGC en Cerdanyola); 4,6 km. El nacimiento es el
  extremo de su red más alejado de la desembocadura; se tomó primero el punto
  más al norte (granjas de Veterinaria), unos 255 m más abajo, y Juanjo vio en
  el mapa que nacía antes. En su propia capa (`part: afluent`), con su
  color, en la leyenda y en el selector; el botón del ojo también lo oculta, y
  la distancia del menú de un punto sigue midiéndose solo a la riera.
- **Torrent de Can Domènec** (Juanjo: «marca también el torrent de can
  domenec que nace aquí según icgc», con una captura junto al Camí Antic de
  Sant Cugat). En la red del ICGC el nombre solo va en el tramo bajo, desde
  41,4978 N; 2,0931 E; aguas arriba sigue una cadena sin nombre, con pasos
  cubiertos bajo las calles de Bellaterra y bajo la vía, hasta 41,5053 N;
  2,0790 E, el punto de la captura. Desde ahí hasta que se une al de Can Miró,
  3,4 km. Va en la misma capa que el Gorgs («Torrent dels Gorgs i de Can
  Domènec»), con su punto de nacimiento.
- **Torrent sin nombre de la plaza del Pi y torrent de la Bonaigua** (Juanjo:
  «este torrente aparece sin nombre … puedes localizar lo que es?», «investiga
  un poco más» y «sí, aplica los dos»). Afluente del torrent de Can Miró de
  1,3 km que nace en Bellaterra junto a la plaza del Pi y cruza la BV-1414 y la
  vía. Sin nombre en el ICGC (red actual, buscador de topónimos y hoja 1:5.000
  de 1995), en la ACA (código 0660130101), en OpenStreetMap, en la capa de Sant
  Cugat (no llega a Bellaterra), en las rutas del campus de la UAB y en la
  prensa local; no se encontró cartografía pública de Cerdanyola ni de la EMD.
  Se dibuja como «Torrent sense nom», con una nota (`nota: placa-pi`), sin
  inventarle nombre. La prensa vecinal (bellaterra.cat) llama torrent de la
  Bonaigua al tramo alto del de Can Domènec (por la Font de Bonaigua, que el
  ICGC sitúa allí): va como nombre alternativo de ese tramo, de la fuente
  hasta la vía. La capa pasa a llamarse «Torrent dels Gorgs i afluents».
- **Móvil** (Juanjo: «no cabe. la visualización en móvil es correcta?»). Los
  textos emergentes de Leaflet no parten líneas y salían del mapa: ahora tienen
  ancho máximo; en pantallas táctiles (`hover: none`) la información sale en
  una ventanita al tocar, de ancho ajustado al mapa (iPhone SE incluido), y
  los botones del mapa se ocultan mientras está abierta. Los créditos del mapa
  se acortan a «Fonts» con enlace. El selector de capas se abría y cerraba a la
  vez en Chrome de Android (comprobado con el Pixel 7 emulado): en táctil se
  abre y cierra con su botón, se cierra al elegir un fondo o tocar el mapa, y
  deja una franja libre para tocarlo.
- **Vista inicial: Montflorit** (Juanjo envió una captura con el zoom que
  quería): el barrio con un 20 % de margen; el recorrido entero, alejando.
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
- **Capas de la ACA** (Juanjo: «¿se puede añadir la capa del ACA?»): del
  servicio de visualización oficial que la ACA anuncia en «Cartografia i
  geoserveis» (`sig.gencat.cat/ows/AIGUA/wms`; sin restricciones de acceso ni
  tasas según el propio servicio). La red hidrográfica
  (`AIGUA_XARXA_RIUS_ARC`) y las zonas inundables de la cuenca del Besòs para
  avenidas de 10, 100 y 500 años con la profundidad del agua
  (`AIGUA_CALAT_BESOS_Y10`, `_Y100`, `_Y500`), como capas que se activan en el
  selector. Su leyenda (los cinco tramos de profundidad que da la propia ACA
  con GetLegendGraphic) sale bajo el mapa solo cuando hay una activa. Se
  descartó `aplicacions.aca.gencat.cat/geoserver`, que también responde, porque
  no es el servicio que la ACA publica para terceros.
- **La red de la ACA sigue el curso antiguo en Sant Cugat** (Juanjo vio que no
  coincidía con el trazado y que pasaba junto al pollancre). Sus datos (WFS
  `AIGUA_XARXA_RIUS_ARC`) son de diciembre de 2000, de la «Xarxa 50m»
  (1:50.000), con un vértice cada 33 m de mediana. Medido en el tramo cubierto:
  queda a 6 m de mediana del curso antiguo (mapa de 1987 y ortofotos) y a 11 m
  del actual del ICGC (90 %: 47 m y 95 m); el pollancre, a 16 m de la ACA y a
  124 m del ICGC. Se mantiene el ICGC como trazado (actual, 1:5.000) y el texto
  del mapa avisa de que la capa de la ACA enseña el curso antiguo. Sin
  confirmar: que el ICGC sea exactamente el conducto; lo dirían los planos del
  alcantarillado del Ajuntament.
- **Botón del ojo** (Juanjo: «quiero un botón o similar para mostrar/ocultar
  las líneas dibujadas sobre el mapa»): oculta el trazado, los límites del
  barrio y los puntos, para ver limpio el mapa de debajo; al volver a
  mostrarlos solo salen los que estaban (los límites pueden haberse quitado en
  el selector).
- **Leyenda debajo del mapa**, en HTML: en el móvil no tapa el mapa y se lee
  sin depender del color (cada estado tiene su trazo).
- **Leaflet servido desde la propia web**, no desde un CDN.

## Riesgos

- El curso cubierto es el que dibuja el ICGC; los proyectos de las obras de
  cobertura, en el Arxiu Municipal de Sant Cugat, lo confirmarían.
- Si el ICGC cambia sus teselas vectoriales, el trazado guardado no cambia:
  hay que volver a extraerlo a mano.
- Si OpenStreetMap o el ICGC cambian sus servicios, un fondo dejaría de verse;
  el trazado se sigue viendo con los demás.
- El servidor de teselas de OpenStreetMap admite un uso ligero como este, sin
  garantía de servicio.
