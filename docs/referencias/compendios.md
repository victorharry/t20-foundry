---
title: Compêndios
parent: Referências
nav_order: 7
---

# Compêndios do sistema
{: .no_toc }

1. TOC
{:toc}

## Lista de packs

O prefixo de todos os UUIDs é `Compendium.tormenta20.<pack>` (o id do sistema é `tormenta20`).

| Pasta | Pack (`name`) | Rótulo | Tipo | UUID de exemplo |
| --- | --- | --- | --- | --- |
| Actors | `ameacas` | Ameaças | Actor | `Compendium.tormenta20.ameacas.Actor.<id>` |
| Actors | `convocacoes` | Convocações | Actor | `Compendium.tormenta20.convocacoes.Actor.<id>` |
| Items | `racas` | Raças | Item | `Compendium.tormenta20.racas.Item.<id>` |
| Items | `classes` | Classes | Item | `Compendium.tormenta20.classes.Item.<id>` |
| Items | `poderes` | Poderes | Item | `Compendium.tormenta20.poderes.Item.<id>` |
| Items | `poderes-distincao` | Poderes de Distinção | Item | `Compendium.tormenta20.poderes-distincao.Item.<id>` |
| Items | `equipamentos` | Equipamentos | Item | `Compendium.tormenta20.equipamentos.Item.<id>` |
| Items | `equipamentos-magicos` | Itens Mágicos | Item | `Compendium.tormenta20.equipamentos-magicos.Item.<id>` |
| Items | `magias` | Magias | Item | `Compendium.tormenta20.magias.Item.<id>` |
| Items | `habilidades-de-criaturas` | Habilidades de Criaturas | Item | `Compendium.tormenta20.habilidades-de-criaturas.Item.<id>` |
| Items | `pocoes` | Poções | Item | `Compendium.tormenta20.pocoes.Item.<id>` |
| Items | `parceiros` | Parceiros | Item | `Compendium.tormenta20.parceiros.Item.<id>` |
| Journals | `basico` | Livro Básico | JournalEntry | `Compendium.tormenta20.basico.<idDiário>.JournalEntryPage.<idPágina>` |
| RollTables | `tabelas-de-tesouro` | Tabelas de Tesouro | RollTable | `Compendium.tormenta20.tabelas-de-tesouro.RollTable.<id>` |
| Macros | `macros` | Macros | Macro | `Compendium.tormenta20.macros.Macro.<id>` |

Os packs `ameacas`, `convocacoes` e `habilidades-de-criaturas` têm permissão **LIMITED** para jogadores (veem que existe, não abrem) e **OWNER** para assistentes.

## Como usar

- **Linkar em texto:** `@UUID[Compendium.tormenta20.magias.Item.<id>]{Nome}` — veja [Links de documentos](links). Exemplo real do próprio sistema:

  ```
  @UUID[Compendium.tormenta20.basico.s15J5SOYixL3Ajzr.JournalEntryPage.my1HxIcUGVr2Mbii]{Desprevenido}
  ```

- **Em macros / scripts:**

  ```js
  const pack = game.packs.get("tormenta20.magias");
  const index = await pack.getIndex();                       // lista leve {_id, name, type, img}
  const doc = await pack.getDocument(index.find(e => e.name === "Bola de Fogo")._id);
  // ou direto pelo UUID:
  const magia = await fromUuid("Compendium.tormenta20.magias.Item.<id>");
  await actor.createEmbeddedDocuments("Item", [magia.toObject()]);
  ```

- **Diretório de compêndios do T20:** o sistema substitui a aba de compêndios por uma versão própria (`CompendiumDirectoryT20`) com busca e filtros por tipo — use-a para localizar magias por círculo/escola, poderes por tipo etc.

## Fonte dos packs no repositório

Os compêndios ficam em `packs/_source/<pack>/**/*.yml` (um documento por arquivo) e são compilados para LevelDB em `dist/packs/` por `npm run build:packs` (usa `@foundryvtt/foundryvtt-cli`). Para editar em massa: altere o YAML, recompile, recarregue o mundo. Para trazer edições feitas no jogo de volta ao YAML: `npm run build:unpack`.

{: .warning }
O `_id` de cada documento é fixo no YAML — não altere, ou todos os `@UUID` que apontam para ele quebram. Ao criar um documento novo, gere um id de 16 caracteres alfanuméricos (ex.: `foundry.utils.randomID()` no console do Foundry).
