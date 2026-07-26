# Tutorial — Do zero ao TikZ em 5 minutos

## Tutorial 1 — Seu primeiro grafo: K₄

**Objetivo:** criar o grafo completo K₄ e exportar o código TikZ.

**Tempo estimado:** 2 minutos

### Passo 1 — Abra a ferramenta

Acesse [grafoslatex.netlify.app](https://grafoslatex.netlify.app). O C₅ aparece como exemplo inicial.

### Passo 2 — Limpe o canvas

Clique em **✕ Limpar** (canto superior direito) → **Limpar**.

### Passo 3 — Gere K₄

Clique no botão **Kₙ** → digite `4` → **Gerar**.

O K₄ aparece: 4 vértices em círculo, todos conectados entre si (6 arestas).

### Passo 4 — Personalize (opcional)

- Clique em ⊙ **Selecionar** → clique num vértice → mude o rótulo para `a`, `b`, `c`, `d`
- No painel direito, preencha: Caption: `Grafo completo $K_4$`, Label: `fig:k4`

### Passo 5 — Exporte

Clique em **📋 Copiar**. O código está na área de transferência.

### Passo 6 — Cole no Overleaf

```latex
% No preâmbulo:
\usepackage{tikz}
\usepackage{float}

% No corpo do documento:
% Cole aqui o código copiado
```

✅ **Pronto!** Você gerou seu primeiro grafo em TikZ.

---

## Tutorial 2 — Grafo bipartido K₂,₃ com rótulos

**Objetivo:** criar K₂,₃ com rótulos nas arestas.

### Passo 1 — Gere K₂,₃

Clique em **Kₘ,ₙ** → m=2, n=3 → **Gerar**.

### Passo 2 — Adicione rótulos nas arestas

- Selecione (⊙) a primeira aresta → campo "Rótulo" → digite `e_{1}`
- Repita para as demais: `e_{2}`, `e_{3}`, `e_{4}`, `e_{5}`, `e_{6}`

### Passo 3 — Ajuste a escala

O K₂,₃ é um grafo largo. Mova o slider "Escala TikZ" para **4.5** para que caiba melhor na página.

### Passo 4 — Exporte

Clique em **⬇ .tex** para baixar diretamente como arquivo.

---

## Tutorial 3 — Grafo topológico com laços

**Objetivo:** criar um pseudografo com laços e arestas múltiplas.

### Passo 1 — Crie dois vértices

- Selecione ● **Vértice**
- Clique em dois pontos do canvas

### Passo 2 — Crie arestas múltiplas

- Selecione — **Aresta**
- Clique no vértice u, depois em v
- Clique novamente em u → v (segunda aresta)
- Clique em u → v uma terceira vez

Três arestas paralelas aparecem com curvaturas automáticas.

### Passo 3 — Adicione laços

- Selecione ↺ **Laço**
- Clique no vértice u → laço aparece na direção 0°
- Clique novamente em u → segundo laço, direção 80°

### Passo 4 — Ajuste direções dos laços

- Selecione ⊙ **Selecionar** → clique no primeiro laço
- No painel: "Direção" → `45°`
- Clique no segundo laço → "Direção" → `135°`

### Passo 5 — Exporte e compile

O código gerado usa `\path (...) edge[loop, out=..., in=...] (...)` para cada laço.

No preâmbulo do LaTeX, adicione:
```latex
\usetikzlibrary{arrows.meta}
```

---

## Tutorial 4 — Análise de um grafo com pontes

**Objetivo:** identificar pontes e vértices de corte visualmente.

### Passo 1 — Crie um grafo com ponte

Gere P₄ (`Pₙ`, n=4). Todo grafo caminho tem suas arestas como pontes.

Ou crie manualmente:
- 5 vértices: v₁, v₂, v₃, v₄, v₅
- Arestas: v₁v₂, v₂v₃ (ponte), v₃v₄, v₃v₅

### Passo 2 — Execute a análise

Clique em **🔬 Analisar**.

O painel mostra:
- As pontes destacadas em laranja
- v₃ como vértice de corte (contorno vermelho tracejado)
- Blocos biconexos em cores diferentes

### Passo 3 — Interprete

O painel lateral mostra:
```
Pontes: (v₂,v₃)
Vértices de corte: v₃
Blocos: 3 bloco(s)
```

### Passo 4 — Desative

Clique novamente em **🔬 Analisar** para limpar os destaques.

---

## Tutorial 5 — Produto cartesiano Q₂ = C₄

**Objetivo:** gerar Q₂ e verificar que é isomorfo a C₄.

### Passo 1 — Gere Q₂

Clique em **Qₙ** → n=2 → **Gerar**.

Aparecem 4 vértices (00, 01, 10, 11) formando um quadrado — exatamente C₄.

### Passo 2 — Compare com K₂□K₂

- Clique em **□ Prod. Cart.** → escolha K₂ → **Gerar**

O resultado (K₂□K₂) é estruturalmente idêntico ao Q₂.

### Passo 3 — Exporte com caption matemático

Caption: `Hipercubo $Q_2 \cong C_4$`

---

## Tutorial 6 — Subdivisão de grafos

**Objetivo:** subdividir todas as arestas de K₃ para obter o grafo subdividido SK₃.

### Passo 1 — Gere K₃

Clique em **Kₙ** → n=3 → **Gerar**.

### Passo 2 — Subdivida cada aresta

- Selecione ⊕ **Subdivisão**
- Clique em cada uma das 3 arestas

Cada aresta é dividida em 2, com um novo vértice de grau 2 no meio.

### Passo 3 — Renomeie os vértices

Os 3 novos vértices recebem rótulos automáticos (v₄, v₅, v₆). Renomeie para `w_{1}`, `w_{2}`, `w_{3}` se necessário.

### Resultado

SK₃ tem 6 vértices e 6 arestas. É um ciclo C₆.
