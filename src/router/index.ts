import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    // {
    //   path: '/vehicle-maintenance',
    //   name: 'vehicleMaintenance',
    //   component: () => import('../views/Vehicle.vue'),
    // },
  ],
});

export default router;
