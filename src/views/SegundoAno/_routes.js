export default [
  {
    path: '/segundo-ano',
    name: 'segundo-ano',
    component: () => import('./Seletor.vue')
  },
  {
    path: '/segundo-ano/matematica',
    name: 'segundo-ano-matematica',
    component: () => import('./Matematica/Seletor.vue')
  },
  {
    path: '/segundo-ano/matematica/leitura-extenso',
    name: 'leitura-extenso',
    component: () => import('./Matematica/LeituraExtenso.vue')
  }
]
