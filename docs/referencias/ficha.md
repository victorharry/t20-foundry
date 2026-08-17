---
title: Chaves da ficha (system.*)
parent: Referências
nav_order: 2
---

# Chaves da ficha (`system.*`)
{: .no_toc }

Caminhos de dados dos atores. Use-os como **Atributo-chave** em [Efeitos Ativos](efeitos) (com prefixo `system.`) ou como variável de rolagem (`@caminho`, sem o prefixo). Fonte-verdade: `module/dataModel/actor/templates/creature.mjs` e `module/config/T20.js`.
{: .fs-5 .fw-300 }

1. TOC
{:toc}

## Tipos de ator

| Tipo (`type`) | Nome | Ficha |
| --- | --- | --- |
| `character` | Personagem de Jogador | padrão ou em abas |
| `npc` | Ameaça | ficha de NPC (usa ND) |
| `simple` | Personagem Simples | sem nível/treino/CD |
| `bases` | Base | construções (cômodos, mobílias) |
| `hazard` | Perigo Complexo | ND + ações/efeitos/objetivo |

`character`, `npc` e `simple` compartilham o schema de criatura abaixo. Campos marcados *(PJ)* só existem em `character`; *(NPC)* só em `npc`.

## Atributos — `system.atributos.<chave>`
{: #atributos }

Chaves: `for` `des` `con` `int` `sab` `car`.

| Campo | Tipo | Significado |
| --- | --- | --- |
| `.value` | número | modificador final = `base + racial + bonus` (mín. −5) |
| `.base` | número | valor comprado |
| `.racial` | número | ajuste racial |
| `.bonus` | número | outros bônus — **alvo típico de efeitos** (`system.atributos.for.bonus`) |

Curinga: `system.atributos.*.value` e `system.atributos.*.bonus` aplicam a todos os seis.

## Recursos e nível — `system.attributes.*`

| Caminho | Significado |
| --- | --- |
| `attributes.pv.value` / `.temp` / `.max` / `.min` | pontos de vida |
| `attributes.pm.value` / `.temp` / `.max` / `.min` | pontos de mana |
| `attributes.pv.bonus.total[]` · `.nivel[]` · `.nivelPar[]` · `.nivelImpar[]` *(PJ)* | listas de fórmulas somadas ao PV máximo: total, por nível, por nível par, por nível ímpar (idem para `pm`) |
| `attributes.pv.atributos.<x>` / `attributes.pm.atributos.<x>` *(PJ)* | booleanos: quais atributos somam ao recurso |
| `attributes.nivel.value` | nível (0–20) |
| `attributes.nivel.xp.value` / `.proximo` / `.pct` | experiência |
| `attributes.treino` | bônus de treinamento (derivado do nível) |
| `attributes.cd` | CD de habilidades (10 + meio nível + atributo-chave) |
| `attributes.conjuracao` | atributo-chave de conjuração (`for`…`car`) |
| `attributes.nd` *(NPC)* | ND (string, ex.: `"1/2"`, `"5"`) |
| `attributes.sentidos.value` | conjunto: `penumbra`, `escuro`, `cegas`, `faro` |
| `attributes.sentidos.custom` | texto livre |

## Defesa — `system.attributes.defesa`

| Campo | Significado |
| --- | --- |
| `.value` | Defesa final |
| `.base` | 10 |
| `.atributo` | atributo somado (padrão `des`) |
| `.outros` | número fixo |
| `.condi` | bônus/penalidade de condição |
| `.bonus[]` | **lista de fórmulas** — alvo típico de efeitos (`system.attributes.defesa.bonus`, modo *Adicionar*, valor `2` ou `@nivel`) |
| `.pda` | penalidade de armadura (≤ 0) |

## Movimento — `system.attributes.movement`

Tipos: `walk` `climb` `burrow` `swim` `fly`. Para cada tipo:

| Campo | Significado |
| --- | --- |
| `.base` | deslocamento base em metros (walk padrão 9) |
| `.bonus[]` | lista de fórmulas |
| `.value` | derivado |

Também: `.hover` (booleano), `.unit` (`"m"`), `.tags` (`ignora-armadura`, `ignora-carga`).

{: .tip }
Num efeito, uma chave que termine em `walk`/`fly`/`swim`/`climb`/`burrow` (ex.: `system.attributes.movement.walk`) é completada automaticamente: `.bonus` se o modo for *Adicionar*, `.base` nos demais modos.

## Perícias — `system.pericias.<chave>`
{: #pericias }

| Chave | Perícia | Atr. | Só treinada | Pen. armadura |
| --- | --- | --- | --- | --- |
| `acro` | Acrobacia | Des | | ✔ |
| `ades` | Adestramento | Car | ✔ | |
| `atle` | Atletismo | For | | |
| `atua` | Atuação | Car | ✔ | |
| `cava` | Cavalgar | Des | | |
| `conh` | Conhecimento | Int | ✔ | |
| `cura` | Cura | Sab | | |
| `dipl` | Diplomacia | Car | | |
| `enga` | Enganação | Car | | |
| `fort` | Fortitude | Con | | |
| `furt` | Furtividade | Des | | ✔ (+ mod. tamanho) |
| `guer` | Guerra | Int | ✔ | |
| `inic` | Iniciativa | Des | | |
| `inti` | Intimidação | Car | | |
| `intu` | Intuição | Sab | | |
| `inve` | Investigação | Int | | |
| `joga` | Jogatina | Car | ✔ | |
| `ladi` | Ladinagem | Des | ✔ | ✔ |
| `luta` | Luta | For | | |
| `mist` | Misticismo | Int | ✔ | |
| `nobr` | Nobreza | Int | ✔ | |
| `perc` | Percepção | Sab | | |
| `pilo` | Pilotagem | Des | ✔ | |
| `pont` | Pontaria | Des | | |
| `refl` | Reflexos | Des | | |
| `reli` | Religião | Sab | ✔ | |
| `sobr` | Sobrevivência | Sab | | |
| `vont` | Vontade | Sab | | |
| `alfa` | Ofício (Alfaiate) | Int | ✔ | |
| `alqu` | Ofício (Alquimista) | Int | ✔ | |
| `arme` | Ofício (Armeiro) | Int | ✔ | |
| `arte` | Ofício (Artesão) | Int | ✔ | |
| `cozi` | Ofício (Cozinheiro) | Int | ✔ | |
| `enge` | Ofício (Engenhoqueiro) | Int | ✔ | ✔ |

Perícias criadas pela ficha recebem chaves `ofi1`…`ofi9` (ofícios) ou `_pc1`…`_pc9` (outras).

Campos de cada perícia:

| Campo | Tipo | Significado |
| --- | --- | --- |
| `.value` | número | **total** calculado |
| `.atributo` | `for`…`car` | atributo-base (pode ser trocado por efeito) |
| `.treinado` | booleano | soma `@treino` |
| `.outros` | número | bônus fixo digitado na ficha |
| `.condi` | número | bônus/penalidade de condição |
| `.bonus[]` | **lista de fórmulas** | alvo típico de efeitos (`system.pericias.luta.bonus`) |
| `.st` / `.pda` / `.size` | booleanos | só treinada / sofre penalidade de armadura / usa mod. de tamanho |
| `.label` / `.custom` | | nome exibido / perícia customizada |

Curingas: `system.pericias.*.bonus` e `system.pericias.*.condi` aplicam a todas.

Fórmula do total: `@meionivel + @<atributo> [+ @treino] [+ bonus…] [+ @pda] [+ @tamanho] + outros + condi + @pericia + (@resistencia | @ataque | @semataque) + modificadores.pericias.atr.<atributo>`.

## Modificadores — `system.modificadores.*`
{: #modificadores }

Não aparecem na ficha; são consultados na hora de rolar e somados como bônus. Todos são **listas de fórmulas** (aceitam `@nivel`, `1d4` etc.), exceto `custoPM` (número).

| Caminho | Afeta |
| --- | --- |
| `modificadores.atributos.geral` | todos os testes de atributo |
| `modificadores.atributos.fisicos` / `.mentais` | testes de For/Des/Con · Int/Sab/Car |
| `modificadores.atributos.<for…car>` | testes daquele atributo |
| `modificadores.pericias.geral` | todas as perícias |
| `modificadores.pericias.semataque` | todas exceto Luta e Pontaria |
| `modificadores.pericias.ataque` | só Luta e Pontaria |
| `modificadores.pericias.resistencia` | só Fortitude, Reflexos e Vontade |
| `modificadores.pericias.atr.<for…car>` | perícias baseadas naquele atributo |
| `modificadores.ataque.geral` / `.cac` / `.ad` | rolagens de ataque: todas / corpo a corpo / à distância |
| `modificadores.dano.geral` / `.cac` / `.ad` / `.mag` / `.alq` | dano: todo / corpo a corpo / à distância / mágico / alquímico |
| `modificadores.cura.geral` / `.mag` | cura: toda / mágica |
| `modificadores.custoPM` | acréscimo ao custo em PM de habilidades (número) |

## Traços — `system.tracos.*`

| Caminho | Significado |
| --- | --- |
| `tracos.tamanho` | `min` `peq` `med` `gra` `eno` `col` |
| `tracos.ic.value` | conjunto de condições às quais o ator é **imune** (ids de condição, ex.: `caido`, `atordoado`) |
| `tracos.ic.custom` | texto |
| `tracos.idiomas.value[]` *(PJ)* · `tracos.profArmas.value[]` *(PJ)* · `tracos.profArmaduras.value[]` *(PJ)* | idiomas e proficiências |
| `tracos.resistencias.<tipo>.value` / `.base` / `.bonus[]` | redução de dano por tipo |
| `tracos.resistencias.<tipo>.imunidade` / `.vulnerabilidade` | booleanos |
| `tracos.resistencias.<tipo>.danoPorDado` | RD por dado (ex.: enxames) |

Tipos de dano (`<tipo>`): `dano` (RD geral) `perda` `acido` `corte` `eletricidade` `essencia` `fogo` `frio` `impacto` `luz` `psiquico` `perfuracao` `trevas`.

## Outros

| Caminho | Significado |
| --- | --- |
| `system.dinheiro.tc` / `.tp` / `.to` / `.tl` | tibares de cobre / prata / ouro / platina |
| `system.resources.<chave>.value` / `.max` / `.label` | recursos genéricos: `primary` `secondary` `tertiary` `deathsave` (máx 3) `shadow` (máx 5) `catarse` (máx 3); chaves novas são permitidas |
| `system.attributes.carga.value` / `.max` / `.limit` / `.encumbered` / `.bonus[]` | carga |
| `system.equipamentos.limiteEmpunhado` / `.limiteVestido` *(PJ)* | slots (2 / 4) |
| `system.detalhes.origem` · `.divindade` · `.raca` · `.tipo` (`ani con esp hum mon mor`) · `.biography.value` · `.diario`… | detalhes |
| `system.detalhes.equipamento` · `.resistencias` (texto) · `.movimento` · `.ataquescac` · `.ataquesad` · `.tesouro` · `.role` *(NPC)* | bloco de estatísticas textual da ameaça |
| `flags.tormenta20.<flag>` | flags de personagem: `inventarioOrganizado`, `createPotion`, `createScroll`, `mago` (booleanos), `teste` (número) |

## Bases e Perigos

- **`bases`**: `system.tipo`, `system.porte`, `system.seguranca.{base,bonus,total}`, `system.residentes`, `system.rooms`, `system.attributes.movement`.
- **`hazard`**: `system.attributes.nd`, `system.detalhes.actions`, `system.detalhes.effects`, `system.detalhes.goal`.
