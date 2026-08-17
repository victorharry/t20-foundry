# T20 — Tormenta20 para Foundry VTT

[![Release](https://img.shields.io/github/v/release/victorharry/t20-foundry?label=release&sort=semver)](https://github.com/victorharry/t20-foundry/releases/latest)
[![Foundry](https://img.shields.io/badge/Foundry%20VTT-v13%20%E2%80%93%20v14-orange)](https://foundryvtt.com)
[![Docs](https://img.shields.io/badge/wiki-victorharry.github.io%2Ft20--foundry-blue)](https://victorharry.github.io/t20-foundry/)
[![License: BSD-3-Clause](https://img.shields.io/badge/license-BSD--3--Clause-green)](LICENSE)

Sistema **não oficial** de [Tormenta20](https://jamboeditora.com.br/categoria/rpg/tormenta20/) para o [Foundry Virtual Tabletop](https://foundryvtt.com), mantido como fork do sistema original criado por [Vizael](https://gitlab.com/vizael/Tormenta20) e pela comunidade.

> 📖 **Documentação de uso** — referências `@` (atributos, perícias, `@UUID`, `@Compendium`), chaves de Efeitos Ativos, macros e API:
> **<https://victorharry.github.io/t20-foundry/>**

---

## Instalação

1. No Foundry VTT, vá em **Game Systems → Install System**.
2. Cole a URL do manifesto no campo *Manifest URL* e clique em **Install**:

   ```
   https://github.com/victorharry/t20-foundry/releases/latest/download/system.json
   ```

3. Crie um mundo escolhendo o sistema **T20**.

> O identificador interno do sistema continua sendo `tormenta20` (pasta `Data/systems/tormenta20`). Isso mantém compatibilidade com mundos, compêndios e módulos feitos para o sistema original (ex.: `Compendium.tormenta20.magias`). Ele **não** pode ser instalado lado a lado com o sistema original — é um substituto.

**Compatibilidade:** Foundry VTT v13 (mínimo) até v14 (verificado).

**Módulo recomendado:** [vision-t20](https://github.com/mclemente/vision-t20) (modos de visão de Tormenta20).

## O que o sistema oferece

- **Fichas** — Personagem em três layouts: **Livro** (padrão do T20: barra lateral com PV/PM/Defesa/atributos/resistências, cabeçalho com nível/XP e abas com ícones — organização inspirada na ficha do PF2e), Padrão (página única) e Abas; Ameaça/NPC, Personagem Simples, Base (construções) e Perigo Complexo. Troque o layout pelo botão *Configurar Ficha* (ícone de engrenagem) da janela.
- **Itens** — Armas, Equipamentos, Consumíveis, Tesouros, Magias, Poderes, Classes, Raças, Cômodos e Mobílias.
- **Compêndios** — Raças, Classes, Poderes, Poderes de Distinção, Equipamentos, Itens Mágicos, Magias, Habilidades de Criaturas, Poções, Parceiros, Ameaças, Convocações, Livro Básico (regras em diários), Tabelas de Tesouro e Macros.
- **Automação** — rolagens de perícias/ataques/dano com modificadores do sistema, uso de habilidades com custo de PM, aprimoramentos de magia (Efeitos de Uso), efeitos temporários com duração por turno/cena, condições de Tormenta20, templates de área, régua de token, calculadora de habilidades, importador de blocos de estatísticas (statblock) e progressão de personagem.
- **Referências dinâmicas** — use `@for`, `@nivel`, `@atributoChave`, `@pericias.luta.value` etc. em qualquer fórmula, e `@UUID[...]` / `@Compendium[...]` em textos. Veja a [wiki](https://victorharry.github.io/t20-foundry/).

## Referência rápida

| Onde | Exemplo | Para quê |
| --- | --- | --- |
| Chat / macro | `/r 1d20 + @for + @treino` | rolagem com dados do ator selecionado |
| Fórmula de dano/rolagem de item | `2d6 + @atributoChave + @danoMagico` | usa o atributo de conjuração e o bônus de dano mágico |
| Efeito Ativo (Atributo-chave) | `system.pericias.luta.outros` | +X em Luta |
| Efeito Ativo (modificador) | `system.modificadores.dano.cac` | +X em dano corpo a corpo |
| Texto de diário/descrição | `@UUID[Compendium.tormenta20.magias.Item.XXXX]{Bola de Fogo}` | link para documento |
| Texto de diário/descrição | `[[/r 1d8+2]]` · `[[/r @nivel]]` | rolagem inline |

A lista completa (todas as perícias, atributos, modificadores, chaves de item, API `game.tormenta20`) está em **<https://victorharry.github.io/t20-foundry/>**.

## Desenvolvimento

Requisitos: Node.js 20+.

```bash
npm install          # instala dependências e roda build:ci (packs + bundle) via postinstall
npm run build        # bundle JS/CSS → dist/
npm run build:watch  # bundle em modo watch
npm run build:packs  # compila packs/_source/**/*.yml → dist/packs (LevelDB)
npm run build:unpack # extrai os packs compilados de volta para YAML em packs/_source
npm run lint         # eslint
```

A pasta `dist/` é o sistema pronto para uso. Para testar localmente, aponte um link simbólico de `Data/systems/tormenta20` para `dist/` (ou copie o conteúdo).

Estrutura:

```
tormenta20.mjs        ponto de entrada (registra DataModels, fichas, hooks, settings)
module/
  dataModel/          fonte-verdade do schema (Actor: character, npc, simple, bases, hazard; Item: arma, magia, poder…)
  documents/          ActorT20, ItemT20, ActiveEffect, ChatMessage, Roll
  sheets/             fichas (ApplicationV2)
  apps/               diálogos: uso de habilidade, calculadora, statblock parser, progressão…
  config/T20.js       constantes: perícias, atributos, tamanhos, condições, patamares
  dice/               rolagens de perícia/ataque/dano
  macros.mjs          rollItemMacro / rollSkillMacro
packs/_source/        compêndios em YAML (fonte); packs/ compilados ficam fora do git
templates/            Handlebars
lang/                 pt-BR.json (padrão) e en.json
less/                 estilos
docs/                 wiki publicada em GitHub Pages
```

### Publicando uma release

Crie e envie uma tag semântica; o workflow [`release.yml`](.github/workflows/release.yml) compila os packs, gera `system.zip` + `system.json` com a versão da tag e cria a release:

```bash
git tag v1.0.1
git push origin v1.0.1
```

## Créditos

- **Sistema original:** [Vizael (Victor Hugo Paiva)](https://gitlab.com/vizael/Tormenta20), [mclemente](https://github.com/mclemente) e demais contribuidores da comunidade.
- **Tormenta20** é © [Jambo Editora](https://jamboeditora.com.br). Este é um projeto de fãs, sem afiliação com a editora.
- Ícones SVG de [Game-icons.net](https://game-icons.net) (CC BY 3.0) — atribuições em [`icons/LICENSE`](icons/LICENSE).

## Licença

Código sob [BSD 3-Clause](LICENSE) (mesma licença do sistema original, com os avisos de copyright preservados). Conteúdo derivado de Open Game Content sob a [OGL v1.0a](OGL.txt). Tormenta20 e nomes relacionados são marcas da Jambo Editora.
