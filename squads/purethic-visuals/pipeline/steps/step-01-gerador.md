---
execution: inline
agent: squads/purethic-visuals/agents/gerador
outputFile: squads/purethic-visuals/output/image-manifest.md
---

# Step 01: Gerador de Imagens HTML (Nico)

## Context Loading

Load these files before executing:
- `squads/purethic-audit/output/2026-03-21-175510/v1/step-06-criativo.md` — Direção criativa e conceito visual da Carol.
- `_opensquad/_memory/company.md` — Contexto da marca Purethic.
- Skill instructions do `image-creator`.

## Instructions

### Process
1. Ler o `step-06-criativo.md` e extrair todos os prompts criativos com seus usos.
2. Para cada imagem (3 ao total), **criar um arquivo HTML/CSS** auto-contido que traduza a intenção criativa da Carol:
   - **Imagem 1 — Hero Banner (`hero-banner.html`):** Layout 1920x800. Seção esquerda com headline e subtítulo, seção direita abstrata com gradientes em Sage Green. Grande espaço negativo.
   - **Imagem 2 — Revitaleyes Produto (`revitaleyes-macro.html`):** Layout 1080x1080. Foco em textura e produto; fundo em Ivory com detalhes dourados e folhagem minimalista.
   - **Imagem 3 — PurePore Lifestyle (`purepore-lifestyle.html`):** Layout 1080x1080. Composição com o dispositivo em destaque, paleta em Sage Green, espaço para copy.
3. Salvar cada HTML em `squads/purethic-visuals/output/{run_id}/v1/html/`.
4. Iniciar servidor HTTP na pasta de output (seguir SKILL.md do `image-creator`):
   ```bash
   python -m http.server 8765 --directory "<OUTPUT_DIR>/html" &
   ```
5. Para cada HTML, abrir com `browser_subagent`, definir viewport, tirar screenshot e salvar como PNG em `squads/purethic-visuals/output/{run_id}/v1/images/`.
6. Verificar cada imagem antes de avançar.
7. Parar o servidor HTTP.
8. Gerar `image-manifest.md` com inventário.

### Viewports
- `hero-banner.html` → 1920 x 800
- `revitaleyes-macro.html` → 1080 x 1080
- `purepore-lifestyle.html` → 1080 x 1080

## Output Format

```
# Image Manifest

| # | Nome | Uso | HTML Path | PNG Path | Viewport |
|---|------|-----|-----------|----------|----------|
| 1 | hero-banner | Hero Banner Principal | .../html/hero-banner.html | .../images/hero-banner.png | 1920x800 |
| 2 | revitaleyes-macro | Produto Revitaleyes® (galeria) | .../html/revitaleyes-macro.html | .../images/revitaleyes-macro.png | 1080x1080 |
| 3 | purepore-lifestyle | Produto PurePore™ (galeria) | .../html/purepore-lifestyle.html | .../images/purepore-lifestyle.png | 1080x1080 |
```

## Veto Conditions

Reject and redo if ANY of these are true:
1. Alguma imagem não foi renderizada (screenshot não existe).
2. A paleta Purethic (Sage Green, Ivory, Blush Rose) não foi aplicada.
3. O `image-manifest.md` está faltando ou incompleto.

## Quality Criteria
- [ ] 3 HTMLs criados e salvos
- [ ] 3 PNGs renderizados e verificados visualmente
- [ ] `image-manifest.md` entregue com paths corretos
