# londres 2026 — pintor preto, figuração branca

Site do projeto de Maxwell Alexandre: **https://londres2026.com**
Página única estática (HTML + CSS + um pouco de JS, sem build), bilíngue PT / ENG, publicada pelo GitHub Pages.

```
index.html      página (textos em PT e EN, posições do layout)
css/style.css   estilos (layout desktop proporcional + fluxo no celular)
js/main.js      idioma, filme, tela cheia das fotos, animações
img/v2/         fotos e obras (versões -s 900px e -l 1800/2400px)
pdf/            epístola (PT) e epistle (EN)
robots.txt      regras para buscadores
sitemap.xml     mapa do site para o Google
CNAME           domínio londres2026.com (não apagar)
```

## Atualizar o site

Edite os arquivos, faça commit e push na `main`. O GitHub Pages publica em 1–2 minutos.

Para ver localmente:

```bash
python3 -m http.server 8765
```

e abra http://localhost:8765.

## Como a página é montada

- **Desktop:** cada bloco fica na posição proporcional do layout da designer (variáveis `--x`, `--y`, `--w`, `--h`
  no `style` de cada bloco, em % de um quadro de 1400px). O conteúdo tem no máximo 1600px de largura.
- **Celular (< 900px):** os blocos viram um fluxo em duas colunas, na ordem do HTML
  (`m-full` ocupa a largura toda, `m-half` meia largura).
- **Idiomas:** cada texto existe nas duas línguas (`data-lang="pt"` / `data-lang="en"`); só a do `<html lang>` aparece.
  O site sempre abre em português; o inglês só aparece ao clicar em ENG (que coloca `?lang=en` no endereço).
- **Filme:** bloco `.film` no `index.html` (`data-provider="youtube"` e `data-video` com o código do vídeo).
  O player só carrega ao clicar na capa.
- **Obras** (`.ph.art`) aparecem sempre com a moldura inteira; fotos cortam embaixo se precisar.

## Fonte

Utopia Std (regular, itálico, negrito) vem do Adobe Fonts, pelo projeto web `gcv5yce`
(link no `<head>` do `index.html`). Se o projeto for apagado na conta Adobe, o site cai para Georgia.

## Domínio

`londres2026.com` aponta para o GitHub Pages (registros A/AAAA para os IPs do GitHub e o arquivo `CNAME`).
HTTPS gratuito, ativado em *Settings → Pages*.
