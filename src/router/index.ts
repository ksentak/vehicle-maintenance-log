import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
    },
    // {
    //   path: '/vehicle-maintenance',
    //   name: 'vehicleMaintenance',
    //   component: () => import('../views/Vehicle.vue'),
    // },
  ],
});

export default router;
