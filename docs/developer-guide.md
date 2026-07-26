# Guia do Desenvolvedor

## Estrutura do código

Todo o código está em `index.html`. As seções são delimitadas por comentários:

```javascript
// ══════════════════════════════════════════════════════
//  NOME DA SEÇÃO
// ══════════════════════════════════════════════════════
```

### Seções em ordem

| Seção | Linha aprox. | Conteúdo |
|---|---|---|
| CSS | 18–370 | Variáveis, layout, componentes |
| HTML | 372–450 | Estrutura da UI |
| STATE | 460–480 | Variáveis globais |
| UTILS | 482–510 | uid, escH, clamp, dist |
| TOOL | 540–560 | setTool(), toolCursor() |
| ZOOM/PAN | 565–610 | zoomCanvas(), svgWheel() |
| GRID | 615–640 | toggleGrid(), renderGrid() |
| GEOMETRY | 645–720 | getEdgePath(), getEdgeMid() |
| RENDERING | 725–860 | renderAll(), renderEdges(), renderVertices() |
| SIDEBAR | 865–980 | updateSidebar(), hintHTML() |
| MOUSE EVENTS | 985–1110 | svgMD(), vertMD(), edgeClick(), svgMM(), svgMU() |
| CONTEXT MENU | 1115–1140 | elemCtx(), ctxAction() |
| GENERATORS | 1145–1310 | genKn(), genCn(), ... doComplement() |
| TIKZ EXPORT | 1315–1430 | generateTikz(), toTikz(), tikzColorDef() |
| ANALYSIS | 1435–1580 | findCutVertices(), findBridges(), runAnalysis() |
| HISTORY | 390–420 | saveHistory(), undo(), redo() |
| COUNTER | 1585–1650 | trackGeneration(), initCounter() |
| KEYBOARD | 1655–1700 | document.addEventListener('keydown') |
| INIT | 1705–1720 | window.addEventListener('load') |

---

## Como adicionar um novo gerador

1. Crie a função seguindo o padrão:

```javascript
function genPetersen() {
  // O grafo de Petersen tem 10 vértices e 15 arestas
  const W = CW(), H = CH();

  // Círculo externo: 5 vértices
  const outer = circleLayout(5, W/2, H/2, 160);
  // Círculo interno: 5 vértices (estrela)
  const inner = circleLayout(5, W/2, H/2, 80);

  const vs = [
    ...outer.map((p,i) => mkV(p.x, p.y, `u_{${i+1}}`)),
    ...inner.map((p,i) => mkV(p.x, p.y, `v_{${i+1}}`)),
  ];

  const es = [];
  // Arestas do pentágono externo
  for (let i = 0; i < 5; i++)
    es.push(mkE(vs[i].id, vs[(i+1)%5].id));
  // Arestas radiais
  for (let i = 0; i < 5; i++)
    es.push(mkE(vs[i].id, vs[i+5].id));
  // Estrela interna (cada vértice conecta ao 2 seguintes)
  for (let i = 0; i < 5; i++)
    es.push(mkE(vs[5+i].id, vs[5+(i+2)%5].id));

  return { verts: vs, edges: es };
}
```

2. Adicione o botão no HTML:

```html
<button class="btn gen" onclick="openModal('Petersen')">Petersen</button>
```

3. Adicione o caso no `openModal()`:

```javascript
case 'Petersen':
  f.innerHTML = `<div class="mf"><p style="font-size:12px;color:var(--text2)">
    Grafo de Petersen: 10 vértices, 15 arestas, 3-regular.</p></div>`;
  document.getElementById('modal-ok').textContent = 'Gerar';
  break;
```

4. Adicione o caso no `confirmModal()`:

```javascript
else if (modalType === 'Petersen') {
  loadGraph(genPetersen());
}
```

5. Adicione ao rastreamento:

```javascript
const isGen = ['Kn','Cn','Pn','Kmn','Bn','Wn','Qn','complement','product','Petersen']
  .includes(modalType);
```

---

## Como adicionar uma nova propriedade de análise

As análises ficam na seção `ANALYSIS`. Para adicionar, por exemplo, verificação de grafo hamiltoniano:

```javascript
// Dentro de runAnalysis(), após as propriedades existentes:
const isHamiltonian = checkHamiltonian(); // sua função
props.push(`<div class="prop-row">
  <span>Hamiltoniano</span>
  <span class="${isHamiltonian?'yes':'no'}">${isHamiltonian?'Sim':'Não'}</span>
</div>`);
```

---

## Como modificar a exportação TikZ

A função `generateTikz()` constrói o código linha a linha num array `lines[]`.

Para adicionar, por exemplo, suporte ao estilo `thick` por aresta:

```javascript
// Dentro do loop de arestas em generateTikz():
if (e.thickness) opts.push(`line width=${e.thickness}pt`);
// Isso já existe! Veja como o padrão é seguido.
```

Para adicionar um novo estilo de nó:

```javascript
// Em nodeStyleDef():
const defs = {
  // ... estilos existentes ...
  'double': 'draw, circle, minimum size=22pt, inner sep=2pt, fill=black!10, double',
};
```

E adicione a opção no `<select id="node-style">` no HTML.

---

## Como adicionar uma nova ferramenta

1. Adicione o botão:
```html
<button class="btn" id="tool-paint" onclick="setTool('paint')" title="Pintar (P)">🖌 Pintar</button>
```

2. Adicione o cursor em `toolCursor()`:
```javascript
function toolCursor(t) {
  return {
    // ... existentes ...
    paint: 'cell',
  }[t] || 'default';
}
```

3. Adicione a mensagem de status em `setTool()`:
```javascript
const msgs = {
  // ... existentes ...
  paint: 'Clique num vértice para aplicar a cor selecionada',
};
```

4. Trate o evento em `vertMD()` ou `edgeClick()`:
```javascript
} else if (tool === 'paint') {
  const v = verts.find(v => v.id === vid);
  if (v) { v.fillColor = currentPaintColor; saveHistory(); renderAll(); }
}
```

5. Adicione o atalho de teclado:
```javascript
const map = { ..., p: 'paint' };
```

---

## Testando

Não há testes automatizados (contribuição bem-vinda!). Para testar manualmente:

### Checklist de testes

**Ferramentas básicas**
- [ ] Criar vértice com clique
- [ ] Arrastar vértice
- [ ] Criar aresta entre dois vértices
- [ ] Criar laço
- [ ] Deletar vértice (remove arestas incidentes)
- [ ] Deletar aresta
- [ ] Subdivisão de aresta

**Geradores**
- [ ] Kₙ para n=1,2,3,5,10
- [ ] Cₙ para n=3,5,8
- [ ] Pₙ para n=2,6
- [ ] Kₘ,ₙ para m=2,n=3
- [ ] Bₙ para n=1,3,5
- [ ] Wₙ para n=4
- [ ] Qₙ para n=1,2,3

**Análise**
- [ ] Vértices de corte em grafo com ponte
- [ ] Pontes detectadas corretamente
- [ ] Blocos coloridos corretamente
- [ ] K₄ é euleriano (todos graus pares)
- [ ] K₃ não é euleriano, mas semi-euleriano com 2 vértices de grau ímpar

**Exportação**
- [ ] Código gerado compila no Overleaf
- [ ] Cores customizadas geram `\definecolor`
- [ ] Laços exportam com parâmetros corretos
- [ ] Arestas múltiplas exportam com `bend`

**Undo/Redo**
- [ ] Ctrl+Z desfaz criação de vértice
- [ ] Ctrl+Y refaz
- [ ] Histórico não excede 60 estados

---

## Variáveis CSS (tema)

Todas as cores e medidas estão em `:root`:

```css
:root {
  --bg: #f5f4f0;          /* fundo da aplicação */
  --surface: #fff;         /* cards, sidebar, painéis */
  --surface2: #f0efe9;     /* inputs, badges */
  --surface3: #e8e7e0;     /* hover states */
  --border: rgba(0,0,0,0.09);
  --border2: rgba(0,0,0,0.16);
  --text: #1a1918;
  --text2: #65625c;        /* texto secundário */
  --text3: #9a9790;        /* placeholders, hints */
  --accent: #3b33b0;       /* roxo principal */
  --accent-bg: rgba(59,51,176,0.08);
  --accent-border: rgba(59,51,176,0.28);
  /* ... outras cores de estado */
}
```

Para implementar dark mode, basta adicionar:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1918;
    --surface: #242322;
    /* ... */
  }
}
```

---

## Deploy

Veja [docs/deploy.md](deploy.md) para o guia completo de deploy no Netlify.
