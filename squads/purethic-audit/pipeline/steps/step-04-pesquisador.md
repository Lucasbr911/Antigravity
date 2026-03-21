---
execution: subagent
model_tier: powerful
agent: squads/purethic-audit/agents/pesquisador
outputFile: squads/purethic-audit/output/step-04-pesquisador.md
inputFile: squads/purethic-audit/output/step-01-auditor.md
---

# Step 04: Pesquisador de Tendências

## Context Loading

Load these files before executing:
- `squads/purethic-audit/output/step-01-auditor.md` — Relatório base.

## Instructions

### Process
1. Usar ferramentas web search para extrair as top 5 trends de Clean Beauty no Mercado UK atual.
2. Compilar os dados cruzando com o catálogo da Purethic.
3. Produzir resumo Executivo (Bullet points).

## Output Format

The output MUST follow this exact structure:
```
# Tendências UK Clean Beauty
[Bullets com síntese e impacto]
```

## Output Example
Veja o arquivo do agente.

## Veto Conditions
Reject and redo if:
1. Dados não forem geolocalizados para o UK.
2. Relatório for feito em parágrafos longos em vez de bullets.

## Quality Criteria
- [ ] Citação de ingredientes em alta
- [ ] Citação de gaps da marca
