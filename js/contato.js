/* Envio do formulário de contato pelo Formspree sem sair da página.
   Sem JavaScript, o formulário funciona do jeito normal e o Formspree
   mostra a própria página de confirmação. */
(function () {
  var form = document.getElementById('form-contato');
  if (!form || !window.fetch || !window.FormData) return;
  var botao = document.getElementById('form-enviar');
  var status = document.getElementById('form-status');
  var textoBotao = botao.textContent;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (form.action.indexOf('COLE-AQUI') !== -1) {
      status.textContent = 'O formulário ainda não foi ativado (falta o ID do Formspree).';
      return;
    }

    botao.disabled = true;
    botao.textContent = 'Enviando…';
    status.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          status.textContent = 'Mensagem enviada. Obrigada! Respondo em breve.';
        } else {
          status.textContent = 'Não foi possível enviar agora. Confira os campos e tente de novo.';
        }
      })
      .catch(function () {
        status.textContent = 'Não foi possível enviar agora. Verifique sua conexão e tente de novo.';
      })
      .then(function () {
        botao.disabled = false;
        botao.textContent = textoBotao;
      });
  });
})();
