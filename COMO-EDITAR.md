# Site Maíra De Grandi: como editar

O site é feito de poucos arquivos:

| Arquivo | O que tem |
|---|---|
| `index.html` | Todo o conteúdo: textos, lista de trabalhos, contato |
| `css/estilo.css` | Cores, fontes e layout (as cores ficam no topo, em `:root`) |
| `js/filtro.js` | O filtro das faixas (não precisa mexer) |
| `favicon.svg` | Ícone da aba do navegador |
| `en/index.html` | Versão em inglês (mairadegrandi.com.br/en/) |
| `es/index.html` | Versão em espanhol (mairadegrandi.com.br/es/) |

**Três idiomas = três arquivos.** Qualquer mudança de conteúdo (trabalho novo, foto, telefone, Instagram) precisa ser feita no `index.html` em português e repetida no `en/index.html` e no `es/index.html`. Os títulos das obras ficam no original nas três versões; só as descrições são traduzidas. Visual, filtro e formulário são compartilhados e não precisam ser repetidos.

Para ver o site no computador, é só abrir o `index.html` no navegador.

## O que falta preencher antes de publicar

Tudo o que está entre **[colchetes]** é provisório e aparece com fundo pêssego e borda tracejada. Para achar esses trechos, busque por `pendente` no `index.html`.

- Frase de posicionamento (topo)
- Minibio (seção Sobre)
- Função da Maíra em: Ocupação Mulheres Protagonistas, "Deus me dê a confiança…", Deus Deve Estar Distraído, Tem Alguém que nos Odeia, 2 [duas], O Relicário, O Rinoceronte…, Domingo no Museu; confirmar também ImpropériAs e Não Tem Xícara
- Descrição de Domingo no Museu
- Ano de *4 da Espécie* (2022 ou 2023), grafia de *Me voy a saltar…*, dados de *Brodagem* em Porto Alegre
- Trabalhos corporativos
- Cartazes ou fotos de cada trabalho, com crédito do fotógrafo
- Trechos de crítica (Imprensa)
- Telefone de contato (no rodapé está como `(xx) xxxxx-xxxx`)
- Instagram e link do site da Cia Teatro Enlatado
- Arquivo `portfolio-maira-de-grandi.pdf` na mesma pasta do `index.html`

## Formulário de contato (Formspree)

O e-mail da Maíra não aparece no site: as mensagens vão para o Formspree, que as repassa para o e-mail cadastrado no formulário de lá.

1. No painel do Formspree, crie um formulário e defina como destino o e-mail que deve receber as mensagens.
2. Copie o endereço do formulário (algo como `https://formspree.io/f/abcdwxyz`).
3. No `index.html`, o endereço fica no `<form … action="https://formspree.io/f/…">`. Hoje está configurado com o formulário `xbggkrgr`; para trocar de formulário, troque esse código.
4. Recomendado: nas configurações do formulário no Formspree, restrinja o envio ao domínio `mairadegrandi.com.br`, para ninguém usar o formulário a partir de outro site.

## Incluir um trabalho novo

No `index.html`, copie um bloco `<article class="card" …>` … `</article>` inteiro e cole na posição certa da lista (ela está em ordem do mais novo para o mais antigo). Depois troque:

- `data-papeis="…"`: os papéis da Maíra naquele trabalho, separados por espaço. Use só estas palavras: `direcao`, `dramaturgia`, `atuacao`, `improviso`, `corporativo`. É isso que faz o trabalho aparecer na faixa certa (as contagens das faixas se atualizam sozinhas).
- `card__img--…`: a cor do card (`direcao` = vermelho, `dramaturgia` = laranja, `atuacao` = violeta, `improviso` = salmão, `corporativo` = mostarda).
- Ano, papéis por extenso, título e descrição.

## Pôr o cartaz ou a foto num card

1. Salve a imagem na pasta `img/` (crie a pasta se não existir), com nome sem espaços nem acentos, por exemplo `img/brodagem.jpg`. Prefira imagens com até cerca de 1.200 px de altura, para o site continuar leve.
2. No card, troque o conteúdo de `<div class="card__img …">…</div>` por:

```html
<div class="card__img"><img src="img/brodagem.jpg" alt="Cartaz de Brodagem: uma comédia drag king"></div>
```

O texto do `alt` descreve a imagem para quem usa leitor de tela.

## Link direto para uma faixa

O filtro fica no endereço, então dá para mandar um link já filtrado, por exemplo:
`https://mairadegrandi.com.br/?papel=direcao`
