---
title: Links de documentos (@UUID, @Compendium…)
parent: Referências
nav_order: 5
---

# Links de documentos em textos
{: .no_toc }

Funcionam em qualquer campo de texto rico do Foundry: descrições de itens/magias/poderes, biografia e diários da ficha, páginas de diário (*Journal*), mensagens de chat e descrições de resultado de tabelas.
{: .fs-5 .fw-300 }

1. TOC
{:toc}

## `@UUID[…]{rótulo}` — o formato recomendado

```
@UUID[Compendium.tormenta20.magias.Item.a1b2c3d4e5f6g7h8]{Bola de Fogo}
@UUID[Actor.k9j8h7g6f5d4s3a2]{Zahir Marrouk}
@UUID[Item.q1w2e3r4t5y6u7i8]
@UUID[JournalEntry.z1x2c3v4b5n6m7l8.JournalEntryPage.p0o9i8u7y6t5r4e3]{Regras de Perseguição}
@UUID[JournalEntry.z1x2c3v4b5n6m7l8.JournalEntryPage.p0o9i8u7y6t5r4e3#cd-de-navegacao]{CD de Navegação}
@UUID[Actor.k9j8h7g6f5d4s3a2.Item.m3n4b5v6c7x8z9l0]{Cimitarra do Capitão}
@UUID[Scene.s1c2e3n4e5i6d7x8]{Píer Dourado}
@UUID[RollTable.t1a2b3l4e5i6d7x8]{Prêmios do balcão}
@UUID[Macro.m1a2c3r4o5i6d7x8]{Rolar Iniciativa}
```

- O `{rótulo}` é opcional; sem ele o Foundry mostra o nome do documento.
- Um sufixo `#slug-do-cabecalho` numa página de diário abre a página já rolada até aquele título.
- **Como obter o UUID:** abra o documento e clique no ícone de livro/ID no cabeçalho da janela (clique com botão direito copia o UUID). Ou arraste o documento da barra lateral/compêndio para dentro do editor de texto — o Foundry insere o `@UUID` sozinho.

### Formas do UUID

| Documento | UUID |
| --- | --- |
| Ator do mundo | `Actor.<id>` |
| Item do mundo | `Item.<id>` |
| Item dentro de um ator | `Actor.<idAtor>.Item.<idItem>` |
| Página de diário | `JournalEntry.<id>.JournalEntryPage.<id>` |
| Documento de compêndio | `Compendium.<pacote>.<nome-do-pack>.<Tipo>.<id>` (ex.: `Compendium.tormenta20.magias.Item.xxxx`) |
| Token não vinculado numa cena | `Scene.<id>.Token.<id>` |
| Ator sintético de token | `Scene.<id>.Token.<id>.Actor.<id>` |

## `@Compendium[…]{rótulo}` — formato legado

```
@Compendium[tormenta20.magias.a1b2c3d4e5f6g7h8]{Bola de Fogo}
```

Ainda funciona, mas o Foundry converte para `@UUID` internamente. Prefira `@UUID[Compendium.tormenta20.magias.Item.<id>]`.

## `@Actor[…]`, `@Item[…]`, `@JournalEntry[…]`, `@Scene[…]`, `@RollTable[…]`, `@Macro[…]`, `@Playlist[…]`

```
@Actor[k9j8h7g6f5d4s3a2]{Zahir}
@Item[Cimitarra]            <- por nome também funciona (só para documentos do mundo)
@JournalEntry[Diário de Bordo]
@RollTable[Prêmios do Píer]
@Macro[Rolar Iniciativa]
```

Aceitam **id** ou **nome** de um documento do mundo (não de compêndio). São formas curtas do `@UUID`.

## `@Embed[…]` — incorporar o conteúdo de outro documento

```
@Embed[JournalEntry.z1x2c3v4b5n6m7l8.JournalEntryPage.p0o9i8u7y6t5r4e3]
@Embed[JournalEntry.z1x2c3v4b5n6m7l8.JournalEntryPage.p0o9i8u7y6t5r4e3 inline]
@Embed[Compendium.tormenta20.ameacas.Actor.xxxx caption=false cite=false]
@Embed[RollTable.t1a2b3l4e5i6d7x8 rollable]
```

Mostra o **conteúdo** (não só um link) da página/documento dentro do texto atual. Opções: `inline` (sem moldura), `caption=false`, `cite=false`, `classes="minha-classe"`, `rollable` (para tabelas: exibe botão de rolar). Ótimo para reaproveitar um bloco de regras em várias páginas.

## Dicas para o mestre

- Arrastar qualquer coisa (item, ator, magia de compêndio, página de diário) para o editor gera o link correto — é mais rápido do que digitar.
- Links para documentos que o jogador não tem permissão de ver aparecem "quebrados" para ele; use isso para manter segredos em páginas separadas.
- Em **descrições de itens/magias/poderes**, o texto passa pelo *enrichHTML* com o *roll data* do ator, então `[[/r 1d8+@atributoChave]]` já vem com o atributo do personagem que possui o item (veja [Chat e rolagens inline](chat)).
