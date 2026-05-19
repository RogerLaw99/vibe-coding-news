const API_BASE = '/api';

export async function fetchModels(params = {}) {
  const search = new URLSearchParams();
  if (params.vendor) search.set('vendor', params.vendor);
  const qs = search.toString();
  const res = await fetch(`${API_BASE}/models${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('加载模型列表失败');
  return res.json();
}

export async function fetchModelVendors() {
  const res = await fetch(`${API_BASE}/models/vendors`);
  if (!res.ok) throw new Error('加载厂商列表失败');
  return res.json();
}
