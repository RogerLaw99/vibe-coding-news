<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p>© {{ year }} Vibe Coding News · AI 辅助编程资讯</p>
      <p class="tagline">Built with Vue + Node.js</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.tagline {
  font-family: var(--mono);
  font-size: 0.8rem;
}
</style>
