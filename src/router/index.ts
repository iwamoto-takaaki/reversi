import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth.vue'),
    },
    {
      path: '/gametables',
      name: 'GameTables',
      component: () => import('@/views/GameTables.vue'),
    },
    {
      path: '/game/:gameTableId',
      name: 'Game',
      component: () => import('@/views/Game.vue'),
    },
  ],
});

export default router;
