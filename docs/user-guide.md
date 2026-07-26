# Guia do Usuário

## Começando

Acesse [grafoslatex.netlify.app](https://grafoslatex.netlify.app) ou abra o `index.html` no navegador. Nenhuma instalação necessária.

Ao abrir, você verá um **C₅** (ciclo de 5 vértices) já carregado como exemplo.

---

## Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  [Barra de ferramentas] [Geradores] [Operações] [Ações]         │
│─────────────────────────────────────────────────────────────────│
│  [Escala TikZ] [Espessura] [Raio] [Grade] [Snap] [Undo/Redo] [Zoom] │
│─────────────────────────────────────────────────────────────────│
│              │                              │                   │
│   Painel     │         Canvas (SVG)         │   Painel TikZ     │
│   lateral    │                              │   (exportação)    │
│   (props)    │                              │                   │
│              │                              │                   │
│─────────────────────────────────────────────────────────────────│
│  [Barra de status]                    [Contador global]         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Ferramentas

### ✥ Mover (`F`)
- **Canvas vazio:** clique e arraste para mover toda a visualização (pan)
- **Sobre um vértice:** clique e arraste para mover o vértice
- **Sobre uma aresta:** clique para selecionar

Esta é a ferramenta padrão ao abrir — igual ao GeoGebra.

### ⊙ Selecionar (`S`)
- Clique num vértice ou aresta para selecionar
- O painel lateral mostra as propriedades do elemento
- Arraste o vértice selecionado para mover

### ⬚ Multi-seleção (`M`)
- **Arraste** no canvas vazio para criar uma caixa de seleção
- **Shift + clique** em elementos individuais para adicionar à seleção
- Com múltiplos selecionados: mova, alinhe, distribua ou delete todos de uma vez
- O painel lateral mostra opções de cor e opacidade para aplicar em massa

### ● Vértice (`V`)
- Clique em qualquer ponto do canvas para criar um vértice
- O rótulo é gerado automaticamente (`v_1`, `v_2`, ...)
- Para renomear: selecione com ⊙ e edite no painel lateral

### — Aresta (`A`)
- Clique no **vértice de origem** → cursor muda, linha aparece seguindo o mouse
- Clique no **vértice de destino** → aresta criada
- Clique no **mesmo vértice** → cria um laço

### ↺ Laço (`L`)
- Clique em qualquer vértice para adicionar um laço nele
- Múltiplos laços no mesmo vértice são distribuídos em direções diferentes
- Para ajustar a direção: selecione o laço e use o seletor "Direção" no painel

### ⊕ Subdivisão (`D`)
- Clique em uma aresta para inserir um novo vértice no meio dela
- A aresta original é substituída por dois segmentos
- Útil para criar grafos subdivididos (fundamentais em Teoria Topológica)

### ✕ Deletar (`X`)
- Clique em qualquer elemento para removê-lo
- Deletar um vértice remove também todas as arestas incidentes
- Atalho alternativo: selecione com ⊙ e pressione `Delete`

---

## Geradores automáticos

Todos os geradores abrem um modal pedindo o valor de `n` (e `m` quando aplicável).

| Botão | Grafo gerado | Exemplo |
|---|---|---|
| **Kₙ** | Completo | K₅: 5 vértices, 10 arestas, todos conectados |
| **Cₙ** | Ciclo | C₆: hexágono |
| **Pₙ** | Caminho | P₄: 4 vértices em linha |
| **Kₘ,ₙ** | Bipartido completo | K₂,₃: 2+3 vértices, 6 arestas |
| **Bₙ** | Buquê de círculos | B₃: 1 vértice, 3 laços |
| **Wₙ** | Roda | W₅: hub central + C₅ |
| **Qₙ** | Hipercubo | Q₃: cubo (8 vértices, 12 arestas) |

### Operações sobre o grafo atual

| Botão | Operação |
|---|---|
| **Ḡ Complemento** | Inverte as arestas: adiciona as que faltam, remove as existentes |
| **□ Produto Cart.** | Calcula G □ G₂ para um segundo grafo escolhido |

---

## Editando propriedades

Selecione qualquer elemento com ⊙ para ver suas propriedades no painel esquerdo.

### Propriedades de vértice

- **Rótulo:** texto com suporte a subscrito/sobrescrito LaTeX (`v_{1}`, `u^{k}`)
- **Fill:** cor de preenchimento
- **Borda:** cor da linha circular
- **Raio:** tamanho do nó (8 a 50px)
- **Opacidade:** 0.1 a 1 (útil para destacar elementos)
- **X, Y:** posição numérica exata

### Propriedades de aresta

- **Rótulo:** texto opcional (`e_{1}`, `\alpha`)
- **Cor:** cor da linha
- **Espessura:** sobreescreve a espessura global
- **Opacidade:** 0.1 a 1
- **Direcionada:** adiciona seta na ponta
- **Tracejada:** linha pontilhada
- **Curva:** ativa bezier quadrática
- **Curvatura:** controla o quanto a curva dobra (-120 a 120)
- **Direção** (laços): 0° a 315° em incrementos de 45°

### Menu de contexto (clique direito)

Clique com o botão direito em qualquer elemento:
- **✏ Renomear** — abre prompt para editar o rótulo
- **🎨 Cor** — abre o seletor de cor diretamente
- **⧉ Duplicar** — cria cópia deslocada
- **⊕ Conectar a todos** (vértices) — cria arestas para todos os outros vértices
- **✕ Deletar**

---

## Controles de visualização (segunda barra)

- **Escala TikZ:** controla o tamanho da figura exportada no documento LaTeX (1 a 8). Não muda o que você vê — só muda as coordenadas no código gerado
- **Espessura:** espessura global das arestas no canvas
- **Raio:** raio padrão para novos vértices
- **⊞ Grade:** mostra/oculta a grade de fundo (`G`)
- **⊙ Snap:** encaixa vértices na grade (incrementos de 20px)
- **↩ ↪ Undo/Redo:** `Ctrl+Z` / `Ctrl+Y`, até 60 estados
- **Zoom:** `−` e `+`, ou scroll do mouse; clique no percentual para resetar

---

## Análise de grafos (🔬 Analisar)

Clique em **🔬 Analisar** para abrir o painel de análise. O grafo é destacado visualmente:

- 🔴 **Vértices de corte** — contorno vermelho tracejado
- 🟠 **Pontes** — arestas em laranja com brilho
- 🎨 **Blocos biconexos** — cada bloco em uma cor diferente

O painel também mostra:

```
Propriedades
  Conexo: Sim
  Bipartido: Não
  Euleriano: Não
  Semi-euleriano: Sim
  Regular: Não

Métricas
  Vértices: 6 | Arestas: 7 | Componentes: 1
  Δ (grau máx): 4 | δ (grau mín): 1 | Grau médio: 2.33
  Diâmetro: 3 | Raio: 2

Graus
  v₁:3  v₂:2  v₃:4  v₄:1  v₅:2  v₆:2
  Sequência: [4, 3, 2, 2, 2, 1]

Estrutura
  Vértices de corte: v₁, v₃
  Pontes: (v₃,v₄)
  Blocos: 3 bloco(s)
```

Para desativar a análise e limpar os destaques, clique novamente em **🔬 Analisar**.

---

## Exportação TikZ

O painel direito mostra o código TikZ atualizado em tempo real.

### Configurações de exportação

- **Caption:** texto da legenda da figura
- **Label:** rótulo para `\ref{}` e `\label{}` no LaTeX
- **Posição:** `H` (here), `h`, `t` (top), `b` (bottom), `p` (page)
- **Estilo dos nós:**
  - *Padrão* — `fill=black!10` (tom cinza claro)
  - *Preenchido* — `fill=black!25` (cinza mais escuro)
  - *Branco* — `fill=white`
  - *Mínimo* — só o círculo, sem preenchimento
  - *Ponto* — nó mínimo `4pt`, ideal para grafos densos

### Usando no Overleaf

1. Certifique-se de ter no preâmbulo:
   ```latex
   \usepackage{tikz}
   \usepackage{float}
   \usetikzlibrary{arrows.meta}  % para laços e setas
   ```
2. Clique em **📋 Copiar** ou **⬇ .tex**
3. Cole diretamente no seu documento `.tex`

### Cores customizadas

Se você alterou as cores de vértices ou arestas, o código gerado inclui automaticamente:
```latex
\definecolor{cFF6B6B}{RGB}{255,107,107}
```

---

## Salvar e carregar

- **💾 Salvar:** baixa um arquivo `.json` com o estado completo do grafo
- **📂 Carregar:** cole o conteúdo do `.json` no campo de texto

O formato JSON é legível e pode ser editado manualmente:
```json
{
  "verts": [
    { "id": "n1a2b3", "x": 300, "y": 200, "label": "v_{1}", ... }
  ],
  "edges": [
    { "id": "n4c5d6", "from": "n1a2b3", "to": "n7e8f9", ... }
  ]
}
```

---

## Atalhos de teclado completos

| Atalho | Ação |
|---|---|
| `F` ou `F1` | Ferramenta Mover |
| `S` ou `F2` | Ferramenta Selecionar |
| `M` | Multi-seleção |
| `V` | Adicionar vértice |
| `A` | Adicionar aresta |
| `L` | Adicionar laço |
| `D` | Subdivisão |
| `X` | Deletar |
| `G` | Toggle grade |
| `Ctrl+Z` | Desfazer |
| `Ctrl+Y` | Refazer |
| `Ctrl+A` | Selecionar tudo |
| `Ctrl+L` | Auto-layout |
| `Ctrl+D` | Duplicar seleção |
| `Delete` / `Backspace` | Remover selecionado |
| `Esc` | Cancelar operação / desselecionar |
| `Scroll` | Zoom in/out |
| Botão do meio | Pan (qualquer ferramenta) |
