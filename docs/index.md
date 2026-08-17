---
title: Início
layout: home
nav_order: 1
---

# T20 — Wiki de uso
{: .fs-9 }

Referências `@`, chaves de Efeitos Ativos, comandos de chat, macros e API do sistema **T20** (Tormenta20 não oficial) para Foundry VTT.
{: .fs-6 .fw-300 }

[Instalar o sistema](instalacao){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Referências @ (rolagens)](referencias/rolagens){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Repositório](https://github.com/victorharry/t20-foundry){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Por onde começar

| Quero… | Página |
| --- | --- |
| Instalar / atualizar o sistema | [Instalação](instalacao) |
| Somar Força, nível, treino etc. numa rolagem (`@for`, `@nivel`, `@treino`) | [Referências @ em rolagens](referencias/rolagens) |
| Saber todas as chaves de perícia, atributo e recurso da ficha | [Chaves da ficha (`system.*`)](referencias/ficha) |
| Saber os campos de armas, magias, poderes… (`@item.circulo`, `rolls[]`) | [Chaves de itens](referencias/itens) |
| Configurar Efeitos Ativos (bônus em perícia, dano, defesa…) | [Efeitos Ativos](referencias/efeitos) |
| Configurar aprimoramentos de magia / poderes (Efeitos de Uso) | [Aprimoramentos](referencias/aprimoramentos) |
| Linkar magias, itens, atores e diários em textos (`@UUID`, `@Compendium`) | [Links de documentos](referencias/links) |
| Rolagens inline em textos e comandos de chat (`[[/r …]]`, `/gmroll`) | [Chat e rolagens inline](referencias/chat) |
| Criar macros (`game.tormenta20.rollItemMacro`, `rollSkillMacro`) | [Macros e API](referencias/macros) |
| Referenciar compêndios (`Compendium.tormenta20.magias`) | [Compêndios](referencias/compendios) |

## Convenções desta wiki

- **`@chave`** — variável de *roll data*: pode ser usada em qualquer fórmula de dado (chat, campo de dano de item, valor de efeito em modo *Customizar*, `[[/r …]]` em textos).
- **`system.caminho`** — caminho de dado da ficha, usado como **Atributo-chave** de um Efeito Ativo. Nas versões antigas do Foundry o prefixo era `data.`; hoje é `system.`.
- **`Compendium.tormenta20.<pack>.<Tipo>.<id>`** — UUID de um documento de compêndio. O id interno do sistema é `tormenta20`, mesmo o título sendo *T20*.

{: .note }
Esta wiki documenta o comportamento do código em `module/` (fonte-verdade: `module/documents/actor.mjs`, `module/documents/item.mjs`, `module/dataModel/`, `module/config/T20.js`). Se algo divergir do que você vê no jogo, [abra uma issue](https://github.com/victorharry/t20-foundry/issues).
