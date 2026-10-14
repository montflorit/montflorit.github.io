# Instrucciones para agentes

Web vecinal «Montflorit» (<https://montflorit.github.io/>): contenidos sobre el
barrio de Montflorit (Cerdanyola del Vallès). Organización y archivos:
[README.md](README.md); decisiones: `docs/adr/`.

Al cambiar algo:

- La web está en catalán y castellano y va dirigida a cualquier vecino. Cada
  texto nuevo, en los dos idiomas (`pagines/ca/` y `pagines/es/`, y los
  textos de `riera/mapa.js`); las pruebas comprueban la paridad.
- Se edita `pagines/`; después `python3 eines/construeix.py`. Las páginas
  generadas no se tocan a mano.
- **Cada dato, con su fuente enlazada** en la página y en «Fonts i crèdits»,
  en el idioma del texto cuando exista. Es web no oficial: el aviso se queda.
- **Privacidad**: sin cookies, estadísticas ni contadores. Si algo nuevo pide
  recursos a otro servidor, se dice en «Privacitat» con el enlace a su
  política. Las bibliotecas, servidas desde aquí (`vendor/`).
- Un contenido nuevo va en su propia página o carpeta, enlazada desde la
  portada, para que su dirección no cambie (ADR 0001).
- Antes de publicar: pruebas, `probar-web` (Chrome, Firefox y WebKit; móvil y
  escritorio) y axe-core; sube `VERSION`, regenera y etiqueta la versión
  (`vX.Y.Z`). Las etiquetas publicadas no se mueven.
- Cada decisión, en un ADR de `docs/adr/` y en su índice.
- Los límites del barrio son los de Temps a Montflorit
  (`meteo-montflorit/meteo-local`, `montflorit-limits.geojson`): si cambian
  allí, se copian aquí.
