<div align="center">

<img src="docs/assets/banner.png" alt="Gerador de Grafos em TikZ" width="100%">

# Gerador de Grafos em TikZ

**Editor visual de grafos com exportação automática de código TikZ para LaTeX**

[![MIT License](https://img.shields.io/badge/license-MIT-3b33b0?style=flat-square)](LICENSE)
[![HTML](https://img.shields.io/badge/built%20with-HTML%20%2B%20JS%20puro-f5a623?style=flat-square&logo=html5)](index.html)
[![LaTeX](https://img.shields.io/badge/exporta-TikZ%20%2F%20LaTeX-008080?style=flat-square&logo=latex)](index.html)
[![Deploy](https://img.shields.io/badge/deploy-Netlify-00C7B7?style=flat-square&logo=netlify)](https://grafoslatex.netlify.app)
[![Status](https://img.shields.io/website?url=https%3A%2F%2Fgrafoslatex.netlify.app&style=flat-square&label=site)](https://grafoslatex.netlify.app)
[![UFABC](https://img.shields.io/badge/origem-UFABC-003366?style=flat-square)](https://www.ufabc.edu.br)

[**🚀 Acesse a ferramenta**](https://grafoslatex.netlify.app) · [**📖 Documentação**](docs/) · [**🐛 Reportar bug**](https://github.com/welbertfilho9/grafos-tikz/issues) · [**💡 Sugerir funcionalidade**](https://github.com/welbertfilho9/grafos-tikz/issues/new?template=feature_request.md)

</div>

---

## 📋 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Motivação](#-motivação)
- [Demonstração](#-demonstração)
- [Preâmbulo LaTeX](#-preâmbulo-latex-necessário)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Como executar localmente](#-como-executar-localmente)
- [Arquitetura](#-arquitetura)
- [Exemplos de uso](#-exemplos-de-uso)
- [Roadmap](#-roadmap)
- [Como contribuir](#-como-contribuir)
- [FAQ](#-faq)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o projeto

O **Gerador de Grafos em TikZ** é uma aplicação web que permite desenhar grafos interativamente no navegador e exportar automaticamente o código **TikZ** correspondente, pronto para ser colado no **Overleaf** ou em qualquer documento LaTeX.

Construído com **HTML, CSS e JavaScript puros** — sem frameworks, sem instalação, sem dependências. Basta abrir o arquivo no navegador.

> ⚠️ **Compatibilidade:** a ferramenta é otimizada para uso em **desktop** (teclado + mouse).

---

## 💡 Motivação

Este projeto nasceu durante minha pesquisa em **Teoria Topológica de Grafos** na [Universidade Federal do ABC (UFABC)](https://www.ufabc.edu.br).

Durante o projeto, precisei produzir centenas de figuras de grafos em TikZ. O processo manual levava **10 a 30 minutos por figura**. A ferramenta reduziu esse tempo para **menos de 1 minuto**.

---

## 🎬 Demonstração

> 📸 *Screenshots e GIFs em breve — [acesse o site ao vivo →](https://grafoslatex.netlify.app)*

| Funcionalidade | Demonstração |
|---|---|
| Gerar K₅ e exportar TikZ | ![demo-kn](docs/assets/demo-kn.gif) |
| Ferramenta Mover + Zoom | ![demo-move](docs/assets/demo-move.gif) |
| Análise: pontes e cortes | ![demo-analysis](docs/assets/demo-analysis.gif) |
| Subdivisão de arestas | ![demo-subdivide](docs/assets/demo-subdivide.gif) |

---

## 📦 Preâmbulo LaTeX necessário

Adicione ao preâmbulo do seu documento LaTeX (antes de `\begin{document}`) para que todos os grafos compilem corretamente, incluindo **laços** e **arestas paralelas**:

```latex
\usepackage{tikz}
\usepackage{float}
\usetikzlibrary{arrows,shapes,snakes}
```

Para grafos com **arestas direcionadas** (setas), adicione também:

```latex
\usetikzlibrary{arrows.meta}
```

> O código gerado pela ferramenta é compatível com a biblioteca `arrows` padrão. Não é necessário nenhum pacote adicional para laços e arestas paralelas além do preâmbulo acima.

---

## ✨ Funcionalidades

### Ferramentas de edição

| Ferramenta | Atalho | Descrição |
|---|---|---|
| ✥ Mover | `F` | Pan do canvas; clique num objeto para selecioná-lo |
| ⊙ Selecionar | `S` | Seleciona e edita propriedades no painel lateral |
| ⬚ Multi-seleção | `M` | Arraste para caixa de seleção; mova, alinhe, delete vários |
| ● Vértice | `V` | Clique no canvas para adicionar |
| — Aresta | `A` | Clique em dois vértices para conectar |
| ↺ Laço | `L` | Cria laço em um vértice; **arraste para girar a direção** |
| ⊕ Subdivisão | `D` | Insere vértice de grau 2 no meio de uma aresta |
| ✕ Deletar | `X` | Remove vértice ou aresta |

### Geradores automáticos

| Gerador | Descrição |
|---|---|
| **Kₙ** | Grafo completo com n vértices |
| **Cₙ** | Ciclo com n vértices |
| **Pₙ** | Caminho com n vértices |
| **Kₘ,ₙ** | Grafo bipartido completo |
| **Bₙ** | Buquê de n círculos (topológico) |
| **Wₙ** | Roda (Wheel graph) |
| **Qₙ** | Hipercubo n-dimensional |
| **Ḡ** | Complemento do grafo atual |
| **G□H** | Produto cartesiano de grafos |

### Análise de grafos (🔬)

- **Vértices de corte** — algoritmo de Tarjan, destacados em vermelho
- **Pontes / bridges** — destacadas em laranja
- **Blocos biconexos** — cada bloco em cor distinta
- **Propriedades:** Euleriano, Semi-euleriano, Bipartido, Regular, Conexo
- **Métricas:** Δ, δ, grau médio, sequência de graus, diâmetro, raio, componentes

### Outras funcionalidades

- Undo/Redo ilimitado (`Ctrl+Z` / `Ctrl+Y`)
- Auto-layout force-directed (`Ctrl+L`)
- Zoom com scroll; pan com ferramenta Mover
- Grade com snap
- Salvar/Carregar em JSON
- Menu de contexto (clique direito)
- Alinhamento e distribuição de múltiplos vértices
- Suporte completo a laços e arestas múltiplas (grafos topológicos)

---

## 🛠 Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | HTML5 + CSS3 |
| Lógica | JavaScript ES2020 (Vanilla) |
| Gráficos | SVG nativo |
| Deploy | Netlify |
| Contador | Supabase (PostgreSQL) |
| Analytics | Google Analytics 4 |

**Por que sem framework?** Para que qualquer pessoa abra o `.html` e use — sem `npm install`, sem Node.js, sem terminal.

---

## 🚀 Como executar localmente

### Opção 1 — Direto no navegador

```bash
git clone https://github.com/welbertfilho9/grafos-tikz.git
# Abra index.html no navegador (duplo clique)
```

### Opção 2 — Com servidor local

```bash
cd grafos-tikz
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

> **Nota:** o contador global requer deploy no Netlify. Veja [docs/deploy.md](docs/deploy.md).

---

## 🏗 Arquitetura

```
Canvas (SVG)  →  Estado Global (verts[], edges[])
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      Renderer    Sidebar      TikZ Exporter
    (SVG paths)  (Props)    (generateTikz)
```

Veja [docs/architecture.md](docs/architecture.md) para a documentação completa.

---

## 📁 Estrutura do repositório

```
grafos-tikz/
├── index.html                  # Aplicação completa
├── netlify.toml                # Configuração de deploy
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── netlify/functions/
│   └── counter.mjs             # Serverless counter
├── docs/
│   ├── architecture.md
│   ├── user-guide.md
│   ├── developer-guide.md
│   ├── deploy.md
│   ├── faq.md
│   ├── tutorial.md
│   └── assets/
├── examples/
│   ├── complete-graphs/
│   ├── cycles/
│   ├── paths/
│   ├── bipartite/
│   ├── topological/
│   ├── wheels/
│   └── subdivided/
└── .github/
    ├── ISSUE_TEMPLATE/
    └── workflows/
```

---

## 🗺 Roadmap

### v1.1
- [ ] Exportação para GraphML, DOT/Graphviz, SVG
- [ ] Dark mode
- [ ] Histórico de grafos salvos localmente
- [ ] Renderização de rótulos LaTeX (MathJax)

### v1.2
- [ ] Algoritmos visuais passo a passo (BFS, DFS, Dijkstra)
- [ ] Isomorfismo visual
- [ ] Modo colaborativo

---

## 🤝 Como contribuir

```bash
git clone https://github.com/welbertfilho9/grafos-tikz.git
git checkout -b feature/sua-funcionalidade
# edite index.html e teste no navegador
git commit -m "feat: descrição da mudança"
git push origin feature/sua-funcionalidade
# Abra um Pull Request
```

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para o guia completo.

---

## ❓ FAQ

**Precisa de internet?** Não. O `index.html` funciona offline. Só o contador global requer conexão.

**Funciona no celular?** A ferramenta é otimizada para desktop (mouse + teclado).

**O código TikZ compila sem configuração extra?** Sim, com o preâmbulo da [seção acima](#-preâmbulo-latex-necessário).

**Por que não React/Vue?** Para funcionar sem instalação — abra e use.

Veja [docs/faq.md](docs/faq.md) para mais perguntas.

---

## 🤖 Nota sobre IA

Desenvolvido com apoio de IA (Claude, Anthropic) para partes do código e documentação. Todas as decisões de projeto, validação e publicação são de responsabilidade do autor.

---

## 🎓 Contexto acadêmico

Projeto desenvolvido durante a pesquisa **"Introdução à Teoria Topológica de Grafos"** na UFABC. A ferramenta surgiu da necessidade real de produzir figuras TikZ eficientemente durante a pesquisa.

---

## 📄 Licença

MIT — veja [LICENSE](LICENSE).

---

## 📬 Contato

**Welbert da Silva Freitas Filho** — pesquisador em Teoria Topológica de Grafos, UFABC

- GitHub: [@welbertfilho9](https://github.com/welbertfilho9)
- LinkedIn: [Welbert da Silva Freitas Filho](https://www.linkedin.com/in/welbert-da-silva-freitas-filho-697075177)
- E-mail: [welbertfilho9@gmail.com](mailto:welbertfilho9@gmail.com) · [welbert.filho@aluno.ufabc.edu.br](mailto:welbert.filho@aluno.ufabc.edu.br)

🔗 **Site:** [grafoslatex.netlify.app](https://grafoslatex.netlify.app)

---

<div align="center">

Feito com ☕ durante uma pesquisa em Teoria dos Grafos na UFABC

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐

</div>
