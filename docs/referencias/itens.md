---
title: Chaves de itens (@item.*)
parent: Referências
nav_order: 2.5
---

# Chaves de itens (`system.*` de Item → `@item.*`)
{: .no_toc }

Campos dos itens, úteis em fórmulas (`@item.circulo`), em efeitos de uso e em macros (`item.system.…`). Fonte-verdade: `module/dataModel/item/`.
{: .fs-5 .fw-300 }

1. TOC
{:toc}

## Tipos de item

| `type` | Nome | Composição |
| --- | --- | --- |
| `arma` | Arma | base + físico + ativação + melhorias + rolagens |
| `equipamento` | Equipamento (armaduras, escudos, acessórios) | base + físico + ativação + melhorias + rolagens |
| `consumivel` | Consumível (poções, alquímicos, pergaminhos) | base + físico + ativação + resistência + melhorias + rolagens |
| `tesouro` | Tesouro | base + físico + ativação + resistência + rolagens |
| `magia` | Magia | base + ativação + resistência + rolagens |
| `poder` | Poder / habilidade | base + ativação + resistência + rolagens |
| `classe` | Classe | base + rolagens |
| `race` | Raça | base + concessões |
| `comodo` / `mobilia` | Cômodo / Mobília (Bases) | base + preço |

## Campos comuns (todos os itens)

| Campo | Significado |
| --- | --- |
| `description.value` / `.unidentified` | descrição (HTML) / descrição quando não identificado |
| `source` · `origin` | fonte (livro) · origem |
| `tags[]` | etiquetas livres |
| `rolltags[]` | **tags de rolagem** em PascalCase — contadas em `@<Tag>` (veja [Rolagens](rolagens#rolltags)) |
| `automationtags[]` | tags para automações |
| `chatFlavor` · `chatGif` | texto/gif extra no card de chat |

## Itens físicos (`arma`, `equipamento`, `consumivel`, `tesouro`)

| Campo | Significado |
| --- | --- |
| `qtd` | quantidade |
| `peso` · `espacos` | peso · espaços ocupados |
| `preco` | preço em T$ |
| `carregado` | está sendo carregado (conta na carga) |
| `pv.value` / `pv.max` · `rd` | PV e RD do objeto |
| `equipado` | arma: `0` não, `1` uma mão, `2` duas mãos · equipamento: booleano |
| `equipado2.slot` / `.type` | slot de equipamento (`hand` `body` `both`) |
| `upgrades.melhoria1..4` · `.material` · `.encanto1..3` · `enableAutoUpgrades` | melhorias, material especial e encantos |

## Ativação (`arma`, `equipamento`, `consumivel`, `tesouro`, `magia`, `poder`)

| Campo | Significado |
| --- | --- |
| `ativacao.custo` | custo em PM (**número**) |
| `ativacao.execucao` | `passive` `action` `move` `full` `reaction` `free` `minute` `hour` `day` `special` |
| `ativacao.condicao` · `.qtd` · `.special` | condição de uso, quantidade, texto especial |
| `alcance` | `none` `self` `touch` `short` `medium` `long` `spec` `any` |
| `alvo` · `area` · `efeito` | textos do card |
| `duracao.units` / `.value` / `.special` | `inst` `scene` `turn` `round` `sust` `minute` `hour` `day` `month` `year` `perm` `special` + número |
| `range.units` / `.value` | alcance numérico |
| `consume.type` / `.target` / `.amount` / `.mpMultiplier` | consumo de recurso/munição ao usar |
| `resistencia.txt` · `.atributo` · `.bonus` · `.cd` (derivado) | teste de resistência: texto (`Reflexos reduz à metade`), atributo da CD, bônus, CD final = 10 + meio nível + atributo + bônus (NPC: `attributes.cd`) |

Armas não têm `duracao/range/alvo/area/efeito`; equipamentos também não têm `alcance`.

## Rolagens do item — `system.rolls[]`

Cada item usável tem uma lista de rolagens; é aqui que ficam as fórmulas de ataque e dano.

| Campo | Significado |
| --- | --- |
| `rolls[i].key` | **Referência** — id usado por efeitos de uso (`ataque`, `dano`, `dano0`, `dano1`, `formula0`…) |
| `rolls[i].name` | nome exibido; vira `@roll.<name>` depois de rolada (`@roll.Ataque`, `@roll.Dano`) |
| `rolls[i].type` | `ataque` · `dano` · `formula` |
| `rolls[i].parts` | partes da fórmula (veja abaixo) |
| `rolls[i].adaptavel` | fórmula alternativa de dano quando a arma é usada com duas mãos |

Layout de `parts`:

- **ataque**: `[["1d20", ""], ["luta", ""], ["", ""]]` → dado · `[perícia, atributo alternativo]` · bônus.
- **dano**: `[["1d6", "corte"], ["padrao"]]` → `[fórmula, tipo de dano]` · `[atributo]`. `padrao` resolve para `@for`/`@des` conforme propósito/empunhadura/acuidade.
- **formula**: só `parts[0][0]`.

Tipos de dano/cura: `dano` `corte` `perfuracao` `impacto` `fogo` `frio` `acido` `eletricidade` `essencia` `luz` `trevas` `psiquico` `perda` · `curapv` `curatpv` `curapm` `curatpm`.

## Por tipo

### `arma`

| Campo | Significado |
| --- | --- |
| `proficiencia` | `simples` `marcial` `exotica` `fogo` `natural` `improvisada` |
| `proposito` | `corpo-a-corpo` `corpo-a-corpo-arremesso` `arremesso` `disparo` |
| `empunhadura` | `leve` `uma` `duas` |
| `criticoM` / `criticoX` | margem de ameaça (20) / multiplicador (2) |
| `ataques` | número de ataques |
| `propriedades.<flag>` | propriedades (ex.: `ada` adaptável) |
| `size` | tamanho da arma |

### `equipamento`

| Campo | Significado |
| --- | --- |
| `tipo` | `leve` `pesada` `escudo` … |
| `armadura.value` | bônus na Defesa |
| `armadura.penalidade` | penalidade de armadura (≤ 0) |
| `armadura.maxAtr` | limite de atributo na Defesa |

### `consumivel`

`tipo` (`alchemy` para alquímicos — recebem `@danoALQ`), `subtipo`.

### `magia`

| Campo | Significado |
| --- | --- |
| `circulo` | 1–5 (`@item.circulo`) |
| `escola` | escola de magia |
| `tipo` | `arcana` / `divina` |
| `preparada` | booleano |

### `poder`

`tipo` (`geral`, classe, origem, concedido, tormenta, distinção…) e `subtipo` (texto).

### `classe`

| Campo | Significado |
| --- | --- |
| `niveis` | níveis na classe (`@nvl.<slug-da-classe>` no ator) |
| `pvPorNivel` · `pmPorNivel` | PV/PM por nível |
| `pericias.inatas` · `pericias.numero` | perícias fixas · quantas escolher |
| `inicial` | classe inicial (PV cheio no 1º nível) |

### `race`

`atributos.<for…car>` (bônus raciais), `atributosDinamicos.value` (atributos à escolha), `grants[]` (poderes concedidos), `skills[]` (perícias concedidas).

### `comodo` / `mobilia`

`preco`, `residentes`.
