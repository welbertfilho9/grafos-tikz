# Arquitetura do Gerador de Grafos em TikZ

## Visão geral

O projeto é uma **Single Page Application (SPA)** contida inteiramente em um único arquivo `index.html` de ~2000 linhas. Não há build step, bundler, transpilador ou framework — apenas HTML, CSS e JavaScript ES2020 executados diretamente pelo navegador.

```
Canvas (SVG)
    │
    ▼
Estado Global (verts[], edges[])
    │
    ├──▶ Renderer (SVG paths)
    │
    ├──▶ Sidebar (propriedades)
    │
    └──▶ TikZ Exporter (código LaTeX)
```

---

## Modelo de dados

### Vértice (`vert`)

```javascript
{
  id        : "n1a2b3",        // uid() — identificador único
  x         : 320,             // posição no canvas (pixels SVG)
  y         : 240,
  label     : "v_{1}",         // rótulo (sintaxe LaTeX parcial)
  fillColor : "#eae8df",       // cor de preenchimento
  strokeColor: "#3a3830",      // cor da borda
  radius    : 20,              // raio em pixels
  opacity   : 1,               // 0.1 a 1
}
```

### Aresta (`edge`)

```javascript
{
  id       : "n4c5d6",         // uid()
  from     : "n1a2b3",        // id do vértice de origem
  to       : "n7e8f9",        // id do vértice de destino
  label    : "e_{1}",          // rótulo opcional
  curved   : false,            // se true, usa quadrática
  bend     : 0,                // curvatura (-120 a 120)
  directed : false,            // se true, adiciona seta
  dashed   : false,            // se true, linha tracejada
  color    : "#49463e",        // cor da linha
  isLoop   : false,            // se true, é um laço
  loopDir  : 0,                // direção do laço (0-315°)
  opacity  : 1,
  thickness: 0,                // 0 = usa espessura global
}
```

### Estado global

```javascript
let verts    = [];    // Array de verts
let edges    = [];    // Array de edges
let tool     = 'move';
let selected = null;  // { type: 'vertex'|'edge', id }
let multiSel = new Set(); // ids selecionados
let history  = [];    // estados para undo/redo (JSON.stringify)
let historyIndex = -1;
let zoomLevel = 1;
let panX = 0, panY = 0;
```

---

## Pipeline de renderização

```
Estado (verts, edges)
        │
        ▼ renderAll()
        │
        ├──▶ applyTransform()   → atualiza zoom/pan no <g>
        ├──▶ renderGrid()       → linhas SVG de grade
        ├──▶ renderEdges()      → paths SVG das arestas
        ├──▶ renderVertices()   → circles + text SVG
        ├──▶ updateStats()      → componentes, contagem
        ├──▶ updateSidebar()    → painel de propriedades
        └──▶ updateTikz()       → gera código LaTeX
```

`renderAll()` é chamado a cada interação (mouse move durante drag, click, etc.). Como o SVG é simples e não há animações, isso é performático até ~200 vértices.

### Cálculo de paths de arestas

```javascript
function getEdgePath(v1, v2, edge)
```

- **Aresta reta:** `M sx sy L ex ey` (com offset do raio do nó)
- **Aresta curva:** `M sx sy Q cpx cpy ex ey` (bezier quadrática)
- **Arestas paralelas:** detecta automaticamente quantas arestas existem entre o mesmo par; distribui as curvaturas simetricamente (`bend = (idx - (count-1)/2) * 65`)
- **Laço:** `M x y C cx1 cy1 cx2 cy2 x y` (bezier cúbica, direção controlada por `loopDir`)

---

## Pipeline de exportação TikZ

```
Canvas coordinates (pixels)
        │
        ▼ toTikz(x, y)
        │  x_tikz = x * scale
        │  y_tikz = (H - y) * scale   ← inverte eixo Y
        │
        ▼ generateTikz()
        │
        ├── \begin{figure}[pos]
        ├── \begin{tikzpicture}[estilo dos nós]
        ├── \definecolor{} para cores customizadas
        ├── \node para cada vértice
        ├── \draw ou \path para cada aresta
        ├── \caption{}
        ├── \label{}
        └── \end{figure}
```

### Conversão de coordenadas

O TikZ usa eixo Y positivo para cima; o SVG usa positivo para baixo. A inversão é:

```javascript
const scale = tikzScaleSlider.value * 0.01;  // 0.01 a 0.08
const [tx, ty] = [(x * scale).toFixed(2), ((canvasH - y) * scale).toFixed(2)];
```

O controle de escala (slider "Tamanho figura") permite ajustar sem redesenhar — muda apenas a multiplicação.

---

## Sistema de undo/redo

```javascript
function saveHistory() {
  const state = JSON.stringify({ verts, edges });
  history = history.slice(0, historyIndex + 1);
  history.push(state);
  if (history.length > 60) history.shift();
  historyIndex = history.length - 1;
}
```

- Serialização completa do estado a cada operação destrutiva
- Máximo de 60 estados (evita consumo excessivo de memória)
- `undo()` e `redo()` restauram via `JSON.parse`

---

## Algoritmos de análise de grafos

Todos implementados em JavaScript puro, sem bibliotecas:

### Vértices de corte (Tarjan, O(V+E))

```javascript
function findCutVertices()
// DFS com discovery time e low values
// Um vértice v é ponto de articulação se:
//   - é raiz da DFS e tem ≥2 filhos, OU
//   - não é raiz e tem filho u onde low[u] >= disc[v]
```

### Pontes (O(V+E))

```javascript
function findBridges()
// Uma aresta (u,v) é ponte se low[v] > disc[u]
```

### Blocos biconexos (O(V+E))

```javascript
function findBlocks()
// Pilha de arestas durante DFS
// Um bloco é retirado quando encontramos ponto de articulação
```

### Bipartido (O(V+E))

```javascript
function isBipartite()
// BFS com 2-coloração
// Grafo é bipartido ↔ sem ciclo de comprimento ímpar
```

### Euleriano

```javascript
function isEulerian()
// Euleriano: conexo + todos vértices com grau par
// Semi-euleriano: conexo + exatamente 2 vértices com grau ímpar
```

### Componentes conexas (Union-Find, O(V·α(V)))

```javascript
function countComponents()
// Union-Find com path compression
```

---

## Netlify Function (contador global)

```
Browser → GET/POST /api/counter
                │
                ▼ (redirect via netlify.toml)
        /.netlify/functions/counter
                │
                ▼ counter.mjs (Node 18)
        fetch counterapi.dev server-side
                │
                ▼
        { count: N }
                │
                ▼
        Browser atualiza UI
```

A function resolve o problema de CORS: o browser não pode chamar `counterapi.dev` diretamente (CORS bloqueado), mas a function server-side pode — e então repassa o resultado para o browser com headers `Access-Control-Allow-Origin: *`.

---

## Fluxo de interação do usuário

```
Clique no canvas
      │
      ▼ svgMD(event)
      │
      ├─ tool === 'move'  → start pan
      ├─ tool === 'vertex' → criar vértice → saveHistory() → renderAll()
      ├─ tool === 'multi'  → start rubber-band selection
      └─ else → deselecionar

Clique num vértice
      │
      ▼ vertMD(event, vid)
      │
      ├─ tool === 'move'/'select' → selecionar + iniciar drag
      ├─ tool === 'edge'          → definir origem/destino → addEdge()
      ├─ tool === 'loop'          → addEdge(vid, vid, isLoop=true)
      └─ tool === 'delete'        → remover vértice e arestas incidentes

Mouse move
      │
      ▼ svgMM(event)
      │
      ├─ isPanning  → atualizar panX, panY → renderAll()
      ├─ dragging   → atualizar v.x, v.y → renderAll()
      ├─ dragGroup  → atualizar todos os selecionados → renderAll()
      └─ edgeStart  → desenhar linha temporária no temp-layer
```

---

## Decisões de design

| Decisão | Alternativa considerada | Motivo da escolha |
|---|---|---|
| Arquivo único | Módulos ES + bundler | Zero setup, portabilidade total |
| SVG nativo | Canvas 2D API ou D3.js | DOM manipulável, sem deps, escalável |
| Vanilla JS | React/Vue | Sem build, qualquer editor, menos barreira |
| Netlify Functions | Firebase / Supabase | Mesmo domínio = sem CORS, gratuito |
| JSON para save | IndexedDB | Simples, portável, depurável |
| Force-directed layout | Graphviz via WASM | Zero deps, suficiente para grafos pequenos |
