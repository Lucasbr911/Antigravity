---
name: wix-store-manager
description: >
  Habilidade para gerenciar produtos de uma loja Wix (Wix Stores).
  Permite ler informações dos produtos e atualizar títulos,
  descrições e metadados de SEO usando a Wix REST API.
description_en: >
  Skill to manage products from a Wix Store (Wix Stores).
  Allows reading product info and updating titles, descriptions,
  and SEO metadata using the Wix REST API.
type: script
version: "1.0.0"
---

# Wix Store Manager

## Quando Usar

Use esta habilidade quando precisar:
- Ler os produtos da sua loja Wix.
- Analisar, escrever ou reescrever descrições de produtos.
- Otimizar títulos, subtitulos e configurações de SEO.
- Obter a lista de SKUs e estoques.

## Pré-requisitos (Importante)

Para funcionar, você precisará ter a variável de ambiente `WIX_API_KEY` configurada com uma chave de API válida gerada no painel da Wix com permissão para `Wix Stores (Manage Products)`. E o `WIX_SITE_ID` também deve estar configurado.

## Como Usar o Script Auxiliar (Node.js)

A pasta `scripts/` desta skill contém o script `wix_api.js`. Ele facilita as requisições GET e PATCH para a API da Wix.

### 1. Listar Produtos

Para listar produtos, utilize a ferramenta `run_command` executando o script com o argumento `list`.
Exemplo:
```bash
node .agent/skills/wix-store-manager/scripts/wix_api.js list
```

### 2. Obter Detalhes de um Produto Específico

Você pode usar a ferramenta `run_command` executando o script com o argumento `get` seguido do ID do produto.
```bash
node .agent/skills/wix-store-manager/scripts/wix_api.js get "ID_DO_PRODUTO"
```

### 3. Atualizar Produto (ex: Título e Descrição)

Para atualizar um produto, crie um arquivo JSON com as alterações desejadas (ex: `update.json`).
**Atenção:** Você sempre precisará recuperar a versão mais recente e fornecer o campo `revision` do produto no seu payload JSON para evitar sobreposição de dados.

```json
{
  "product": {
    "name": "Novo Título do Produto Otimizado",
    "description": "<p>A nova <strong>descrição rica</strong> do produto.</p>",
    "seoData": {
      "tags": [
        { "type": "title", "props": { "children": "Título de SEO | Minha Loja" } },
        { "type": "meta", "props": { "name": "description", "content": "Descrição meta focada em SEO" } }
      ]
    }
  },
  "revision": 2
}
```

E então execute o script:
```bash
node .agent/skills/wix-store-manager/scripts/wix_api.js update "ID_DO_PRODUTO" update.json
```

## Regras e Limitações

- As alterações de SEO não funcionam a menos que formatadas corretamente via objeto `seoData`.
- Certifique-se de que a API key seja enviada sem erros de autenticação (HTTP 401). Caso encontre erro de autenticação, avise o humano para configurar a variável `WIX_API_KEY`.
- Se a loja tiver muitos produtos, o método `list` retornará os produtos paginados. Você deverá ler os IDs dos produtos e então chamar o `get` em cada um para informações mais longas como descrições.
