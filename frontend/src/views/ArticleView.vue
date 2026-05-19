<script setup>
import { ref, onMounted, watch } from 'vue';
import { fetchNewsById } from '../api/news';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const article = ref(null);
const loading = ref(true);
const error = ref('');

async function load() {
  loading.value = true;
  error.value = '';
  article.value = null;
  try {
    article.value = await fetchNewsById(props.id);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => props.id, load);
</script>

<template>
  <article class="article-page">
    <div class="container article-wrap">
      <RouterLink to="/news" class="back">← 返回资讯列表</RouterLink>

      <p v-if="loading" class="status">加载中…</p>
      <p v-else-if="error" class="status error">{{ error }}</p>

      <template v-else-if="article">
        <span class="category">{{ article.category }}</span>
        <h1>{{ article.title }}</h1>
        <div class="meta">
          <span>{{ article.author }}</span>
          <span>{{ article.publishedAt }}</span>
        </div>
        <p class="summary">{{ article.summary }}</p>
        <div class="content">
          <p>{{ article.content }}</p>
        </div>
      </template>
    </div>
  </article>
</template>

<style scoped>
.article-page {
  padding: 2.5rem 0 4rem;
}

.article-wrap {
  max-width: 720px;
}

.back {
  display: inline-block;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  text-decoration: none;
}

.back:hover {
  color: var(--accent);
}

.category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

h1 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: var(--mono);
  margin-bottom: 1.5rem;
}

.summary {
  font-size: 1.125rem;
  color: var(--text-muted);
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}

.content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text);
}

.content p + p {
  margin-top: 1rem;
}

.status {
  color: var(--text-muted);
  padding: 2rem 0;
}

.status.error {
  color: #f87171;
}
</style>
