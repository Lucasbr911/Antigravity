---
execution: inline
agent: squads/purethic-visuals/agents/uploader
outputFile: squads/purethic-visuals/output/upload-report.md
---

# Step 03: Uploader Wix (Rafael)

## Context Loading

Load these files before executing:
- `image-manifest.md` atualizado pelo Step 02 — Inventário com paths `.webp` e `.jpg`.
- `_opensquad/_memory/company.md` — Contexto Purethic.
- Skill instructions do `wix-image-uploader`.

## Instructions

### Process

**Fase 1 — Classificar imagens**
Ler o manifest e classificar cada imagem:
- `hero-banner` → **Manual** (Hero Banner do Wix Editor não é acessível via API)
- `revitaleyes-macro` → **API** (galeria do produto "Revitaleyes®")
- `purepore-lifestyle` → **API** (galeria do produto "PurePore™")

**Fase 2 — Upload via API**
Para cada imagem classificada como **API**:
1. Listar produtos para encontrar o product_id:
   ```
   node skills/wix-store-manager/scripts/wix_api.js list
   ```
2. Filtrar pelo nome do produto (ex: "Revitaleyes") para obter o ID.
3. Executar upload:
   ```
   node skills/wix-image-uploader/scripts/wix_image_uploader.js add-product-gallery <PRODUCT_ID> <webp_path>
   ```
4. Registrar o resultado (`wixMediaUrl` ou erro).

**Fase 3 — Pasta de downloads manuais**
Para cada imagem classificada como **Manual**:
1. Copiar os arquivos `.webp` e `.jpg` para `squads/purethic-visuals/output/{run_id}/downloads/`.
2. Listar na seção "Para Download Manual" com instruções exatas de onde fazer o upload no Wix Editor.

**Fase 4 — Gerar `upload-report.md`**

## Output Format

```
# Relatório de Upload: Purethic Visuals

## ✅ Subidas Automaticamente via API
| Imagem | Produto | Wix Media URL | Status |
|--------|---------|---------------|--------|

## 📥 Para Download Manual
| Imagem | Arquivo .webp | Arquivo .jpg | Onde Fazer Upload no Wix |
|--------|---------------|--------------|--------------------------|
| Hero Banner | hero-banner.webp | hero-banner.jpg | Wix Editor → Página Inicial → Banner → Substituir Imagem |
```

## Veto Conditions

1. Falhar silenciosamente em algum upload — deve sempre reportar erros.
2. Não gerar a pasta `downloads/` se houver imagens manuais.

## Quality Criteria
- [ ] `upload-report.md` entregue com lista completa
- [ ] Pasta `downloads/` criada com imagens manuais
- [ ] Imagens de produto associadas via API com confirmação de `wixMediaUrl`
