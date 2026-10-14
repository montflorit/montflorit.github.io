# 1. Web aparte para los contenidos del barrio

Fecha: 2026-10-14 · Estado: aceptado

## Contexto

Juanjo quería publicar el mapa de la riera de Sant Cugat en Temps a Montflorit
(`meteo-montflorit/meteo-local`). Aquella web promete en «Privacitat» que «no
carrega res d'altres webs» (su ADR 0073) y ya descartó las teselas de
servidores de mapas por ese motivo (su ADR 0077). El mapa, tal como Juanjo lo
quería, pide los fondos a OpenStreetMap y al ICGC.

## Alternativas

- **Imagen fija propia en Temps a Montflorit**, como su mapa de límites:
  cumple la promesa, pero sin zoom libre, capas ni ortofotos. Juanjo: «me
  gustaría que funcionase como ahora».
- **Mapa interactivo con los fondos alojados en Temps a Montflorit**: cumple la
  promesa y funciona igual, pero son varios megas de fondos congelados y
  horas de trabajo.
- **Cambiar la página de privacidad de Temps a Montflorit**: rebaja una
  promesa que hoy se cumple sin excepciones.
- **Web aparte con su propia privacidad** (propuesta de Juanjo: «y si hacemos
  otro repo específico para esto? manteniendo los mapas de sus fuentes
  originales, así queda aparte con su propia privacidad»). Elegida.

## Decisión

- Organización `montflorit` (creada por Juanjo el 14-10-2026), repositorio
  `montflorit.github.io`, publicado en <https://montflorit.github.io/>. Un
  dominio distinto de `meteo-montflorit.github.io`: el *service worker* de
  aquella, que abarca todo su dominio, no interfiere, y queda claro que es
  otra web con otras condiciones.
- **Una web del barrio, no solo del mapa**: Juanjo la irá completando con más
  contenidos de Montflorit. Portada breve con una tarjeta por contenido, y
  cada contenido en su propia dirección (`riera/`), para que los enlaces
  compartidos no se rompan cuando crezca.
- **Catalán y castellano**, como Temps a Montflorit, que va para el mismo
  barrio.
- Aspecto de Temps a Montflorit (colores, cabecera, selector de idioma,
  conmutador de tema), para que se reconozcan como webs hermanas.
- Páginas generadas por `eines/construeix.py` a partir del contenido de
  `pagines/`: la cabecera y el pie, iguales en todas sin repetirlos a mano.
- Licencias de la guía «Vibe coding responsable»: código AGPL-3.0-or-later,
  textos CC BY-SA 4.0; el trazado, ODbL por derivar de OpenStreetMap.
- GitHub Pages publica la raíz con Jekyll; `_config.yml` deja fuera las
  herramientas, las pruebas, la documentación y el contenido fuente.
- Aviso de web no oficial en la portada, en «Fonts i crèdits» y en el pie.

## Consecuencias

- En Temps a Montflorit, el mapa se enlaza (un enlace no carga nada); su
  privacidad no cambia.
- La app de Android de Temps a Montflorit abre los enlaces a otro dominio en
  el navegador, fuera de la app: este mapa no forma parte de lo que revisa
  Google Play. Hipótesis por comprobar en el móvil cuando esté publicado.
- Los límites del barrio se copian de Temps a Montflorit; si cambian allí,
  hay que copiarlos aquí.
