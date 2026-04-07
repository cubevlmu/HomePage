import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue') },
    { path: '/projects/:slug', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
  ],
})
