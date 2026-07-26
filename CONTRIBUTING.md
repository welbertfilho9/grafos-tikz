# Guia de Contribuição

Obrigado por considerar contribuir para o **Gerador de Grafos em TikZ**! Este documento explica o processo para contribuir de forma eficiente.

## Índice

- [Código de Conduta](#código-de-conduta)
- [Como posso contribuir?](#como-posso-contribuir)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Padrões de código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Convenções de commit](#convenções-de-commit)

---

## Código de Conduta

Este projeto segue o [Código de Conduta](CODE_OF_CONDUCT.md). Ao contribuir, você concorda em respeitá-lo.

---

## Como posso contribuir?

### 🐛 Reportar bugs

1. Verifique se o bug já foi [reportado](https://github.com/welbertfilho9/grafos-tikz/issues)
2. Se não, abra uma [nova issue](https://github.com/welbertfilho9/grafos-tikz/issues/new?template=bug_report.md)
3. Inclua: comportamento esperado, comportamento atual, passos para reproduzir e browser/OS

### 💡 Sugerir funcionalidades

1. Verifique se já existe uma [issue similar](https://github.com/welbertfilho9/grafos-tikz/issues)
2. Abra uma [feature request](https://github.com/welbertfilho9/grafos-tikz/issues/new?template=feature_request.md)
3. Explique o problema que resolve e como imagina a solução

### 📝 Melhorar a documentação

Documentação é sempre bem-vinda. Corrija erros, adicione exemplos, traduza conteúdo.

### 💻 Contribuir com código

Veja [Configuração do ambiente](#configuração-do-ambiente) e escolha uma issue com a tag `good first issue`.

---

## Configuração do ambiente

O projeto **não tem build step**. Tudo está em `index.html`.

```bash
# Clone
git clone https://github.com/welbertfilho9/grafos-tikz.git
cd grafos-tikz

# Opção A: abrir direto no navegador
open index.html

# Opção B: servidor local com live reload
npx browser-sync start --server --files "*.html"
# ou
python3 -m http.server 8080
```

Para testar a Netlify Function localmente:

```bash
npm install -g netlify-cli
netlify dev
# Acesse http://localhost:8888
```

---

## Padrões de código

Como o projeto é um único arquivo HTML, algumas convenções ajudam a manter a legibilidade:

### JavaScript

- Prefira `const` e `let` — nunca `var`
- Funções nomeadas descritivamente: `renderVertices`, `generateTikz`, `findCutVertices`
- Comentários em seções com o padrão existente:
  ```javascript
  // ══════════════════════════════════════════════════
  //  NOME DA SEÇÃO
  // ══════════════════════════════════════════════════
  ```
- Sem dependências externas — zero imports de CDN para a lógica principal

### CSS

- Variáveis CSS para todas as cores (definidas em `:root`)
- Nomes descritivos: `--accent`, `--surface2`, `--border`

### TikZ Export

- Teste o código gerado no Overleaf antes de fazer PR
- Garanta que funciona com o preâmbulo mínimo: `\usepackage{tikz}` + `\usepackage{float}`

---

## Processo de Pull Request

1. **Fork** o repositório
2. **Crie uma branch** com nome descritivo:
   ```
   feature/exportacao-graphml
   fix/loop-direction-bug
   docs/tutorial-bipartido
   ```
3. **Faça suas alterações** e teste no navegador
4. **Teste o TikZ gerado** no Overleaf (para mudanças no exportador)
5. **Abra o PR** com:
   - Descrição clara do que foi feito
   - Screenshots se houver mudança visual
   - Referência à issue relacionada (`Closes #42`)

---

## Convenções de commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>: <descrição curta em português ou inglês>

[corpo opcional]

[rodapé opcional: Closes #N]
```

### Tipos

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação apenas |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refatoração sem nova feature ou fix |
| `perf` | Melhoria de performance |
| `test` | Adição ou correção de testes |
| `chore` | Manutenção, configs, deps |

### Exemplos

```bash
git commit -m "feat: adiciona gerador de grafo de Petersen"
git commit -m "fix: corrige direção de laço com loopDir=180"
git commit -m "docs: adiciona tutorial de grafos bipartidos"
git commit -m "perf: otimiza renderização com mais de 50 vértices"
```

---

## Dúvidas?

Abra uma [Discussion](https://github.com/welbertfilho9/grafos-tikz/discussions) ou envie um e-mail para `welbertfilho9@gmail.com`.
