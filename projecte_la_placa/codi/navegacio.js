/* Només gestiona la navegació; els efectes visuals es defineixen en CSS. */
const botoMenu = document.querySelector('.menu-toggle');
const textMenu = document.querySelector('.menu-toggle__text');
const navegacio = document.querySelector('#menu-principal');
const desplegable = document.querySelector('.menu-desplegable');
const pantallaMenuda = window.matchMedia('(max-width: 55.999rem)');

function canviaMenu(obert, retornaFocus = false) {
  botoMenu.setAttribute('aria-expanded', String(obert));
  textMenu.textContent = obert ? 'Tanca' : 'Menú';
  navegacio.hidden = pantallaMenuda.matches && !obert;
  if (!obert) desplegable.open = false;
  if (retornaFocus) botoMenu.focus();
}

function adaptaMenu() {
  const focusDins = navegacio.contains(document.activeElement);
  botoMenu.hidden = !pantallaMenuda.matches;
  canviaMenu(false, pantallaMenuda.matches && focusDins);
}

botoMenu.addEventListener('click', () => {
  canviaMenu(botoMenu.getAttribute('aria-expanded') !== 'true');
});
pantallaMenuda.addEventListener('change', adaptaMenu);

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (desplegable.open) {
    desplegable.open = false;
    desplegable.querySelector('summary').focus();
  } else if (pantallaMenuda.matches && botoMenu.getAttribute('aria-expanded') === 'true') {
    canviaMenu(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (!desplegable.contains(event.target)) desplegable.open = false;
  if (!navegacio.contains(event.target) && !botoMenu.contains(event.target)) {
    const focusDins = navegacio.contains(document.activeElement);
    canviaMenu(false, pantallaMenuda.matches && focusDins);
  }
});

navegacio.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  canviaMenu(false);
});

/* Quan Tab ix de la navegació, no deixem un panell obert sobre el contingut. */
navegacio.addEventListener('focusout', (event) => {
  if (!navegacio.contains(event.relatedTarget) && event.relatedTarget !== botoMenu) {
    canviaMenu(false);
  }
});

adaptaMenu();
