<script setup>
import { ref, onMounted } from 'vue';
import { fetchTools, fetchToolCategories } from '../api/tools';

const tools = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref('');
const selectedCategory = ref('');

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const params = {};
    if (selectedCategory.value) params.category = selectedCategory.value;
    tools.value = await fetchTools(params);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    categories.value = await fetchToolCategories();
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
        <h1>Vibe Coding 工具</h1>
        <p>主流 AI 编程 IDE、Agent、CLI 与云端 vibe 开发平台一览</p>
      </header>

      <div class="filters">
        <button
          type="button"
          class="chip"
          :class="{ active: !selectedCategory }"
          @click="selectedCategory = ''; load()"
        >
          全部
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="chip"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat; load()"
        >
          {{ cat }}
        </button>
      </div>

      <p v-if="loading" class="status">加载中…</p>
      <p v-else-if="error" class="status error">{{ error }}（请确认后端已启动）</p>
      <div v-else class="grid">
        <article v-for="item in tools" :key="item.id" class="card">
          <div class="card-top">
            <span class="badge">{{ item.category }}</span>
            <span class="updated">{{ item.updatedAt }}</span>
          </div>
          <h2>{{ item.name }}</h2>
          <p class="tagline">{{ item.tagline }}</p>
          <p class="desc">{{ item.description }}</p>
          <ul class="highlights">
            <li v-for="h in item.highlights" :key="h">{{ h }}</li>
          </ul>
          <a :href="item.website" target="_blank" rel="noopener noreferrer" class="link">
            访问官网 →
          </a>
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.updated {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--mono);
}

.card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.tagline {
  font-size: 0.9rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  flex: 1;
}

.highlights {
  list-style: none;
  margin-bottom: 1rem;
}

.highlights li {
  font-size: 0.85rem;
  color: var(--text);
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

.link {
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: auto;
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
