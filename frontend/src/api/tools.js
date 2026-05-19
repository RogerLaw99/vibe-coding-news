const API_BASE = '/api';

export async function fetchTools(params = {}) {
  const search = new URLSearchParams();
  if (params.category) search.set('category', params.category);
  const qs = search.toString();
  const res = await fetch(`${API_BASE}/tools${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('加载工具列表失败');
  return res.json();
}

export async function fetchToolCategories() {
  const res = await fetch(`${API_BASE}/tools/categories`);
  if (!res.ok) throw new Error('加载分类失败');
  return res.json();
}
