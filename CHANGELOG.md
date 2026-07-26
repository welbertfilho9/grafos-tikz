# Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [1.0.0] — 2025

### Lançamento inicial

#### Adicionado
- Editor visual de grafos com canvas SVG interativo
- Ferramenta **Mover** (pan do canvas, igual ao GeoGebra)
- Ferramentas: Selecionar, Multi-seleção, Vértice, Aresta, Laço, Subdivisão, Deletar
- Geradores automáticos: Kₙ, Cₙ, Pₙ, Kₘ,ₙ, Bₙ (buquê), Wₙ (roda), Qₙ (hipercubo)
- Operações: Complemento (Ḡ) e Produto Cartesiano (G□H)
- Análise automática: vértices de corte, pontes, blocos biconexos, propriedades do grafo
- Exportação TikZ em tempo real com `\begin{figure}[H]...\end{figure}`
- Suporte a laços e arestas múltiplas (grafos topológicos)
- Controle de raio individual por vértice
- Controle de espessura, cor e opacidade por aresta
- Estilos de exportação: padrão, preenchido, branco, mínimo, ponto
- Undo/Redo com histórico de 60 estados (`Ctrl+Z` / `Ctrl+Y`)
- Auto-layout force-directed (`Ctrl+L`)
- Zoom com scroll + pan com ferramenta Mover
- Grade com snap opcional
- Salvar/Carregar em JSON
- Menu de contexto (clique direito)
- Alinhamento e distribuição de múltiplos elementos
- Contador global de grafos gerados via Netlify Function
- Google Analytics 4 configurável
- Modal de Ajuda com guia completo integrado
- Favicon SVG inline
- Barra de status e atalhos de teclado completos
- Suporte a rótulos com subscrito/sobrescrito (`v_{1}`, `e^{2}`)
- Barra lateral ocultável (para uso em telas pequenas)
- Download direto do código como `.tex`

#### Tecnologias
- HTML5 + CSS3 + JavaScript ES2020 puro (zero dependências)
- SVG nativo para renderização
- Netlify Functions (Node 18) para o contador serverless
- Deploy no Netlify

---

## [Unreleased]

### Planejado
- Exportação para GraphML, DOT (Graphviz), SVG
- Dark mode
- Renderização de rótulos LaTeX com MathJax
- Algoritmos visuais passo a passo (BFS, DFS)
- Tradução para inglês e espanhol
