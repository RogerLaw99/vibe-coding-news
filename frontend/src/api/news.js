const API_BASE = '/api';

export async function fetchNews(params = {}) {
  const search = new URLSearchParams();
  if (params.category) search.set('category', params.category);
  if (params.q) search.set('q', params.q);
  const qs = search.toString();
  const res = await fetch(`${API_BASE}/news${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('加载新闻失败');
  return res.json();
}

export async function fetchNewsById(id) {
  const res = await fetch(`${API_BASE}/news/${id}`);
  if (!res.ok) throw new Error('文章不存在');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('加载分类失败');
  return res.json();
}
