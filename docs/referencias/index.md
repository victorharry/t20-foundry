---
title: Referências
nav_order: 3
has_children: true
---

# Referências

Tudo o que você pode digitar no Foundry para "puxar" dados da ficha, linkar documentos e automatizar rolagens no sistema T20, organizado por categoria:

| Categoria | Sintaxe típica | Página |
| --- | --- | --- |
| Variáveis de rolagem | `@for`, `@nivel`, `@atributoChave`, `@pericias.luta.value` | [Rolagens](rolagens) |
| Chaves da ficha | `system.atributos.for.value`, `system.pericias.acro.outros` | [Ficha](ficha) |
| Chaves de itens | `@item.circulo`, `system.rolls[].key`, `criticoM` | [Itens](itens) |
| Efeitos Ativos | `system.modificadores.dano.geral` + modo *Adicionar* | [Efeitos](efeitos) |
| Efeitos de Uso / Aprimoramentos | `dano`, `roll`, `ataque`, `execucao`, `@Nome#chave` | [Aprimoramentos](aprimoramentos) |
| Links de documento | `@UUID[…]{…}`, `@Compendium[…]`, `@Actor[…]`, `@Embed[…]` | [Links](links) |
| Chat e rolagens inline | `[[/r 1d20+@for]]`, `/gmroll`, `/w` | [Chat](chat) |
| Compêndios | `Compendium.tormenta20.magias.Item.<id>` | [Compêndios](compendios) |
| Macros e API | `game.tormenta20.rollItemMacro(...)` | [Macros](macros) |
