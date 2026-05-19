import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function loadJson(filename) {
  const raw = readFileSync(join(__dirname, 'data', filename), 'utf-8');
  return JSON.parse(raw);
}

function loadNews() {
  return loadJson('news.json');
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'vibe-coding-news-api' });
});

app.get('/api/news', (req, res) => {
  let items = loadNews();
  const { category, q } = req.query;

  if (category) {
    items = items.filter((n) => n.category === category);
  }
  if (q) {
    const keyword = String(q).toLowerCase();
    items = items.filter(
      (n) =>
        n.title.toLowerCase().includes(keyword) ||
        n.summary.toLowerCase().includes(keyword)
    );
  }

  items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  res.json(items);
});

app.get('/api/news/:id', (req, res) => {
  const items = loadNews();
  const item = items.find((n) => n.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: '文章不存在' });
  }
  res.json(item);
});

app.get('/api/categories', (_req, res) => {
  const items = loadNews();
  const categories = [...new Set(items.map((n) => n.category))];
  res.json(categories);
});

app.get('/api/tools', (req, res) => {
  let items = loadJson('tools.json');
  const { category } = req.query;
  if (category) {
    items = items.filter((t) => t.category === category);
  }
  res.json(items);
});

app.get('/api/tools/categories', (_req, res) => {
  const items = loadJson('tools.json');
  res.json([...new Set(items.map((t) => t.category))]);
});

app.get('/api/models', (req, res) => {
  let items = loadJson('models.json');
  const { vendor } = req.query;
  if (vendor) {
    items = items.filter((m) => m.vendor === vendor);
  }
  res.json(items);
});

app.get('/api/models/vendors', (_req, res) => {
  const items = loadJson('models.json');
  res.json([...new Set(items.map((m) => m.vendor))]);
});

app.listen(PORT, () => {
  console.log(`Vibe Coding API 运行于 http://localhost:${PORT}`);
});
