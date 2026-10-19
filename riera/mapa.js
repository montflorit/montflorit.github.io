// SPDX-License-Identifier: AGPL-3.0-or-later
// El mapa de la riera de Sant Cugat (ADR 0002): el traçat de dades/riera-sant-cugat.geojson
// i els límits del barri de dades/montflorit-limits.geojson, sobre un fons triable.
// Els fons es demanen als servidors d'OpenStreetMap i de l'ICGC (vegeu Privacitat).
// La pàgina en català i en castellà fa servir aquest mateix fitxer: els textos
// surten de TEXTOS segons la llengua de la pàgina.

const LLENGUA = document.documentElement.lang === 'es' ? 'es' : 'ca';
const ARREL = document.documentElement.dataset.arrel || '../';

const TEXTOS = {
  ca: {
    osm: 'Mapa: © <a href="https://www.openstreetmap.org/copyright/ca" target="_blank" rel="noopener">col·laboradors d\'OpenStreetMap</a>',
    icgc: 'Mapa: <a href="https://www.icgc.cat/ca/Geoinformacio-i-mapes/Geoinformacio-en-linia-Geoserveis" target="_blank" rel="noopener">Institut Cartogràfic i Geològic de Catalunya</a>',
    ortoAny: (any) => `Ortofoto ${any}: <a href="https://www.icgc.cat/ca/Geoinformacio-i-mapes/Geoinformacio-en-linia-Geoserveis/WMS-Ortoimatges/WMS-Ortofoto-Territorial" target="_blank" rel="noopener">ICGC</a>`,
    tracat: '<a href="../fonts.html">Fonts</a>',
    fons: {
      osm: 'OpenStreetMap', carrers: 'Carrers (ICGC)', topo: 'Topogràfic (ICGC)', orto: '<strong>Ortofotos (ICGC)</strong>',
    },
    decades: 'Any de l\'ortofoto',
    actual: 'Actual',
    // La data de la foto és la del lloc del centre del mapa: cada zona es fotografia un dia.
    data: (d) => `${d}, al centre del mapa`,
    rang: (a, b) => `del ${a} al ${b}`,
    capes: {
      barri: 'Límits de Montflorit', afluents: 'Afluents de la riera',
      xarxa: 'Xarxa hidrogràfica (ACA)',
      inundable: (anys) => `Zona inundable cada ${anys} anys (ACA)`,
    },
    aca: 'Capes: <a href="https://aca.gencat.cat/ca/laigua/consulta-de-dades/cartografia-geoserveis/" target="_blank" rel="noopener">Agència Catalana de l\'Aigua</a>',
    dibuixos: { amaga: 'Amaga el traçat i els límits dibuixats', mostra: 'Mostra el traçat i els límits dibuixats' },
    senseNom: 'Torrent sense nom',
    cobert: 'coberta', cobertM: 'cobert',
    font: {
      icgc: 'Traçat de la base topogràfica 1:5.000 de l\'ICGC.',
      osm: 'Traçat d\'OpenStreetMap: aquí la base de l\'ICGC té un buit.',
      santcugat: 'Traçat de l\'Ajuntament de Sant Cugat (capa «Rieres i torrents»), sobre els grans col·lectors de pluvials.',
    },
    barri: 'Límits del barri de Montflorit',
    rabassalet: 'Font del Rabassalet: aquí neix la riera segons la Gran Enciclopèdia Catalana. Seca, segons la fitxa de la Diputació revisada el 2025.',
    naixGorgs: 'Naixement del torrent dels Gorgs: Bellaterra, al costat de la via del tren i del campus de la UAB, a tocar de Can Domènec',
    naixDomenec: 'Naixement del torrent de Can Domènec: Bellaterra, a tocar del Camí Antic de Sant Cugat',
    desemboca: (n) => `Desemboca a: ${n}`,
    altres: 'Altres noms',
    nomsFonts: { Ajuntament: 'Ajuntament de Sant Cugat', OpenStreetMap: 'OpenStreetMap', ACA: 'ACA', popular: 'nom popular a Bellaterra' },
    notes: { 'placa-pi': 'Neix a Bellaterra, a tocar de la plaça del Pi, i s\'uneix al torrent de Can Miró al campus de la UAB. No té nom a cap font: ni l\'ICGC, ni l\'ACA, ni OpenStreetMap.' },
    pollancre: 'Pollancre de l\'antiga riera de Can Mora (inventari del patrimoni de la Diputació de Barcelona)',
    desembocadura: 'Desemboca al Ripoll (Montcada i Reixac)',
    mapa: 'Mapa de la riera de Sant Cugat',
    completa: 'Pantalla completa',
    sortirCompleta: 'Surt de la pantalla completa',
    menu: {
      rieraA: (d) => `La riera passa a ${d}`,
      rieraCobertaA: (d) => `La riera, coberta, passa a ${d}`,
      copia: 'Copia les coordenades',
      copiat: 'Coordenades copiades',
      comparteix: 'Comparteix aquest punt',
      enllacCopiat: 'Enllaç copiat',
      textComparteix: 'Un punt al mapa de la riera de Sant Cugat',
      google: 'Obre a Google Maps',
      osm: 'Obre a OpenStreetMap',
      icgc: 'Obre al visor de l\'ICGC',
      punt: 'Punt compartit',
    },
    // El botó de compartir el mapa tal com es veu (Juanjo, 19-10-2026).
    comparteixMapa: 'Comparteix el mapa tal com es veu',
    restableix: 'Torna el mapa a com era en obrir-lo',
    textMapa: 'Mapa de la riera de Sant Cugat',
    ambOrto: (any) => (any ? `, amb l'ortofoto de ${any}` : ', amb l\'ortofoto actual'),
    errada: 'No s\'ha pogut carregar el traçat. Torna-ho a provar més tard.',
  },
  es: {
    osm: 'Mapa: © <a href="https://www.openstreetmap.org/copyright/es" target="_blank" rel="noopener">colaboradores de OpenStreetMap</a>',
    icgc: 'Mapa: <a href="https://www.icgc.cat/es/Geoinformacion-y-mapas/Servicios-en-linea-Geoservicios" target="_blank" rel="noopener">Institut Cartogràfic i Geològic de Catalunya</a>',
    ortoAny: (any) => `Ortofoto ${any}: <a href="https://www.icgc.cat/es/Geoinformacion-y-mapas/Servicios-en-linea-Geoservicios/WMS-Ortoimagenes/WMS-Ortofoto-Territorial" target="_blank" rel="noopener">ICGC</a>`,
    tracat: '<a href="../fonts.html">Fuentes</a>',
    fons: {
      osm: 'OpenStreetMap', carrers: 'Calles (ICGC)', topo: 'Topográfico (ICGC)', orto: '<strong>Ortofotos (ICGC)</strong>',
    },
    decades: 'Año de la ortofoto',
    actual: 'Actual',
    data: (d) => `${d}, en el centro del mapa`,
    rang: (a, b, mes) => (mes ? `de ${a} a ${b}` : `del ${a} al ${b}`),
    capes: {
      barri: 'Límites de Montflorit', afluents: 'Afluentes de la riera',
      xarxa: 'Red hidrográfica (ACA)',
      inundable: (anys) => `Zona inundable cada ${anys} años (ACA)`,
    },
    aca: 'Capas: <a href="https://aca.gencat.cat/es/laigua/consulta-de-dades/cartografia-geoserveis/" target="_blank" rel="noopener">Agència Catalana de l\'Aigua</a>',
    dibuixos: { amaga: 'Ocultar el trazado y los límites dibujados', mostra: 'Mostrar el trazado y los límites dibujados' },
    senseNom: 'Torrente sin nombre',
    cobert: 'cubierta', cobertM: 'cubierto',
    font: {
      icgc: 'Trazado de la base topográfica 1:5.000 del ICGC.',
      osm: 'Trazado de OpenStreetMap: aquí la base del ICGC tiene un hueco.',
      santcugat: 'Trazado del Ayuntamiento de Sant Cugat (capa «Rieres i torrents»), sobre los grandes colectores de pluviales.',
    },
    barri: 'Límites del barrio de Montflorit',
    rabassalet: 'Font del Rabassalet: aquí nace la riera según la Gran Enciclopèdia Catalana. Seca, según la ficha de la Diputació revisada en 2025.',
    naixGorgs: 'Nacimiento del torrent dels Gorgs: Bellaterra, junto a la vía del tren y al campus de la UAB, al lado de Can Domènec',
    naixDomenec: 'Nacimiento del torrent de Can Domènec: Bellaterra, junto al Camí Antic de Sant Cugat',
    desemboca: (n) => `Desemboca en: ${n}`,
    altres: 'Otros nombres',
    nomsFonts: { Ajuntament: 'Ayuntamiento de Sant Cugat', OpenStreetMap: 'OpenStreetMap', ACA: 'ACA', popular: 'nombre popular en Bellaterra' },
    notes: { 'placa-pi': 'Nace en Bellaterra, junto a la plaza del Pi, y se une al torrent de Can Miró en el campus de la UAB. No tiene nombre en ninguna fuente: ni el ICGC, ni la ACA, ni OpenStreetMap.' },
    pollancre: 'Chopo de la antigua riera de Can Mora (inventario del patrimonio de la Diputació de Barcelona)',
    desembocadura: 'Desemboca en el Ripoll (Montcada i Reixac)',
    mapa: 'Mapa de la riera de Sant Cugat',
    completa: 'Pantalla completa',
    sortirCompleta: 'Salir de la pantalla completa',
    menu: {
      rieraA: (d) => `La riera pasa a ${d}`,
      rieraCobertaA: (d) => `La riera, cubierta, pasa a ${d}`,
      copia: 'Copiar las coordenadas',
      copiat: 'Coordenadas copiadas',
      comparteix: 'Compartir este punto',
      enllacCopiat: 'Enlace copiado',
      textComparteix: 'Un punto en el mapa de la riera de Sant Cugat',
      google: 'Abrir en Google Maps',
      osm: 'Abrir en OpenStreetMap',
      icgc: 'Abrir en el visor del ICGC',
      punt: 'Punto compartido',
    },
    comparteixMapa: 'Compartir el mapa tal como se ve',
    restableix: 'Devolver el mapa a como estaba al abrirlo',
    textMapa: 'Mapa de la riera de Sant Cugat',
    ambOrto: (any) => (any ? `, con la ortofoto de ${any}` : ', con la ortofoto actual'),
    errada: 'No se ha podido cargar el trazado. Vuelve a probarlo más tarde.',
  },
};
const T = TEXTOS[LLENGUA];

// Els colors, els del full d'estil, perquè canviïn amb el tema.
function color(nom) {
  return getComputedStyle(document.documentElement).getPropertyValue(nom).trim();
}

// El mapa: el zoom de la roda, suau (Juanjo, 14-10-2026: «los saltos son demasiado grandes»),
// i fins al nivell 21, on les ortofotos antigues encara guanyen detall.
const mapa = L.map('mapa', {
  maxZoom: 21,
  zoomSnap: 0.1,
  zoomDelta: 0.5,
  wheelPxPerZoomLevel: 180,
  wheelDebounceTime: 20,
});
mapa.getContainer().setAttribute('aria-label', T.mapa);
mapa.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');

// --- Fons: OpenStreetMap per defecte; la resta, de l'ICGC ---
const tesseles = (url, atribucio) => L.tileLayer(url, {
  maxZoom: 21, maxNativeZoom: 19, attribution: atribucio + ' · ' + T.tracat,
});
// Les ortofotos, l'actual i una per dècada (Juanjo, 14-10-2026): un sol fons i, a sota,
// una regleta per passar d'una a l'altra, amb l'actual triada en obrir-lo. L'ICGC no en té cap dels anys seixanta;
// dels noranta, la de 1994-1997, que té més detall que les de 1990 i 1993.
// La tercera columna és el nom de cada una a l'enllaç del mapa (any=).
const DECADES = [
  ['ortofoto_blanc_i_negre_1945-1946', '1946', '1946'],
  ['ortofoto_blanc_i_negre_1956-1957', '1956', '1956'],
  ['ortofoto_blanc_i_negre_1970-1977', '1970-77', '1970-77'],
  ['ortofoto_blanc_i_negre_1983-1989', '1983-89', '1983-89'],
  ['ortofoto_blanc_i_negre_1994-1997', '1994-97', '1994-97'],
  ['ortofoto_color_2000-2003', '2000-03', '2000-03'],
  ['ortofoto_color_2010', '2010', '2010'],
  ['ortofoto_color_vigent', T.actual, 'actual'],
];
const ACTUAL = DECADES.length - 1;
const atribucioAntiga = (any) => T.ortoAny(any) + ' · ' + T.tracat;
const ortoAntiga = L.tileLayer.wms('https://geoserveis.icgc.cat/servei/catalunya/orto-territorial/wms', {
  layers: DECADES[ACTUAL][0], format: 'image/jpeg', maxZoom: 21, attribution: atribucioAntiga(DECADES[ACTUAL][1]),
});
const fonsOsm = tesseles('https://tile.openstreetmap.org/{z}/{x}/{y}.png', T.osm).addTo(mapa);
// Cada fons pel seu nom a l'enllaç del mapa (fons=).
const FONS = {
  osm: fonsOsm,
  carrers: tesseles('https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/estandard/MON3857NW/{z}/{x}/{y}.png', T.icgc),
  topo: tesseles('https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/topografic/MON3857NW/{z}/{x}/{y}.png', T.icgc),
  orto: ortoAntiga,
};
const fons = Object.fromEntries(Object.entries(FONS).map(([nom, capa]) => [T.fons[nom], capa]));

// Les capes de l'Agència Catalana de l'Aigua, del seu servei oficial de visualització.
// Les zones inundables són les de la conca del Besòs, amb la profunditat de l'aigua
// en una avinguda que, de mitjana, arriba una vegada cada 10, 100 o 500 anys.
const capaAca = (capa) => L.tileLayer.wms('https://sig.gencat.cat/ows/AIGUA/wms', {
  layers: capa, format: 'image/png', transparent: true, maxZoom: 21, attribution: T.aca,
});
const xarxaAca = capaAca('AIGUA_XARXA_RIUS_ARC');
const inundables = { 10: capaAca('AIGUA_CALAT_BESOS_Y10'), 100: capaAca('AIGUA_CALAT_BESOS_Y100'), 500: capaAca('AIGUA_CALAT_BESOS_Y500') };

// --- Estil de cada tram ---
function estilTram(p) {
  // Tots els afluents, el torrent dels Gorgs inclòs, amb el mateix estil (Juanjo, 19-10-2026).
  if (p.part.startsWith('afluent')) {
    return { color: color('--afluent2'), weight: 3, dashArray: p.estat === 'cobert' ? '6 5' : null };
  }
  const c = color(p.part === 'capcalera' ? '--capcalera' : '--riera');
  // Coberta (per sota terra): ratllada.
  return { color: c, weight: 5, dashArray: p.estat === 'cobert' ? '8 6' : null };
}

function textTram(p) {
  const nom = p.nom || T.senseNom;
  // Els noms que hi donen altres fonts (Juanjo, 14-10-2026), per qui els trobi en altres mapes.
  const altres = (p.altres || []).map((a) => `${a.nom} (${a.fonts.map((f) => T.nomsFonts[f] || f).join(', ')})`);
  // Concorda amb el nom: el torrent, cobert; la riera, coberta.
  const cobert = /^torrent/i.test(nom) ? T.cobertM : T.cobert;
  return `<strong>${nom}</strong>${p.estat === 'cobert' ? ` (${cobert})` : ''}`
    + (altres.length ? `<br>${T.altres}: ${altres.join('; ')}` : '')
    + (p.nota && T.notes[p.nota] ? `<br>${T.notes[p.nota]}` : '')
    + (p.desemboca ? `<br>${T.desemboca(p.desemboca)}` : '')
    + `<br>${T.font[p.font] || ''}`;
}

// La informació de cada element: al pas del ratolí a l'ordinador; en pantalles
// tàctils, una finestreta en tocar-lo, que Leaflet desplaça perquè hi càpiga
// sencera (Juanjo, 14-10-2026: al mòbil el text emergent no hi cabia).
const TACTIL = matchMedia('(hover: none)').matches;
// Ample màxim d'una finestreta: 280 px, o menys si el mapa és més estret (iPhone SE).
// Leaflet hi afegeix uns 50 px de marges i vora.
function ampleFinestreta() {
  return Math.max(160, Math.min(280, mapa.getSize().x - 64));
}
function informacio(capa, html, opcions) {
  if (TACTIL) return capa.bindPopup(html, { maxWidth: ampleFinestreta(), autoPanPadding: [12, 12], className: 'popup-info' });
  return capa.bindTooltip(html, opcions);
}

const capaRiera = L.geoJSON(null, {
  filter: (f) => !f.properties.part.startsWith('afluent'),
  style: (f) => estilTram(f.properties),
  onEachFeature: (f, capa) => informacio(capa, textTram(f.properties), { sticky: true }),
});
// Els afluents de la riera, amb els seus afluents: el torrent dels Gorgs (part «afluent»)
// i la resta (part «afluent-riera»), en una sola capa que s'activa al selector (Juanjo, 19-10-2026).
const capaAfluents = L.geoJSON(null, {
  filter: (f) => f.properties.part.startsWith('afluent'),
  style: (f) => estilTram(f.properties),
  onEachFeature: (f, capa) => informacio(capa, textTram(f.properties), { sticky: true }),
});
const capaBarri = L.geoJSON(null, {
  style: () => ({ color: color('--barri'), weight: 3, dashArray: '10 5 2 5', fillColor: color('--barri'), fillOpacity: 0.08 }),
  onEachFeature: (f, capa) => informacio(capa, T.barri, { sticky: true }),
});

// Els tres punts de referència.
const puntsDeReferencia = L.layerGroup();
// El naixement de cada afluent va a la capa dels afluents: surt i s'amaga amb ella.
function punt(lat, lon, text, opcions, grup = puntsDeReferencia) {
  const marca = L.circleMarker([lat, lon], Object.assign({ radius: 7, color: '#fff', weight: 2, fillOpacity: 1 }, opcions));
  informacio(marca, text, { direction: 'top' });
  return marca.addTo(grup);
}

// Les capes que es poden treure i posar, pel seu nom a l'enllaç del mapa (capes=),
// i les que surten en obrir-lo.
const CAPES = {
  barri: capaBarri,
  afluents: capaAfluents,
  xarxa: xarxaAca,
  inundable10: inundables[10],
  inundable100: inundables[100],
  inundable500: inundables[500],
};
// Els afluents, només si es trien (Juanjo, 19-10-2026: «por defecto no se mostrará el torrent dels gorgs»).
const CAPES_INICIALS = ['barri'];
const selectorCapes = L.control.layers(fons, {
  [T.capes.barri]: capaBarri,
  [T.capes.afluents]: capaAfluents,
  [T.capes.xarxa]: xarxaAca,
  [T.capes.inundable(10)]: inundables[10],
  [T.capes.inundable(100)]: inundables[100],
  [T.capes.inundable(500)]: inundables[500],
}, { position: 'topright' }).addTo(mapa);

// En pantalles tàctils, el selector s'obre i es tanca amb el mateix botó. Leaflet
// l'obre en tocar-lo, però a Chrome d'Android el clic que ve darrere el tornava a
// tancar de seguida (comprovat amb l'emulació del Pixel 7). Tocar el mapa el tanca.
if (TACTIL) {
  const caixaCapes = selectorCapes.getContainer();
  const botoCapes = caixaCapes.querySelector('.leaflet-control-layers-toggle');
  L.DomEvent.off(caixaCapes);
  L.DomEvent.off(botoCapes);
  L.DomEvent.disableClickPropagation(caixaCapes);
  L.DomEvent.disableScrollPropagation(caixaCapes);
  botoCapes.addEventListener('click', (e) => {
    e.preventDefault();
    if (caixaCapes.classList.contains('leaflet-control-layers-expanded')) selectorCapes.collapse();
    else selectorCapes.expand();
  });
  // En triar un fons, es tanca sol; les capes de sobre se'n poden marcar diverses.
  mapa.on('baselayerchange', () => selectorCapes.collapse());
}

// La llegenda de la profunditat, només quan hi ha alguna zona inundable a la vista.
function llegendaInundable() {
  const visible = Object.values(inundables).some((capa) => mapa.hasLayer(capa));
  const llegenda = document.getElementById('llegenda-inundable');
  if (llegenda) llegenda.hidden = !visible;
}
mapa.on('overlayadd overlayremove', llegendaInundable);
L.control.scale({ imperial: false }).addTo(mapa);

// --- Pantalla completa ---
// On el navegador ho permet (ordinador, Android), la pantalla completa de debò;
// on no (l'iPhone només la dona als vídeos), el mapa ocupa tota la finestra.
// Esc o el mateix botó en surten.
const contenidor = mapa.getContainer();
const ICONES = {
  entra: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
  surt: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>',
};
let botoCompleta;

function enPantallaCompleta() {
  return document.fullscreenElement === contenidor || contenidor.classList.contains('completa');
}

function actualitzaBoto() {
  const dins = enPantallaCompleta();
  const text = dins ? T.sortirCompleta : T.completa;
  botoCompleta.title = text;
  botoCompleta.setAttribute('aria-label', text);
  botoCompleta.setAttribute('aria-pressed', dins ? 'true' : 'false');
  botoCompleta.querySelector('svg').innerHTML = dins ? ICONES.surt : ICONES.entra;
  document.body.classList.toggle('sense-desplacament', contenidor.classList.contains('completa'));
  setTimeout(() => mapa.invalidateSize(), 100);
}

function canviaPantallaCompleta() {
  if (enPantallaCompleta()) {
    if (document.fullscreenElement) document.exitFullscreen();
    contenidor.classList.remove('completa');
    actualitzaBoto();
  } else if (contenidor.requestFullscreen && document.fullscreenEnabled) {
    contenidor.requestFullscreen().catch(() => { contenidor.classList.add('completa'); actualitzaBoto(); });
  } else {
    contenidor.classList.add('completa');
    actualitzaBoto();
  }
}

const ControlCompleta = L.Control.extend({
  options: { position: 'topleft' },
  onAdd() {
    const caixa = L.DomUtil.create('div', 'leaflet-bar');
    botoCompleta = L.DomUtil.create('button', 'boto-completa', caixa);
    botoCompleta.type = 'button';
    botoCompleta.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"></svg>';
    L.DomEvent.disableClickPropagation(caixa);
    L.DomEvent.on(botoCompleta, 'click', canviaPantallaCompleta);
    return caixa;
  },
});
new ControlCompleta().addTo(mapa);

// --- La regleta de les ortofotos, només quan el fons és l'ortofoto ---
let regleta;
let decadaTriada = ACTUAL;
const dates = [];   // la data de vol de cada ortofoto al centre del mapa, o null

// La data de vol: l'ICGC la dona per a cada punt (cada full es vola un dia). Es
// demana per al centre del mapa en mostrar la regleta i en moure'l, i surt en
// passar el ratolí per cada botó i al peu del mapa, la de l'ortofoto triada.
// Quan l'ICGC només sap el mes, hi posa el dia 1: llavors es diu només el mes.
function formataData(text, nomesMes) {
  const [a, m, d] = text.slice(0, 10).split('/').map(Number);
  const opcions = nomesMes ? { month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(a, m - 1, d).toLocaleDateString(LLENGUA === 'es' ? 'es-ES' : 'ca-ES', opcions);
}
function textData(props) {
  if (!props || !props.data_inicial) return null;
  const fiText = props.data_final || props.data_inicial;
  const nomesMes = props.data_inicial.slice(8, 10) === '01' && fiText.slice(8, 10) === '01';
  const ini = formataData(props.data_inicial, nomesMes), fi = formataData(fiText, nomesMes);
  return T.data(ini !== fi ? T.rang(ini, fi, nomesMes) : ini);
}
function posaAtribucio() {
  mapa.attributionControl.removeAttribution(ortoAntiga.options.attribution);
  const [, any] = DECADES[decadaTriada];
  const enllac = '<a href="' + (LLENGUA === 'es'
    ? 'https://www.icgc.cat/es/Geoinformacion-y-mapas/Servicios-en-linea-Geoservicios/WMS-Ortoimagenes/WMS-Ortofoto-Territorial'
    : 'https://www.icgc.cat/ca/Geoinformacio-i-mapes/Geoinformacio-en-linia-Geoserveis/WMS-Ortoimatges/WMS-Ortofoto-Territorial')
    + '" target="_blank" rel="noopener">ICGC</a>';
  ortoAntiga.options.attribution = dates[decadaTriada]
    ? `Ortofoto ${enllac}: ${dates[decadaTriada]} · ${T.tracat}`
    : atribucioAntiga(any);
  if (mapa.hasLayer(ortoAntiga)) mapa.attributionControl.addAttribution(ortoAntiga.options.attribution);
}
let peticioDates = 0;
function demanaDates() {
  if (!regleta || regleta.hidden) return;
  const c = mapa.getCenter(), d = 0.0005;
  const bbox = [c.lng - d, c.lat - d, c.lng + d, c.lat + d].join(',');
  const aquesta = ++peticioDates;
  DECADES.forEach(([capa], n) => {
    const url = 'https://geoserveis.icgc.cat/servei/catalunya/orto-territorial/wms?SERVICE=WMS&VERSION=1.3.0'
      + '&REQUEST=GetFeatureInfo&LAYERS=' + capa + '&QUERY_LAYERS=' + capa + '&STYLES=&CRS=CRS:84&BBOX=' + bbox
      + '&WIDTH=3&HEIGHT=3&I=1&J=1&INFO_FORMAT=application/json';
    fetch(url).then((r) => r.json()).then((j) => {
      if (aquesta !== peticioDates) return;
      dates[n] = textData(j.features && j.features[0] && j.features[0].properties);
      const boto = regleta.querySelectorAll('button')[n];
      if (dates[n]) boto.title = dates[n]; else boto.removeAttribute('title');
      if (n === decadaTriada) posaAtribucio();
    }).catch(() => {});
  });
}
let esperaDates;
mapa.on('moveend', () => { clearTimeout(esperaDates); esperaDates = setTimeout(demanaDates, 500); });

function triaDecada(n) {
  const [capa] = DECADES[n];
  decadaTriada = n;
  posaAtribucio();
  ortoAntiga.setParams({ layers: capa });
  regleta.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', i === n ? 'true' : 'false'));
}
const ControlDecades = L.Control.extend({
  options: { position: 'bottomleft' },
  onAdd() {
    regleta = L.DomUtil.create('div', 'leaflet-bar regleta-decades');
    regleta.setAttribute('role', 'group');
    regleta.setAttribute('aria-label', T.decades);
    regleta.hidden = true;
    DECADES.forEach(([, any], n) => {
      const b = L.DomUtil.create('button', '', regleta);
      b.type = 'button';
      b.textContent = any;
      b.setAttribute('aria-pressed', n === ACTUAL ? 'true' : 'false');
      L.DomEvent.on(b, 'click', () => triaDecada(n));
    });
    L.DomEvent.disableClickPropagation(regleta);
    L.DomEvent.disableScrollPropagation(regleta);
    return regleta;
  },
});
new ControlDecades().addTo(mapa);
mapa.on('baselayerchange', (e) => { regleta.hidden = e.layer !== ortoAntiga; demanaDates(); });

// Mentre hi ha una finestreta oberta, els botons del mapa s'aparten perquè no la tapin
// (al mòbil no hi ha lloc per a tots dos). Tornen en tancar-la.
mapa.on('popupopen', () => contenidor.classList.add('amb-finestreta'));
mapa.on('popupclose', () => contenidor.classList.remove('amb-finestreta'));

// --- Mostrar o amagar el que hi ha dibuixat (Juanjo, 14-10-2026) ---
// El traçat, els límits del barri i els punts, per veure el mapa de sota net.
// En tornar-los a mostrar, només surten els que hi havia (els límits es poden haver tret al selector).
const ICONES_ULL = {
  obert: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  tancat: '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"/>',
};
let dibuixosAmagats = null;   // els que s'han tret, mentre estan amagats
let botoDibuixos;
let marcaCompartida = null;

function dibuixos() {
  return [capaRiera, capaAfluents, capaBarri, puntsDeReferencia, marcaCompartida].filter(Boolean);
}

function actualitzaBotoDibuixos() {
  const amagats = dibuixosAmagats !== null;
  const text = amagats ? T.dibuixos.mostra : T.dibuixos.amaga;
  botoDibuixos.title = text;
  botoDibuixos.setAttribute('aria-label', text);
  botoDibuixos.setAttribute('aria-pressed', amagats ? 'true' : 'false');
  botoDibuixos.querySelector('svg').innerHTML = amagats ? ICONES_ULL.tancat : ICONES_ULL.obert;
}

function canviaDibuixos() {
  if (dibuixosAmagats === null) {
    dibuixosAmagats = dibuixos().filter((capa) => mapa.hasLayer(capa));
    dibuixosAmagats.forEach((capa) => mapa.removeLayer(capa));
    mapa.closePopup();
  } else {
    dibuixosAmagats.forEach((capa) => capa.addTo(mapa));
    dibuixosAmagats = null;
  }
  actualitzaBotoDibuixos();
}

const ControlDibuixos = L.Control.extend({
  options: { position: 'topleft' },
  onAdd() {
    const caixa = L.DomUtil.create('div', 'leaflet-bar');
    botoDibuixos = L.DomUtil.create('button', 'boto-completa boto-dibuixos', caixa);
    botoDibuixos.type = 'button';
    botoDibuixos.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"></svg>';
    L.DomEvent.disableClickPropagation(caixa);
    L.DomEvent.on(botoDibuixos, 'click', canviaDibuixos);
    return caixa;
  },
});
new ControlDibuixos().addTo(mapa);
actualitzaBotoDibuixos();

// --- Compartir el mapa tal com es veu (Juanjo, 19-10-2026) ---
// L'enllaç porta la vista, el fons, l'any de l'ortofoto, les capes, si el dibuix
// està amagat i el punt marcat, si n'hi ha (vegeu estatDelMapa i ADR 0004).
const ICONA_COMPARTIR = '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>'
  + '<line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>';
let avisCompartir;

function textDelMapa() {
  if (!mapa.hasLayer(ortoAntiga)) return T.textMapa;
  return T.textMapa + T.ambOrto(decadaTriada === ACTUAL ? null : DECADES[decadaTriada][1]);
}

const ControlCompartir = L.Control.extend({
  options: { position: 'topleft' },
  onAdd() {
    const caixa = L.DomUtil.create('div', 'leaflet-bar');
    const boto = L.DomUtil.create('button', 'boto-completa', caixa);
    boto.type = 'button';
    boto.title = T.comparteixMapa;
    boto.setAttribute('aria-label', T.comparteixMapa);
    boto.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONA_COMPARTIR}</svg>`;
    avisCompartir = L.DomUtil.create('span', 'avis-boto', caixa);
    avisCompartir.setAttribute('role', 'status');
    L.DomEvent.disableClickPropagation(caixa);
    L.DomEvent.on(boto, 'click', () => comparteix(textDelMapa(), enllacDelMapa(), () => {
      avisCompartir.textContent = T.menu.enllacCopiat;
      setTimeout(() => { avisCompartir.textContent = ''; }, 1800);
    }));
    return caixa;
  },
});
new ControlCompartir().addTo(mapa);

// --- Tornar-ho tot a com era en obrir el mapa (Juanjo, 19-10-2026) ---
// La vista, el fons, l'ortofoto actual, les capes de sempre i el dibuix a la vista;
// es treu el punt marcat i l'enllaç de la barra d'adreces, perquè en tornar a carregar no torni.
const ICONA_RESTABLEIX = '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>';
const ControlRestableix = L.Control.extend({
  options: { position: 'topleft' },
  onAdd() {
    const caixa = L.DomUtil.create('div', 'leaflet-bar');
    const boto = L.DomUtil.create('button', 'boto-completa', caixa);
    boto.type = 'button';
    boto.title = T.restableix;
    boto.setAttribute('aria-label', T.restableix);
    boto.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONA_RESTABLEIX}</svg>`;
    L.DomEvent.disableClickPropagation(caixa);
    L.DomEvent.on(boto, 'click', () => {
      if (!limitsBarri) return;
      history.replaceState(null, '', location.pathname + location.search);
      mapa.closePopup();
      aplicaEnllac();
    });
    return caixa;
  },
});
new ControlRestableix().addTo(mapa);
actualitzaBoto();
document.addEventListener('fullscreenchange', actualitzaBoto);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contenidor.classList.contains('completa')) {
    contenidor.classList.remove('completa');
    actualitzaBoto();
  }
});

// Els colors es tornen a posar si canvia el tema (tema.js avisa amb «canvi-tema»).
function repintaColors() {
  [capaRiera, capaAfluents].forEach((c) => c.eachLayer((capa) => capa.setStyle(capa.feature
    ? estilTram(capa.feature.properties) : { fillColor: color(capa.options.variableColor) })));
  capaBarri.setStyle({ color: color('--barri'), fillColor: color('--barri') });
  puntsDeReferencia.eachLayer((capa) => capa.setStyle({ fillColor: color(capa.options.variableColor) }));
}
document.addEventListener('canvi-tema', repintaColors);


// --- Menú d'un punt: botó dret o, al mòbil, mantenir el dit (Juanjo, 14-10-2026) ---
// Les coordenades, a quina distància passa la riera i què se'n pot fer: copiar-les,
// compartir un enllaç al punt i obrir-lo en altres mapes. Amb el teclat, la tecla
// de menú o Maj+F10 l'obren al centre del mapa.
let tracatRiera = [];   // els trams, per calcular la distància

function formataDistancia(metres) {
  return metres < 1000 ? `${Math.max(10, Math.round(metres / 10) * 10)} m` : `${(metres / 1000).toFixed(1).replace('.', ',')} km`;
}

// El punt de la riera més proper, mesurat sobre el pla del mapa (prou exacte a aquesta escala).
function rieraMesPropera(latlng) {
  const z = 18;
  const p = mapa.project(latlng, z);
  let millor = null;
  for (const capa of tracatRiera) {
    const punts = capa.getLatLngs().map((ll) => mapa.project(ll, z));
    for (let i = 1; i < punts.length; i++) {
      const q = L.LineUtil.closestPointOnSegment(p, punts[i - 1], punts[i]);
      const d = p.distanceTo(q);
      if (!millor || d < millor.d) millor = { d, q, capa };
    }
  }
  if (!millor) return null;
  return { metres: mapa.distance(latlng, mapa.unproject(millor.q, z)), cobert: millor.capa.feature.properties.estat === 'cobert' };
}

function coordenades(latlng) {
  return `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
}

// L'estat del mapa, per a l'enllaç: #mapa=zoom/lat/lon&fons=orto&any=1956&capes=barri,afluents&dibuixos=0&punt=lat,lon.
// Les capes amagades amb el botó de l'ull compten com a triades: tornen en mostrar el dibuix.
function estatDelMapa(ambVista) {
  const parts = [];
  if (ambVista) {
    const c = mapa.getCenter();
    parts.push(`mapa=${Number(mapa.getZoom().toFixed(1))}/${c.lat.toFixed(5)}/${c.lng.toFixed(5)}`);
  }
  const nomFons = Object.keys(FONS).find((nom) => mapa.hasLayer(FONS[nom])) || 'osm';
  parts.push(`fons=${nomFons}`);
  if (nomFons === 'orto') parts.push(`any=${DECADES[decadaTriada][2]}`);
  const triada = (capa) => mapa.hasLayer(capa) || (dibuixosAmagats !== null && dibuixosAmagats.includes(capa));
  parts.push('capes=' + Object.keys(CAPES).filter((nom) => triada(CAPES[nom])).join(','));
  if (dibuixosAmagats !== null) parts.push('dibuixos=0');
  return parts;
}

function enllacDelMapa() {
  const parts = estatDelMapa(true);
  if (marcaCompartida) {
    const ll = marcaCompartida.getLatLng();
    parts.push(`punt=${ll.lat.toFixed(5)},${ll.lng.toFixed(5)}`);
  }
  return location.origin + location.pathname + '#' + parts.join('&');
}

// L'enllaç d'un punt porta també el fons i les capes que es veuen; el mapa s'hi obre centrat.
function enllacPunt(latlng) {
  const parts = estatDelMapa(false).concat(`punt=${latlng.lat.toFixed(5)},${latlng.lng.toFixed(5)}`);
  return location.origin + location.pathname + '#' + parts.join('&');
}

// El menú de compartir del dispositiu, amb el missatge sencer; on no n'hi ha, el missatge es copia sol.
function comparteix(text, url, copiat) {
  if (navigator.share) navigator.share({ title: document.title, text, url }).catch(() => {});
  else copia(`${text}\n${url}`).then(copiat);
}

function avisaBreu(boto, text) {
  const original = boto.textContent;
  boto.textContent = text;
  setTimeout(() => { boto.textContent = original; }, 1800);
}

// Si el navegador no deixa escriure al porta-retalls (permís denegat), es copia a l'antiga.
function copia(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(() => copiaAntiga(text));
  return copiaAntiga(text);
}

function copiaAntiga(text) {
  const camp = document.createElement('textarea');
  camp.value = text;
  document.body.append(camp);
  camp.select();
  document.execCommand('copy');
  camp.remove();
  return Promise.resolve();
}

function obreMenu(latlng) {
  const caixa = L.DomUtil.create('div', 'menu-punt');
  const titol = L.DomUtil.create('p', 'menu-coordenades', caixa);
  titol.textContent = coordenades(latlng);
  const riera = rieraMesPropera(latlng);
  if (riera) {
    const linia = L.DomUtil.create('p', 'menu-riera', caixa);
    linia.textContent = (riera.cobert ? T.menu.rieraCobertaA : T.menu.rieraA)(formataDistancia(riera.metres));
  }
  const llista = L.DomUtil.create('ul', '', caixa);
  const boto = (text, accio) => {
    const b = L.DomUtil.create('button', '', L.DomUtil.create('li', '', llista));
    b.type = 'button';
    b.textContent = text;
    L.DomEvent.on(b, 'click', (e) => { L.DomEvent.stop(e); accio(b); });
  };
  const enllac = (text, url) => {
    const a = L.DomUtil.create('a', '', L.DomUtil.create('li', '', llista));
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = text;
  };
  boto(T.menu.copia, (b) => copia(coordenades(latlng)).then(() => avisaBreu(b, T.menu.copiat)));
  boto(T.menu.comparteix, (b) => comparteix(T.menu.textComparteix, enllacPunt(latlng), () => avisaBreu(b, T.menu.enllacCopiat)));
  const lat = latlng.lat.toFixed(5);
  const lon = latlng.lng.toFixed(5);
  enllac(T.menu.google, `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
  enllac(T.menu.osm, `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`);
  enllac(T.menu.icgc, `https://visors.icgc.cat/contextmaps/#18/${lat}/${lon}`);
  L.popup({ className: 'popup-punt', maxWidth: ampleFinestreta() }).setLatLng(latlng).setContent(caixa).openOn(mapa);
  caixa.querySelector('button').focus();
}

mapa.on('contextmenu', (e) => obreMenu(e.latlng));
contenidor.addEventListener('keydown', (e) => {
  if (e.target === contenidor && (e.key === 'ContextMenu' || (e.key === 'F10' && e.shiftKey))) {
    e.preventDefault();
    obreMenu(mapa.getCenter());
  }
});

// --- Obrir el mapa com diu l'enllaç (vegeu estatDelMapa) ---
// Cada paràmetre és opcional: el que falta queda com en obrir el mapa sense res.
// Els enllaços d'abans, només amb #punt=lat,lon, segueixen funcionant.
let limitsBarri;

function coordenadaValida(lat, lon) {
  return Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
}

function aplicaEnllac() {
  const p = new URLSearchParams(location.hash.slice(1));
  const mp = /^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/.exec(p.get('punt') || '');
  const punt = mp && coordenadaValida(+mp[1], +mp[2]) ? L.latLng(+mp[1], +mp[2]) : null;
  const mv = /^(\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(p.get('mapa') || '');
  // La vista; si no n'hi ha, el punt; si tampoc, Montflorit amb la riera i la vall del torrent
  // dels Gorgs al voltant (Juanjo, 14-10-2026); el recorregut sencer, allunyant el zoom.
  if (mv && coordenadaValida(+mv[2], +mv[3])) mapa.setView([+mv[2], +mv[3]], Math.min(21, +mv[1]));
  else if (punt) mapa.setView(punt, 17);
  else mapa.fitBounds(limitsBarri.pad(0.2));
  // El fons; un any d'ortofoto sense fons ja vol dir l'ortofoto.
  const decada = DECADES.findIndex((d) => d[2] === p.get('any'));
  const fonsTriat = FONS[p.get('fons')] || (decada >= 0 ? ortoAntiga : fonsOsm);
  Object.values(FONS).forEach((capa) => { if (capa !== fonsTriat) mapa.removeLayer(capa); });
  fonsTriat.addTo(mapa);
  triaDecada(decada >= 0 ? decada : ACTUAL);
  // Les capes, amb el dibuix a la vista mentre es trien.
  if (dibuixosAmagats !== null) canviaDibuixos();
  // «gorgs» és la capa del torrent dels Gorgs de la 1.4.0, ara dins dels afluents.
  const triades = (p.has('capes') ? p.get('capes').split(',') : CAPES_INICIALS).map((nom) => (nom === 'gorgs' ? 'afluents' : nom));
  Object.entries(CAPES).forEach(([nom, capa]) => {
    if (triades.includes(nom)) capa.addTo(mapa); else mapa.removeLayer(capa);
  });
  if (marcaCompartida) mapa.removeLayer(marcaCompartida);
  marcaCompartida = null;
  if (punt) {
    marcaCompartida = L.marker(punt, { title: T.menu.punt, alt: T.menu.punt }).addTo(mapa)
      .bindTooltip(`${T.menu.punt}: ${coordenades(punt)}`, { permanent: true, direction: 'top', offset: [0, -30] });
  }
  if (p.get('dibuixos') === '0') canviaDibuixos();
}

// --- Les dades ---
Promise.all([
  fetch(ARREL + 'dades/riera-sant-cugat.geojson').then((r) => r.json()),
  fetch(ARREL + 'dades/montflorit-limits.geojson').then((r) => r.json()),
]).then(([riera, barri]) => {
  limitsBarri = L.geoJSON(barri).getBounds();
  capaBarri.addData(barri);
  capaRiera.addData(riera).addTo(mapa);
  capaAfluents.addData(riera);
  tracatRiera = capaRiera.getLayers();
  const trams = riera.features;
  const principals = trams.filter((f) => !f.properties.part.startsWith('afluent'));
  const darrer = principals[principals.length - 1].geometry.coordinates;
  const fi = darrer[darrer.length - 1];
  // La font, al lloc de la fitxa de la Diputació; el traçat comença una mica més avall.
  punt(41.430139, 2.106803, T.rabassalet, { variableColor: '--capcalera', fillColor: color('--capcalera') });
  // El naixement de cada afluent: el primer punt del seu primer tram.
  const naixements = { 'Torrent de Can Miró': T.naixGorgs, 'Torrent de Can Domènec': T.naixDomenec };
  Object.entries(naixements).forEach(([nom, text]) => {
    const primer = trams.find((f) => f.properties.part === 'afluent' && f.properties.nom === nom);
    if (!primer) return;
    const naix = primer.geometry.coordinates[0];
    punt(naix[1], naix[0], text, { radius: 6, variableColor: '--afluent2', fillColor: color('--afluent2') }, capaAfluents);
  });
  punt(41.469438, 2.083075, T.pollancre, { radius: 5, variableColor: '--riera', fillColor: color('--riera') });
  punt(fi[1], fi[0], T.desembocadura, { variableColor: '--riera', fillColor: color('--riera') });
  puntsDeReferencia.addTo(mapa);
  // La vista, el fons i les capes, els de l'enllaç; i si es canvia l'enllaç sense tornar a carregar la pàgina, també.
  aplicaEnllac();
  window.addEventListener('hashchange', aplicaEnllac);
}).catch(() => {
  const avis = document.createElement('p');
  avis.className = 'destacada';
  avis.textContent = T.errada;
  mapa.getContainer().after(avis);
});
