---
execution: inline
agent: squads/purethic-audit/agents/marketing
outputFile: squads/purethic-audit/output/step-05-marketing.md
inputFile: squads/purethic-audit/output/step-04-pesquisador.md
---

# Step 05: Estrategista de Marketing

## Context Loading

Load these files before executing:
- `squads/purethic-audit/output/step-04-pesquisador.md` — Insights do mercado britânico.

## Instructions

### Process
1. Construir e-mails Welcome e Carrinho Abandonado.
2. Criar duas ofertas para substituir as antigas.
3. Definir cronograma estratégico de ação.

## Output Format

The output MUST follow this exact structure:
```
# Estratégia Tática
[Emails e Ofertas]
```

## Output Example
Veja o arquivo do agente.

## Veto Conditions
Reject and redo if:
1. Emails oferecerem apenas descontos agressivos baratos.
2. Faltar o calendário.

## Quality Criteria
- [ ] Emails completos (assunto + corpo)
- [ ] 2 ofertas entregues
