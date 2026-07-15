import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash, top: 88, behavior: 'smooth' }
    }

    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/about', redirect: { path: '/', hash: '#about' } },
    { path: '/projects', redirect: { path: '/', hash: '#projects' } },
    { path: '/p/:slug', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue') },
    {
      path: '/projects/:slug',
      redirect: (to) => ({ name: 'project-detail', params: { slug: to.params.slug } }),
    },
    { path: '/contact', redirect: { path: '/', hash: '#contact' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],
})
