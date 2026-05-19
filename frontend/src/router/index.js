import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewsView from '../views/NewsView.vue';
import ArticleView from '../views/ArticleView.vue';
import ToolsView from '../views/ToolsView.vue';
import ModelsView from '../views/ModelsView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/news', name: 'news', component: NewsView },
  { path: '/news/:id', name: 'article', component: ArticleView, props: true },
  { path: '/tools', name: 'tools', component: ToolsView },
  { path: '/models', name: 'models', component: ModelsView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
