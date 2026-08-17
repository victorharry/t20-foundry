---
title: Macros e API
parent: Referências
nav_order: 8
---

# Macros e API (`game.tormenta20`)
{: .no_toc }

1. TOC
{:toc}

## Macros automáticas (arrastar para a barra)

Arraste da ficha para a hotbar e o sistema cria a macro:

| Arrastou… | Macro gerada |
| --- | --- |
| uma perícia | `game.tormenta20.rollSkillMacro("Luta");` |
| um item usável (poder, magia, consumível) | `game.tormenta20.rollItemMacro("Bola de Fogo");` |
| uma arma | `game.tormenta20.rollItemMacro("Espada Longa", { atq: "0", dadoDano: "", dano: "0", margemCritico: "0", multCritico: "0", atributoAtq: "", atributoDano: "", pericia: "" });` |
| um equipamento | `item.update({ "system.equipado": !item.system.equipado })` (alterna equipado) |
| um efeito | `effect.update({ disabled: !effect.disabled })` (alterna ativo) |

## `game.tormenta20.rollItemMacro(nome, extra = {})`

Procura o item **pelo nome** no ator selecionado (token → personagem do usuário) e chama `item.roll()`. Segurar **SHIFT** inverte a abertura do diálogo de configuração de uso (conforme a configuração *UsageConfig*).

`extra` (para armas) permite ajustes pontuais na rolagem: `atq` (bônus de ataque), `dano` (bônus de dano), `dadoDano` (troca o dado, ex.: `"1d12"`), `margemCritico`, `multCritico`, `atributoAtq`, `atributoDano`, `pericia`. Os valores são **somados**; prefixar com `=` (substituir) não é suportado.

```js
// Ataque poderoso: -2 no ataque, +5 no dano
game.tormenta20.rollItemMacro("Machado de Batalha", { atq: "-2", dano: "5" });
```

## `game.tormenta20.rollSkillMacro(rótulo)`

Rola a perícia cujo **rótulo** (nome exibido) seja igual ao texto — `"Percepção"`, `"Luta"`, `"Ofício (Alquimista)"` — para o ator selecionado, com mensagem no chat. Procura só nas perícias padrão da ficha (`system.pericias`); para perícias customizadas use `actor.rollPericia(chave)` abaixo.

Para rolar pela **chave** direto no ator:

```js
const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
await actor.rollPericia("perc", { message: true });
```

## Rolagem manual com roll data

```js
const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
const roll = await new Roll("1d20 + @pericias.inic.value", actor.getRollData()).evaluate();
await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor: "Iniciativa" });
```

Todas as variáveis de [Referências @](rolagens) valem em `actor.getRollData()`; para um item, `item.getRollData()` inclui ainda `@item.*` e as perícias nuas.

## Outros helpers

| Função | Uso |
| --- | --- |
| `game.tormenta20.macros.msgFromJournal(nome, source, sourceName)` | posta no chat o conteúdo de uma página de diário |
| `game.tormenta20.macros.rollChatMessage({ rolls, templateData })` | monta um card de chat do sistema a partir de rolagens prontas |
| `game.tormenta20.dice.d20Roll({ parts, data, event, advantage, disadvantage, critical = 20, fumble = 1, targetValue })` | rolagem d20 no padrão do sistema (marca crítico/falha, vantagem com `kh`/`kl` ou `event.altKey`/`ctrlKey`) |
| `game.tormenta20.dice.damageRoll({ parts, data, event, critical, criticalMultiplier = 2, lancinante, minmax, rd })` | rolagem de dano no padrão do sistema; `parts` são pares `[fórmula, tipoDeDano]` |
| `game.tormenta20.dice.simplifyRollFormula(formula, rollData)` | resolve `@` e simplifica uma fórmula em texto |
| `game.tormenta20.utils.simplifyBonus(bonus, rollData)` · `uuidToObject` · `parseFraction` · `wordToNumber` | utilitários diversos |

## Namespaces disponíveis

```
game.tormenta20.applications  AbilityUseDialog, ActorSheetT20Character, ActorSheetT20CharacterTabbed,
                              ActorSheetT20NPC, ItemSheetT20, TraitSelector, ActorSettings, StatblockParser,
                              RestConfigDialog, ResourceConfig, CompendiumT20, CharacterProgression
game.tormenta20.data          fields, models   (DataModels de Actor/Item)
game.tormenta20.canvas        AbilityTemplate, TemplateLayerT20, TokenT20
game.tormenta20.config        = CONFIG.T20 = T20  (perícias, atributos, tamanhos, condições, tabelas de ND…)
game.tormenta20.dice          d20Roll, damageRoll, simplifyRollFormula, …
game.tormenta20.conditions    condições de Tormenta20
game.tormenta20.entities      ActorT20, ItemT20
game.tormenta20.macros        rollItemMacro, rollSkillMacro, msgFromJournal, rollChatMessage, createT20Macro
game.tormenta20.utils         utilitários
```

Também existem os globais `T20` (config) e `Roll` (= `RollT20`, que adiciona `formulaSimplified` à rolagem).

## Receitas úteis
{: #receitas }

**Aplicar uma condição a todos os tokens selecionados**

```js
for (const t of canvas.tokens.controlled) await t.actor.toggleStatusEffect("caido", { active: true });
```

Ids de condição (`game.tormenta20.conditions`): `abalado` `agarrado` `alquebrado` `apavorado` `atordoado` `caido` `cego` `confuso` `debilitado` `desprevenido` `doente` `emchamas` `enfeiticado` `enjoado` `enredado` `envenenado` `esmorecido` `exausto` `fascinado` `fatigado` `fraco` `frustrado` `imovel` `inconsciente` `indefeso` `invisivel` `lento` `morto` `ofuscado` `paralisado` `pasmo` `petrificado` `sangrando` `sustentando` `surdo` `surpreendido` `vulneravel` `sobrecarregado`. Os mesmos ids valem em `system.tracos.ic.value` (imunidades) e na chave `condicao` dos [Aprimoramentos](aprimoramentos).

**Dar um item de compêndio a todos os PJs**

```js
const magia = await fromUuid("Compendium.tormenta20.magias.Item.<id>");
for (const a of game.actors.filter(a => a.type === "character" && a.hasPlayerOwner))
  await a.createEmbeddedDocuments("Item", [magia.toObject()]);
```

**Consultar a tabela de ND**

```js
game.tormenta20.config.NPCParams("5");   // {attack, damage, defense, hp, topskill, botskill, topsave, midsave, botsave, dc}
```

**Descanso / recursos**: `new game.tormenta20.applications.RestConfigDialog(actor).render(true)`.
