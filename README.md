# Montflorit

Web vecinal y no oficial sobre el barrio de **Montflorit** (Cerdanyola del
Vallès), en catalán y en castellano: <https://montflorit.github.io/>. Irá
creciendo con más contenidos del barrio; cada uno en su propia página, para
que su dirección no cambie (ADR 0001).

Contenidos:

- **La riera de Sant Cugat** (`riera/`): mapa interactivo del recorrido de la
  riera desde la font del Rabassalet, en Collserola, hasta el Ripoll, con el
  tramo cubierto bajo Sant Cugat y los límites de Montflorit (ADR 0002).

Web hermana: **Temps a Montflorit** (<https://meteo-montflorit.github.io/>),
el tiempo del barrio, en `meteo-montflorit/meteo-local`. Esta va aparte porque
su mapa pide los fondos a servidores de terceros, y aquella promete no cargar
nada de otras webs (ADR 0001).

## Qué guarda y con qué se comunica

No guarda nada de quien la visita, salvo el tema claro u oscuro si se elige,
en el propio dispositivo. Sin cookies, estadísticas ni contadores. El mapa
pide los fondos a OpenStreetMap y al Institut Cartogràfic i Geològic de
Catalunya (ICGC), y las capas de la Agència Catalana de l'Aigua (ACA) al
servidor de mapas de la Generalitat si se activan; todo lo demás, también
Leaflet, se sirve desde esta web.

## Organización

| Ruta | Para qué |
|---|---|
| `pagines/ca/*.html`, `pagines/es/*.html` | El contenido de cada página, en cada idioma. **Lo que se edita.** |
| `eines/construeix.py` | Genera las páginas publicables (`index.html`, `riera/`, `fonts.html`, `privacitat.html` y sus versiones en `es/`) con la cabecera, el selector de idioma, el tema y el pie comunes. Las páginas generadas no se editan a mano. |
| `estil.css`, `tema.js` | El aspecto, con los colores de Temps a Montflorit, y el conmutador de tema claro u oscuro. |
| `riera/mapa.js` | El mapa de la riera (Leaflet), con sus textos en los dos idiomas. |
| `dades/riera-sant-cugat.geojson` | El trazado de la riera, de la base topográfica 1:5.000 del ICGC; bajo Sant Cugat, de la capa «Rieres i torrents» del Ajuntament; dos tramos de OpenStreetMap; tramo a tramo: `nom`, `part` (`capcalera`, `sant-cugat`, `riera`), `estat` (`obert`, `cobert`) y `font` (`icgc`, `santcugat`, `osm`) y, si otras fuentes le dan otro nombre, `altres`. Incluye el torrent dels Gorgs (`part`: `afluent`). ODbL. |
| `dades/montflorit-limits.geojson` | Los límites del barrio, copiados de Temps a Montflorit. |
| `vendor/leaflet/` | Leaflet 1.9.4 (BSD-2-Clause). |
| `eines/servidor.py`, `eines/editor.html` | Servidor local para probar la web y editor del trazado (ADR 0003). No se publican. |
| `tests/test_web.py` | Pruebas: páginas al día con su fuente, enlaces internos, paridad de idiomas, datos válidos, licencias. |
| `docs/adr/` | Registro de decisiones. |
| `_config.yml` | Qué no publica GitHub Pages. |

## Trabajar con el proyecto

```sh
python3 eines/construeix.py          # regenera las páginas tras editar pagines/
python3 -m unittest discover -s tests   # pruebas
python3 eines/servidor.py            # web y editor en http://127.0.0.1:8765/
```

Para corregir el trazado: abrir `http://127.0.0.1:8765/eines/editor.html`,
mover los puntos sobre las ortofotos y «Guardar». Se guarda en
`dades/riera-sant-cugat.geojson`; la web lo lee de ahí.

## Licencias

Código AGPL-3.0-or-later ([LICENSE](LICENSE)); textos CC BY-SA 4.0; trazado
de la riera ODbL; materiales de terceros, con la suya
([LICENSE-CONTINGUTS.md](LICENSE-CONTINGUTS.md)).

Hecho con IA (Claude Code, octubre de 2026),
[nivel 4 del MIAE](https://jjdeharo.github.io/miae/?nivel=4).
