// SPDX-License-Identifier: AGPL-3.0-or-later
// El commutador de tema clar o fosc, el mateix de Temps a Montflorit.
// Sense triar res, la web segueix el tema del sistema; si es tria l'altre,
// es desa només al dispositiu (montflorit.fosc) i no s'envia enlloc.

const sistemaFosc = matchMedia('(prefers-color-scheme: dark)');
const botoTema = document.getElementById('btn-fosc');

function aplicaFosc(fosc, triatAMa) {
  document.documentElement.dataset.theme = fosc ? 'dark' : 'light';
  if (triatAMa) {
    try {
      // Si coincideix amb el del sistema, es torna a seguir el sistema.
      if (fosc === sistemaFosc.matches) localStorage.removeItem('montflorit.fosc');
      else localStorage.setItem('montflorit.fosc', fosc ? '1' : '0');
    } catch (_) { /* sense emmagatzematge: el canvi dura fins que es tanca */ }
  }
  botoTema.querySelector('use').setAttribute('href', fosc ? '#i-sun' : '#i-moon');
  const lang = document.documentElement.lang;
  const text = fosc
    ? (lang === 'es' ? 'Tema claro' : 'Tema clar')
    : (lang === 'es' ? 'Tema oscuro' : 'Tema fosc');
  botoTema.title = text;
  botoTema.setAttribute('aria-label', text);
  document.dispatchEvent(new CustomEvent('canvi-tema', { detail: { fosc } }));
}

function segueixSistema() {
  try { return localStorage.getItem('montflorit.fosc') === null; } catch (_) { return true; }
}

aplicaFosc(document.documentElement.dataset.theme === 'dark', false);
botoTema.addEventListener('click', () => {
  aplicaFosc(document.documentElement.dataset.theme !== 'dark', true);
});
sistemaFosc.addEventListener('change', (e) => {
  if (segueixSistema()) aplicaFosc(e.matches, false);
});
