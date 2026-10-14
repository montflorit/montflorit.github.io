#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-or-later
"""Construeix les pàgines de la web Montflorit (ADR 0001).

El contingut de cada pàgina és a pagines/<llengua>/<nom>.html; aquest guió hi
posa al voltant la capçalera, el selector de llengua, el tema i el peu, iguals
a totes, i deixa les pàgines publicables a l'arrel (català) i a es/ (castellà).
Les pàgines generades no s'editen a mà: s'edita pagines/ i es torna a executar

    python3 eines/construeix.py
"""
import os

ARREL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(ARREL, "VERSION"), encoding="utf-8") as _f:
    VERSIO = _f.read().strip()
WEB = "https://montflorit.github.io/"
REPO = "https://github.com/montflorit/montflorit.github.io"

# Cada pàgina: on va i els seus textos de capçalera en les dues llengües.
PAGINES = {
    "index": {
        "cami": "",
        "ca": {"titol": "Montflorit", "h1": "Montflorit",
               "descripcio": "Informació sobre el barri de Montflorit, a Cerdanyola del Vallès."},
        "es": {"titol": "Montflorit", "h1": "Montflorit",
               "descripcio": "Información sobre el barrio de Montflorit, en Cerdanyola del Vallès."},
    },
    "riera": {
        "cami": "riera/",
        "mapa": True,
        "ca": {"titol": "La riera de Sant Cugat · Montflorit", "h1": "La riera de Sant Cugat",
               "descripcio": "El recorregut de la riera de Sant Cugat, de Collserola al Ripoll, amb el tram cobert de Sant Cugat i el pas per Montflorit."},
        "es": {"titol": "La riera de Sant Cugat · Montflorit", "h1": "La riera de Sant Cugat",
               "descripcio": "El recorrido de la riera de Sant Cugat, de Collserola al Ripoll, con el tramo cubierto de Sant Cugat y el paso por Montflorit."},
    },
    "fonts": {
        "cami": "fonts.html",
        "ca": {"titol": "Fonts i crèdits · Montflorit", "h1": "Fonts i crèdits",
               "descripcio": "D'on surt la informació de la web Montflorit, amb l'enllaç a cada font."},
        "es": {"titol": "Fuentes y créditos · Montflorit", "h1": "Fuentes y créditos",
               "descripcio": "De dónde sale la información de la web Montflorit, con el enlace a cada fuente."},
    },
    "privacitat": {
        "cami": "privacitat.html",
        "ca": {"titol": "Privacitat · Montflorit", "h1": "Privacitat",
               "descripcio": "Què fa la web Montflorit amb les dades de qui la visita: no en recull cap."},
        "es": {"titol": "Privacidad · Montflorit", "h1": "Privacidad",
               "descripcio": "Qué hace la web Montflorit con los datos de quien la visita: no recoge ninguno."},
    },
}

RUTA = {"ca": "Cerdanyola del Vallès", "es": "Cerdanyola del Vallès"}
NOM_LLENGUA = {"ca": "Català", "es": "Castellano"}

PEU = {
    "ca": ('<p><a href="{repo}/releases" target="_blank" rel="noopener">versió {versio}</a> · '
           '<a href="{arrel}fonts.html">Fonts i crèdits</a> · <a href="{arrel}privacitat.html">Privacitat</a></p>\n'
           '    <p>© 2026 <a href="https://bilateria.org" target="_blank" rel="noopener">Juan José de Haro</a> · '
           'Continguts <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.ca" target="_blank" rel="noopener">CC BY-SA 4.0</a> · '
           'Codi <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener">AGPL v3</a> · '
           'Web veïnal, no oficial</p>\n'
           '    <p>Fet amb IA (Claude Code, octubre de 2026), '
           '<a href="https://jjdeharo.github.io/miae/?nivel=4" target="_blank" rel="noopener">nivell 4 del MIAE</a>.</p>'),
    "es": ('<p><a href="{repo}/releases" target="_blank" rel="noopener">versión {versio}</a> · '
           '<a href="{arrel}fonts.html">Fuentes y créditos</a> · <a href="{arrel}privacitat.html">Privacidad</a></p>\n'
           '    <p>© 2026 <a href="https://bilateria.org" target="_blank" rel="noopener">Juan José de Haro</a> · '
           'Contenidos <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener">CC BY-SA 4.0</a> · '
           'Código <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener">AGPL v3</a> · '
           'Web vecinal, no oficial</p>\n'
           '    <p>Hecho con IA (Claude Code, octubre de 2026), '
           '<a href="https://jjdeharo.github.io/miae/?nivel=4" target="_blank" rel="noopener">nivel 4 del MIAE</a>.</p>'),
}

# La icona de la pestanya: una gota, per la riera i l'aigua del barri (Lucide, ISC).
ICONA = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' "
         "stroke='%231d4ed8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E"
         "%3Cpath d='M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'/%3E%3C/svg%3E")


def profunditat(llengua, cami):
    """Quantes carpetes per sota de l'arrel queda la pàgina."""
    return (1 if llengua == "es" else 0) + cami.count("/")


def selector(llengua, cami, arrel):
    peces = []
    for altra in ("ca", "es"):
        codi = altra.upper()
        if altra == llengua:
            peces.append(f'<span lang="{altra}" aria-current="page" title="{NOM_LLENGUA[altra]}">{codi}</span>')
        else:
            desti = arrel + ("es/" if altra == "es" else "") + cami
            peces.append(f'<a href="{desti or "./"}" lang="{altra}" hreflang="{altra}" title="{NOM_LLENGUA[altra]}">{codi}</a>')
    etiqueta = "Idioma" if llengua == "es" else "Llengua"
    return f'<nav class="idiomes" aria-label="{etiqueta}">' + "".join(peces) + "</nav>"


def pagina(nom, llengua):
    dades = PAGINES[nom]
    textos = dades[llengua]
    cami = dades["cami"]
    arrel = "../" * profunditat(llengua, cami)
    with open(os.path.join(ARREL, "pagines", llengua, nom + ".html"), encoding="utf-8") as f:
        cos = f.read().rstrip()
    url_ca = WEB + cami
    url_es = WEB + "es/" + cami
    inici = "Inici" if llengua == "ca" else "Inicio"
    # Fora de la portada, el títol de la web enllaça a la portada.
    ruta = RUTA[llengua] if nom == "index" else f'<a href="{arrel + ("es/" if llengua == "es" else "") or "./"}">Montflorit</a> · {RUTA[llengua]}'
    mapa_cap = ('\n  <link rel="stylesheet" href="{a}vendor/leaflet/leaflet.css">'.format(a=arrel)) if dades.get("mapa") else ""
    mapa_peu = ('\n  <script src="{a}vendor/leaflet/leaflet.js"></script>\n  <script src="{a}riera/mapa.js"></script>'
                .format(a=arrel)) if dades.get("mapa") else ""
    tema_fosc = "Tema oscuro" if llengua == "es" else "Tema fosc"
    return f"""<!doctype html>
<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!-- Pàgina generada per eines/construeix.py a partir de pagines/{llengua}/{nom}.html: no l'editis a mà. -->
<html lang="{llengua}" data-theme="light" data-arrel="{arrel}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{textos["titol"]}</title>
  <meta name="description" content="{textos["descripcio"]}">
  <link rel="canonical" href="{url_ca if llengua == "ca" else url_es}">
  <link rel="alternate" hreflang="ca" href="{url_ca}">
  <link rel="alternate" hreflang="es" href="{url_es}">
  <link rel="icon" href="{ICONA}">
  <script>
    // L'idioma triat amb el selector (tema.js el desa): si no és el d'aquesta pàgina,
    // la mateixa pàgina en l'altre, abans de pintar res (Juanjo, 14-10-2026: «el
    // idioma de la web debe ser persistente»). Sense triar, cada pàgina en el seu.
    try {{
      const llengua = localStorage.getItem('montflorit.idioma');
      const altra = llengua && llengua !== document.documentElement.lang
        && document.querySelector(`link[rel="alternate"][hreflang="${{llengua}}"]`);
      if (altra) location.replace(new URL(altra.href).pathname + location.search + location.hash);
    }} catch (_) {{}}
  </script>
  <script>
    // El tema abans de pintar res, per no fer un parpelleig.
    try {{
      const triat = localStorage.getItem('montflorit.fosc');
      const fosc = triat === null ? matchMedia('(prefers-color-scheme: dark)').matches : triat === '1';
      document.documentElement.dataset.theme = fosc ? 'dark' : 'light';
    }} catch (_) {{}}
  </script>
  <meta name="theme-color" content="#f6f7f9" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#12161c" media="(prefers-color-scheme: dark)">{mapa_cap}
  <link rel="stylesheet" href="{arrel}estil.css">
</head>
<body{' class="amb-mapa"' if dades.get("mapa") else ""}>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <!-- Icones de Lucide (ISC) -->
    <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></symbol>
  </svg>

  <header class="cap">
    <div>
      <h1>{textos["h1"]}</h1>
      <p class="ruta">{ruta}</p>
    </div>
    <div class="cap-botons">
      {selector(llengua, cami, arrel)}
      <button class="boto-icona" id="btn-fosc" type="button" title="{tema_fosc}" aria-label="{tema_fosc}"><svg aria-hidden="true"><use href="#i-moon"></use></svg></button>
    </div>
  </header>

  <main class="contingut">
{cos}
  </main>

  <footer class="peu">
    {PEU[llengua].format(repo=REPO, versio=VERSIO, arrel=arrel)}
  </footer>

  <script src="{arrel}tema.js"></script>{mapa_peu}
</body>
</html>
"""


def construeix():
    escrites = []
    for nom, dades in PAGINES.items():
        for llengua in ("ca", "es"):
            desti = os.path.join(ARREL, "es" if llengua == "es" else "", dades["cami"])
            if desti.endswith("/") or dades["cami"] == "" or dades["cami"].endswith("/"):
                desti = os.path.join(desti, "index.html")
            os.makedirs(os.path.dirname(desti), exist_ok=True)
            with open(desti, "w", encoding="utf-8") as f:
                f.write(pagina(nom, llengua))
            escrites.append(os.path.relpath(desti, ARREL))
    return escrites


if __name__ == "__main__":
    for ruta in construeix():
        print(ruta)
