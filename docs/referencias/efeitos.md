---
title: Efeitos Ativos
parent: Referências
nav_order: 3
---

# Efeitos Ativos
{: .no_toc }

Efeitos alteram características do ator enquanto estão ativos: condições, bônus de itens equipados, poderes passivos, magias de buff. Esta página cobre efeitos **passivos e temporários**; os **Efeitos de Uso** (aprimoramentos aplicados na hora de usar uma habilidade) estão em [Aprimoramentos](aprimoramentos).
{: .fs-5 .fw-300 }

1. TOC
{:toc}

## Onde criar

- **Aba Efeitos da ficha** → novo efeito no ator.
- **Aba Efeitos de um item** (arma, equipamento, poder, magia) → o efeito é *transferido* ao ator enquanto o item estiver na ficha (e, para itens físicos, **equipado**).
- **Assistente de Efeitos** (botão de varinha na aba de efeitos): monta a chave certa por menus — atributos, perícias, defesa, PV/PM, movimento, resistências, modificadores.

{: .warning }
Efeitos de itens que já estão numa ficha são editados **no item da ficha**; para propagar a todas as cópias, edite o item no diretório/compêndio e reimporte. Efeitos só afetam tokens **vinculados** à ficha (ou o ator do próprio token não vinculado).

## Anatomia de uma alteração

Cada linha de efeito tem **Atributo-chave**, **Modo** e **Valor**.

| Modo | Efeito sobre o valor atual |
| --- | --- |
| Customizar | tratamento especial do sistema (usado em fórmulas/listas — concatena) |
| Multiplicar | multiplica |
| Adicionar | soma (em listas de fórmulas: acrescenta a fórmula) |
| Retroceder | substitui se o novo for **menor** |
| Atualizar | substitui se o novo for **maior** |
| Substituir | substitui |

O **Valor** pode ser um número, texto (para chaves de texto/booleanas) ou uma **fórmula com `@`** quando a chave é uma lista de fórmulas (`.bonus`, `modificadores.*`). Veja [Referências @](rolagens).

## Chaves mais usadas

### Atributos e perícias

| Atributo-chave | Efeito | Modo / Valor típico |
| --- | --- | --- |
| `system.atributos.for.bonus` | +X em Força (idem `des` `con` `int` `sab` `car`) | Adicionar `2` |
| `system.atributos.*.bonus` | +X em **todos** os atributos | Adicionar `1` |
| `system.pericias.luta.bonus` | +X em Luta (qualquer chave de [perícia](ficha#pericias)) | Adicionar `2` ou `@nivel` |
| `system.pericias.*.bonus` | +X em todas as perícias | Adicionar `1` |
| `system.pericias.furt.condi` | penalidade de condição | Adicionar `-5` |
| `system.pericias.acro.atributo` | troca o atributo da perícia | Substituir `int` |
| `system.pericias.pilo.treinado` | torna treinada | Substituir `true` |

### Defesa, PV, PM, CD

| Atributo-chave | Efeito |
| --- | --- |
| `system.attributes.defesa.bonus` | +X na Defesa (Adicionar `2`, `@meionivel`…) |
| `system.attributes.defesa.atributo` | atributo da Defesa (Substituir `sab`) |
| `system.attributes.pv.bonus.total` | +X PV máximo |
| `system.attributes.pv.bonus.nivel` | +X PV **por nível** (`nivelPar` / `nivelImpar` para só pares/ímpares) |
| `system.attributes.pm.bonus.total` · `.nivel` · `.nivelPar` · `.nivelImpar` | idem para PM |
| `system.attributes.cd` | CD de habilidades (Adicionar `1`) |
| `system.attributes.pv.temp` | PV temporários (Atualizar `10`) |

### Movimento, tamanho, sentidos

| Atributo-chave | Efeito |
| --- | --- |
| `system.attributes.movement.walk.bonus` | +X m no deslocamento (Adicionar `3`) |
| `system.attributes.movement.fly.base` | concede voo (Atualizar `12`) |
| `system.attributes.movement.*.bonus` | todos os deslocamentos |
| `system.tracos.tamanho` | tamanho (Substituir `gra`) |
| `system.attributes.sentidos.value` | sentidos (Adicionar `escuro`) |

### Resistências e imunidades

| Atributo-chave | Efeito |
| --- | --- |
| `system.tracos.resistencias.dano.bonus` | RD geral +X |
| `system.tracos.resistencias.fogo.bonus` | RD fogo +X (tipos: `acido corte eletricidade essencia fogo frio impacto luz psiquico perfuracao trevas perda`) |
| `system.tracos.resistencias.fogo.imunidade` | imune a fogo (Substituir `true`) |
| `system.tracos.resistencias.frio.vulnerabilidade` | vulnerável a frio |
| `system.tracos.ic.value` | imune à condição (Adicionar `atordoado`) |

### Modificadores de rolagem

| Atributo-chave | Rótulo no assistente |
| --- | --- |
| `system.modificadores.atributos.geral` · `.fisicos` · `.mentais` · `.<for…car>` | testes de atributo |
| `system.modificadores.pericias.geral` · `.ataque` · `.semataque` · `.resistencia` · `.atr.<for…car>` | testes de perícia |
| `system.modificadores.ataque.geral` · `.cac` · `.ad` | rolagens de ataque |
| `system.modificadores.dano.geral` · `.cac` · `.ad` · `.mag` · `.alq` | rolagens de dano |
| `system.modificadores.cura.geral` · `.mag` | cura |
| `system.modificadores.custoPM` | +X no custo em PM |

Todos com modo **Adicionar** e valor numérico ou fórmula (`1d6`, `@nivel`).

### Flags

| Atributo-chave | Efeito |
| --- | --- |
| `flags.tormenta20.inventarioOrganizado` · `.createPotion` · `.createScroll` · `.mago` | booleanos de personagem |
| `flags.tormenta20.teste` | número (aceita `@…`) |

## Duração e supressão

- **Duração**: rodadas/turnos são descontados no rastreador de combate; **Cena** encerra ao clicar em *Encerrar cena* na aba de combate.
- **Origem**: UUID do item/ator que gerou o efeito.
- Um efeito é **suprimido** automaticamente quando: o item de origem está desequipado; existe uma cópia mais nova do mesmo status; existe uma versão "melhorada" ativa (`flags.tormenta20.stack`); ou o ator é imune (`system.tracos.ic.value`) — a menos que o efeito tenha `flags.tormenta20.ignoreImunity`.

## Curingas aceitos

Somente estes padrões com `*` são expandidos:

```
system.atributos.*.value        system.pericias.*.bonus
system.atributos.*.bonus        system.pericias.*.condi
system.attributes.movement.*.value / .base / .bonus
```

## Exemplos

**Armadura Arcana (efeito temporário do item de magia):** `system.attributes.defesa.bonus` — Adicionar — `5`; duração *Cena*. Os aprimoramentos da magia são efeitos de uso separados (`+1` na Defesa, `execucao → reacao`, `duracao → 1 dia`) — veja [Aprimoramentos](aprimoramentos).

**Casca Grossa (poder passivo):** `system.attributes.defesa.bonus` — Adicionar — `min(@nvl.lutador, @con)`.

**Coração Heroico:** `system.attributes.pv.bonus.total` — Adicionar — `@patamar * 3`.

**Robe do Arquimago:** `system.attributes.cd` — Adicionar — `1`; `system.attributes.pm.bonus.total` — Adicionar — `5 + @circulo`.

**Condição *Caído* (embutida no sistema):** `system.pericias.luta.condi` — Retroceder — `-5`; `system.attributes.defesa.outros` — Retroceder — `-5`; `system.attributes.movement.*.base` — Retroceder — `1.5` (o modo *Retroceder* evita que duas fontes da mesma condição acumulem a penalidade).
