import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import segundoAnoRotas from '@/views/SegundoAno/_routes.js'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/matematica/adicao', name: 'adicao', component: () => import('../views/Matematica/Adicao.vue') },
  { path: '/matematica/subtracao', name: 'subtracao', component: () => import('../views/Matematica/Subtracao.vue') },
  { path: '/portugues/ditongos', name: 'ditongos', component: () => import('../views/Portugues/Ditongos.vue') },
  ...segundoAnoRotas
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
