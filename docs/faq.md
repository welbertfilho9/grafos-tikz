# FAQ — Perguntas Frequentes

## Uso geral

**O projeto precisa de internet para funcionar?**
Não. O `index.html` funciona completamente offline. As únicas funcionalidades que requerem conexão são o contador global de grafos e o Google Analytics (se configurado).

**Posso usar em trabalhos acadêmicos?**
Sim, o projeto é MIT. Você pode usar, modificar e distribuir livremente. Uma citação é bem-vinda mas não obrigatória.

**O código TikZ gerado compila no Overleaf sem configuração extra?**
Para a maioria dos grafos, sim. Adicione ao preâmbulo:
```latex
\usepackage{tikz}
\usepackage{float}
\usetikzlibrary{arrows.meta}
```
Para laços (`loop`), o `arrows.meta` é necessário.

**Posso gerar grafos direcionados (dígrafos)?**
Sim. Selecione qualquer aresta com a ferramenta ⊙ e marque "Direcionada" no painel lateral.

**Como faço para ter arestas múltiplas entre dois vértices?**
Use a ferramenta Aresta (`A`) e clique nos mesmos dois vértices mais de uma vez. As arestas paralelas são distribuídas automaticamente com curvaturas simétricas.

---

## TikZ e LaTeX

**Por que as coordenadas TikZ ficam tão pequenas?**
O slider "Escala TikZ" controla a proporção. O padrão (3.6) gera coordenadas em cm que cabem numa página A4. Aumente para grafos menores, diminua para grafos grandes.

**Como adicionar rótulos matemáticos nas arestas?**
No campo "Rótulo" da aresta, use sintaxe LaTeX sem os `$`: `e_{12}`, `\alpha`, `w(e)`. O código exportado coloca automaticamente dentro de `$...$`.

**O grafo ficou muito grande/pequeno no LaTeX. Como ajustar?**
Use o slider "Escala TikZ" antes de exportar. Não precisa redesenhar — a escala é aplicada apenas no código gerado.

**Como exportar sem a legenda?**
Deixe o campo "Caption" vazio. O `\caption{}` não será gerado.

---

## Funcionalidades

**Como desfazer uma ação?**
`Ctrl+Z` (até 60 estados). O botão ↩ na barra também funciona.

**Como selecionar todos os elementos?**
`Ctrl+A` seleciona todos os vértices e arestas.

**Como alinhar vértices horizontalmente?**
Selecione múltiplos vértices (ferramenta Multi ⬚) → clique "↔ Alinhar horizontal" no painel lateral.

**Como carregar um grafo salvo?**
Clique em 📂 Carregar → cole o conteúdo do arquivo `.json` → OK.

**Posso ter vértices sem rótulo?**
Sim. Selecione o vértice e apague o campo "Rótulo". O nó será exportado como `\node (id) at (x,y) {};`.

---

## Problemas conhecidos

**O auto-layout (`Ctrl+L`) não ficou bom.**
O algoritmo force-directed funciona melhor com grafos conexos de 5–30 vértices. Para grafos muito densos ou muito esparsos, mova os vértices manualmente após o layout.

**O código TikZ de laços não compila.**
Certifique-se de ter `\usetikzlibrary{arrows.meta}` no preâmbulo. Alguns parâmetros de laço (`out`, `in`, `looseness`) requerem a biblioteca `arrows.meta` ou `calc`.

**O contador global mostra "servidor offline".**
O contador depende da Netlify Function. Se você abriu o `index.html` localmente (sem servidor), a function não está disponível. Isso é normal — funciona apenas no Netlify.
