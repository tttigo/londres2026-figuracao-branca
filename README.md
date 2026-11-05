# londres 2026 — pintor preto, figuração branca

Landing page estática (página única) do filme de Maxwell Alexandre.
HTML + CSS + um pouco de JS, sem build. Publicada pelo GitHub Pages.

```
index.html      página
css/style.css   estilos (layout responsivo, cores, fonte)
js/main.js      animação de entrada das fotos
fonts/          Pollen (Eduardo Berliner)
img/            fotos otimizadas (versões 900px e 1800px)
pdf/            epístola e booklet (ver pendências)
```

## Ver localmente

```bash
python3 -m http.server 8765
```

Depois abra http://localhost:8765. Abrir o `index.html` direto do Finder também funciona,
mas o vídeo do YouTube pode não carregar fora de um servidor.

## Pendências

- [ ] Colocar os PDFs em `pdf/` com estes nomes: `epistola-pt.pdf` e `booklet-en.pdf`
- [ ] Trocar o link da página de prints em `index.html` (procurar `TODO`)
- [ ] Confirmar a frase "acesse os prints disponíveis"
- [ ] Confirmar a licença de uso na web da fonte Pollen (o repositório público expõe o arquivo da fonte)
- [ ] Depois de ter o domínio, trocar `og:image` em `index.html` por uma URL absoluta
      (ex.: `https://www.SEU-DOMINIO/img/7760-1800.jpg`) para a prévia aparecer no WhatsApp e nas redes

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
