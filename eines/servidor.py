#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-or-later
"""Servidor local per provar la web i editar el traçat de la riera (ADR 0003).

    python3 eines/servidor.py [port]

Serveix el repositori a http://127.0.0.1:8765/ (la web, tal com es publicarà)
i l'editor a http://127.0.0.1:8765/eines/editor.html. «Guardar» a l'editor
escriu dades/riera-sant-cugat.geojson i deixa una còpia de la versió anterior
a eines/copias/, que no va al repositori. Només escolta en aquest ordinador.
"""
import json
import os
import shutil
import sys
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ARREL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACAT = os.path.join(ARREL, "dades", "riera-sant-cugat.geojson")
COPIES = os.path.join(ARREL, "eines", "copias")
PORT = next((int(a) for a in sys.argv[1:] if a.isdigit()), 8765)


def valida(gj):
    """Que el que arriba de l'editor sigui un traçat amb el format de la web."""
    assert gj.get("type") == "FeatureCollection", "no és una FeatureCollection"
    for f in gj["features"]:
        assert f["geometry"]["type"] == "LineString", "cada tram ha de ser una línia"
        p = f["properties"]
        assert p.get("part") in ("capcalera", "sant-cugat", "riera", "afluent", "afluent-riera"), f"part desconeguda: {p.get('part')}"
        assert p.get("estat") in ("obert", "cobert"), f"estat desconegut: {p.get('estat')}"
        assert p.get("font") in ("icgc", "santcugat", "osm"), f"font desconeguda: {p.get('font')}"


class Gestor(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ARREL, **k)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path != "/guardar":
            self.send_error(404)
            return
        try:
            gj = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
            valida(gj)
            os.makedirs(COPIES, exist_ok=True)
            shutil.copy2(TRACAT, os.path.join(COPIES, time.strftime("riera-%Y%m%d-%H%M%S.geojson")))
            for f in gj["features"]:
                f["geometry"]["coordinates"] = [[round(x, 6), round(y, 6)] for x, y in f["geometry"]["coordinates"]]
            provisional = TRACAT + ".tmp"
            with open(provisional, "w", encoding="utf-8") as fitxer:
                json.dump(gj, fitxer, ensure_ascii=False, separators=(",", ":"))
            os.replace(provisional, TRACAT)
            resposta, codi = {"ok": True, "hora": time.strftime("%H:%M:%S")}, 200
        except Exception as error:
            resposta, codi = {"ok": False, "error": str(error)}, 500
        cos = json.dumps(resposta).encode()
        self.send_response(codi)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(cos)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    print(f"Web: http://127.0.0.1:{PORT}/   Editor: http://127.0.0.1:{PORT}/eines/editor.html   (Ctrl+C per tancar)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Gestor).serve_forever()
