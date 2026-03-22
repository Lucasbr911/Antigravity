const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env file
try {
  const envPath = path.join(__dirname, '..', '..', '..', '.env');
  const envData = fs.readFileSync(envPath, 'utf8');
  envData.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...val] = line.split('=');
      const value = val.join('=').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
} catch (e) {
  // .env not found or unreadable, ignore
}

const API_URL = "www.wixapis.com";
const WIX_SITE_ID = process.env.WIX_SITE_ID || "";
const AUTHORIZATION = process.env.WIX_API_KEY || "";

function getHeaders() {
  if (!AUTHORIZATION) {
    console.error("Erro: A variável de ambiente WIX_API_KEY não está configurada.");
    process.exit(1);
  }
  return {
    "Authorization": AUTHORIZATION,
    "Content-Type": "application/json",
    "wix-site-id": WIX_SITE_ID
  };
}

function makeRequest(path, method, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_URL,
      path: path,
      method: method,
      headers: getHeaders()
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseBody));
          } catch(e) {
            resolve(responseBody);
          }
        } else {
          reject(`Erro HTTP ${res.statusCode}: ${responseBody}`);
        }
      });
    });

    req.on('error', (e) => reject(`Erro na requisição: ${e.message}`));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function listProducts() {
  try {
    const response = await makeRequest('/stores/v1/products/query', 'POST', { query: { paging: { limit: 100 } } });
    console.log(JSON.stringify(response, null, 2));
  } catch (e) {
    console.error(e);
  }
}

async function getProduct(productId) {
  try {
    const response = await makeRequest(`/stores/v1/products/${productId}`, 'GET');
    console.log(JSON.stringify(response, null, 2));
  } catch (e) {
    console.error(e);
  }
}

async function updateProduct(productId, jsonFile) {
  try {
    const payload = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const response = await makeRequest(`/stores/v1/products/${productId}`, 'PATCH', payload);
    console.log("Produto atualizado com sucesso!");
    console.log(JSON.stringify(response, null, 2));
  } catch (e) {
    console.error(`Erro: ${e.message || e}`);
  }
}

const action = process.argv[2];

if (!action) {
  console.log("Uso: node wix_api.js [list|get|update] [args...]");
  process.exit(1);
}

if (action === "list") {
  listProducts();
} else if (action === "get") {
  if (!process.argv[3]) {
    console.log("Uso: node wix_api.js get <PRODUCT_ID>");
    process.exit(1);
  }
  getProduct(process.argv[3]);
} else if (action === "update") {
  if (process.argv.length < 5) {
    console.log("Uso: node wix_api.js update <PRODUCT_ID> <JSON_PAYLOAD_FILE>");
    process.exit(1);
  }
  updateProduct(process.argv[3], process.argv[4]);
} else {
  console.log(`Ação desconhecida: ${action}`);
}
