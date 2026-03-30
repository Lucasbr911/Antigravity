---
execution: inline
agent: squads/purethic-visuals/agents/conversor
outputFile: squads/purethic-visuals/output/image-manifest.md
---

# Step 02: Conversora de Formatos (Mia)

## Context Loading

Load these files before executing:
- `image-manifest.md` do Step 01 — Inventário de imagens geradas pelo Nico.

## Instructions

### Process
1. Verificar se o pacote `sharp` está disponível: `npm list sharp --prefix c:/Users/lcasc/Documents/Antigravity`.
2. Se não estiver instalado, executar: `npm install sharp --save-dev --prefix c:/Users/lcasc/Documents/Antigravity`.
3. Para cada imagem no inventário:
   a. Converter para `.webp` com quality 85:
      ```
      node -e "require('sharp')('<input>').webp({quality:85}).toFile('<output.webp>', (e,i) => console.log(e||i))"
      ```
   b. Converter para `.jpg` com quality 88:
      ```
      node -e "require('sharp')('<input>').jpeg({quality:88}).toFile('<output.jpg>', (e,i) => console.log(e||i))"
      ```
4. Atualizar o `image-manifest.md` com as colunas adicionais: `webp_path`, `jpg_path`, `original_format`.

## Output Format

Atualizar a tabela existente no `image-manifest.md`:

```
| # | Nome | Uso | Path Original | webp_path | jpg_path |
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Alguma imagem não tem versão `.webp`.
2. O manifest não foi atualizado.

## Quality Criteria
- [ ] Todos os arquivos convertidos para `.webp` e `.jpg`
- [ ] `image-manifest.md` atualizado com novos paths
