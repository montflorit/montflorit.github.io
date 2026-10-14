# SPDX-License-Identifier: AGPL-3.0-or-later
"""Proves de la web Montflorit: python3 -m unittest discover -s tests"""
import json
import os
import re
import shutil
import subprocess
import sys
import unittest
from html.parser import HTMLParser

ARREL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ARREL, "eines"))
import construeix  # noqa: E402

PAGINES = ["index.html", "riera/index.html", "fonts.html", "privacitat.html"]
TOTES = PAGINES + ["es/" + p for p in PAGINES]


def llegeix(ruta):
    with open(os.path.join(ARREL, ruta), encoding="utf-8") as f:
        return f.read()


class Enllacos(HTMLParser):
    def __init__(self):
        super().__init__()
        self.enllacos, self.ids, self.imatges_sense_alt = [], set(), 0

    def handle_starttag(self, etiqueta, atributs):
        a = dict(atributs)
        if "id" in a:
            self.ids.add(a["id"])
        for nom in ("href", "src"):
            if nom in a and etiqueta in ("a", "link", "script", "img"):
                self.enllacos.append((etiqueta, a[nom], a))
        if etiqueta == "img" and "alt" not in a:
            self.imatges_sense_alt += 1


def analitza(ruta):
    p = Enllacos()
    p.feed(llegeix(ruta))
    return p


def test_pagines_generades_al_dia():
    """Les pàgines publicades són les que surten de pagines/ ara mateix."""
    for nom in construeix.PAGINES:
        for llengua in ("ca", "es"):
            cami = construeix.PAGINES[nom]["cami"]
            ruta = ("es/" if llengua == "es" else "") + (cami if cami.endswith(".html") else cami + "index.html")
            assert llegeix(ruta) == construeix.pagina(nom, llengua), f"{ruta}: torna a executar eines/construeix.py"


def test_enllacos_interns_existeixen():
    for pagina in TOTES:
        base = os.path.dirname(pagina)
        for etiqueta, url, _ in analitza(pagina).enllacos:
            if re.match(r"^(https?:|mailto:|data:|#)", url):
                continue
            desti = os.path.normpath(os.path.join(ARREL, base, url.split("#")[0]))
            if url.endswith("/") or url in ("./", ""):
                desti = os.path.join(desti, "index.html")
            assert os.path.exists(desti), f"{pagina}: l'enllaç {url} no porta enlloc"


def test_enllacos_externs_en_pestanya_nova():
    for pagina in TOTES:
        for etiqueta, url, a in analitza(pagina).enllacos:
            if etiqueta == "a" and url.startswith("http"):
                assert a.get("target") == "_blank" and "noopener" in a.get("rel", ""), f"{pagina}: {url}"


def test_mateixos_enllacos_externs_en_les_dues_llengues():
    """Cada font enllaçada en català també ho està en castellà (pot canviar la variant de la llengua)."""
    normalitza = lambda u: re.sub(r"(deed\.ca|deed\.es|copyright/ca|copyright/es|Geoinformacio.*|Geoinformacion.*|dadespersonals|datospersonales|Ajuda/Avis-legal|Ayuda/Aviso-legal)", "",
                                  re.sub(r"/(ca|es)/", "/", u))
    for pagina in PAGINES:
        ca = {normalitza(u) for e, u, a in analitza(pagina).enllacos if e == "a" and u.startswith("http")}
        es = {normalitza(u) for e, u, a in analitza("es/" + pagina).enllacos if e == "a" and u.startswith("http")}
        assert ca == es, f"{pagina}: només en una llengua: {ca ^ es}"


def test_llengua_i_alternatives():
    for pagina in TOTES:
        t = llegeix(pagina)
        llengua = "es" if pagina.startswith("es/") else "ca"
        assert f'<html lang="{llengua}"' in t
        assert 'hreflang="ca"' in t and 'hreflang="es"' in t


def test_textos_del_mapa_en_les_dues_llengues():
    js = llegeix("riera/mapa.js")
    ca = js[js.index("  ca: {"):js.index("  es: {")]
    es = js[js.index("  es: {"):js.index("const T = ")]
    claus = lambda bloc: re.findall(r"^\s{4,}([a-zA-Z0-9'\-]+):", bloc, re.M)
    assert claus(ca) == claus(es)


def test_tracat_valid():
    gj = json.loads(llegeix("dades/riera-sant-cugat.geojson"))
    assert gj["type"] == "FeatureCollection" and "ODbL" in gj["llicencia"]
    for f in gj["features"]:
        p = f["properties"]
        assert f["geometry"]["type"] == "LineString" and len(f["geometry"]["coordinates"]) >= 2
        assert p["part"] in ("capcalera", "sant-cugat", "riera")
        assert p["estat"] in ("obert", "cobert")
        assert p["font"] in ("icgc", "santcugat", "osm")
        for lon, lat in f["geometry"]["coordinates"]:
            assert 2.05 < lon < 2.20 and 41.40 < lat < 41.50, "coordenada fora de la zona"


def test_tracat_continu():
    """Cada tram comença on acaba l'anterior (menys d'1 m), de la font al Ripoll."""
    trams = json.loads(llegeix("dades/riera-sant-cugat.geojson"))["features"]
    for anterior, seguent in zip(trams, trams[1:]):
        (x1, y1), (x2, y2) = anterior["geometry"]["coordinates"][-1], seguent["geometry"]["coordinates"][0]
        metres = ((x1 - x2) * 83500) ** 2 + ((y1 - y2) * 111000) ** 2
        assert metres ** 0.5 < 1, f"salt entre {anterior['properties']} i {seguent['properties']}"


def test_limits_iguals_que_temps_a_montflorit():
    origen = os.path.expanduser("~/Documentos/github/meteo-local/montflorit-limits.geojson")
    if os.path.exists(origen):
        with open(origen, encoding="utf-8") as f:
            assert json.load(f) == json.loads(llegeix("dades/montflorit-limits.geojson"))


def test_capcalera_spdx():
    for ruta in ["estil.css", "tema.js", "riera/mapa.js", "eines/construeix.py", "eines/servidor.py",
                 "eines/editor.html", "tests/test_web.py"] + TOTES:
        assert "SPDX-License-Identifier: AGPL-3.0-or-later" in llegeix(ruta)[:400], ruta


def test_versio_al_peu():
    versio = llegeix("VERSION").strip()
    assert re.fullmatch(r"\d+\.\d+\.\d+", versio)
    for pagina in TOTES:
        assert f"{versio}</a>" in llegeix(pagina)


def test_sense_recursos_de_fora_a_la_web():
    """Scripts i fulls d'estil, servits des de la mateixa web (els fons del mapa, a part)."""
    for pagina in TOTES:
        for etiqueta, url, a in analitza(pagina).enllacos:
            if etiqueta in ("script", "link") and a.get("rel") not in ("canonical", "alternate", "icon"):
                assert not url.startswith("http"), f"{pagina}: {url}"


def test_javascript_sense_errors_de_sintaxi():
    for ruta in ("tema.js", "riera/mapa.js"):
        r = subprocess.run(["node", "--check", os.path.join(ARREL, ruta)], capture_output=True, text=True)
        assert r.returncode == 0, r.stderr


class Web(unittest.TestCase):
    """Cada funció test_* d'aquest fitxer, com a prova de unittest."""


for _nom, _funcio in list(globals().items()):
    if _nom.startswith("test_") and callable(_funcio):
        setattr(Web, _nom, lambda self, f=_funcio: f())
del _nom, _funcio
Web.test_javascript_sense_errors_de_sintaxi = unittest.skipUnless(shutil.which("node"), "cal Node")(
    Web.test_javascript_sense_errors_de_sintaxi)

if __name__ == "__main__":
    unittest.main()
