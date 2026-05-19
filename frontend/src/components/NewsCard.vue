<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <article class="card" :class="{ featured }">
    <div class="card-accent" />
    <span class="category">{{ article.category }}</span>
    <h2 class="title">
      <RouterLink :to="`/news/${article.id}`">{{ article.title }}</RouterLink>
    </h2>
    <p class="summary">{{ article.summary }}</p>
    <div class="meta">
      <span>{{ article.author }}</span>
      <span>{{ article.publishedAt }}</span>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover {
  border-color: rgba(124, 108, 255, 0.3);
  transform: translateY(-2px);
}

.card.featured {
  grid-column: span 2;
  padding: 2rem;
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0.6;
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

.title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 0.5rem;
}

.card.featured .title {
  font-size: 1.5rem;
}

.title a {
  color: var(--text);
  text-decoration: none;
}

.title a:hover {
  color: var(--accent);
  text-decoration: none;
}

.summary {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--mono);
}

@media (max-width: 768px) {
  .card.featured {
    grid-column: span 1;
  }
}
</style>
