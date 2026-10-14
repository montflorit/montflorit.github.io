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
  - El mapa de 1987 y las ortofotos antiguas se quedan como fondos: enseñan el
    cauce de antes de cubrirlo.
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
