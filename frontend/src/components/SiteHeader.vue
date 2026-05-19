<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

function isActive(name) {
  if (name === 'news') return route.name === 'news' || route.name === 'article';
  return route.name === name;
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">◇</span>
        <span>Vibe Coding <em>News</em></span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/" :class="{ active: isActive('home') }">首页</RouterLink>
        <RouterLink to="/news" :class="{ active: isActive('news') }">资讯</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
  background: rgba(12, 14, 18, 0.85);
  backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
  text-decoration: none;
}

.logo:hover {
  text-decoration: none;
}

.logo-icon {
  color: var(--accent);
  font-size: 1.25rem;
}

.logo em {
  font-style: normal;
  color: var(--text-muted);
  font-weight: 500;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav a:hover,
.nav a.active {
  color: var(--text);
  text-decoration: none;
}

.nav a.active {
  color: var(--accent);
}
</style>
