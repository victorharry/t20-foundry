---
title: Aprimoramentos (Efeitos de Uso)
parent: Referências
nav_order: 4
---

# Aprimoramentos — Efeitos de Uso
{: .no_toc }

**Efeitos de Uso** são Efeitos Ativos especiais, exclusivos do T20, que não alteram a ficha: eles alteram **a rolagem e os campos do item na hora de usá-lo** — aprimoramentos de magia, poderes que somam dano num ataque, truques que trocam o dado, etc.
{: .fs-5 .fw-300 }

1. TOC
{:toc}

## Como funciona

1. Crie um efeito na aba **Efeitos** do item (magia, poder, arma, consumível) e marque **Efeito de Uso** na janela do efeito.
2. Ao usar a habilidade, segure **SHIFT** (ou conforme a configuração *UsageConfig* do sistema) para abrir a janela de uso: os aprimoramentos aparecem como opções, com custo em PM e quantidade.
3. O sistema aplica as alterações à rolagem/card **daquele uso**, desconta o custo total de PM e lista no card os aprimoramentos usados.

### Campos da janela do efeito

| Campo | Flag interna | Significado |
| --- | --- | --- |
| **Efeito de Uso** | `flags.tormenta20.onuse` | marca o efeito como aprimoramento (não altera a ficha) |
| **Efeito Interrompido** (`disabled`) | — | desmarcado → **sempre aplicado**; marcado → opcional, aparece na janela de uso |
| **Aplicar em** | `flags.tormenta20.self` `.attack` `.skill` `.ability` `.power` `.spell` `.consumable` `.equipment` | onde o aprimoramento é oferecido: **Próprio Item** (`self`), ataques com arma (`attack`), testes de perícia (`skill`), testes de atributo (`ability`), poderes (`power`), magias (`spell`), consumíveis, equipamentos |
| **Itens Específicos** | `flags.tormenta20.items` | nomes de itens separados por `;` — se preenchido, o aprimoramento só aparece nesses itens |
| **Múltiplas Aplicações** | `flags.tormenta20.aumenta` | pode ser escolhido N vezes; o valor é multiplicado por N |
| **Custo em PM** | `flags.tormenta20.custo` | PM por aplicação. Vazio = sem custo. Em magias, `Truque` (ou texto não numérico) marca como truque e não consome PM |
| **Duração: Cena** | `flags.tormenta20.durationScene` | (efeitos temporários gerados) encerram ao clicar em *Encerrar cena* |

## Atributos-chave dos efeitos de uso

Sem prefixo `system.` — nomes curtos interpretados pelo sistema.

### Rolagens

| Chave | Altera |
| --- | --- |
| `roll` | a rolagem principal do item (dano/cura de magia, poder ou consumível). Numa **arma**, use `ataque` / `dano` |
| `ataque` | a rolagem de ataque |
| `dano` | a(s) rolagem(ns) de dano |
| `dano:<tipo>` | só a parte de dano daquele tipo (`dano:fogo`, `dano:corte`) |
| `dano0` `dano1` `ataque0` `formula0` … | uma rolagem específica pela sua **Referência** (campo `key`, exibido como *tooltip* na lista de rolagens do item) |
| `passos` | sobe/desce o dado de dano em N passos (`1`, `-1`); em magias segue d4→d6→d8→d10→d12 |
| `atributoDano` / `atributoAtq` | troca o atributo do dano / do ataque (`for` `des` … `car`; `""` ou `-` remove) |
| `tipoDano` | troca o tipo de dano (`fogo`, `frio`, `corte`, `curapv`…) |
| `pericia` | troca a perícia do ataque (`luta`, `pont`) |
| `criticoM` / `criticoX` | margem de ameaça / multiplicador de crítico |
| `danoCritico` | dado extra que só é multiplicado no crítico |
| `danoMultiplicavel` | dado extra que **é** multiplicado no crítico |
| `ignoraRD` | ignora N pontos de RD do alvo |
| `custo` com valor `/2` | reduz o custo em PM da habilidade pela metade |

### Campos do item (texto do card)

| Chave | Campo alterado | Valores (modo *Substituir*) |
| --- | --- | --- |
| `alcance` | alcance | `none` `self` (pessoal) `touch` (toque) `short` (curto) `medium` (médio) `long` (longo) `spec` `any` — o rótulo em português também é aceito (`pessoal`, `curto`…) |
| `alvo` | alvo | texto livre |
| `area` | área | texto; com *Adicionar* soma o número no texto (`+1,5m`) |
| `execucao` | execução | `passive` `action` (padrão) `move` (movimento) `full` (completa) `reaction` (reação) `free` (livre) `minute` `hour` `day` `special` — rótulo em português também aceito |
| `duracao` | duração | `inst` `scene` (cena) `turn` `round` `sust` (sustentada) `minute` `hour` `day` `month` `year` `perm` `special`; com número na frente: `1 turno`, `1 dia`, `10 minutos` |
| `resistencia` | texto da resistência | `Reflexos reduz à metade`, `Fortitude anula` |
| `atributoCD` | atributo usado na CD | `for` … `car` |
| `cd` / `CD` | bônus na CD da habilidade | número |
| `efeito` | aplica ao alvo um efeito (temporário/passivo) **presente no mesmo item**, pelo nome | nome do efeito |
| `condicao` | aplica uma [condição](macros#receitas) de Tormenta20 | `paralisado`, `caido`, `emchamas`… |
| `@<Nome do efeito>#<tipo>` | altera a rolagem de **outro** aprimoramento pelo nome do efeito de origem — ex.: `@Golpe Divino#dano` | conforme a chave alvo |

Chaves começando com `?` são ignoradas (útil para "desligar" uma linha sem apagar).

## Modos e valores

| Modo | Uso em efeitos de uso |
| --- | --- |
| **Customizar** | modo "inteligente" para `roll` / `ataque` / `dano`: `d12` troca o dado; `1d8` ou `1d8+1` **acrescenta** dados (× aplicações); `d*1` soma +1 por dado; `kh` / `kl` transformam o d20 em `2d20kh` / `2d20kl`; `max` / `min` maximizam/minimizam a rolagem; `@car` soma uma variável |
| **Adicionar** | soma o valor: número, `1d6`, `@nivel`; `1d` acrescenta 1 dado do mesmo tamanho do dado base; `roll` acrescenta a rolagem do item ao qual o efeito pertence |
| **Substituir** | troca o campo (`execucao` → `reaction`; `duracao` → `1 dia`; `roll` → `*` para não rolar dados) |
| **Atualizar / Retroceder** | substitui se maior / menor |

Valores especiais:

- Qualquer valor pode usar as [variáveis `@`](rolagens) do ator e do item (`@car`, `@nivel`, `@Tormenta2`, `@item.circulo`).
- Valor começando com `:` define uma **lista escalonada por quantidade**: `:1d6;2d6;3d6` → 1ª aplicação `1d6`, 2ª `2d6`, 3ª `3d6` (desliga a multiplicação automática).

## Exemplos (do compêndio)

**Armadura Arcana** — efeito temporário `system.attributes.defesa.bonus` — Adicionar — `5` (duração cena) e três efeitos de uso:

| Nome | Chave | Modo | Valor | Custo | Múltiplo |
| --- | --- | --- | --- | --- | --- |
| aumenta o bônus na Defesa em +1 | `system.attributes.defesa.bonus` | Adicionar | `1` | 2 | ✔ |
| muda para reação | `execucao` / `duracao` | Substituir | `reacao` / `1 turno` | 2 | |
| muda a duração para 1 dia | `duracao` | Substituir | `1 dia` | 2 | |

**Alarme** — três efeitos de uso em *Próprio Item*, custos 2 / 5 / 9, cada um `alcance` — Substituir — `pessoal`.

**Curar Ferimentos** — truque *estabilizar*: `roll` — Substituir — `*`, custo vazio. Aprimoramento *+1d8+1*: `roll` — Customizar — `1d8+1`, múltiplo ✔.

**Golpe Divino** — Aplicar em: *ataques*. `ataque` — Adicionar — `@car`; `dano` — Adicionar — `1d8`.

**Ataque Furtivo** — Aplicar em: *ataques*. `dano` — Adicionar — `roll`.

**Arma Sagrada** — `@Golpe Divino#dano` — Customizar — `d12`.

**Área Escorregadia** — `area` — Adicionar — `1,5m`; `condicao` — Customizar — `paralisado`.

{: .tip }
Para conferir como um aprimoramento oficial foi montado, abra a magia no compêndio **Magias**, aba *Efeitos*, e inspecione as alterações — os aprimoramentos do Livro Básico já vêm configurados.
