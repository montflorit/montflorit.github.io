# 3. Editor local del trazado

Fecha: 2026-10-14 · Estado: aceptado

## Contexto

Juanjo encontró varios errores en el trazado del tramo cubierto y pidió «un
editor que pueda guardar para poder rectificarlo directamente», en lugar de
marcarlos en capturas.

## Decisión

- `eines/editor.html`, con Leaflet y Leaflet-Geoman (gratuito, MIT, cargado de
  unpkg: es una herramienta local, no se publica). Mover, añadir y quitar
  puntos, dibujar y borrar tramos, editar el nombre, la parte, el estado y la
  fuente de cada tramo, deshacer (Ctrl+Z) y guardar (Ctrl+S). Por defecto, la
  ortofoto de 1970-1977; zoom hasta 21; los límites del barrio de referencia.
- `eines/servidor.py`: sirve el repositorio en `127.0.0.1` y, al guardar,
  valida el formato, escribe `dades/riera-sant-cugat.geojson` y deja una copia
  de la versión anterior en `eines/copias/` (fuera del repositorio).
- `_config.yml` deja `eines/` fuera de la web publicada.

## Validación

Probado en Chrome el 14-10-2026: mover un punto marca «Cambios sin guardar»,
deshacer lo devuelve al estado anterior y guardar escribe el archivo.
Pendiente: dibujar y borrar tramos, y Firefox.
