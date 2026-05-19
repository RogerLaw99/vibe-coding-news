<script setup>
import { ref, onMounted } from 'vue';
import { fetchNews } from '../api/news';
import NewsCard from '../components/NewsCard.vue';

const latest = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const data = await fetchNews();
    latest.value = data.slice(0, 3);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="hero">
    <div class="container hero-inner">
      <p class="eyebrow">AI 辅助编程 · 行业动态</p>
      <h1>用 Vibe 写代码，<br />用资讯跟上节奏</h1>
      <p class="lead">
        汇集 Vibe Coding、Cursor、Agent 工作流与安全实践相关新闻与解读，
        助你更快理解 AI 编程时代的变化。
      </p>
      <div class="hero-actions">
        <RouterLink to="/news" class="btn btn-primary">浏览全部资讯</RouterLink>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>最新动态</h2>
        <RouterLink to="/news" class="link-more">查看全部 →</RouterLink>
      </div>

      <p v-if="loading" class="status">加载中…</p>
      <p v-else-if="error" class="status error">{{ error }}（请确认后端已启动）</p>
      <div v-else class="grid">
        <NewsCard
          v-for="(item, i) in latest"
          :key="item.id"
          :article="item"
          :featured="i === 0"
        />
      </div>
    </div>
  </section>

  <section class="section features">
    <div class="container">
      <h2>我们关注什么</h2>
      <div class="feature-grid">
        <div class="feature">
          <span class="feature-icon">◈</span>
          <h3>工具与 IDE</h3>
          <p>Cursor、Windsurf 等产品的更新与 Agent 能力演进。</p>
        </div>
        <div class="feature">
          <span class="feature-icon">◈</span>
          <h3>团队实践</h3>
          <p>规范、审查与规则文件，让 AI 输出可规模落地。</p>
        </div>
        <div class="feature">
          <span class="feature-icon">◈</span>
          <h3>安全与合规</h3>
          <p>密钥管理、隐私模式与企业级部署要点。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 4rem 0 5rem;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-soft), transparent),
    var(--bg);
}

.hero-inner {
  max-width: 720px;
}

.eyebrow {
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.lead {
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 0 24px var(--accent-glow);
}

.btn-primary:hover {
  filter: brightness(1.1);
  text-decoration: none;
}

.section {
  padding: 3rem 0;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
}

.section-head h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.link-more {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.status {
  color: var(--text-muted);
  padding: 2rem;
  text-align: center;
}

.status.error {
  color: #f87171;
}

.features h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.feature {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.feature-icon {
  color: var(--accent);
  font-size: 1.25rem;
  display: block;
  margin-bottom: 0.75rem;
}

.feature h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.feature p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
