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

function loadNews() {
  const raw = readFileSync(join(__dirname, 'data', 'news.json'), 'utf-8');
  return JSON.parse(raw);
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

app.listen(PORT, () => {
  console.log(`Vibe Coding API 运行于 http://localhost:${PORT}`);
});
