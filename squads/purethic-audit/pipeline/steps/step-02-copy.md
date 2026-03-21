---
execution: inline
agent: squads/purethic-audit/agents/copywriter
outputFile: squads/purethic-audit/output/step-02-copy.md
inputFile: squads/purethic-audit/output/step-01-auditor.md
---

# Step 02: Especialista de Copy

## Context Loading

Load these files before executing:
- `squads/purethic-audit/output/step-01-auditor.md` — Relatório do auditor com os textos fracos atuais.

## Instructions

### Process
1. Ler o relatório.
2. Reescrever Banners, Categorias, Descrições e CTAs baseados na estética UK Conscious Beauty.

## Output Format

The output MUST follow this exact structure:
```
# Sugestões de Copy
[Textos sugeridos]
```

## Output Example
Veja o arquivo do agente.

## Veto Conditions
Reject and redo if:
1. Copy soar barato ou promocional demais.
2. CTAs não forem melhorados.

## Quality Criteria
- [ ] 7 produtos reescritos
- [ ] CTAs alterados
