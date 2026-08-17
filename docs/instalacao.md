---
title: Instalação
nav_order: 2
---

# Instalação
{: .no_toc }

1. TOC
{:toc}

## Instalar pelo manifesto

1. Abra o Foundry VTT e vá em **Game Systems → Install System**.
2. No campo **Manifest URL**, cole:

   ```
   https://github.com/victorharry/t20-foundry/releases/latest/download/system.json
   ```

3. Clique em **Install**.
4. Crie um mundo (**Game Worlds → Create World**) escolhendo o sistema **T20**.

Atualizações aparecem no botão *Update* do próprio Foundry, pois o manifesto aponta sempre para a última release.

## Compatibilidade

| Foundry VTT | Situação |
| --- | --- |
| v13 | mínimo suportado |
| v14 | verificado |

## Identificador do sistema

{: .important }
O **título** do sistema é *T20*, mas o **id** interno continua **`tormenta20`** (pasta `Data/systems/tormenta20`). Isso garante que mundos, compêndios, UUIDs (`Compendium.tormenta20.…`), macros e módulos feitos para o sistema original da comunidade continuem funcionando. Consequência: este sistema **substitui** o original — não é possível ter os dois instalados ao mesmo tempo.

## Módulos recomendados

- [vision-t20](https://github.com/mclemente/vision-t20) — modos de visão de Tormenta20 (visão no escuro, na penumbra etc.). O sistema declara este módulo como *recomendado*, então o Foundry sugere a instalação.

## Instalação manual (desenvolvimento)

```bash
git clone https://github.com/victorharry/t20-foundry.git
cd t20-foundry
npm install        # roda build:ci (compila packs + bundle) em dist/
```

Aponte `Data/systems/tormenta20` para a pasta `dist/` (link simbólico) ou copie seu conteúdo. Para reconstruir após mudanças: `npm run build` (JS/CSS) e `npm run build:packs` (compêndios).
