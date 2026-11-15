# londres 2026 — pintor preto, figuração branca

Landing page estática (página única) do filme de Maxwell Alexandre.
HTML + CSS + um pouco de JS, sem build. Publicada pelo GitHub Pages.

```
index.html      página
css/style.css   estilos (layout responsivo, cores, fonte)
js/main.js      animação de entrada das fotos
fonts/          Utopia Std Regular (Adobe)
img/v2/         fotos e obras otimizadas (versões -s e -l)
pdf/            epístola e booklet (ver pendências)
```

## Ver localmente

```bash
python3 -m http.server 8765
```

Depois abra http://localhost:8765. Abrir o `index.html` direto do Finder também funciona,
mas o vídeo do YouTube pode não carregar fora de um servidor.

## Pendências

- [ ] Vídeo novo: subir no YouTube ou Vimeo e trocar `data-provider` / `data-video` no bloco `.film` do `index.html`
      (hoje toca o vídeo antigo do YouTube, com a capa nova)
- [ ] PDFs: colocar em `pdf/` com estes nomes: `epistola-pt.pdf` e `epistle-en.pdf`
- [ ] Link da página de prints (botões COLECIONAR): trocar `href="#"` dos blocos `.print` no `index.html`
- [ ] Fotos que faltam na pasta SITE (no lugar delas há fotos da pasta seleção):
      homem em pé no kraft com as mãos na cintura (`kraft-sub`), anfiteatro vazio “MISERATIONE…” (`anfiteatro-sub`),
      pintor no cavalete em sala escura (`cavalete-sub`)
- [ ] Revisar as traduções em inglês dos textos novos (regras 1–4, “a dinâmica…”, “o nó górdio…”)
- [ ] Confirmar a licença de uso na web da Utopia Std (fonte comercial da Adobe; só há o peso Regular — itálico e negrito são simulados pelo navegador)

## Como a página é montada

No desktop, cada bloco fica na mesma posição proporcional do layout da designer
(variáveis `--x`, `--y`, `--w`, `--h` no `style` de cada bloco, em % do quadro de 1400px).
Abaixo de 900px os blocos viram um fluxo em duas colunas, na ordem do HTML
(`m-full` ocupa a largura toda, `m-half` meia largura).
As fotos ficam em `img/v2/` em dois tamanhos: `-s` (900px) e `-l` (1800px; 2400px na capa e nas vistas da exposição).

## Publicar no GitHub Pages

1. Envie este repositório para o GitHub. Ele precisa ser **público** para usar o Pages no plano gratuito.
2. No repositório, abra **Settings → Pages**.
3. Em *Source*, escolha **Deploy from a branch**, depois a branch `main` e a pasta `/ (root)`. Salve.
4. Em 1–2 minutos o site fica no ar em `https://USUARIO.github.io/NOME-DO-REPO/`.

Para atualizar o site, basta fazer commit e push na `main`.

## Domínio personalizado

1. Compre o domínio num registrador, por exemplo Registro.br (`.com.br`), Cloudflare, Namecheap ou GoDaddy (`.com`).
2. No painel de DNS do domínio, crie estes registros:

   | Tipo  | Nome  | Valor                  |
   |-------|-------|------------------------|
   | A     | @     | 185.199.108.153        |
   | A     | @     | 185.199.109.153        |
   | A     | @     | 185.199.110.153        |
   | A     | @     | 185.199.111.153        |
   | AAAA  | @     | 2606:50c0:8000::153    |
   | AAAA  | @     | 2606:50c0:8001::153    |
   | AAAA  | @     | 2606:50c0:8002::153    |
   | AAAA  | @     | 2606:50c0:8003::153    |
   | CNAME | www   | USUARIO.github.io      |

3. No GitHub, em **Settings → Pages → Custom domain**, digite `www.seudominio.com` e salve.
   O GitHub cria um arquivo `CNAME` no repositório. Não apague esse arquivo.
4. Quando o DNS propagar (de minutos a algumas horas), marque **Enforce HTTPS**. O certificado é gratuito.
5. Recomendado: em *Settings → Pages*, verifique o domínio na sua conta para evitar que outra pessoa o use.

Documentação oficial: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
