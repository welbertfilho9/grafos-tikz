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

---

## Configurando o contador global (Supabase)

O contador global usa o [Supabase](https://supabase.com) como banco de dados. É gratuito e não precisa de servidor.

### Passo 1 — Criar conta e projeto

1. Acesse [supabase.com](https://supabase.com) → crie conta gratuita
2. Clique em **New Project** → dê um nome → crie
3. Aguarde o projeto inicializar (~2 minutos)

### Passo 2 — Criar a tabela e função

No painel do Supabase, vá em **SQL Editor** e rode:

```sql
CREATE TABLE counters (
  id    TEXT PRIMARY KEY,
  count BIGINT NOT NULL DEFAULT 0
);

INSERT INTO counters (id, count) VALUES ('grafos', 0);

CREATE OR REPLACE FUNCTION increment_counter(row_id TEXT)
RETURNS BIGINT AS $$
  UPDATE counters SET count = count + 1 WHERE id = row_id RETURNING count;
$$ LANGUAGE SQL;

GRANT SELECT, UPDATE ON counters TO anon;
GRANT EXECUTE ON FUNCTION increment_counter(TEXT) TO anon;
```

### Passo 3 — Habilitar acesso público (RLS)

Em **Table Editor → counters → RLS → Enable RLS**, crie duas policies:

- **SELECT:** name=`Allow public read`, using=`true`
- **UPDATE:** name=`Allow public update`, using=`true`

### Passo 4 — Pegar suas credenciais

Em **Project Settings → API**:
- Copie a **Project URL**
- Copie a chave **anon / public**

### Passo 5 — Atualizar o index.html

Abra `index.html` e substitua as linhas:

```javascript
const SB_URL  = 'https://SEU-PROJETO.supabase.co';
const SB_KEY  = 'SUA-CHAVE-ANON-PUBLICA';
```

Pelos valores reais do seu projeto.

> **Nota:** a chave `anon` é pública por design — pode ficar no código. Nunca use a chave `service_role` no frontend.
