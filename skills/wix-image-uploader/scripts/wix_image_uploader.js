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
  // .env not found, ignore
}

const API_URL = 'www.wixapis.com';
const WIX_SITE_ID = process.env.WIX_SITE_ID || '';
const AUTHORIZATION = process.env.WIX_API_KEY || '';

function getHeaders(contentType = 'application/json') {
  if (!AUTHORIZATION) {
    console.error('Erro: WIX_API_KEY não configurada.');
    process.exit(1);
  }
  const auth = AUTHORIZATION.startsWith('IST.') ? AUTHORIZATION : 'Bearer ' + AUTHORIZATION;
  return {
    'Authorization': auth,
    'Content-Type': contentType,
    'wix-site-id': WIX_SITE_ID
  };
}

function makeRequest(reqPath, method, data = null, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const body = data
      ? (contentType === 'application/json' ? JSON.stringify(data) : data)
      : null;

    const options = {
      hostname: API_URL,
      path: reqPath,
      method,
      headers: {
        ...getHeaders(contentType),
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(responseBody)); }
          catch (e) { resolve(responseBody); }
        } else {
          reject(`HTTP ${res.statusCode}: ${responseBody}`);
        }
      });
    });
    req.on('error', e => reject(e.message));
    if (body) req.write(body);
    req.end();
  });
}

function uploadBinary(uploadUrl, fileBuffer, mimeType, filename) {
  return new Promise((resolve, reject) => {
    const url = new URL(uploadUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname + '?filename=' + encodeURIComponent(filename) + (url.search ? '&' + url.search.slice(1) : ''),
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(responseBody)); }
          catch (e) { resolve(responseBody); }
        } else {
          reject(`Upload failed HTTP ${res.statusCode}: ${responseBody}`);
        }
      });
    });
    req.on('error', e => reject(e.message));
    req.write(fileBuffer);
    req.end();
  });
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };
  return map[ext] || 'image/jpeg';
}

async function uploadImage(filePath, displayName) {
  const filename = displayName || path.basename(filePath);
  const mimeType = getMimeType(filePath);

  console.log(`📤 Gerando URL de upload para "${filename}"...`);
  const urlResponse = await makeRequest('/media/v1/files/generate-upload-url', 'POST', {
    mimeType,
    fileName: filename
  });

  const uploadUrl = urlResponse.uploadUrl;
  if (!uploadUrl) throw new Error('Não foi possível obter a uploadUrl: ' + JSON.stringify(urlResponse));

  console.log(`📦 Fazendo upload de "${filename}" para o Wix Media Manager...`);
  const fileBuffer = fs.readFileSync(filePath);
  await uploadBinary(uploadUrl, fileBuffer, mimeType, filename);

  // Get file descriptor to return the wixMediaUrl
  const fileId = urlResponse.fileId || urlResponse.file?.id;
  if (fileId) {
    try {
      const descriptor = await makeRequest(`/media/v1/files/${fileId}`, 'GET');
      const wixUrl = descriptor.file?.url || descriptor.url || '';
      console.log(`✅ Upload concluído!`);
      console.log(JSON.stringify({ wixMediaUrl: wixUrl, fileId, filename }));
      return wixUrl;
    } catch (e) {
      // Descriptor might not be immediately available
    }
  }

  console.log(`✅ Upload concluído! FileId: ${fileId}`);
  console.log(JSON.stringify({ fileId, filename }));
  return fileId;
}

async function setProductImage(productId, filePath) {
  const filename = path.basename(filePath);
  const wixUrl = await uploadImage(filePath, filename);

  console.log(`🔗 Associando imagem ao produto ${productId}...`);
  const payload = {
    product: {
      media: {
        mainMedia: {
          image: { url: wixUrl }
        }
      }
    },
    fieldMask: ['media.mainMedia']
  };
  const result = await makeRequest(`/stores/v3/products/${productId}`, 'PATCH', payload);
  console.log('✅ Imagem de produto atualizada!');
  console.log(JSON.stringify(result, null, 2));
}

async function addProductGallery(productId, filePath) {
  const filename = path.basename(filePath);
  const wixUrl = await uploadImage(filePath, filename);

  // First get current product to preserve existing gallery
  const productRes = await makeRequest('/stores/v3/products/query', 'POST', {
    query: { filter: { id: { $in: [productId] } }, paging: { limit: 1 } }
  });
  const product = productRes.products?.[0];
  const existingItems = product?.media?.items || [];

  const newItem = { image: { url: wixUrl } };
  const updatedItems = [...existingItems, newItem];

  const payload = {
    product: { media: { items: updatedItems } },
    fieldMask: ['media.items']
  };
  const result = await makeRequest(`/stores/v3/products/${productId}`, 'PATCH', payload);
  console.log('✅ Imagem adicionada à galeria do produto!');
  console.log(JSON.stringify(result, null, 2));
}

const [,, action, arg1, arg2] = process.argv;

if (!action) {
  console.log('Uso: node wix_image_uploader.js [upload|set-product-image|add-product-gallery] [args...]');
  process.exit(1);
}

(async () => {
  try {
    if (action === 'upload') {
      if (!arg1) { console.error('Uso: upload <file> [display_name]'); process.exit(1); }
      await uploadImage(arg1, arg2);
    } else if (action === 'set-product-image') {
      if (!arg1 || !arg2) { console.error('Uso: set-product-image <product_id> <file>'); process.exit(1); }
      await setProductImage(arg1, arg2);
    } else if (action === 'add-product-gallery') {
      if (!arg1 || !arg2) { console.error('Uso: add-product-gallery <product_id> <file>'); process.exit(1); }
      await addProductGallery(arg1, arg2);
    } else {
      console.error(`Ação desconhecida: ${action}`);
    }
  } catch (e) {
    console.error('❌ Erro:', e);
    process.exit(1);
  }
})();
