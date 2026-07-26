# Exemplos de Grafos

Esta pasta contém arquivos `.json` prontos para carregar na ferramenta.

## Como usar

1. Abra [grafoslatex.netlify.app](https://grafoslatex.netlify.app)
2. Clique em **📂 Carregar**
3. Abra o arquivo `.json` desejado e cole o conteúdo
4. O grafo aparece no canvas pronto para editar e exportar

---

## Índice

### Grafos completos (`complete-graphs/`)
| Arquivo | Grafo | Vértices | Arestas |
|---|---|---|---|
| `k3.json` | K₃ (triângulo) | 3 | 3 |
| `k4.json` | K₄ | 4 | 6 |
| `k5.json` | K₅ | 5 | 10 |
| `k6.json` | K₆ | 6 | 15 |

### Ciclos (`cycles/`)
| Arquivo | Grafo | Vértices | Arestas |
|---|---|---|---|
| `c3.json` | C₃ | 3 | 3 |
| `c4.json` | C₄ | 4 | 4 |
| `c5.json` | C₅ | 5 | 5 |
| `c6.json` | C₆ | 6 | 6 |

### Caminhos (`paths/`)
| Arquivo | Grafo | Vértices | Arestas |
|---|---|---|---|
| `p3.json` | P₃ | 3 | 2 |
| `p4.json` | P₄ | 4 | 3 |
| `p5.json` | P₅ | 5 | 4 |
| `p6.json` | P₆ | 6 | 5 |

### Bipartidos (`bipartite/`)
| Arquivo | Grafo | Descrição |
|---|---|---|
| `k22.json` | K₂,₂ | Ciclo C₄ |
| `k23.json` | K₂,₃ | Bipartido completo |
| `k33.json` | K₃,₃ | Grafo de Kuratowski |

### Topológicos (`topological/`)
| Arquivo | Grafo | Descrição |
|---|---|---|
| `b3.json` | B₃ | Buquê de 3 círculos |
| `b5.json` | B₅ | Buquê de 5 círculos |
| `multigrafo.json` | — | Duas arestas paralelas + laços |
| `pseudografo.json` | — | Laços e arestas múltiplas |

### Rodas (`wheels/`)
| Arquivo | Grafo | Vértices | Arestas |
|---|---|---|---|
| `w4.json` | W₄ | 5 | 8 |
| `w5.json` | W₅ | 6 | 10 |
| `w6.json` | W₆ | 7 | 12 |

### Subdivididos (`subdivided/`)
| Arquivo | Grafo | Descrição |
|---|---|---|
| `sk3.json` | SK₃ | K₃ com cada aresta subdividida |
| `sk33.json` | SK₃,₃ | K₃,₃ subdividido (homeomorfo a K₃,₃) |
| `sk5.json` | SK₅ | K₅ subdividido |

---

## Gerar seus próprios exemplos

1. Crie o grafo na ferramenta
2. Clique em **💾 Salvar**
3. O arquivo `.json` baixado pode ser compartilhado e carregado por qualquer pessoa

---

## Contribuindo com exemplos

Se você criou um grafo interessante (de um paper, de um exercício, de um problema famoso), considere contribuir com o arquivo `.json`:

1. Salve o grafo como `.json` pela ferramenta
2. Adicione na pasta correspondente
3. Atualize este `README.md` com o novo item na tabela
4. Abra um Pull Request
