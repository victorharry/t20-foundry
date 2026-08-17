---
title: Referências @ em rolagens
parent: Referências
nav_order: 1
---

# Referências `@` em rolagens (*roll data*)
{: .no_toc }

Variáveis que você pode escrever em qualquer fórmula: chat (`/r 1d20 + @for`), campos de rolagem de itens, valores de Efeitos Ativos que aceitam fórmula, rolagens inline `[[/r …]]` e macros.
{: .fs-5 .fw-300 }

1. TOC
{:toc}

## Regra geral

O sistema monta o *roll data* do ator assim (`module/documents/actor.mjs`, `getRollData()`):

1. **Copia tudo de `system.*`** — então **qualquer caminho da ficha vira `@caminho`**, sem o prefixo `system.`.
   Ex.: `@pericias.luta.value`, `@attributes.pv.value`, `@atributos.for.value`, `@tracos.tamanho`, `@dinheiro.to`, `@resources.primary.value`. A lista completa de caminhos está em [Chaves da ficha](ficha).
2. **Adiciona atalhos** (tabela abaixo): `@for`, `@nivel`, `@treino`, `@atributoChave`, `@dano`, …
3. Em fórmulas **de itens** (arma, magia, poder…), adiciona ainda `@item.*`, `@roll.*` e as perícias "nuas" (`@luta`, `@pont`, …).

{: .note }
O `@` só resolve quando há um **ator** por trás: o token selecionado (chat), o dono do item (fichas/cards) ou o ator passado pela macro. Um item solto no diretório de itens não tem *roll data*.

## Atalhos do ator

### Atributos

| Variável | Valor |
| --- | --- |
| `@for` `@des` `@con` `@int` `@sab` `@car` | **modificador** do atributo (`system.atributos.<x>.value`) |
| `@atributoChave` | modificador do atributo de conjuração do ator (`system.attributes.conjuracao` → `system.atributos.<x>.value`) |
| `@atributo` | soma dos modificadores gerais de testes de atributo (`system.modificadores.atributos.geral`) |
| `@fisicos` / `@mentais` | idem para atributos físicos (For/Des/Con) / mentais (Int/Sab/Car) |

### Nível e patamar

| Variável | Valor |
| --- | --- |
| `@nivel` | nível do personagem (`system.attributes.nivel.value`, mínimo 1) |
| `@meionivel` | `floor(@nivel / 2)` |
| `@patamar` | 1 = Iniciante (1–4), 2 = Veterano (5–10), 3 = Campeão (11–16), 4 = Lendário (17–20) |
| `@nvl.<classe>` | níveis em uma classe específica, pelo nome do item de classe em *slug*: `@nvl.guerreiro`, `@nvl.arcanista`, `@nvl.bucaneiro`, `@nvl.cacador`, `@nvl.lutador` … (acentos removidos, minúsculas, hífens no lugar de espaços) |
| `@circulo` | maior círculo entre as magias que o ator possui |
| `@treino` | bônus de treinamento pelo nível: +2 (1–6), +4 (7–14), +6 (15+) |

### Perícias, defesa e tamanho

| Variável | Valor |
| --- | --- |
| `@pericias.<chave>.value` | total da perícia (ex.: `@pericias.perc.value`, `@pericias.luta.value`) — chaves em [Chaves da ficha](ficha#pericias) |
| `@pericia` | soma de `system.modificadores.pericias.geral` (bônus em todas as perícias) |
| `@semataque` / `@ataque` / `@resistencia` | modificadores de perícias exceto ataque / só de ataque (Luta e Pontaria) / só de resistências (Fortitude, Reflexos, Vontade) |
| `@pda` | penalidade de armadura (número negativo ou 0) |
| `@tamanho` | modificador de tamanho para Furtividade: Minúsculo +5, Pequeno +2, Médio 0, Grande −2, Enorme −5, Colossal −10 |
| `@attributes.defesa.value` | Defesa final |
| `@attributes.cd` | CD de magias/habilidades |

### Dano e cura

| Variável | Valor (soma de `system.modificadores.…`) |
| --- | --- |
| `@dano` | `dano.geral` — todo dano |
| `@danoCAC` | `dano.cac` — dano corpo a corpo |
| `@danoAD` | `dano.ad` — dano à distância |
| `@danoMagico` | `dano.mag` — dano de magias |
| `@danoALQ` | `dano.alq` — dano alquímico |
| `@curaGeral` | `cura.geral` |
| `@curaMagica` | `cura.mag` |

O sistema já anexa esses bônus automaticamente às rolagens de dano/cura dos itens; use-os manualmente só em fórmulas soltas.

### Ameaças (NPC)

| Variável | Valor |
| --- | --- |
| `@attributes.nd` | ND da ameaça |
| `@ndtreinado` | valor de perícia "treinada" da tabela de ND |
| `@ndsemtreino` | valor de perícia "não treinada" da tabela de ND |

### Contagem de poderes por tag (`rolltags`)
{: #rolltags }

Itens têm um campo **Tags de rolagem** (`system.rolltags`). Para cada tag, em *PascalCase*, o ator ganha:

| Variável | Valor |
| --- | --- |
| `@<Tag>` | quantidade de itens do ator com aquela tag |
| `@<Tag>2` / `@<Tag>3` / `@<Tag>4` | `floor((n − 1) / 2)`, `/3`, `/4` — útil para "a cada 2 poderes da Tormenta além deste…" |

Exemplos reais dos compêndios: `@Tormenta` (poderes da Tormenta), `@ChapeuPreto`, `@PresadeCoral`, `@XerifedoSol`, `@VigilanteMascarado`.

```
1 + (@Tormenta2)              # +1 a cada 2 poderes da Tormenta
(4 + (@Tormenta2 * 2))d4      # dados escalando
floor((@nvl.bucaneiro - 3)/4 + 1)
min(@nvl.lutador, @con)
@patamar * 3
```

## Extras disponíveis em fórmulas de **itens**

Quando a fórmula está num item (armas, magias, poderes, consumíveis…) que pertence a um ator:

| Variável | Valor |
| --- | --- |
| `@item.<campo>` | qualquer campo do próprio item: `@item.circulo`, `@item.criticoM`, `@item.criticoX`, `@item.qtd`, `@item.ativacao.custo`, `@item.niveis` (classe), `@item.armadura.value` (equipamento) |
| `@luta`, `@pont`, `@acro`, `@vont`, … | total da perícia (`system.pericias.<chave>.value`) — **só em itens** |
| `@roll.Ataque`, `@roll.Dano` | total de uma rolagem já feita nesta ativação (pelo nome da rolagem) |
| `@skill` | (só na rolagem de ataque) valor da perícia de ataque já ajustado por acuidade/arremesso |
| `@ammo` | (só na rolagem de ataque) bônus da munição consumida |
| `@bonus` | bônus situacional digitado no diálogo de uso |
| `padrao` | (no campo de atributo do dano de armas) resolve para `@for` ou `@des` conforme empunhadura/acuidade |

Exemplos:

```
2d6 + @atributoChave + @danoMagico        # dano de magia
1d8 + @for + @danoCAC                     # dano de arma corpo a corpo
1d20 + @luta + @ataque                    # ataque manual usando Luta
@item.circulo * 2                         # escala com o círculo da magia
```

## Onde `@` funciona — e onde não

| Aceita fórmula com `@` | Só número |
| --- | --- |
| Campos de rolagem de item (`system.rolls[].parts`) | `system.ativacao.custo` (custo em PM) |
| Todos os campos `.bonus` (lista de fórmulas): perícias, defesa, PV/PM, movimento, resistências, carga | `.outros`, `.condi`, `.value` de perícias/atributos |
| Todos os `system.modificadores.*` (exceto `custoPM`) | `system.resistencia.bonus` de itens, `duracao.value`, `range.value` |
| Valores de Efeitos Ativos que apontem para os campos acima | `system.attributes.cd` |
| Valores de Efeitos de Uso ([Aprimoramentos](aprimoramentos)) | `armadura.value` de equipamentos |
| `[[/r …]]` em descrições/biografias/diários da ficha | — |

Um campo numérico que receba `@nivel` vira `0`/`NaN` — use um Efeito Ativo no campo `.bonus` correspondente.

## Funções úteis dentro das fórmulas

As fórmulas são `Roll` do Foundry, então valem as funções matemáticas: `floor()`, `ceil()`, `round()`, `min()`, `max()`, `abs()`, e modificadores de dado (`kh`, `kl`, `r<2`, `x`, `cs>=19` etc.).

```
/r 1d20 + max(@for, @des) + @treino
/r floor(@nivel / 3)d6
/r 2d20kh1 + @pericias.inic.value       # iniciativa com vantagem
```
