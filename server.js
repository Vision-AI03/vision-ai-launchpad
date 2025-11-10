import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para forçar MIME types corretos
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript; charset=utf-8');
  } else if (req.path.endsWith('.mjs')) {
    res.type('application/javascript; charset=utf-8');
  } else if (req.path.endsWith('.css')) {
    res.type('text/css; charset=utf-8');
  } else if (req.path.endsWith('.json')) {
    res.type('application/json; charset=utf-8');
  }
  next();
});

// Servir arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true,
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.js') || filepath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
  }
}));

// SPA fallback - redireciona todas as rotas para index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server running on port ' + PORT);
  console.log('🌐 Serving from: ' + path.join(__dirname, 'dist'));
});
