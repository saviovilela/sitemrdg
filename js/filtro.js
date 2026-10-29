/* Filtro das faixas: mostra só os trabalhos do papel escolhido.
   Os papéis de cada trabalho vêm do atributo data-papeis no HTML.
   O endereço guarda o filtro (ex.: mairadegrandi.com.br/?papel=direcao),
   então dá para mandar um link já filtrado.
   Os textos mudam conforme o idioma da página (<html lang="...">). */
(function () {
  var TEXTOS = {
    pt: { um: 'trabalho', varios: 'trabalhos', filtrando: 'Filtrando', embreve: 'Em breve', titulo: 'Trabalhos', verTodos: 'Ver todos',
          mostrando: function (a, b) { return 'Mostrando ' + a + ' de ' + b + ' trabalhos'; } },
    en: { um: 'project', varios: 'projects', filtrando: 'Filtering', embreve: 'Coming soon', titulo: 'Work', verTodos: 'See all',
          mostrando: function (a, b) { return 'Showing ' + a + ' of ' + b + ' projects'; } },
    es: { um: 'trabajo', varios: 'trabajos', filtrando: 'Filtrando', embreve: 'Próximamente', titulo: 'Trabajos', verTodos: 'Ver todos',
          mostrando: function (a, b) { return 'Mostrando ' + a + ' de ' + b + ' trabajos'; } }
  };
  var idioma = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
  var T = TEXTOS[idioma] || TEXTOS.pt;

  var faixasNav = document.getElementById('faixas');
  var faixas = Array.prototype.slice.call(document.querySelectorAll('.faixa'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var titulo = document.getElementById('trabalhos-titulo');
  var status = document.getElementById('trabalhos-status');
  var vazio = document.getElementById('trabalhos-vazio');
  var verTodos = document.getElementById('ver-todos');
  var secao = document.getElementById('trabalhos');
  if (!faixasNav || !cards.length) return;

  var total = cards.length;
  var nomes = {};
  faixas.forEach(function (f) {
    nomes[f.getAttribute('data-papel')] = f.querySelector('.faixa__nome').textContent;
  });

  function papeisDe(card) {
    return (card.getAttribute('data-papeis') || '').split(/\s+/).filter(Boolean);
  }
  function contar(papel) {
    return cards.filter(function (c) { return papeisDe(c).indexOf(papel) >= 0; }).length;
  }
  function plural(n) { return n + ' ' + (n === 1 ? T.um : T.varios); }

  var reduzirMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function aplicar(papel, rolar) {
    faixasNav.classList.toggle('filtrando', !!papel);

    faixas.forEach(function (f) {
      var p = f.getAttribute('data-papel');
      var ativo = p === papel;
      var n = contar(p);
      f.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      var texto = n === 0 ? T.embreve : plural(n);
      f.querySelector('.faixa__estado').textContent = ativo ? T.filtrando + ' · ' + texto : texto;
    });

    var mostrados = 0;
    cards.forEach(function (c) {
      var mostra = !papel || papeisDe(c).indexOf(papel) >= 0;
      c.hidden = !mostra;
      if (mostra) mostrados++;
    });

    titulo.textContent = papel ? nomes[papel] : T.titulo;
    status.textContent = papel ? T.mostrando(mostrados, total) : plural(total);
    vazio.hidden = !(papel && mostrados === 0);
    verTodos.textContent = T.verTodos + ' (' + total + ')';
    verTodos.hidden = !papel;

    try {
      var url = papel ? '?papel=' + papel : window.location.pathname;
      window.history.replaceState(null, '', url);
    } catch (e) { /* abrir o arquivo direto do computador pode bloquear isso; sem problema */ }

    if (rolar) {
      secao.scrollIntoView({ behavior: reduzirMovimento ? 'auto' : 'smooth', block: 'start' });
    }
  }

  var atual = null;
  faixas.forEach(function (f) {
    f.addEventListener('click', function () {
      var p = f.getAttribute('data-papel');
      atual = atual === p ? null : p;
      aplicar(atual, true);
    });
  });
  verTodos.addEventListener('click', function () {
    atual = null;
    aplicar(null, false);
  });

  var inicial = null;
  try {
    inicial = new URLSearchParams(window.location.search).get('papel');
  } catch (e) { inicial = null; }
  atual = nomes[inicial] ? inicial : null;
  aplicar(atual, false);
})();
