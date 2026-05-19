<script setup>
import { ref, onMounted } from 'vue';
import { fetchModels, fetchModelVendors } from '../api/models';

const models = ref([]);
const vendors = ref([]);
const loading = ref(true);
const error = ref('');
const selectedVendor = ref('');

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const params = {};
    if (selectedVendor.value) params.vendor = selectedVendor.value;
    models.value = await fetchModels(params);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    vendors.value = await fetchModelVendors();
  } catch {
    /* ignore */
  }
  await load();
});
</script>

<template>
  <div class="page">
    <div class="container">
      <header class="page-header">
        <h1>大模型发展</h1>
        <p>主流通用与代码大模型动态：厂商、能力定位与上下文规模</p>
      </header>

      <div class="filters">
        <button
          type="button"
          class="chip"
          :class="{ active: !selectedVendor }"
          @click="selectedVendor = ''; load()"
        >
          全部厂商
        </button>
        <button
          v-for="v in vendors"
          :key="v"
          type="button"
          class="chip"
          :class="{ active: selectedVendor === v }"
          @click="selectedVendor = v; load()"
        >
          {{ v }}
        </button>
      </div>

      <p v-if="loading" class="status">加载中…</p>
      <p v-else-if="error" class="status error">{{ error }}（请确认后端已启动）</p>
      <div v-else class="grid">
        <article v-for="item in models" :key="item.id" class="card">
          <div class="card-top">
            <span class="vendor">{{ item.vendor }}</span>
            <span class="status-badge">{{ item.status }}</span>
          </div>
          <div class="name-row">
            <h2>{{ item.name }}</h2>
            <span class="tier">{{ item.tier }}</span>
          </div>
          <p class="desc">{{ item.description }}</p>
          <div class="meta-row">
            <span class="meta-item">
              <span class="label">上下文</span>
              <span class="value">{{ item.context }}</span>
            </span>
            <span class="meta-item">
              <span class="label">更新</span>
              <span class="value">{{ item.updatedAt }}</span>
            </span>
          </div>
          <ul class="highlights">
            <li v-for="h in item.highlights" :key="h">{{ h }}</li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2.5rem 0 4rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-muted);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.chip {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
}

.chip.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.vendor {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
}

.status-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(52, 211, 153, 0.15);
  color: #34d399;
  font-weight: 500;
}

.name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.name-row h2 {
  font-size: 1.15rem;
  font-weight: 600;
}

.tier {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--bg-elevated);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.meta-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-item .label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.meta-item .value {
  font-size: 0.9rem;
  font-family: var(--mono);
  font-weight: 500;
}

.highlights {
  list-style: none;
}

.highlights li {
  font-size: 0.85rem;
  padding: 0.25rem 0;
  padding-left: 1rem;
  position: relative;
}

.highlights li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.status {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
}

.status.error {
  color: #f87171;
}
</style>
