---
execution: inline
agent: squads/purethic-audit/agents/seo
outputFile: squads/purethic-audit/output/step-03-seo.md
inputFile: squads/purethic-audit/output/step-01-auditor.md
---

# Step 03: Especialista de SEO

## Context Loading

Load these files before executing:
- `squads/purethic-audit/output/step-01-auditor.md` — Relatório base.

## Instructions

### Process
1. Extrair estrutura de URLs atuais.
2. Formular SEO Tags e Headings.
3. Montar tabela clara "De/Para".

## Output Format

The output MUST follow this exact structure:
```
# Tabela SEO
[Tabela gerada]
```

## Output Example
Veja o arquivo do agente.

## Veto Conditions
Reject and redo if ANY of these are true:
1. Title tag > 60 chars.
2. Tabela faltando colunas essenciais.

## Quality Criteria
- [ ] Headings otimizados
- [ ] Meta Descriptions otimizadas
