---
title: Chat e rolagens inline
parent: Referências
nav_order: 6
---

# Chat e rolagens inline
{: .no_toc }

1. TOC
{:toc}

## Comandos de rolagem no chat

| Comando | Efeito |
| --- | --- |
| `/r 1d20+5` ou `/roll 1d20+5` | rolagem pública |
| `/gmroll …` ou `/gmr …` | rolagem visível só para o mestre (e quem rolou) |
| `/blindroll …` ou `/br …` | rolagem que só o mestre vê |
| `/selfroll …` ou `/sr …` | rolagem que só você vê |
| `/publicroll …` ou `/pr …` | força rolagem pública |
| `/r 1d20+@for # Teste de Força` | tudo após `#` vira o texto (*flavor*) da mensagem |

Todas aceitam [variáveis `@`](rolagens) do **ator selecionado** (token selecionado no mapa; se não houver, o personagem atribuído ao usuário). Ex.:

```
/r 1d20 + @pericias.luta.value # Ataque com espada
/r 2d6 + @for + @danoCAC
/gmr 1d20 + @pericias.perc.value
```

## Outros comandos de chat

| Comando | Efeito |
| --- | --- |
| `/w NomeDoJogador texto` ou `/whisper` | sussurro (também `/w [Ana, Bruno] texto`, `/w gm texto`) |
| `/ic texto` | fala "in character" (como o personagem) |
| `/ooc texto` | fala fora de personagem |
| `/emote texto`, `/em`, `/me` | ação narrada (*"Farid sorri."*) |
| `/macro Nome da Macro` | executa uma macro pelo nome |

## Rolagens inline em textos (`[[…]]`)

Funcionam em diários, descrições de itens/magias/poderes, biografias e cards de chat.

| Sintaxe | Comportamento |
| --- | --- |
| `[[/r 1d8+2]]` | botão que **rola ao clicar** (deferido) — cada leitor rola o próprio resultado |
| `[[/gmr 1d20]]`, `[[/br 1d20]]`, `[[/sr 1d20]]` | idem, com o modo de rolagem indicado |
| `[[1d8+2]]` | rolado **na hora em que o texto é exibido** — mostra o resultado, não um botão |
| `[[/r 1d8+2]]{Dano de fogo}` | botão com rótulo personalizado |
| `[[/r 1d8+2 # Bola de Fogo]]` | com texto de sabor na mensagem gerada |
| `[[/r 1d8 + @atributoChave]]` | usa o *roll data* do ator dono do texto (ficha/item) |

{: .tip }
Nas **descrições de magias e poderes**, `[[/r 2d6+@atributoChave]]` já resolve o atributo de conjuração de quem tem a magia na ficha. Em uma página de diário solta não há ator, então `@` só resolve se houver um token selecionado ao clicar.

## Botões de cards do sistema

Os cards de chat gerados pelo T20 (uso de habilidade, ataque, magia) trazem botões próprios: **rolar ataque**, **rolar dano**, **aplicar dano/cura aos alvos**, **aplicar efeito/condição** e, quando há efeitos de uso, o resumo dos aprimoramentos aplicados. Segurar **SHIFT** ao usar uma habilidade pela ficha abre a janela de configuração de uso (aprimoramentos, custo em PM, alvos). Veja [Aprimoramentos](aprimoramentos).
