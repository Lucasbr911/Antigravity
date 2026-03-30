---
name: wix-image-uploader
description: >
  Habilidade para fazer upload de imagens ao Wix Media Manager e associá-las
  a produtos na Wix Store via API REST. Suporta .jpg, .png e .webp.
description_en: >
  Skill to upload images to the Wix Media Manager and associate them
  with Wix Store products via REST API. Supports .jpg, .png and .webp.
type: script
version: "1.0.0"
---

# Wix Image Uploader

## Quando Usar

Use esta habilidade quando precisar:
- Fazer upload de uma imagem local para o Wix Media Manager.
- Associar uma imagem a um produto da Wix Store (foto principal ou galeria).
- Obter a URL Wix (`wix:image://...`) de uma imagem após o upload.

## Pré-requisitos

As variáveis de ambiente `WIX_API_KEY` e `WIX_SITE_ID` devem estar configuradas no arquivo `.env` na raiz do projeto.
A API Key deve ter permissão para **Manage Media Manager** além de Manage Products.

## Como Usar o Script Auxiliar (Node.js)

A pasta `scripts/` contém o script `wix_image_uploader.js`.

### 1. Upload de Imagem para o Media Manager

```bash
node skills/wix-image-uploader/scripts/wix_image_uploader.js upload <caminho/para/arquivo.webp> "<nome-do-arquivo>"
```

Retorna: a `wixMediaUrl` da imagem (ex: `wix:image://v1/abc123~mv2.webp/nome.webp`).

### 2. Associar Imagem a um Produto

```bash
node skills/wix-image-uploader/scripts/wix_image_uploader.js set-product-image <PRODUCT_ID> <caminho/para/arquivo.webp>
```

Executa o upload e imediatamente associa a imagem como foto principal do produto.

### 3. Adicionar Imagem à Galeria de um Produto

```bash
node skills/wix-image-uploader/scripts/wix_image_uploader.js add-product-gallery <PRODUCT_ID> <caminho/para/arquivo.webp>
```

## Regras e Limitações

- **Hero Banner e imagens de categoria** não podem ser atualizadas via API — entregue esses arquivos `.webp` para o usuário fazer upload manual no Wix Editor.
- O upload ao Media Manager pode levar alguns segundos. O script espera a confirmação antes de continuar.
- Tamanho máximo de arquivo: 100MB.
- Se o upload falhar com HTTP 401, a `WIX_API_KEY` não tem permissão de Media Manager.
