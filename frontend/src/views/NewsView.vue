<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchNews, fetchCategories } from '../api/news';
import NewsCard from '../components/NewsCard.vue';

const route = useRoute();
const router = useRouter();

const articles = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref('');
const search = ref(route.query.q || '');
const selectedCategory = ref(route.query.category || '');

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const params = {};
    if (selectedCategory.value) params.category = selectedCategory.value;
    if (search.value.trim()) params.q = search.value.trim();
    articles.value = await fetchNews(params);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

function applyFilters() {
  const query = {};
  if (selectedCategory.value) query.category = selectedCategory.value;
  if (search.value.trim()) query.q = search.value.trim();
  router.replace({ name: 'news', query });
  load();
}

function clearFilters() {
  search.value = '';
  selectedCategory.value = '';
  router.replace({ name: 'news' });
  load();
}

onMounted(async () => {
  try {
    categories.value = await fetchCategories();
  } catch {
  }
  await load();
});

watch(
  () => route.query,
  (q) => {
    search.value = q.q || '';
    selectedCategory.value = q.category || '';
    load();
  }
);
</script>

<template>
  <div class="page">
    <div class="container">
      <header class="page-header">
        <h1>资讯中心</h1>
        <p>Vibe Coding 相关新闻、工具更新与实践分享</p>
      </header>

      <div class="filters">
        <input
          v-model="search"
          type="search"
          placeholder="搜索标题或摘要…"
          class="search-input"
          @keyup.enter="applyFilters"
        />
        <select v-model="selectedCategory" class="select" @change="applyFilters">
          <option value="">全部分类</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <button type="button" class="btn-filter" @click="applyFilters">筛选</button>
        <button
          v-if="search || selectedCategory"
          type="button"
          class="btn-clear"
          @click="clearFilters"
        >
          清除
        </button>
      </div>

      <p v-if="loading" class="status">加载中…</p>
      <p v-else-if="error" class="status error">{{ error }}</p>
      <p v-else-if="!articles.length" class="status">暂无匹配文章</p>
      <div v-else class="grid">
        <NewsCard v-for="item in articles" :key="item.id" :article="item" />
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
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.65rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
}

.select {
  padding: 0.65rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.95rem;
}

.btn-filter,
.btn-clear {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  font-weight: 500;
}

.btn-filter {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.btn-clear {
  color: var(--text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.status {
  color: var(--text-muted);
  padding: 3rem;
  text-align: center;
}

.status.error {
  color: #f87171;
}
</style>
