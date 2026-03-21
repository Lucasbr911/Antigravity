---
execution: inline
agent: squads/purethic-audit/agents/auditor
outputFile: squads/purethic-audit/output/step-01-auditor.md
---

# Step 01: Auditor Geral

## Context Loading

Load these files before executing:
- `Prompt Inicial` — Definição do escopo da auditoria.

## Instructions

### Process
1. Escanear a URL fornecida e relatar problemas visuais e de credibilidade.
2. Validar os problemas da lista do cliente.
3. Gerar o Mapa de Saúde do site.

## Output Format

The output MUST follow this exact structure:
```
# Auditoria Inicial
[Resultados da auditoria]
```

## Output Example

Veja a definição do Agente para o exemplo.

## Veto Conditions

Reject and redo if ANY of these are true:
1. O mapa de saúde estiver faltando.
2. Não analisar todas as páginas solicitadas.

## Quality Criteria

- [ ] Todas as páginas solicitadas verificadas.
- [ ] Mapa de saúde entregue.
