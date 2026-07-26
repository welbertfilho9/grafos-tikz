# Assets Pendentes — Screenshots e GIFs

Este arquivo lista todos os assets visuais que você precisa capturar antes de tornar o repositório público.

---

## Screenshots necessários

Salve em `docs/assets/` com os nomes exatos abaixo.

| Arquivo | O que mostrar | Dicas |
|---|---|---|
| `banner.png` | Tela cheia da ferramenta com K₅ aberto | 1280×640px, sem zoom do OS |
| `screenshot-main.png` | Interface completa com grafo razoável | Use K₄ ou W₅ |
| `screenshot-analysis.png` | Painel 🔬 Analisar ativo com destaques | Use grafo com ponte |
| `screenshot-tikz.png` | Painel TikZ com código visível | Zoom no painel direito |
| `screenshot-mobile.png` | Interface em tela estreita | DevTools → 375px |
| `screenshot-help.png` | Modal de Ajuda aberto | Clique em "? Ajuda" |
| `screenshot-bipartite.png` | K₃,₃ gerado e analisado | Kₘ,ₙ com m=3, n=3 |

**Ferramenta recomendada:** tecla `Print Screen` ou `Cmd+Shift+4` no Mac.

---

## GIFs necessários

Salve em `docs/assets/` com os nomes exatos abaixo.

### `demo-kn.gif` — Gerador Kₙ e exportação
**Duração:** ~12 segundos  
**O que gravar:**
1. Clique em ✕ Limpar → confirmar
2. Clique em Kₙ → digitar `5` → Gerar
3. Preencher Caption: `Grafo completo $K_5$`
4. Clicar em 📋 Copiar
5. Badge "✓ Copiado!" aparecer

---

### `demo-move.gif` — Ferramenta Mover e zoom
**Duração:** ~10 segundos  
**O que gravar:**
1. Com algum grafo aberto
2. Usar scroll para dar zoom in e out
3. Clicar e arrastar no canvas vazio para fazer pan
4. Clicar e arrastar um vértice para reposicioná-lo

---

### `demo-analysis.gif` — Análise de pontes e cortes
**Duração:** ~15 segundos  
**O que gravar:**
1. Criar manualmente um grafo simples (ou carregar P₄)
2. Adicionar uma ramificação (cria ponte)
3. Clicar em 🔬 Analisar
4. Câmera passeia pelos destaques coloridos
5. Clicar novamente para desativar

---

### `demo-subdivide.gif` — Subdivisão de aresta
**Duração:** ~10 segundos  
**O que gravar:**
1. Com K₃ aberto
2. Selecionar ferramenta ⊕ Subdivisão
3. Clicar em uma aresta → novo vértice aparece
4. Clicar em outra aresta

---

### `demo-loop.gif` — Laços e arestas múltiplas (topológico)
**Duração:** ~12 segundos  
**O que gravar:**
1. Criar dois vértices
2. Criar 3 arestas paralelas entre eles
3. Selecionar ↺ Laço e criar laço em cada vértice
4. Mostrar o código TikZ gerado com `loop`

---

### `demo-multisel.gif` — Multi-seleção e alinhamento
**Duração:** ~10 segundos  
**O que gravar:**
1. Com Kₙ ou grafo com muitos vértices
2. Selecionar ferramenta ⬚ Multi
3. Arrastar caixa de seleção sobre vários vértices
4. Clicar "↔ Alinhar horizontal" no painel

---

## Ferramenta recomendada para GIFs

**ScreenToGif** (Windows) — gratuito, exporta GIF direto  
**Kap** (Mac) — gratuito, exporta GIF/MP4  
**Peek** (Linux) — gratuito  

**Configurações recomendadas:**
- Resolução: 1280×720 ou 960×540
- FPS: 15 (suficiente, arquivo menor)
- Duração máxima: 15 segundos por GIF
- Tamanho máximo: 3MB por GIF (GitHub tem limite de 10MB por arquivo)

---

## Como referenciar no README

Após salvar os arquivos, as linhas do README que usam os assets já estão prontas:

```markdown
![demo-kn](docs/assets/demo-kn.gif)
```

Basta os arquivos existirem no caminho correto.

---

## Banner

O `banner.png` é o asset mais importante — é o primeiro que o visitante vê.

**Sugestão de conteúdo:**
- Fundo escuro ou gradiente suave
- Logo/título: "Gerador de Grafos em TikZ"
- Screenshot da ferramenta em uso ao lado direito
- Badges de tecnologia (HTML, JS, TikZ, Netlify)

**Ferramentas para criar:**
- Canva (gratuito) — tem templates de GitHub banner
- Figma (gratuito) — mais controle
- GIMP (gratuito) — para combinar screenshot + texto
