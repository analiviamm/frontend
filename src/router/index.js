import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '../views/MainMenu.vue';
import InputDataView from "../views/InputDataView.vue";

const routes = [
  { path: '/', component: MainMenu },
  { path: '/input_data', component: InputDataView },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
