/* Envio do formulário de contato pelo Formspree sem sair da página.
   Sem JavaScript, o formulário funciona do jeito normal e o Formspree
   mostra a própria página de confirmação.
   Os textos mudam conforme o idioma da página (<html lang="...">). */
(function () {
  var TEXTOS = {
    pt: { enviando: 'Enviando…', ok: 'Mensagem enviada. Obrigada! Respondo em breve.',
          erro: 'Não foi possível enviar agora. Confira os campos e tente de novo.',
          rede: 'Não foi possível enviar agora. Verifique sua conexão e tente de novo.',
          semId: 'O formulário ainda não foi ativado.' },
    en: { enviando: 'Sending…', ok: 'Message sent. Thank you! I’ll get back to you soon.',
          erro: 'The message could not be sent. Please check the fields and try again.',
          rede: 'The message could not be sent. Please check your connection and try again.',
          semId: 'The form has not been activated yet.' },
    es: { enviando: 'Enviando…', ok: 'Mensaje enviado. ¡Gracias! Responderé pronto.',
          erro: 'No se pudo enviar el mensaje. Revisa los campos e inténtalo de nuevo.',
          rede: 'No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.',
          semId: 'El formulario aún no está activado.' }
  };
  var idioma = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
  var T = TEXTOS[idioma] || TEXTOS.pt;

  var form = document.getElementById('form-contato');
  if (!form || !window.fetch || !window.FormData) return;
  var botao = document.getElementById('form-enviar');
  var status = document.getElementById('form-status');
  var textoBotao = botao.textContent;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (form.action.indexOf('COLE-AQUI') !== -1) {
      status.textContent = T.semId;
      return;
    }

    botao.disabled = true;
    botao.textContent = T.enviando;
    status.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          status.textContent = T.ok;
        } else {
          status.textContent = T.erro;
        }
      })
      .catch(function () {
        status.textContent = T.rede;
      })
      .then(function () {
        botao.disabled = false;
        botao.textContent = textoBotao;
      });
  });
})();
