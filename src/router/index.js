import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '../views/MainMenu.vue';
import InputDataView from "../views/InputDataView.vue";
import MaterialView from "../views/MaterialView.vue";

const routes = [
  { path: '/', component: MainMenu },
  { path: '/input_data', component: InputDataView },
  { path: '/materials', component: MaterialView },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
