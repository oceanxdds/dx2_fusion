import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/devil'
  },
  {
    path: '/devil',
    name: 'devil',
    component: () => import('./views/DevilView.vue')
  },
  {
    path: '/fusion-normal',
    name: 'fusion-normal',
    component: () => import('./views/FusionNormal.vue'),
    props: route => ({ devil: route.query.devil || route.query.demon || '' })
  },
  {
    path: '/fusion-reverse',
    name: 'fusion-reverse',
    component: () => import('./views/FusionReverse.vue'),
    props: route => ({ devil: route.query.devil || route.query.demon || '' })
  },
  {
    path: '/skill',
    name: 'skill',
    component: () => import('./views/SkillView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./views/SearchView.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('./views/SettingView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/devil'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
