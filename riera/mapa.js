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
    tracat: 'Traçat: OpenStreetMap, ICC i ICGC (<a href="../fonts.html">fonts</a>)',
    fons: {
      osm: 'OpenStreetMap', carrers: 'Carrers (ICGC)', topo: 'Topogràfic (ICGC)', orto: 'Ortofoto actual (ICGC)',
      o46: 'Ortofoto de 1946 (ICGC)', o56: 'Ortofoto de 1956 (ICGC)', o77: 'Ortofoto de 1970-1977 (ICGC)',
    },
    capes: { m1987: 'Mapa de 1987, centre de Sant Cugat (ICC)', barri: 'Límits de Montflorit' },
    senseNom: 'Torrent sense nom',
    cobert: 'coberta',
    font: {
      osm: 'Traçat d\'OpenStreetMap.',
      'icc-1987': 'Traçat del mapa topogràfic 1:5.000 de 1987 (ICC), quan encara anava a cel obert, ajustat a les ortofotos antigues.',
      reconstruccio: 'Traçat aproximat: reconstruït sobre les ortofotos de 1970-1977 (ICGC), on encara es veu la riera, i les cotes del mapa de 1987.',
    },
    barri: 'Montflorit (els límits de Temps a Montflorit)',
    rabassalet: 'Font del Rabassalet: aquí neix la riera segons la Gran Enciclopèdia Catalana. Seca, segons la fitxa de la Diputació revisada el 2025.',
    pollancre: 'Pollancre de l\'antiga riera de Can Mora (inventari del patrimoni de la Diputació de Barcelona)',
    desembocadura: 'Desemboca al Ripoll (Montcada i Reixac)',
    mapa: 'Mapa de la riera de Sant Cugat',
    errada: 'No s\'ha pogut carregar el traçat. Torna-ho a provar més tard.',
  },
  es: {
    osm: 'Mapa: © <a href="https://www.openstreetmap.org/copyright/es" target="_blank" rel="noopener">colaboradores de OpenStreetMap</a>',
    icgc: 'Mapa: <a href="https://www.icgc.cat/es/Geoinformacion-y-mapas/Servicios-en-linea-Geoservicios" target="_blank" rel="noopener">Institut Cartogràfic i Geològic de Catalunya</a>',
    ortoAny: (any) => `Ortofoto ${any}: <a href="https://www.icgc.cat/es/Geoinformacion-y-mapas/Servicios-en-linea-Geoservicios/WMS-Ortoimagenes/WMS-Ortofoto-Territorial" target="_blank" rel="noopener">ICGC</a>`,
    tracat: 'Trazado: OpenStreetMap, ICC e ICGC (<a href="../fonts.html">fuentes</a>)',
    fons: {
      osm: 'OpenStreetMap', carrers: 'Calles (ICGC)', topo: 'Topográfico (ICGC)', orto: 'Ortofoto actual (ICGC)',
      o46: 'Ortofoto de 1946 (ICGC)', o56: 'Ortofoto de 1956 (ICGC)', o77: 'Ortofoto de 1970-1977 (ICGC)',
    },
    capes: { m1987: 'Mapa de 1987, centro de Sant Cugat (ICC)', barri: 'Límites de Montflorit' },
    senseNom: 'Torrente sin nombre',
    cobert: 'cubierta',
    font: {
      osm: 'Trazado de OpenStreetMap.',
      'icc-1987': 'Trazado del mapa topográfico 1:5.000 de 1987 (ICC), cuando aún iba a cielo abierto, ajustado a las ortofotos antiguas.',
      reconstruccio: 'Trazado aproximado: reconstruido sobre las ortofotos de 1970-1977 (ICGC), donde aún se ve la riera, y las cotas del mapa de 1987.',
    },
    barri: 'Montflorit (los límites de Temps a Montflorit)',
    rabassalet: 'Font del Rabassalet: aquí nace la riera según la Gran Enciclopèdia Catalana. Seca, según la ficha de la Diputació revisada en 2025.',
    pollancre: 'Chopo de la antigua riera de Can Mora (inventario del patrimonio de la Diputació de Barcelona)',
    desembocadura: 'Desemboca en el Ripoll (Montcada i Reixac)',
    mapa: 'Mapa de la riera de Sant Cugat',
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
const ortofotoAntiga = (capa, any) => L.tileLayer.wms('https://geoserveis.icgc.cat/servei/catalunya/orto-territorial/wms', {
  layers: capa, format: 'image/jpeg', maxZoom: 21, attribution: T.ortoAny(any) + ' · ' + T.tracat,
});
const fonsOsm = tesseles('https://tile.openstreetmap.org/{z}/{x}/{y}.png', T.osm).addTo(mapa);
const fons = {
  [T.fons.osm]: fonsOsm,
  [T.fons.carrers]: tesseles('https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/estandard/MON3857NW/{z}/{x}/{y}.png', T.icgc),
  [T.fons.topo]: tesseles('https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/topografic/MON3857NW/{z}/{x}/{y}.png', T.icgc),
  [T.fons.orto]: tesseles('https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/{z}/{x}/{y}.jpeg', T.icgc),
  [T.fons.o46]: ortofotoAntiga('ortofoto_blanc_i_negre_1945-1946', '1946'),
  [T.fons.o56]: ortofotoAntiga('ortofoto_blanc_i_negre_1956-1957', '1956'),
  [T.fons.o77]: ortofotoAntiga('ortofoto_blanc_i_negre_1970-1977', '1970-1977'),
};

// El mapa topogràfic 1:5.000 de 1987, ja ajustat a les coordenades d'ara.
// Només cobreix el centre de Sant Cugat; s'hi pot posar a sobre de qualsevol fons.
const mapa1987 = L.imageOverlay(ARREL + 'img/mapa-1987-icc.jpg', [[41.4650, 2.0780], [41.4735, 2.0940]], {
  opacity: 0.6,
  alt: '',
  attribution: 'Mapa de 1987: <a href="https://cartotecadigital.icgc.cat/digital/collection/topo5000/id/5766" target="_blank" rel="noopener">ICC</a> (CC BY 4.0)',
});

// --- Estil de cada tram ---
function estilTram(p) {
  const c = color(p.part === 'capcalera' ? '--capcalera' : '--riera');
  if (p.estat !== 'cobert') return { color: c, weight: 5, dashArray: null };
  // Cobert: ratlles llargues on segueix el mapa de 1987; punts on és aproximat.
  return { color: c, weight: 5, dashArray: p.font === 'reconstruccio' ? '2 7' : '8 6' };
}

function textTram(p) {
  const nom = p.nom || T.senseNom;
  return `<strong>${nom}</strong>${p.estat === 'cobert' ? ` (${T.cobert})` : ''}<br>${T.font[p.font] || ''}`;
}

const capaRiera = L.geoJSON(null, {
  style: (f) => estilTram(f.properties),
  onEachFeature: (f, capa) => capa.bindTooltip(textTram(f.properties), { sticky: true }),
});
const capaBarri = L.geoJSON(null, {
  style: () => ({ color: color('--barri'), weight: 3, dashArray: '10 5 2 5', fillColor: color('--barri'), fillOpacity: 0.08 }),
  onEachFeature: (f, capa) => capa.bindTooltip(T.barri, { sticky: true }),
});

// Els tres punts de referència.
const puntsDeReferencia = L.layerGroup();
function punt(lat, lon, text, opcions) {
  return L.circleMarker([lat, lon], Object.assign({ radius: 7, color: '#fff', weight: 2, fillOpacity: 1 }, opcions))
    .bindTooltip(text, { direction: 'top' })
    .addTo(puntsDeReferencia);
}

L.control.layers(fons, { [T.capes.barri]: capaBarri, [T.capes.m1987]: mapa1987 }, { position: 'topright' }).addTo(mapa);
L.control.scale({ imperial: false }).addTo(mapa);

// Els colors es tornen a posar si canvia el tema (tema.js avisa amb «canvi-tema»).
function repintaColors() {
  capaRiera.eachLayer((capa) => capa.setStyle(estilTram(capa.feature.properties)));
  capaBarri.setStyle({ color: color('--barri'), fillColor: color('--barri') });
  puntsDeReferencia.eachLayer((capa) => capa.setStyle({ fillColor: color(capa.options.variableColor) }));
}
document.addEventListener('canvi-tema', repintaColors);

// --- Les dades ---
Promise.all([
  fetch(ARREL + 'dades/riera-sant-cugat.geojson').then((r) => r.json()),
  fetch(ARREL + 'dades/montflorit-limits.geojson').then((r) => r.json()),
]).then(([riera, barri]) => {
  // Primer s'enquadra tot el recorregut, i després s'hi posen les capes.
  mapa.fitBounds(L.geoJSON(riera).getBounds(), { padding: [20, 20] });
  capaBarri.addData(barri).addTo(mapa);
  capaRiera.addData(riera).addTo(mapa);
  const trams = riera.features;
  const darrer = trams[trams.length - 1].geometry.coordinates;
  const fi = darrer[darrer.length - 1];
  // La font, al lloc de la fitxa de la Diputació; el traçat comença una mica més avall.
  punt(41.430139, 2.106803, T.rabassalet, { variableColor: '--capcalera', fillColor: color('--capcalera') });
  punt(41.469438, 2.083075, T.pollancre, { radius: 5, variableColor: '--riera', fillColor: color('--riera') });
  punt(fi[1], fi[0], T.desembocadura, { variableColor: '--riera', fillColor: color('--riera') });
  puntsDeReferencia.addTo(mapa);
}).catch(() => {
  const avis = document.createElement('p');
  avis.className = 'destacada';
  avis.textContent = T.errada;
  mapa.getContainer().after(avis);
});
