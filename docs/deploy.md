# Guia de Deploy

## Opção 1 — Abrir localmente (sem servidor)

A forma mais simples. Funciona para uso pessoal:

```bash
git clone https://github.com/welbertfilho9/grafos-tikz.git
# Abra index.html no navegador (duplo clique ou arrastar)
```

> ⚠️ O contador global não funciona localmente — requer a Netlify Function.

---

## Opção 2 — Servidor local (para desenvolvimento)

```bash
# Python (pré-instalado na maioria dos sistemas)
python3 -m http.server 8080
# Acesse: http://localhost:8080

# Node.js
npx serve .
# Acesse: http://localhost:3000

# Com Netlify CLI (testa as functions também)
npm install -g netlify-cli
netlify dev
# Acesse: http://localhost:8888
```

---

## Opção 3 — Deploy no Netlify via GitHub (recomendado)

Este método ativa o build completo, instala as functions e habilita o contador global.

### Passo 1 — Fork e clone

```bash
git clone https://github.com/welbertfilho9/grafos-tikz.git
cd grafos-tikz
```

### Passo 2 — Conecte ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **Add new site → Import an existing project**
3. Escolha **GitHub** → autorize → selecione o repositório `grafos-tikz`
4. Configurações de build:
   - **Build command:** *(deixe vazio)*
   - **Publish directory:** `.`
5. Clique em **Deploy site**

### Passo 3 — Configure o Google Analytics (opcional)

1. Abra `index.html`
2. Localize o comentário do GA (linha ~5)
3. Descomente e substitua `G-XXXXXXXXXX` pelo seu Measurement ID
4. Commit e push — o Netlify atualiza automaticamente

### Passo 4 — Configure um domínio customizado (opcional)

No painel do Netlify: **Domain management → Add custom domain**

---

## Variáveis de ambiente

Este projeto **não requer variáveis de ambiente** para funcionar.

A Netlify Function (`counter.mjs`) usa `counterapi.dev` como backend do contador — nenhuma configuração adicional é necessária.

Se quiser trocar o backend do contador, edite as constantes em `netlify/functions/counter.mjs`:

```javascript
const API_GET = 'https://api.counterapi.dev/v1/grafoslatex/grafos/';
const API_HIT = 'https://api.counterapi.dev/v1/grafoslatex/grafos/up';
```

---

## Estrutura de arquivos para deploy

```
grafos-tikz/
├── index.html              ← aplicação (publicado como raiz)
├── netlify.toml            ← configuração do Netlify
└── netlify/
    └── functions/
        └── counter.mjs     ← function serverless
```

O `netlify.toml` já está configurado corretamente:

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from   = "/api/counter"
  to     = "/.netlify/functions/counter"
  status = 200
```
