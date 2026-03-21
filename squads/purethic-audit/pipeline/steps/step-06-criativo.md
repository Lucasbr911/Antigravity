---
execution: inline
agent: squads/purethic-audit/agents/criativo
outputFile: squads/purethic-audit/output/step-06-criativo.md
inputFile: squads/purethic-audit/output/step-05-marketing.md
---

# Step 06: Diretor Criativo

## Context Loading

Load these files before executing:
- `squads/purethic-audit/output/step-01-auditor.md` — Faltas visuais.

## Instructions

### Process
1. Elaborar prompts para Midjourney / Firefly baseado na estética Clean Beauty.
2. Especificar cores rigorosamente de acordo com a marca.

## Output Format

The output MUST follow this exact structure:
```
# Prompts de Arte
[Área | Prompt]
```

## Output Example
Veja o arquivo do agente.

## Veto Conditions
Reject and redo if:
1. Prompt não inclui as dimensões/aspect ratio.
2. Prompt incluir a frase "perfect face".

## Quality Criteria
- [ ] Prompts hiper realistas gerados
- [ ] Vários locais de target definidos (Hero, Banners)
